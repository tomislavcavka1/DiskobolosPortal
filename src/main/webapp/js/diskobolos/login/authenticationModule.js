/*
 * Basic authentication module
 * 
 * @author Tomislav Čavka
 */
var authenticationModule = angular.module('authenticationModule', []);

authenticationModule.controller('authenticationController', function (
        $scope,        
        _,
        UserAuthenticationFactory,
        jwtHelper,
        $state,
        sessionStorageService,         
        AUTH_EVENTS,
        toaster) {
    
    $scope.loginData = {};
    
    $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
        toaster.pop({
            type: 'warning',
            title: 'Niste autorizirani!',
            body: "Niste ovlašteni za pristupanje odabranom resursu.",
            showCloseButton: true,
            timeout: 5000
        });   
    });
    
    $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
      $state.go('login');
      toaster.pop({
            type: 'warning',
            title: 'Dogodila se greška prilikom prijave!',
            body: "Morate se ponovno logirati.",
            showCloseButton: true,
            timeout: 5000
        });
        $scope.doLogout();
    });
   
    $scope.doLogin = function(loginData) {      
        UserAuthenticationFactory.authenticateUser(loginData, function (response) {        
            sessionStorageService.setJwtToken(response.token);            
            $scope.showLoggedUserInfo();
            $state.go("content.sports");
        },
        function (error) {
            //fail
            $scope.error = error;            
        });
    };
    
    $scope.doLogout = function() {
        sessionStorageService.removeJwtToken();
    };    
    
    $scope.showLoggedUserInfo = function() {
        $scope.sessionObj = sessionStorageService.getJwtToken();
        console.log(JSON.stringify(jwtHelper.decodeToken($scope.sessionObj.$$state.value), undefined, 2));
    };
});



