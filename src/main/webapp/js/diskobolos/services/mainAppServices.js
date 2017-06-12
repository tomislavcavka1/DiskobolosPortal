/**
 * This modal provides the main services to the fluid app.
 * 
 * @author Tomislav Čavka
 */
var mainAppServices = angular.module('mainAppServices', ['ngResource', 'configuration']);

// Services responsible for creation of sports, fetching sports etc.
mainAppServices.factory('SportDataFactory', ['$resource', 'AppConstants', function ($resource, AppConstants) {
        return $resource('', {}, {
            'getAllSports': {method: 'GET', url: AppConstants.ServerName['hostUrl'] + '/sports/all', isArray: false},
            'editSelectedSport': {method: 'POST', url: AppConstants.ServerName['hostUrl'] + '/sports/edit'},
            'createSportData': {method: 'POST', url: AppConstants.ServerName['hostUrl'] + '/sports/create'},
            'deleteSportData': {method: 'POST', url: AppConstants.ServerName['hostUrl'] + '/sports/delete'}
        });
    }]);


// Services responsible for creation of membership category, fetching membership category etc.
mainAppServices.factory('MembershipCategoryDataFactory', ['$resource', 'AppConstants', function ($resource, AppConstants) {
        return $resource('', {}, {
            'getAllMembershipCategories': {method: 'GET', url: AppConstants.ServerName['hostUrl'] + '/categories/all', isArray: false},
            'editSelectedMembershipCategory': {method: 'POST', url: AppConstants.ServerName['hostUrl'] + '/categories/edit'},
            'createMembershipCategoryData': {method: 'POST', url: AppConstants.ServerName['hostUrl'] + '/categories/create'},
            'deleteMembershipCategoryData': {method: 'POST', url: AppConstants.ServerName['hostUrl'] + '/categories/delete'}
        });
    }]);

// Services responsible for creation of member register, fetching member register etc.
mainAppServices.factory('MemberRegisterDataFactory', ['$resource', 'AppConstants', function ($resource, AppConstants) {
        return $resource('', {}, {
            'getAllMemberRegisters': {method: 'GET', url: AppConstants.ServerName['hostUrl'] + '/memberRegister/all', isArray: false},
            'editSelectedMemberRegister': {method: 'POST', url: AppConstants.ServerName['hostUrl'] + '/memberRegister/edit'},
            'createMemberRegisterData': {method: 'POST', url: AppConstants.ServerName['hostUrl'] + '/memberRegister/create'},
            'deleteMemberRegisterData': {method: 'POST', url: AppConstants.ServerName['hostUrl'] + '/memberRegister/delete'},
            'getMemberRegisterById': {method: 'GET', url: AppConstants.ServerName['hostUrl'] + '/memberRegister/getMemberRegisterById/:memberRegisterId', params:{memberRegisterId: '@memberRegisterId'}}
        });
    }]);

// Services responsible for creation of location, fetching location etc.
mainAppServices.factory('LocationDataFactory', ['$resource', 'AppConstants', function ($resource, AppConstants) {
        return $resource('', {}, {
            'getAllLocations': {method: 'GET', url: AppConstants.ServerName['hostUrl'] + '/locations/all', isArray: false}            
        });
    }]);

// Services responsible for creation of evaluation, fetching evaluation etc.
mainAppServices.factory('EvaluationDataFactory', ['$resource', 'AppConstants', function ($resource, AppConstants) {
        return $resource('', {}, {
            'getAllEvaluationQuestions': {method: 'GET', url: AppConstants.ServerName['hostUrl'] + '/evaluation/all', isArray: false},
            'storeEvaluationAnswers': {method: 'POST', url: AppConstants.ServerName['hostUrl'] + '/evaluation/create'},
            'fetchMemberRegistersWithAssociatedEvaluations': {method: 'GET', url: AppConstants.ServerName['hostUrl'] + '/evaluation/fetchMemberRegistersWithAssociatedEvaluations/:questionnaireType', params:{questionnaireType: '@questionnaireType'}, isArray: false},
            'findAllByMemberRegisterAndQuestionnaireType': {method: 'GET', url: AppConstants.ServerName['hostUrl'] + '/evaluation/findAllByMemberRegisterAndQuestionnaireType/:memberRegisterId/:questionnaireType', params:{memberRegisterId: '@memberRegisterId', questionnaireType: '@questionnaireType'}},
            'editEvaluationAnswers': {method: 'POST', url: AppConstants.ServerName['hostUrl'] + '/evaluation/edit'},
            'findAllByQuestionnaireType': {method: 'GET', url: AppConstants.ServerName['hostUrl'] + '/evaluation/findAllByQuestionnaireType/:questionnaireType', params:{questionnaireType: '@questionnaireType'}}
        });
    }]);

// services responsible for authentication functionality
mainAppServices.factory('UserAuthenticationFactory', ['$resource', 'AppConstants', function ($resource, AppConstants) {
        return $resource('', {}, {
            'authenticateUser': {method: 'POST', url: AppConstants.ServerName['hostUrl'] + '/authentication/login', isArray: false}
        });
    }]);

// Services responsible for session storage of data.
mainAppServices.service('sessionStorageService', ['$window', '$q', '$http', function ($window, $q, $http) {
        this.setJwtToken = function (token) {
            $window.localStorage.setItem('jwtToken', token);
            // Set the token as header for your requests!
            $http.defaults.headers.common['X-Auth-Token'] = {"Authorization": token};
        },
        this.getJwtToken = function () {
            if ($window.localStorage.getItem('jwtToken')) {                    
                return $q.when($window.localStorage.getItem('jwtToken'));
            } else {
                var deferred = $q.defer();
                deferred.reject('No Login User');
                return deferred.promise;
            }
        };
        this.removeJwtToken = function () {
            $http.defaults.headers.common['X-Auth-Token'] = undefined;
            $window.localStorage.removeItem('jwtToken');
        };        
}]);

// intercepts HTTP reponses errors during authentication
mainAppServices.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized
      }[response.status], response);
      return $q.reject(response);
    }
  };
});
 
mainAppServices.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
  
  $httpProvider.interceptors.push(['$q', '$location', '$window', function($q, $location, $window) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($window.localStorage !== undefined) {
                        config.headers.Authorization = $window.localStorage.jwtToken;
                    }
                    return config;
                },
                'responseError': function(response) {
                    if(response.status === 401) {
                        $location.path('/login');
                    }
                    return $q.reject(response);
                }
            };
        }]);
});
