/*
 * Finacial resources module
 * 
 * @author Tomislav Čavka
 */
var financialResourcesModule = angular.module('financialResourcesModule', []);

financialResourcesModule.controller('financialResourcesController', function (
        $scope,
        _,
        $interval,
        uiGridGroupingConstants,
        FinancialResourcesDataFactory,
        toaster) {
            
    $scope.financialResources = {};
    $scope.gridData = [];

    $scope.gridOptions = {
        enableFiltering: true,
        treeRowHeaderAlwaysVisible: false,
        paginationPageSizes: [5, 10, 25],
        paginationPageSize: 10,
        columnDefs: [        
          { name: 'id', displayName: 'Id', width: '10%', enableCellEdit: false},
          { name: 'sportCategory', displayName: 'Kategorija sporta', width: '40%', enableCellEdit: false, grouping: { groupPriority: 0 }, sort: { priority: 0, direction: 'asc' }, cellTemplate: '<div><div ng-if="!col.grouping || col.grouping.groupPriority === undefined || col.grouping.groupPriority === null || ( row.groupHeader && col.grouping.groupPriority === row.treeLevel )" class="ui-grid-cell-contents" title="TOOLTIP">{{COL_FIELD CUSTOM_FILTERS}}</div></div>' },
          { name: 'name', displayName: 'Članica naziv', width: '35%', enableCellEdit: false},
          { name: 'amount', displayName: 'Sredstva', width: '15%', cellFilter: 'currency', treeAggregationType: uiGridGroupingConstants.aggregation.SUM, customTreeAggregationFinalizerFn: function( aggregation ) {
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
  
  
  $scope.init = function() {
      FinancialResourcesDataFactory.getAllFinancialResources({}, function (response) {
          //success
          $scope.financialResources = response.financialResources;          
          
          for ( var i = 0; i < $scope.financialResources.length; i++ ){
              $scope.gridData.push({
                      id: $scope.financialResources[i].id, 
                      name: $scope.financialResources[i].memberRegister.name,
                      sportCategory: $scope.financialResources[i].memberRegister.sportCategory.name,
                      amount: _.isUndefined($scope.financialResources[i].amount) ? 0 : $scope.financialResources[i].amount
              });
          }
          
          $scope.gridOptions.data = $scope.gridData;
      },
      function (error) {
          //fail
          $scope.error = error;
      });
  };
  
  $scope.saveFinancialResources = function() {
      
      $scope.financialResourcesDto = {};
      $scope.financialResourcesObj = [];
      
      for ( var i = 0; i < $scope.gridData.length; i++ ){
          $scope.financialResourcesObj.push({
              id: $scope.gridData[i].id,
              memberRegister: $scope.financialResources[i].memberRegister,
              amount: $scope.gridData[i].amount,
              createdOn: $scope.financialResources[i].createdOn
          });
      }
      
      $scope.financialResourcesDto.financialResources = $scope.financialResourcesObj;
      
      FinancialResourcesDataFactory.editFinancialResources($scope.financialResourcesDto, function (response) {

                    if (response.result === 200) {
                        console.log('Financial resources are successfully edited!');

                        toaster.pop({
                            type: 'info',
                            title: 'Uspješna izmjena stavaka',
                            body: "Sredstva po sportovima su uspješno pohranjena.",
                            showCloseButton: true,
                            timeout: 5000
                        });
                      }
                },
                function (error) {
                    //fail
                    $scope.error = error;

                    toaster.pop({
                        type: 'error',
                        title: 'Greška',
                        body: "Greška prilikom izmjene uvjeta natječaj",
                        showCloseButton: true,
                        timeout: 5000
                    });
                });
  };
 
  $scope.expandAll = function(){
    $scope.gridApi.treeBase.expandAllRows();
  };
 
  $scope.toggleRow = function( rowNum ){
    $scope.gridApi.treeBase.toggleRowTreeState($scope.gridApi.grid.renderContainers.body.visibleRowCache[rowNum]);
  };
 
  $scope.changeGrouping = function() {
    $scope.gridApi.grouping.clearGrouping();
    $scope.gridApi.grouping.groupColumn('sportCategory');
    $scope.gridApi.grouping.aggregateColumn('name', uiGridGroupingConstants.aggregation.COUNT);
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
  
  
  $scope.init();
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




