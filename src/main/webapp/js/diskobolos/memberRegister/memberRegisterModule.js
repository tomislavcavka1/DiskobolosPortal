/**
 * AngularJS controller responsible for fetching, creation, edit and deletion of the member register data.
 * 
 * @author Tomislav Čavka
 */
var memberRegisterModule = angular.module('memberRegisterModule', []);

memberRegisterModule.controller('memberRegisterController', function (
        $scope,
        $rootScope,
        _,
        MemberRegisterDataFactory,
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
            
      $scope.$on('selectedMemberRegister', function (ev, selectedMemberRegister) {
           $rootScope.selectedMemberRegister = selectedMemberRegister;
      });
            
      $scope.memberRegisters = {};            
                    
      $scope.getMemberRegisters = function () {
                  
      MemberRegisterDataFactory.getAllMemberRegisters({}, function (response) {
                //success
                $scope.memberRegisters = response.memberRegisters;           
            },
            function (error) {
                //fail
                $scope.error = error;
            });
        };
                
        $scope.editData = function (id) {
            
            $rootScope.selectedMemberRegister = _.find($scope.sports, function (obj) {
                return obj.id === id;
            });
            
            //broadcast selected sport
            $rootScope.$broadcast('selectedMemberRegister', $rootScope.selectedMemberRegister);

            var modalInstance = $uibModal.open({
                templateUrl: 'views/modal_example1.html',
                controller: 'MemberRegisterModalCtrl',
                scope: $scope
            });
            
            modalInstance.result.then(function (response) {
                console.log('Modal name', 'modal_example1.html');                
            });
        };
                                
        $scope.getMemberRegisters();
});

// test comment

memberRegisterModule.controller('MemberRegisterModalCtrl', function (
        $scope,
        $rootScope,
        $uibModalInstance,        
        _) {
              
        $scope.data = {};
        $scope.data.email = $rootScope.selectedMemberRegister.name;
		
        $scope.ok = function () {            
            console.log('Email: ' + $scope.data.email);
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
});

