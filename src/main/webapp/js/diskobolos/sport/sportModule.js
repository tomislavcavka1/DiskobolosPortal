/**
 * AngularJS controller responsible for fetching, creation, edit and deletion of the sport data.
 * 
 * @author Tomislav Čavka
 */
var sportModule = angular.module('sportModule', []);

sportModule.controller('sportController', function (
        $scope,
        $rootScope,
        _,
        SportDataFactory,
        $uibModal,
        DTOptionsBuilder,
        DTColumnDefBuilder,
        SweetAlert,
        toaster) {





    var language = {
        "sEmptyTable": "Nema podataka u tablici",
        "sInfo": "Prikazano _START_ do _END_ od _TOTAL_ rezultata",
        "sInfoEmpty": "Prikazano 0 do 0 od 0 rezultata",
        "sInfoFiltered": "(filtrirano iz _MAX_ ukupnih rezultata)",
        "sInfoPostFix": "",
        "sInfoThousands": ",",
        "sLengthMenu": "Prikaži _MENU_ rezultata po stranici",
        "sLoadingRecords": "Dohvaćam...",
        "sProcessing": "Obrađujem...",
        "sSearch": "Pretraži:",
        "sZeroRecords": "Ništa nije pronađeno",
        "oPaginate": {
            "sFirst": "Prva",
            "sPrevious": "Nazad",
            "sNext": "Naprijed",
            "sLast": "Zadnja"
        },
        "oAria": {
            "sSortAscending": ": aktiviraj za rastući poredak",
            "sSortDescending": ": aktiviraj za padajući poredak"
        }
    }




    $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withDOM('<"html5buttons"B>lTfgitp')
            .withLanguage(language)

            .withPaginationType('full_numbers')
            .withButtons([
                {extend: 'colvis', text: 'Prikaz polja u tablici', columns: [1, 2, 3, 4]},
                {extend: 'copy', text: 'Kopiraj'},
                {extend: 'csv'},
                {extend: 'excel', title: 'ExampleFile'},
                {extend: 'pdf', title: 'ExampleFile', exportOptions: {
                        columns: [1, 2, 3, 4]
                    }},
                {extend: 'print', text: 'Ispis',
                    customize: function (win) {
                        $(win.document.body).addClass('white-bg');
                        $(win.document.body).css('font-size', '10px');

                        $(win.document.body).find('table')
                                .addClass('compact')
                                .css('font-size', 'inherit');
                    }
                }
            ])
            .withOption(
                    'responsive', true,
                    [{columnDefs: [
                                {responsivePriority: 1, targets: 1},
                                {responsivePriority: 2, targets: 2}
                            ]}]
                    );
            

    $scope.$on('selectedSport', function (ev, selectedSport) {
        $rootScope.selectedSport = selectedSport;
    });

    $scope.sports = {};

    $scope.$on('sports', function (ev, sports) {
        $scope.sports = sports;
    });

    $scope.getSports = function () {

        SportDataFactory.getAllSports({}, function (response) {
            //success
            $scope.sports = response.sports;

            if (_.isArray($scope.sports) && $scope.sports.length > 0) {

                for (var i = 0; i < $scope.sports.length; i++) {
                    $scope.nomenclatureOfSports = $scope.sports[i].nomenclatureOfSports;

                    $scope.sports[i].nationalSportsFederation = '';
                    $scope.sports[i].internationalFederation = '';
                    $scope.sports[i].iocSportAccord = '';

                    for (var j = 0; j < $scope.nomenclatureOfSports.length; j++) {

                        switch ($scope.nomenclatureOfSports[j].category) {
                            case 'NATIONAL_SPORTS_FEDERATION':
                                $scope.sports[i].nationalSportsFederation += (_.isEmpty($scope.sports[i].nationalSportsFederation) ? '' : '/') + $scope.nomenclatureOfSports[j].value;
                                break;
                            case 'INTERNATIONAL_FEDERATION':
                                $scope.sports[i].internationalFederation += (_.isEmpty($scope.sports[i].internationalFederation) ? '' : '/') + $scope.nomenclatureOfSports[j].value;
                                break;
                            case 'IOC_SPORTACCORD':
                                $scope.sports[i].iocSportAccord += (_.isEmpty($scope.sports[i].iocSportAccord) ? '' : '/') + $scope.nomenclatureOfSports[j].value;
                                break;
                            default:
                                break;
                        }
                    }
                }

            }
        },
                function (error) {
                    //fail
                    $scope.error = error;
                });
    };

    $scope.createData = function () {

        var modalInstance = $uibModal.open({
            templateUrl: 'views/sportsModal.html',
            controller: 'CreateSportModalCtrl',
            scope: $scope
        });

        modalInstance.result.then(function (response) {
            console.log('Modal for creation of a new sport item: ', 'sportsModal.html');
        });
    };

    $scope.editData = function (id) {

        $rootScope.selectedSport = _.find($scope.sports, function (obj) {
            return obj.id === id;
        });

        //broadcast selected sport
        $rootScope.$broadcast('selectedSport', $rootScope.selectedSport);

        var modalInstance = $uibModal.open({
            templateUrl: 'views/sportsModal.html',
            controller: 'EditSportModalCtrl',
            scope: $scope
        });

        modalInstance.result.then(function (response) {
            console.log('Modal name', 'sportsModal.html');
        });
    };

    $scope.deleteData = function (id) {

        $rootScope.selectedSport = _.find($scope.sports, function (obj) {
            return obj.id === id;
        });

        //broadcast selected sport
        $rootScope.$broadcast('selectedSport', $rootScope.selectedSport);

        SweetAlert.swal({
            title: "Da li ste sigurni da želite obrisati odabranu stavku?",
            text: "Nakon brisanja podaci će zauvijek biti izbrisani!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Potvrdi",
            cancelButtonText: "Odustani",
            closeOnConfirm: true,
            closeOnCancel: true},
                function (isConfirm) {
                    if (isConfirm) {
                        SportDataFactory.deleteSportData($rootScope.selectedSport, function (response) {

                            if (response.result === 200) {
                                console.log('Sport data is successfully deleted.');

                                toaster.pop({
                                    type: 'info',
                                    title: 'Uspješna brisanje stavke',
                                    body: "Podaci za sport " + $rootScope.selectedSport.name + " su uspješno izbrisani.",
                                    showCloseButton: true,
                                    timeout: 5000
                                });

                                SportDataFactory.getAllSports({}, function (response) {
                                    //success
                                    $scope.sports = response.sports;

                                    if (_.isArray($scope.sports) && $scope.sports.length > 0) {

                                        for (var i = 0; i < $scope.sports.length; i++) {
                                            $scope.nomenclatureOfSports = $scope.sports[i].nomenclatureOfSports;

                                            $scope.sports[i].nationalSportsFederation = '';
                                            $scope.sports[i].internationalFederation = '';
                                            $scope.sports[i].iocSportAccord = '';

                                            for (var j = 0; j < $scope.nomenclatureOfSports.length; j++) {

                                                switch ($scope.nomenclatureOfSports[j].category) {
                                                    case 'NATIONAL_SPORTS_FEDERATION':
                                                        $scope.sports[i].nationalSportsFederation += (_.isEmpty($scope.sports[i].nationalSportsFederation) ? '' : '/') + $scope.nomenclatureOfSports[j].value;
                                                        break;
                                                    case 'INTERNATIONAL_FEDERATION':
                                                        $scope.sports[i].internationalFederation += (_.isEmpty($scope.sports[i].internationalFederation) ? '' : '/') + $scope.nomenclatureOfSports[j].value;
                                                        break;
                                                    case 'IOC_SPORTACCORD':
                                                        $scope.sports[i].iocSportAccord += (_.isEmpty($scope.sports[i].iocSportAccord) ? '' : '/') + $scope.nomenclatureOfSports[j].value;
                                                        break;
                                                    default:
                                                        break;
                                                }
                                            }
                                        }
                                    }

                                    $rootScope.$broadcast('sports', $scope.sports);
                                },
                                        function (error) {
                                            //fail
                                            $scope.error = error;
                                        });

                            }
                        },
                                function (error) {
                                    //fail
                                    $scope.error = error;

                                    toaster.pop({
                                        type: 'error',
                                        title: 'Greška',
                                        body: "Greška prilikom brisanja podataka za sport " + $rootScope.selectedSport.name,
                                        showCloseButton: true,
                                        timeout: 5000
                                    });
                                });
                    }
                });
    };

    $scope.getSports();
});


