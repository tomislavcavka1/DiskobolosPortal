/**
 * This modal provides the main services to the fluid app.
 * 
 * @author Tomislav Čavka
 */
var mainAppServices = angular.module('mainAppServices', ['ngResource', 'configuration']);

// Services responsible for creation of sports, fetching sports etc.
mainAppServices.factory('SportDataFactory', ['$resource', 'ConfigConstants', function ($resource, ConfigConstants) {
        return $resource('', {}, {
            'getAllSports': {method: 'GET', url: ConfigConstants.ServerName['hostUrl'] + '/sports/all', isArray: false}
        });
    }]);


// Services responsible for creation of sports, fetching sports etc.
mainAppServices.factory('MembershpCategoryDataFactory', ['$resource', 'ConfigConstants', function ($resource, ConfigConstants) {
        return $resource('', {}, {
            'getAllMembershipCategories': {method: 'GET', url: ConfigConstants.ServerName['hostUrl'] + '/categories/all', isArray: false}
        });
    }]);
