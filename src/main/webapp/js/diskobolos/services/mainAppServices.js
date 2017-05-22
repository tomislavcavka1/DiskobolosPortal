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
            'deleteMemberRegisterData': {method: 'POST', url: AppConstants.ServerName['hostUrl'] + '/memberRegister/delete'}
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
            'getAllEvaluationQuestions': {method: 'GET', url: AppConstants.ServerName['hostUrl'] + '/evaluation/all', isArray: false}
        });
    }]);
