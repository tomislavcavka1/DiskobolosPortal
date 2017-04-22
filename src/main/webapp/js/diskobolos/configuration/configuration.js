/* 
 * Module that stores basic app constants.
 * 
 * @author Tomislav Čavka
 */
var configuration = angular.module('configuration', []);
     
configuration.constant('ConfigConstants', {
     ServerName: {
        hostUrl: 'http://localhost:8080/'
    }
});


