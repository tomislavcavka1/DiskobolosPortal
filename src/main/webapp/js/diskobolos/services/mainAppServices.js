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
mainAppServices.factory('MembershpCategoryDataFactory', ['$resource', 'AppConstants', function ($resource, AppConstants) {
        return $resource('', {}, {
            'getAllMembershipCategories': {method: 'GET', url: AppConstants.ServerName['hostUrl'] + '/categories/all', isArray: false}
        });
    }]);

// Services responsible for creation of member register, fetching member register etc.
mainAppServices.factory('MemberRegisterDataFactory', ['$resource', 'AppConstants', function ($resource, AppConstants) {
        return $resource('', {}, {
            'getAllMemberRegisters': {method: 'GET', url: AppConstants.ServerName['hostUrl'] + '/memberRegister/all', isArray: false}
        });
    }]);
