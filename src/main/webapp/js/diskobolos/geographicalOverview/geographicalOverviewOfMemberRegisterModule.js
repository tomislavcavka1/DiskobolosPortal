/**
 * AngularJS controller responsible for displaying member register data on the map.
 * 
 * @author Tomislav Čavka
 * 
 */
var geographicalOverviewOfMemberRegisterModule = angular.module('geographicalOverviewOfMemberRegisterModule', []);

geographicalOverviewOfMemberRegisterModule.controller('geographicalOverviewOfMemberRegistersCtrl', function (
        $scope,
        LocationDataFactory,
        $rootScope,
        leafletData,
        $timeout,
        $compile,
        _,
        $uibModal,
        MembershipCategoryDataFactory) {

     $scope.$on('selectedMemberRegister', function (ev, selectedMemberRegister) {
        $rootScope.selectedMemberRegister = selectedMemberRegister;
    });
    
    $scope.$on('selectedLocation', function (ev, selectedLocation) {
     $rootScope.selectedLocation = selectedLocation;
    });

    $scope.$on('locations', function (ev, locations) {
        $scope.locations = locations;
    });
    
    $scope.$on('locationDetails', function (ev, locationDetails) {
        $rootScope.locationDetails = locationDetails;
    });   

    $scope.loadMapData = function () {
        LocationDataFactory.fetchGeographicalData({}, function (response) {
            //success
            $scope.geoJsonObjs = response.geoJsonObj;
            
            // remove locations that aren't in relation with member register
            for (var i = 0; i < $scope.geoJsonObjs.features.length; i++) {
                if (!_.isUndefined($scope.geoJsonObjs.features[i])) {
                    if(_.isUndefined($scope.geoJsonObjs.features[i].location.memberRegister)) {
                        $scope.geoJsonObjs.features.splice(i, 1);
                    }
                }
            }
            
            $timeout(function () {
                MembershipCategoryDataFactory.getAllMembershipCategories({}, function (response) {
                        //success
                        $scope.membershipCategories = response.membershipCategories;
                        
                        $scope.htmlColors = [];
                        $scope.htmlLabels = [];
                   
                        for (var i = 0; i < $scope.membershipCategories.length; i++) {
                            if (!_.isUndefined($scope.membershipCategories[i])) {
                                $scope.htmlColors.push($scope.membershipCategories[i].htmlColor);
                                $scope.htmlLabels.push('<span>' + $scope.membershipCategories[i].description + '</span>');
                            }
                        }

                        //map init data
                        angular.extend($scope, {
                                accommodationCenter: {},
                                data: {markers: {}},
                                legend: {
                                    position: 'bottomleft',
                                    colors: $scope.htmlColors,
                                    labels: $scope.htmlLabels
                                },
                                events: {
                                    markers: {
                                        enable: ['click', 'blur', 'focus'],
                                        logic: 'emit'
                                    }
                            }
                        });
                        
                        //if location data is successfully fetched, load map data
                        $scope.addGeoJsonLayerWithClustering($scope.geoJsonObjs);
                   },
                   function (error) {
                       //fail
                       $scope.error = error;
                 });            
            }, 0);            
        },
        function (error) {
            //fail
            $scope.error = error;
        });
    };

    $scope.addGeoJsonLayerWithClustering = function (data) {
        
        var geoJsonLayer = L.geoJson(data, {
            onEachFeature: function (feature, layer) {
                var popupMsg = '<div><a href="" ng-click="showDetails(); $event.preventDefault()">' + 
                        '<b>Ime članice: </b>' + (_.isUndefined(feature.location.memberRegister) ? '' : feature.location.memberRegister.name) + '</a></br>' +
                        '<b>Kategorija: </b>' + (_.isUndefined(feature.location.memberRegister) ? '' : feature.location.memberRegister.membershipCategory.description) + '</br>' +
                        '<b>Poštanski broj: </b>' + feature.location.address + '</br>' +
                        '<b>Adresa: </b>' + feature.location.address + '</br>' +
                        '<b>Grad: </b>' + feature.location.city + '&nbsp;&nbsp;</div>';
                var linkFunction = $compile(angular.element(popupMsg)),
                        newScope = $scope.$new();
                layer.bindPopup(linkFunction(newScope)[0]);
                // set different colors depending of the membership category
               if(!_.isUndefined(feature.location.memberRegister)) {
                   switch(feature.location.memberRegister.membershipCategory.description) {
                       case 'SPORT':
                           layer.setIcon(L.AwesomeMarkers.icon({
                            icon: 'circle',
                            iconColor: 'white',
                            markerColor: 'red',
                            prefix: 'fa'
                            }));
                           break;
                       case 'SPORTSKA REKREACIJA ("SPORT ZA SVE")':
                           layer.setIcon(L.AwesomeMarkers.icon({
                            icon: 'circle',
                            iconColor: 'white',
                            markerColor: 'darkred',
                            prefix: 'fa'
                            }));
                           break;
                       case 'ZDRAVSTVENA ZAŠTITA SPORTAŠA':
                           layer.setIcon(L.AwesomeMarkers.icon({
                            icon: 'circle',
                            iconColor: 'white',
                            markerColor: 'orange',
                            prefix: 'fa'
                            }));
                           break;
                       case 'SPORTSKE GRAĐEVINE':
                           layer.setIcon(L.AwesomeMarkers.icon({
                            icon: 'circle',
                            iconColor: 'white',
                            markerColor: 'green',
                            prefix: 'fa'
                            }));
                           break;
                       case 'SPORT GLUHIH OSOBA':
                           layer.setIcon(L.AwesomeMarkers.icon({
                            icon: 'circle',
                            iconColor: 'white',
                            markerColor: 'darkgreen',
                            prefix: 'fa'
                            }));
                           break;
                       case 'SPORT OSOBA S INVALIDITETOM':
                           layer.setIcon(L.AwesomeMarkers.icon({
                            icon: 'circle',
                            iconColor: 'white',
                            markerColor: 'blue',
                            prefix: 'fa'
                            }));
                           break;
                       case 'ŠKOLSKI SPORT':
                           layer.setIcon(L.AwesomeMarkers.icon({
                            icon: 'circle',
                            iconColor: 'white',
                            markerColor: 'purple',
                            prefix: 'fa'
                            }));
                           break;
                       case 'ZAHTJEV ZA PRIDRUŽENO ČLANSTVO':
                           layer.setIcon(L.AwesomeMarkers.icon({
                            icon: 'circle',
                            iconColor: 'white',
                            markerColor: 'darkpurple',
                            prefix: 'fa'
                            }));
                           break;
                       case 'SPECIJALNA OLIMPIJADA':
                           layer.setIcon(L.AwesomeMarkers.icon({
                            icon: 'circle',
                            iconColor: 'white',
                            markerColor: 'cadetblue',
                            prefix: 'fa'
                            }));
                           break;
                       case 'SPORTSKE AKTIVNOSTI DJECE':
                           layer.setIcon(L.AwesomeMarkers.icon({
                            icon: 'circle',
                            iconColor: '#483D8B',
                            markerColor: 'purple',
                            prefix: 'fa'
                            }));
                           break;
                       default:
                           break;
                   }
                }
                layer.on({
                    mouseover: pointMouseover,
                    mouseout: pointMouseout
              });
          }
      });            
     
      leafletData.getMap().then(function (map) {
        map.addLayer(geoJsonLayer);
        var fitOptions = {
            padding: [50, 50]
        };
        
        $timeout(function  () {
            map.invalidateSize();
              map.fitBounds(geoJsonLayer.getBounds(), fitOptions);
        }, 200);
      });
    };
    
    $scope.showDetails = function () {

        var modalInstance = $uibModal.open({
            templateUrl: 'views/memberRegisterModal.html',
            size: 'lg',
            controller: 'ShowMemberRegisterDataModalCtrl',
            scope: $scope
        });

        modalInstance.result.then(function (response) {
            console.log('Modal name', 'memberRegisterModal.html');
        });
    };
    
    function pointMouseover(leafletEvent) {
        $rootScope.$broadcast('selectedMemberRegister', leafletEvent.target.feature.location.memberRegister);
    }

    function pointMouseout(leafletEvent) {       
    }
    
    // initialize map data
    $scope.loadMapData();
});


