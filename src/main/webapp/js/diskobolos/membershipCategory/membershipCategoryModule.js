/**
 * AngularJS controller responsible for fetching, creation, edit and deletion of the membership category data.
 * 
 * @author Tomislav Čavka
 */
var membershipCategoryModule = angular.module('membershipCategoryModule', []);

membershipCategoryModule.controller('membershpCategoryController', function (
        $scope,
        $rootScope,
        _,
        MembershipCategoryDataFactory,
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


    $scope.dtOptions = DTOptionsBuilder.newOptions()
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
                {extend: 'colvis', text: '<i class="fa fa-list-ul" aria-hidden="true"></i> Prikaz polja u tablici',
                    columns: [1]},
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
                {extend: 'pdf', text: '<i class="fa fa-file-pdf-o"></i> PDF', orientation: 'landscape',
                    pageSize: 'LEGAL', exportOptions: {
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

    $scope.$on('membershipCategories', function (ev, membershipCategories) {
        $scope.membershipCategories = membershipCategories;
    });

    $scope.$on('selectedMembershipCategory', function (ev, selectedMembershipCategory) {
        $rootScope.selectedMembershipCategory = selectedMembershipCategory;
    });

    $scope.membershipCategories = {};

    $scope.getMembershipCategories = function () {

        MembershipCategoryDataFactory.getAllMembershipCategories({}, function (response) {
            //success
            $scope.membershipCategories = response.membershipCategories;
        },
                function (error) {
                    //fail
                    $scope.error = error;
                });
    };

    $scope.editData = function (id) {

        $rootScope.selectedMembershipCategory = _.find($scope.membershipCategories, function (obj) {
            return obj.id === id;
        });

        //broadcast selected membershipCategory
        $rootScope.$broadcast('selectedMembershipCategory', $rootScope.selectedMembershipCategory);

        var modalInstance = $uibModal.open({
            templateUrl: 'views/membershipCategoryModal.html',
            controller: 'EditMembershipModalCtrl',
            scope: $scope
        });

        modalInstance.result.then(function (response) {
            console.log('Modal name', 'membershipCategoryModal.html');
        });
    };

    $scope.createData = function () {

        var modalInstance = $uibModal.open({
            templateUrl: 'views/membershipCategoryModal.html',
            controller: 'CreateMembershipModalCtrl',
            scope: $scope
        });

        modalInstance.result.then(function (response) {
            console.log('Modal for creation of a new membership category item: ', 'membershipCategoryModal.html');
        });
    };

    $scope.deleteData = function (id) {

        $rootScope.selectedMembershipCategory = _.find($scope.membershipCategories, function (obj) {
            return obj.id === id;
        });

        //broadcast selected membershipCategory
        $rootScope.$broadcast('selectedMembershipCategory', $rootScope.selectedMembershipCategory);

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
                        MembershipCategoryDataFactory.deleteMembershipCategoryData($rootScope.selectedMembershipCategory, function (response) {

                            if (response.result === 200) {
                                console.log('Membership category data is successfully deleted.');

                                toaster.pop({
                                    type: 'info',
                                    title: 'Uspješna brisanje stavke',
                                    body: "Podaci za kategoriju članstva " + $rootScope.selectedMembershipCategory.description + " su uspješno izbrisani.",
                                    showCloseButton: true,
                                    timeout: 5000
                                });

                                MembershipCategoryDataFactory.getAllMembershipCategories({}, function (response) {
                                    //success
                                    $scope.membershipCategories = response.membershipCategories;
                                    $rootScope.$broadcast('membershipCategories', $scope.membershipCategories);
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
                                        body: "Greška prilikom brisanja podataka za kategoriju članstva " + $rootScope.selectedMembershipCategory.description,
                                        showCloseButton: true,
                                        timeout: 5000
                                    });
                                });
                    }
                });
    };

    $scope.getMembershipCategories();
});


membershipCategoryModule.controller('EditMembershipModalCtrl', function (
        $scope,
        $rootScope,
        $uibModalInstance,
        _,
        toaster,
        MembershipCategoryDataFactory,
        AppConstants) {

    $scope.crudAction = AppConstants.CrudActions['edit'];
    $scope.data = {};
    $scope.data.description = $rootScope.selectedMembershipCategory.description;

    $scope.ok = function () {

        $scope.membershipCategoryDto = {};
        $scope.membershipCategoryDto.id = $rootScope.selectedMembershipCategory.id;
        $scope.membershipCategoryDto.description = $scope.data.description;
        MembershipCategoryDataFactory.editSelectedMembershipCategory($scope.membershipCategoryDto, function (response) {

            if (response.result === 200) {
                console.log('Membership category is successfully edited.');

                toaster.pop({
                    type: 'info',
                    title: 'Uspješna izmjena stavke',
                    body: "Podaci za kategoriju članstva sa ID-em " + $rootScope.selectedMembershipCategory.id + " su uspješno izmijenjeni.",
                    showCloseButton: true,
                    timeout: 5000
                });

                MembershipCategoryDataFactory.getAllMembershipCategories({}, function (response) {
                    //success
                    $scope.membershipCategories = response.membershipCategories;
                    $rootScope.$broadcast('membershipCategories', $scope.membershipCategories);
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
                        body: "Greška prilikom izmjene podataka za kategoriju članstva s ID-em " + $rootScope.selectedMembershipCategory.id,
                        showCloseButton: true,
                        timeout: 5000
                    });
                });
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

membershipCategoryModule.controller('CreateMembershipModalCtrl', function (
        $scope,
        $rootScope,
        $uibModalInstance,
        _,
        toaster,
        MembershipCategoryDataFactory,
        AppConstants) {

    $scope.crudAction = AppConstants.CrudActions['create'];
    $scope.data = {};

    $scope.ok = function () {

        $scope.membershipCategoryDto = {};
        $scope.membershipCategoryDto.description = $scope.data.description;
        MembershipCategoryDataFactory.createMembershipCategoryData($scope.membershipCategoryDto, function (response) {

            if (response.result === 200) {
                console.log('Membership category is successfully created.');

                toaster.pop({
                    type: 'info',
                    title: 'Uspješno kreiranje stavke',
                    body: "Podaci za kategoriju članstva " + $scope.data.description + " su uspješno kreirani.",
                    showCloseButton: true,
                    timeout: 5000
                });

                MembershipCategoryDataFactory.getAllMembershipCategories({}, function (response) {
                    //success
                    $scope.membershipCategories = response.membershipCategories;
                    $rootScope.$broadcast('membershipCategories', $scope.membershipCategories);
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
                        title: 'Greška prilikom kreiranja',
                        body: "Greška prilikom kreiranja podataka za kategoriju članstva " + $scope.data.description,
                        showCloseButton: true,
                        timeout: 5000
                    });
                });
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});