sportModule.controller('EditSportModalCtrl', function (
        $scope,
        $rootScope,
        $uibModalInstance,
        _,
        SportDataFactory,
        toaster,
        AppConstants) {

    $scope.crudAction = AppConstants.CrudActions['edit'];
    $scope.data = {};
    $scope.data.name = $rootScope.selectedSport.name;

    $scope.data.nationalSportsFederations = [];
    $scope.data.internationalFederations = [];
    $scope.data.iocSportAccords = [];

    for (var j = 0; j < $rootScope.selectedSport.nomenclatureOfSports.length; j++) {

        switch ($rootScope.selectedSport.nomenclatureOfSports[j].category) {
            case 'NATIONAL_SPORTS_FEDERATION':
                $scope.data.nationalSportsFederations.push({id: $rootScope.selectedSport.nomenclatureOfSports[j].id, text: $rootScope.selectedSport.nomenclatureOfSports[j].value});
                break;
            case 'INTERNATIONAL_FEDERATION':
                $scope.data.internationalFederations.push({id: $rootScope.selectedSport.nomenclatureOfSports[j].id, text: $rootScope.selectedSport.nomenclatureOfSports[j].value});
                break;
            case 'IOC_SPORTACCORD':
                $scope.data.iocSportAccords.push({id: $rootScope.selectedSport.nomenclatureOfSports[j].id, text: $rootScope.selectedSport.nomenclatureOfSports[j].value});
                break;
            default:
                break;
        }
    }

    $scope.ok = function () {
        // initialize data transfer object
        $scope.sportDto = {};
        $scope.sportDto.nomenclatureOfSports = [];

        // prepare data for storing            
        $scope.sportDto.id = $rootScope.selectedSport.id;
        $scope.sportDto.name = $scope.data.name;
        $scope.sportDto.nomenclatureOfSports.push({category: 'NATIONAL_SPORTS_FEDERATION', data: $scope.data.nationalSportsFederations});
        $scope.sportDto.nomenclatureOfSports.push({category: 'INTERNATIONAL_FEDERATION', data: $scope.data.internationalFederations});
        $scope.sportDto.nomenclatureOfSports.push({category: 'IOC_SPORTACCORD', data: $scope.data.iocSportAccords});
        $scope.sportDto.removedNomenclatureItems = $scope.findRemovedItems($scope.sportDto.nomenclatureOfSports);

        SportDataFactory.editSelectedSport($scope.sportDto, function (response) {

            if (response.result === 200) {
                console.log('Sport data is successfully edited.');

                toaster.pop({
                    type: 'info',
                    title: 'Uspješna izmjena stavke',
                    body: "Podaci za sport sa ID-em " + $scope.sportDto.id + " su uspješno izmijenjeni.",
                    showCloseButton: true,
                    timeout: 5000
                });

                SportDataFactory.getAllSports({}, function (response) {
                    //success
                    $scope.sports = response.sports;

                    if (_.isArray($scope.sports) && $scope.sports.length > 0) {

                        for (var i = 0; i < $scope.sports.length; i++) {
                            $scope.nomenclatureOfSports = $scope.sports[i].nomenclatureOfSports;

                            $scope.sports[i].nationalSportsFederation = '';
                            $scope.sports[i].internationalFederation = '';
                            $scope.sports[i].iocSportAccord = '';

                            for (var j = 0; j < $scope.nomenclatureOfSports.length; j++) {

                                switch ($scope.nomenclatureOfSports[j].category) {
                                    case 'NATIONAL_SPORTS_FEDERATION':
                                        $scope.sports[i].nationalSportsFederation += (_.isEmpty($scope.sports[i].nationalSportsFederation) ? '' : '/') + $scope.nomenclatureOfSports[j].value;
                                        break;
                                    case 'INTERNATIONAL_FEDERATION':
                                        $scope.sports[i].internationalFederation += (_.isEmpty($scope.sports[i].internationalFederation) ? '' : '/') + $scope.nomenclatureOfSports[j].value;
                                        break;
                                    case 'IOC_SPORTACCORD':
                                        $scope.sports[i].iocSportAccord += (_.isEmpty($scope.sports[i].iocSportAccord) ? '' : '/') + $scope.nomenclatureOfSports[j].value;
                                        break;
                                    default:
                                        break;
                                }
                            }
                        }
                    }

                    $rootScope.$broadcast('sports', $scope.sports);
                },
                        function (error) {
                            //fail
                            $scope.error = error;
                        });
            }
        },
                function (error) {
                    //fail
                    $scope.error = error;

                    toaster.pop({
                        type: 'error',
                        title: 'Greška',
                        body: "Greška prilikom izmjene podataka za sport s ID-em " + $scope.sportDto.id,
                        showCloseButton: true,
                        timeout: 5000
                    });
                });
        $uibModalInstance.close();
    };

    $scope.findRemovedItems = function (nomenclatureOfSportsItems) {
        $scope.addedNomenclatureItems = [];
        $scope.removedNomenclatureItems = [];

        for (var i = 0; i < $rootScope.selectedSport.nomenclatureOfSports.length; i++) {
            for (var j = 0; j < nomenclatureOfSportsItems.length; j++) {
                for (var k = 0; k < nomenclatureOfSportsItems[j].data.length; k++) {

                    var addedNomenclatureItemObj = _.find($scope.addedNomenclatureItems, function (obj) {
                        return obj.id === nomenclatureOfSportsItems[j].data[k].id;
                    });

                    if (_.isUndefined(addedNomenclatureItemObj)) {
                        $scope.addedNomenclatureItems.push(nomenclatureOfSportsItems[j].data[k]);
                    }
                }
            }
        }

        for (var n = 0; n < $scope.selectedSport.nomenclatureOfSports.length; n++) {

            var addedNomenclatureItemObj = _.find($scope.addedNomenclatureItems, function (obj) {
                return obj.id === $scope.selectedSport.nomenclatureOfSports[n].id;
            });

            if (_.isUndefined(addedNomenclatureItemObj)) {
                $scope.removedNomenclatureItems.push($scope.selectedSport.nomenclatureOfSports[n]);
            }
        }

        return $scope.removedNomenclatureItems;
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});


sportModule.controller('CreateSportModalCtrl', function (
        $scope,
        $rootScope,
        $uibModalInstance,
        _,
        SportDataFactory,
        toaster,
        AppConstants) {

    $scope.crudAction = AppConstants.CrudActions['create'];
    $scope.data = {};

    $scope.ok = function () {
        // initialize data transfer object
        $scope.sportDto = {};
        $scope.sportDto.nomenclatureOfSports = [];

        // prepare data for storing
        $scope.sportDto.name = $scope.data.name;
        $scope.sportDto.nomenclatureOfSports.push({category: 'NATIONAL_SPORTS_FEDERATION', data: $scope.data.nationalSportsFederations});
        $scope.sportDto.nomenclatureOfSports.push({category: 'INTERNATIONAL_FEDERATION', data: $scope.data.internationalFederations});
        $scope.sportDto.nomenclatureOfSports.push({category: 'IOC_SPORTACCORD', data: $scope.data.iocSportAccords});

        SportDataFactory.createSportData($scope.sportDto, function (response) {

            if (response.result === 200) {
                console.log('Sport data is successfully created.');

                toaster.pop({
                    type: 'info',
                    title: 'Uspješna kreiranje stavke',
                    body: "Podaci za sport " + $scope.data.name + " su uspješno kreirani.",
                    showCloseButton: true,
                    timeout: 5000
                });

                SportDataFactory.getAllSports({}, function (response) {
                    //success
                    $scope.sports = response.sports;

                    if (_.isArray($scope.sports) && $scope.sports.length > 0) {

                        for (var i = 0; i < $scope.sports.length; i++) {
                            $scope.nomenclatureOfSports = $scope.sports[i].nomenclatureOfSports;

                            $scope.sports[i].nationalSportsFederation = '';
                            $scope.sports[i].internationalFederation = '';
                            $scope.sports[i].iocSportAccord = '';

                            for (var j = 0; j < $scope.nomenclatureOfSports.length; j++) {

                                switch ($scope.nomenclatureOfSports[j].category) {
                                    case 'NATIONAL_SPORTS_FEDERATION':
                                        $scope.sports[i].nationalSportsFederation += (_.isEmpty($scope.sports[i].nationalSportsFederation) ? '' : '/') + $scope.nomenclatureOfSports[j].value;
                                        break;
                                    case 'INTERNATIONAL_FEDERATION':
                                        $scope.sports[i].internationalFederation += (_.isEmpty($scope.sports[i].internationalFederation) ? '' : '/') + $scope.nomenclatureOfSports[j].value;
                                        break;
                                    case 'IOC_SPORTACCORD':
                                        $scope.sports[i].iocSportAccord += (_.isEmpty($scope.sports[i].iocSportAccord) ? '' : '/') + $scope.nomenclatureOfSports[j].value;
                                        break;
                                    default:
                                        break;
                                }
                            }
                        }
                    }

                    $rootScope.$broadcast('sports', $scope.sports);
                },
                        function (error) {
                            //fail
                            $scope.error = error;
                        });
            }
        },
                function (error) {
                    //fail
                    $scope.error = error;

                    toaster.pop({
                        type: 'error',
                        title: 'Greška',
                        body: "Greška prilikom kreiranja podataka za sport " + $scope.sportDto.name,
                        showCloseButton: true,
                        timeout: 5000
                    });
                });

        // close modal view
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