// Controller that is responsible for displaying member register data
geographicalOverviewOfMemberRegisterModule.controller('ShowMemberRegisterDataModalCtrl', function (
        $scope,
        $rootScope,
        $uibModalInstance,
        _,
        AppConstants) {

    $scope.viewMode = AppConstants.ViewMode['readModeOnly'];

    $scope.data = {};
    $scope.data = $rootScope.selectedMemberRegister;
    $scope.data.bankAccountsTags = [];
    $scope.data.emailsTags = [];
    $scope.locations = [];
    $scope.membershipCategories = [];
    // initialization of the address object
    $scope.address = {country: {}};

    // sets default value for location dropdown
    $scope.location = {selected: {}};
    $scope.location.selected = $rootScope.selectedMemberRegister.location;

    // sets default value for membership categpry dropdown
    $scope.membershipCategory = {selected: {}};
    $scope.membershipCategory.selected = $rootScope.selectedMemberRegister.membershipCategory;

    if (_.isArray($scope.data.locations) && $scope.data.locations.length > 0) {
        for (var i = 0; i < $scope.data.locations.length; i++) {
            $scope.locations.push($scope.data.locations[i]);
        }
    }

    if (_.isArray($scope.data.membershipCategories) && $scope.data.membershipCategories.length > 0) {
        for (var i = 0; i < $scope.data.membershipCategories.length; i++) {
            $scope.membershipCategories.push($scope.data.membershipCategories[i]);
        }
    }

    // initializes list of bank accounts for tag input element
    if (_.isArray($scope.data.bankAccounts) && $scope.data.bankAccounts.length > 0) {
        for (var i = 0; i < $scope.data.bankAccounts.length; i++) {
            $scope.data.bankAccountsTags.push({alreadyExists: true, id: $scope.data.bankAccounts[i].id, text: $scope.data.bankAccounts[i].accountNumber});
        }
    }

    // initializes list of emails for tag input element
    if (_.isArray($scope.data.emails) && $scope.data.emails.length > 0) {
        for (var i = 0; i < $scope.data.emails.length; i++) {
            $scope.data.emailsTags.push({alreadyExists: true, id: $scope.data.emails[i].id, text: $scope.data.emails[i].email});
        }
    }
    
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

