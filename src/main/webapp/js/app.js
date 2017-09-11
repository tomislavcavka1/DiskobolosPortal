/**
 * INSPINIA - Responsive Admin Theme
 *
 */
(function () {
    angular.module('inspinia', [
        'ui.router',                    // Routing
        'oc.lazyLoad',                  // ocLazyLoad
        'ui.bootstrap',                 // Ui Bootstrap
        'pascalprecht.translate',       // Angular Translate
        'ngIdle',                       // Idle timer
        'ngSanitize',                   // ngSanitize
        'configuration',
        'mainAppServices',        
        'underscore',
        'sportModule',
        'membershipCategoryModule',
        'memberRegisterModule',
        'ngAutocomplete',              // google autocomplete
        'termsOfCompetitionModule',
        'authenticationModule',
        'angular-jwt',
        'templateModule',
        'shareDataModule',
        'profileModule',
        'toaster',
        'sportsBuildingsModule',
        'rankingAndCategorizationOfSportsModule',
        'categorizationOfSportsPerSportClubModule',
        'dataTableUtilsModule',
        'dashboardModule',
        'uiBreadcrumbsModule',
        'weatherModule',
        'eventUtilsModule',
        'geographicalOverviewOfMemberRegisterModule',
        'colorUtilsModule',
        'pdfViewerModule',
        'evaluationFormsModule',
        'inputFieldsUtilsModule',
        'financialResourcesModule'
    ]);
})();
// Other libraries are loaded dynamically in the config.js file using the library ocLazyLoad