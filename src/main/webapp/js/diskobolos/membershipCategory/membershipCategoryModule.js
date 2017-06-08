/**
 * AngularJS controller responsible for fetching, creation, edit and deletion of the membership category data.
 * 
 * @author Tomislav Čavka
 */
var membershipCategoryModule = angular.module('membershipCategoryModule', []);

membershipCategoryModule.controller('membershipCategoryController', function (
        $scope,
        $rootScope,
        _,
        MembershipCategoryDataFactory,
        $uibModal,
        DTOptionsBuilder,
        DTColumnDefBuilder,
        SweetAlert,
        toaster,
        dataTableUtils) {

    $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withDOM('<"html5buttons"B>lTfgitp')
            .withLanguage(dataTableUtils.getDataTableTranslations())
            .withOption('order', [0, 'asc'])
            .withPaginationType('full_numbers')
            .withButtons(dataTableUtils.getDataTableButtons([1], false))
            .withOption('select', true)
            .withOption('responsive', true);
    
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