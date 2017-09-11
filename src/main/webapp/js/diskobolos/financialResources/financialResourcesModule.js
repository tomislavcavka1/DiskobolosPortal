/*
 * Finacial resources module
 * 
 * @author Tomislav Čavka
 */
var financialResourcesModule = angular.module('financialResourcesModule', []);

financialResourcesModule.controller('financialResourcesController', function (
        $scope,
        _,
        $http,
        $interval,
        uiGridGroupingConstants) {

    $scope.gridOptions = {
    enableFiltering: true,
    treeRowHeaderAlwaysVisible: false,
    paginationPageSizes: [5, 10, 25],
    paginationPageSize: 5,
    columnDefs: [
      { name: 'name', width: '30%' },
      { name: 'gender', width: '20%', cellFilter: 'mapGender' }, // grouping: { groupPriority: 1 }, sort: { priority: 1, direction: 'asc' },
      { name: 'age', treeAggregationType: uiGridGroupingConstants.aggregation.MAX, width: '20%' },
      { name: 'company', width: '25%' },
      { name: 'registered', width: '40%', cellFilter: 'date', type: 'date' },
      { name: 'state', grouping: { groupPriority: 0 }, sort: { priority: 0, direction: 'desc' }, width: '35%', cellTemplate: '<div><div ng-if="!col.grouping || col.grouping.groupPriority === undefined || col.grouping.groupPriority === null || ( row.groupHeader && col.grouping.groupPriority === row.treeLevel )" class="ui-grid-cell-contents" title="TOOLTIP">{{COL_FIELD CUSTOM_FILTERS}}</div></div>' },
      { name: 'balance', width: '25%', enableCellEdit: true, cellFilter: 'currency', treeAggregationType: uiGridGroupingConstants.aggregation.SUM, customTreeAggregationFinalizerFn: function( aggregation ) {
        aggregation.rendered = aggregation.value;
      } }
    ],
    enableGridMenu: true,
    enableSelectAll: true,
    exporterCsvFilename: 'myFile.csv',
    exporterPdfDefaultStyle: {fontSize: 9},
    exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
    exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'blue'},
    exporterPdfHeader: { text: "Diskobolos", style: 'headerStyle' },
    exporterPdfFooter: function ( currentPage, pageCount ) {
      return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
    },
    exporterPdfCustomFormatter: function ( docDefinition ) {
      docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
      docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
      return docDefinition;
    },
    exporterPdfOrientation: 'landscape',
    exporterPdfPageSize: 'LETTER',
    exporterPdfMaxGridWidth: 500,
    exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
    onRegisterApi: function( gridApi ) {
      $scope.gridApi = gridApi;
    }
  };
 
  $http.get('js/diskobolos/financialResources/500_complex.json')
    .success(function(data) {
      for ( var i = 0; i < data.length; i++ ){
        var registeredDate = new Date( data[i].registered );
        data[i].state = data[i].address.state;
        data[i].gender = data[i].gender === 'male' ? 1: 2;
        data[i].balance = Number( data[i].balance.slice(1).replace(/,/,'') );
        data[i].registered = new Date( registeredDate.getFullYear(), registeredDate.getMonth(), 1 );
      }
      delete data[2].age;
      $scope.gridOptions.data = data;
    });
 
  $scope.expandAll = function(){
    $scope.gridApi.treeBase.expandAllRows();
  };
 
  $scope.toggleRow = function( rowNum ){
    $scope.gridApi.treeBase.toggleRowTreeState($scope.gridApi.grid.renderContainers.body.visibleRowCache[rowNum]);
  };
 
  $scope.changeGrouping = function() {
    $scope.gridApi.grouping.clearGrouping();
    $scope.gridApi.grouping.groupColumn('age');
    $scope.gridApi.grouping.aggregateColumn('state', uiGridGroupingConstants.aggregation.COUNT);
  };
 
  $scope.getAggregates = function() {
    var aggregatesTree = [];
    var gender;
 
    var recursiveExtract = function( treeChildren ) {
      return treeChildren.map( function( node ) {
        var newNode = {};
        angular.forEach(node.row.entity, function( attributeCol ) {
          if( typeof(attributeCol.groupVal) !== 'undefined' ) {
            newNode.groupVal = attributeCol.groupVal;
            newNode.aggVal = attributeCol.value;
          }
        });
        newNode.otherAggregations = node.aggregations.map( function( aggregation ) {
          return { colName: aggregation.col.name, value: aggregation.value, type: aggregation.type };
        });
        if( node.children ) {
          newNode.children = recursiveExtract( node.children );
        }
        return newNode;
      });
    };
 
    aggregatesTree = recursiveExtract( $scope.gridApi.grid.treeBase.tree );
 
    console.log(aggregatesTree);
  };
})
.filter('mapGender', function() {
  var genderHash = {
    1: 'male',
    2: 'female'
  };
 
  return function(input) {
    var result;
    var match;
    if (!input){
      return '';
    } else if (result === genderHash[input]) {
      return result;
    } else if ( ( match = String(input).match(/(.+)( \(\d+\))/) ) && ( result = genderHash[match[1]] ) ) {
      return result + match[2];
    } else {
      return input;
    }
  };
});




