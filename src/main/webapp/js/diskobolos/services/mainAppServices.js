/**
 * This modal provides the main services to the fluid app.
 * 
 * @author Tomislav Čavka
 */
var mainAppServices = angular.module('mainAppServices', ['ngResource', 'configuration']);

// Services responsible for creation of sports, fetching sports etc.
mainAppServices.factory('SportDataFactory', ['$resource', 'ConfigConstants', function ($resource, ConfigConstants) {
        return $resource('', {}, {
            'getAllSports': {method: 'GET', url: ConfigConstants.ServerName['hostUrl'] + '/sports/all', isArray: false},
            'editSelectedSport': {method: 'POST', url: ConfigConstants.ServerName['hostUrl'] + '/sports/edit'},
            'createSportData': {method: 'POST', url: ConfigConstants.ServerName['hostUrl'] + '/sports/create'},
            'deleteSportData': {method: 'POST', url: ConfigConstants.ServerName['hostUrl'] + '/sports/delete'}
        });
    }]);


// Services responsible for creation of membership category, fetching membership category etc.
mainAppServices.factory('MembershpCategoryDataFactory', ['$resource', 'ConfigConstants', function ($resource, ConfigConstants) {
        return $resource('', {}, {
            'getAllMembershipCategories': {method: 'GET', url: ConfigConstants.ServerName['hostUrl'] + '/categories/all', isArray: false}
        });
    }]);

// Services responsible for creation of member register, fetching member register etc.
mainAppServices.factory('MemberRegisterDataFactory', ['$resource', 'ConfigConstants', function ($resource, ConfigConstants) {
        return $resource('', {}, {
            'getAllMemberRegisters': {method: 'GET', url: ConfigConstants.ServerName['hostUrl'] + '/memberRegister/all', isArray: false}
        });
    }]);
