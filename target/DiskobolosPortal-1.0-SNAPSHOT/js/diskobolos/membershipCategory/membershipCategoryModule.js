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
        MembershpCategoryDataFactory,
        $uibModal,
        DTOptionsBuilder) {
            
      $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            {extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'ExampleFile'},
            {extend: 'pdf', title: 'ExampleFile'},

            {extend: 'print',
                customize: function (win){
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ]);
            
      $scope.$on('selectedMembershipCategory', function (ev, selectedMembershipCategory) {
           $rootScope.selectedMembershipCategory = selectedMembershipCategory;
      });
            
      $scope.membershipCategories = {};            
                    
      $scope.getMembershipCategories = function () {
            
      MembershpCategoryDataFactory.getAllMembershipCategories({}, function (response) {
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
                templateUrl: 'views/modal_example1.html',
                controller: 'MembershipModalCtrl',
                scope: $scope
            });
            
            modalInstance.result.then(function (response) {
                console.log('Modal name', 'modal_example1.html');                
            });
        };
                                
        $scope.getMembershipCategories();
});


membershipCategoryModule.controller('MembershipModalCtrl', function (
        $scope,
        $rootScope,
        $uibModalInstance,        
        _) {
              
        $scope.data = {};
        $scope.data.email = $rootScope.selectedMembershipCategory.name;
		
        $scope.ok = function () {            
            console.log('Email: ' + $scope.data.email);
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
});

