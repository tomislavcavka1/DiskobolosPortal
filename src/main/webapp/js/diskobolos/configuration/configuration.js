/* 
 * Module that stores basic app constants.
 * 
 * @author Tomislav Čavka
 */
var configuration = angular.module('configuration', []);
     
configuration.constant('AppConstants', {
     ServerName: {
        hostUrl: 'http://localhost:8080/'
    },
    CrudActions: {
        create: "CREATE",
        edit: "EDIT",
        delete: "DELETE"
    }
});


