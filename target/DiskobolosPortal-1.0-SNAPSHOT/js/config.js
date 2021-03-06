/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, IdleProvider, KeepaliveProvider) {

    // Configure Idle settings
    IdleProvider.idle(5); // in seconds
    IdleProvider.timeout(120); // in seconds

    $urlRouterProvider.otherwise("sports");

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider

        .state('dashboards', {
            abstract: true,
            url: "/dashboards",
            templateUrl: "views/common/content.html",
        })
        .state('dashboards.dashboard_1', {
            url: "/dashboard_1",
            templateUrl: "views/dashboard_1.html",
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        }
                    ]);
                }
            }
        })
        .state('dashboards.dashboard_2', {
            url: "/dashboard_2",
            templateUrl: "views/dashboard_2.html",
            data: {
                pageTitle: 'Dashboard 2'
            },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/jvectormap/jquery-jvectormap-2.0.2.min.js', 'js/plugins/jvectormap/jquery-jvectormap-2.0.2.css']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/jvectormap/jquery-jvectormap-world-mill-en.js']
                        },
                        {
                            name: 'ui.checkbox',
                            files: ['js/bootstrap/angular-bootstrap-checkbox.js']
                        }
                    ]);
                }
            }
        })
        .state('dashboards.dashboard_3', {
            url: "/dashboard_3",
            templateUrl: "views/dashboard_3.html",
            data: {
                pageTitle: 'Dashboard 3'
            },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            name: 'ui.checkbox',
                            files: ['js/bootstrap/angular-bootstrap-checkbox.js']
                        }
                    ]);
                }
            }
        })
        .state('dashboards_top', {
            abstract: true,
            url: "/dashboards_top",
            templateUrl: "views/common/content_top_navigation.html",
        })
        .state('dashboards_top.dashboard_4', {
            url: "/dashboard_4",
            templateUrl: "views/dashboard_4.html",
            data: {
                pageTitle: 'Dashboard 4'
            },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        }
                    ]);
                }
            }
        })
        .state('dashboards.dashboard_4_1', {
            url: "/dashboard_4_1",
            templateUrl: "views/dashboard_4_1.html",
            data: {
                pageTitle: 'Dashboard 4'
            },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        }
                    ]);
                }
            }
        })
        .state('dashboards.dashboard_5', {
            url: "/dashboard_5",
            templateUrl: "views/dashboard_5.html",
            data: {
                pageTitle: 'Dashboard 5'
            },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            files: ['js/plugins/sparkline/jquery.sparkline.min.js']
                        }
                    ]);
                }
            }
        })
    
    /*
    Glavni izbornik
    */
    .state('content', {
        abstract: true,
        url: "",
        templateUrl: "views/common/content.html"
    })

    .state('content.sports', {
        url: "/sports",
        templateUrl: "views/sports.html",
        data: {
            pageTitle: 'Sportovi'
        },
        resolve: {
            loadPlugin: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    {
                        serie: true,
                        files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
                        },
                    {
                        serie: true,
                        name: 'datatables',
                        files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                    {
                        serie: true,
                        name: 'datatables.buttons',
                        files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                    },
                    {
                        name: 'ngTagsInput',
                        files: ['js/plugins/ngTags//ng-tags-input.min.js', 'css/plugins/ngTags/ng-tags-input-custom.min.css']
                    },
                    {
                        insertBefore: '#loadBefore',
                        name: 'toaster',
                        files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
                    },
                    {
                         files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                    },
                    {
                        name: 'oitozero.ngSweetAlert',
                        files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                    }
                ]);
            }
        }
    })
    
    .state('content.membershipCategory', {
        url: "/membershipCategory",
        templateUrl: "views/membershipCategory.html",
        data: {
            pageTitle: 'Kategorije članstva'
        },
        resolve: {
            loadPlugin: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    {
                        serie: true,
                        files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
                        },
                    {
                        serie: true,
                        name: 'datatables',
                        files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                    {
                        serie: true,
                        name: 'datatables.buttons',
                        files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        }
                    ]);
            }
        }
    })
    
    .state('content.memberRegister', {
        url: "/memberRegister",
        templateUrl: "views/memberRegister.html",
        data: {
            pageTitle: 'Matična knjiga članica'
        },
        resolve: {
            loadPlugin: function ($ocLazyLoad) {
                return $ocLazyLoad.load([                                   
                    {
                        serie: true,
                        files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
                        },
                    {
                        serie: true,
                        name: 'datatables',
                        files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                    {
                        serie: true,
                        name: 'datatables.buttons',
                        files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        }
                    ]);
            }
        }
    })
    
    /*
    Vrednovanje
    */
    
    .state('evaluation', {
        abstract: true,
        url: "",
        templateUrl: "views/common/content.html"
    })
    
    
    .state('evaluation.termsOfCompetition', {
            url: "/termsOfCompetition",
            templateUrl: "views/termsOfCompetition.html",
            data: { pageTitle: 'Uvjeti natječaja' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
                        }
                    ]);
                }
            }
        })
    
    .state('evaluation.rankingAndCategorizationOfSpors', {
            url: "/rankingAndCategorizationOfSpors",
            templateUrl: "views/rankingAndCategorizationOfSpors.html",
            data: { pageTitle: 'Rangiranje i kategorizacija sportova' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
                        }
                    ]);
                }
            }
        })
    
    .state('evaluation.categorizationOfSportsPerSportClub', {
            url: "/categorizationOfSportsPerSportClub",
            templateUrl: "views/categorizationOfSportsPerSportClub.html",
            data: { pageTitle: 'Kategorizacija sporta za sporstke klubove' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
                        }
                    ]);
                }
            }
        })
    
   
    
    /*
    Korisni linkovi
    */
    
    .state('usefulLinks', {
        abstract: true,
        url: "",
        templateUrl: "views/common/content.html"
    })
    
    
    .state('usefulLinks.registerOfNonprofitOrganizations', {
            url: "/registerOfNonprofitOrganizations",
            templateUrl: "views/registerOfNonprofitOrganizations.html",
            data: { pageTitle: 'registra_neprotifabilnih_organizacija' }
        })
    
     /*
    Login
    */
    
     .state('login', {
            url: "/login",
            templateUrl: "views/login.html",
            data: { pageTitle: 'Login', specialClass: 'login-bg' }
        })


}
angular
    .module('inspinia')
    .config(config)
    .run(function ($rootScope, $state) {
        $rootScope.$state = $state;
    });