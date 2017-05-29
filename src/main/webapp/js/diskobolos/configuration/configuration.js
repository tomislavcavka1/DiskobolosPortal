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

configuration.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
});
 
configuration.constant('USER_ROLES', {
  admin: 'admin_role',
  public: 'public_role'
});


