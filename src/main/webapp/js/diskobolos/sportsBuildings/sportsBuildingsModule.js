/**
 * AngularJS controller responsible for fetching, creation, edit and deletion of the membership category data.
 * 
 * @author Tihomir Cavka
 */
var sportsBuildingsModule = angular.module('sportsBuildingsModule', []);

sportsBuildingsModule.controller('sportsBuildingsController', function (
        $scope,
        $uibModal,
        DTOptionsBuilder,
        DTColumnDefBuilder,
        $http,
        $rootScope) {    

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
        },
        select: {
            rows: {
                _: "%d retka izabrana",
                0: "0 redaka izabrano",
                1: "1 redak izabran"
            }
        },
        buttons: {
            copyTitle: 'Kopirali ste',
            copyKeys: '',
            copySuccess: {
                _: '%d linije kopirano',
                1: '1 linija kopirana'
            }
        }
    };


    $scope.dtOptions =
            DTOptionsBuilder.newOptions()
            .withDOM('<"html5buttons"B>lTfgitp')
            .withLanguage(language)
            .withOption('order', [0, 'asc'])
            .withPaginationType('full_numbers')
            .withButtons([
                {extend: 'selectAll', text: 'Označi sve', exportOptions: {
                        columns: ':visible:not(.not-export-col)', modifier: {
                            selected: true
                        }
                    }},
                {extend: 'selectNone', text: 'Odznači sve', exportOptions: {
                        columns: ':visible:not(.not-export-col)', modifier: {
                            selected: true
                        }
                    }},
                {extend: 'colvis', text: '<i class="fa fa-list-ul" aria-hidden="true"></i> Prikaz polja u tablici'},
                {extend: 'copy', text: '<i class="fa fa-files-o"></i> Kopiraj', exportOptions: {
                        columns: ':visible:not(.not-export-col)', modifier: {
                            selected: true
                        }
                    }},
                {extend: 'csv', text: '<i class="fa fa-file-text-o"></i> CSV', exportOptions: {
                        columns: ':visible:not(.not-export-col)', modifier: {
                            selected: true
                        }
                    }},
                {extend: 'excel', text: '<i class="fa fa-file-excel-o"></i> Excel', exportOptions: {
                        columns: ':visible:not(.not-export-col)', modifier: {
                            selected: true
                        }
                    }},
                {extend: 'pdf', text: '<i class="fa fa-file-pdf-o"></i> PDF', exportOptions: {
                        columns: ':visible:not(.not-export-col)', modifier: {
                            selected: true
                        }
                    }},
                {extend: 'print', text: '<i class="fa fa-print"></i> Ispis', exportOptions: {
                        columns: ':visible:not(.not-export-col)', modifier: {
                            selected: true
                        }
                    },
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
                    'select', true
                    )

            .withOption(
                    'responsive', true
                    );

    $scope.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(-1).withOption('responsivePriority', 1)

    ];

    $scope.$on('selectedSportsBuildings', function (ev, selectedSportsBuildings) {
        $rootScope.selectedSportsBuildings = selectedSportsBuildings;
    });

    $scope.sportBuildings = {};

    $scope.getSportsBuildings = function () {

        $http.get('js/diskobolos/sportsBuildings/sportsBuildings.json').then(function(data) {            
            $scope.sportBuildings = data;
        });
    };

    $scope.editData = function (id) {

        $rootScope.selectedSportsBuildings = _.find($scope.sportBuildings.data, function (obj) {
            return obj.id === id;
        });

        //broadcast selected sportsBuildings
        $rootScope.$broadcast('selectedSportsBuildings', $rootScope.selectedSportsBuildings);

        var modalInstance = $uibModal.open({
            templateUrl: 'views/sportsBuildingsModal.html',
            controller: 'EditSportsBuildingsCtrl',
            scope: $scope
        });

        modalInstance.result.then(function (response) {
            console.log('Modal name', 'sportsBuildingsModal.html');
        });
    };
    
    $scope.getSportsBuildings();

});

membershipCategoryModule.controller('EditSportsBuildingsCtrl', function (
        $scope,
        $rootScope,
        $uibModalInstance,
        _,
        AppConstants) {

    $scope.viewMode = AppConstants.ViewMode['readModeOnly'];
    $scope.data = {};
    $scope.data = $rootScope.selectedSportsBuildings;

    $scope.ok = function () {
        
        // TODO: probably we won't need it
       
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
