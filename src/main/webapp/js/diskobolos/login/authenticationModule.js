/*
 * Basic authentication module
 * 
 * @author Tomislav Čavka
 */
var authenticationModule = angular.module('authenticationModule', []);

authenticationModule.controller('authenticationController', function (
        $scope,
        $rootScope,
        _,
        UserAuthenticationFactory,
        jwtHelper,
        $state,
        sessionStorageService,
        AUTH_EVENTS,
        toaster,        
        $timeout,
        ROLE_PERMISSION_LEVEL) {

    $scope.loginData = {};    

    $scope.$on(AUTH_EVENTS.notAuthorized, function (event) {
        toaster.pop({
            type: 'warning',
            title: 'Niste autorizirani!',
            body: "Niste ovlašteni za pristupanje odabranom resursu.",
            showCloseButton: true,
            timeout: 5000
        });
    });

    $scope.$on(AUTH_EVENTS.notAuthenticated, function (event) {
        $state.go('login');
        toaster.pop({
            type: 'warning',
            title: 'Dogodila se greška prilikom prijave!',
            body: "Pokušajte se ponovno logirati.",
            showCloseButton: true,
            timeout: 5000
        });
        $scope.doLogout();
    });
    
    $scope.doLogin = function (loginData) {
        UserAuthenticationFactory.authenticateUser(loginData, function (response) {
            if (response.token === null || _.isUndefined(response.token)) {
                return;
            }
            sessionStorageService.setJwtToken(response.token);
            $scope.jwtObj = jwtHelper.decodeToken(response.token);
            $scope.setAuthenticatedData($scope.jwtObj);
            $scope.showLoggedUserInfo();
            $timeout(function () {            
                $state.go("content.sports");
            }, 0);
        },
        function (error) {
            //fail
            $scope.error = error;
        });
    };
    
    $scope.setAuthenticatedData = function(jwtObj) {
            // fill in authenticatedUser object
            $rootScope.authenticatedUser = {
                userId: undefined,
                roles: [],
                username: '',
                role: ''
            };
            $rootScope.authenticatedUser.userId = jwtObj.uid;
            for (var i = 0; i < jwtObj.aut.length; i++) {
                $rootScope.authenticatedUser.roles.push(jwtObj.aut[i]);
            }
            $rootScope.authenticatedUser.username = jwtObj.sub;
            // find role with the highest permission level
            $rootScope.authenticatedUser.role = _.find($rootScope.authenticatedUser.roles, function (obj) {
                return obj.permissionLevel === ROLE_PERMISSION_LEVEL.veryHigh;
            });            
    };

    $scope.doLogout = function () {
        sessionStorageService.removeJwtToken();
        // remove authenticated user data
        $rootScope.authenticatedUser = undefined;
    };

    $scope.showLoggedUserInfo = function () {
        $scope.sessionObj = sessionStorageService.getJwtToken();
        console.log(JSON.stringify(jwtHelper.decodeToken($scope.sessionObj.$$state.value), undefined, 2));
    };    
});



