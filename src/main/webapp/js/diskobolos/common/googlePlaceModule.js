/**
 * Module that implements google place functionality
 * 
 * @author Tomislav Čavka
 * @type angular.module.angular-1_3_6_L1749.moduleInstance 
 */
var googlePlaceModule = angular.module('gPlace', []);

googlePlaceModule.directive('googlePlace', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, model) {
            var options = {
                types: []
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);
            google.maps.event.addListener(scope.gPlace, 'place_changed', function () {
                scope.$apply(function () {
                    model.$setViewValue(element.val());
                });
            });
        }
    };
});

googlePlaceModule.directive('googleTranslate', ['$resource', function ($resource) {
        var translate = $resource('https://www.googleapis.com/language/translate/v2',
                {
                    key: 'AIzaSyB23YWhLf48fYhkxWyVie-nVSPAvmv04iA'
                },
                {
                    'translate': {
                        method: 'GET'
                    }
                }
        );

        return {
            template: '{ { value } }',
            scope: {
                value: '=text'
            },
            link: function (scope, elem, attr) {
                translate.translate({
                    source: attr.source,
                    target: attr.target,
                    q: attr.text
                }).$promise.then(
                        function (result) {
                            if (typeof result.data.translations[0].translatedText !== 'undefined') {
                                scope.value = result.data.translations[0].translatedText;
                            } else {
                                scope.value = attr.text;
                            }
                        }
                );
            }
        };
    }]);

googlePlaceModule.factory('LocationFactory', function () {
    return {
        createLocationFromPlaceAddress: function (results) {
            var location = {};
            location.country = {};
            if(results !== undefined) {                
                location.latitude = results[0].geometry.location.lat();
                location.longitude = results[0].geometry.location.lng();
                location.displayAddress = results[0].formatted_address;
                for (var i = 0; i < results[0].address_components.length; i++) {
                    for (var j = 0; j < results[0].address_components[i].types.length; j++) {
                        if (results[0].address_components[i].types[j] === "country")
                            location.country.isoCode2 = results[0].address_components[i].short_name;
                        if (results[0].address_components[i].types[j] === "postal_code")
                            location.municipalityNumber = results[0].address_components[i].short_name;
                        if (results[0].address_components[i].types[j] === "route")
                            location.street = results[0].address_components[i].long_name;
                        if (results[0].address_components[i].types[j] === "street_number")
                            location.streetNumber = results[0].address_components[i].short_name;
                        if (results[0].address_components[i].types[j] === "locality")
                            location.city = results[0].address_components[i].long_name;
                    }
                }
            }
            return location;
        }
    };
});


