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
    },
    ViewMode: {
        readModeOnly: "READ_MODE_ONLY"
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

configuration.constant('ROLE_PERMISSION_LEVEL', {
  veryHigh: 'VERY_HIGH',
  high: 'HIGH',
  medium: 'MEDIUM',
  small: 'SMALL',
  verySmall: 'VERY_SMALL'
});


configuration.constant('QUESTIONNAIRE_TYPE', {
    termsOfCondition: 'TERMS_OF_CONDITION',
    rankingAndCategorizationOfSports: 'RANKING_AND_CATEGORIZATION_OF_SPORTS'
});
