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

    $urlRouterProvider.otherwise("login");

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider

            /*
             Glavni izbornik
             */
            .state('content', {
                abstract: true,
                url: "",
                templateUrl: "views/common/content.html",
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                files: ['js/diskobolos/login/authenticationModule.js']
                            }
                        ]);
                    }
                }
            })

            .state('content.dashboard', {
                url: "/dashboard",
                templateUrl: "views/dashboard.html",
                data: {
                    pageTitle: 'Dashboard',
                    displayName: 'Radna ploča'
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
                            },
                            {
                                files: ['js/plugins/chartJs/Chart.min.js']
                            },
                            {
                                name: 'angles',
                                files: ['js/plugins/chartJs/angles.js']
                            }
                        ]);
                    }
                }
            })


            .state('content.sports', {
                url: "/sports",
                templateUrl: "views/sports.html",
                data: {
                    pageTitle: 'Sportovi',
                    displayName: 'Sportovi'
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
                                files: ['js/plugins/dataTables/angular-datatables.js', 'https://cdn.datatables.net/responsive/2.1.0/js/dataTables.responsive.js',
                                    'https://cdn.datatables.net/responsive/2.1.0/css/responsive.dataTables.css', 'https://cdn.datatables.net/select/1.2.2/js/dataTables.select.min.js',
                                    'https://cdn.datatables.net/select/1.2.2/css/select.dataTables.min.css']
                            },
                            {
                                serie: true,
                                name: 'datatables.buttons',
                                files: ['https://cdn.datatables.net/buttons/1.3.1/js/dataTables.buttons.min.js', 'https://cdn.datatables.net/buttons/1.2.2/js/buttons.colVis.min.js', 'js/plugins/dataTables/angular-datatables.buttons.min.js', 'https://cdn.datatables.net/select/1.2.2/js/dataTables.select.min.js', 'https://cdn.datatables.net/select/1.2.2/css/select.dataTables.min.css']
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
                            },
                            {
                                name: 'ngMessages',
                                files: ['js/angular/angular-messages.js']
                            },
                            {
                                serie: true,
                                name: 'dataTableUtilsModule',
                                files: ['js/diskobolos/util/dataTableUtils.js']
                            }
                        ]);
                    }
                }
            })

            .state('content.membershipCategory', {
                url: "/membershipCategory",
                templateUrl: "views/membershipCategory.html",
                data: {
                    pageTitle: 'Kategorija članstva',
                    displayName: 'Kategorija članstva'
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
                                files: ['js/plugins/dataTables/angular-datatables.js', 'https://cdn.datatables.net/responsive/2.1.0/js/dataTables.responsive.js',
                                    'https://cdn.datatables.net/responsive/2.1.0/css/responsive.dataTables.css', 'https://cdn.datatables.net/select/1.2.2/js/dataTables.select.min.js',
                                    'https://cdn.datatables.net/select/1.2.2/css/select.dataTables.min.css']
                            },
                            {
                                serie: true,
                                name: 'datatables.buttons',
                                files: ['https://cdn.datatables.net/buttons/1.3.1/js/dataTables.buttons.min.js', 'https://cdn.datatables.net/buttons/1.2.2/js/buttons.colVis.min.js', 'js/plugins/dataTables/angular-datatables.buttons.min.js', 'https://cdn.datatables.net/select/1.2.2/js/dataTables.select.min.js', 'https://cdn.datatables.net/select/1.2.2/css/select.dataTables.min.css']
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
                            },
                            {
                                serie: true,
                                name: 'dataTableUtilsModule',
                                files: ['js/diskobolos/util/dataTableUtils.js']
                            }
                        ]);
                    }
                }
            })

            .state('content.memberRegister', {
                url: "/memberRegister",
                templateUrl: "views/memberRegister.html",
                data: {
                    pageTitle: 'Matična knjiga članica',
                    displayName: 'Matična knjiga članica'
                },
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                serie: true,
                                files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
                            },
                            {
                                files: ['js/plugins/moment/moment.min.js']
                            },
                            {
                                files: ['js/plugins/moment/2.17.1/moment-with-locales.min.js']
                            },
                            {
                                serie: true,
                                name: 'datatables',
                                files: ['js/plugins/dataTables/angular-datatables.js', 'https://cdn.datatables.net/responsive/2.1.0/js/dataTables.responsive.js',
                                    'https://cdn.datatables.net/responsive/2.1.0/css/responsive.dataTables.css', 'https://cdn.datatables.net/select/1.2.2/js/dataTables.select.min.js',
                                    'https://cdn.datatables.net/select/1.2.2/css/select.dataTables.min.css']
                            },
                            {
                                serie: true,
                                name: 'datatables.buttons',
                                files: ['https://cdn.datatables.net/buttons/1.3.1/js/dataTables.buttons.min.js', 'https://cdn.datatables.net/buttons/1.2.2/js/buttons.colVis.min.js', 'js/plugins/dataTables/angular-datatables.buttons.min.js', 'https://cdn.datatables.net/select/1.2.2/js/dataTables.select.min.js', 'https://cdn.datatables.net/select/1.2.2/css/select.dataTables.min.css']
                            },
                            {
                                name: '720kb.datepicker',
                                files: ['css/plugins/angular_datepicker/angular-datepicker.css', 'js/plugins/angular_datepicker/angular-datepicker.js']
                            },
                            {
                                name: 'ui.select',
                                files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
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
                            },
                            {
                                name: 'mm.iban',
                                files: ['js/diskobolos/validations/ng-iban.js']
                            },
                            {
                                name: 'ngAutocomplete',
                                files: ['js/plugins/google-api/ngAutocomplete.js']
                            },
                            {
                                serie: true,
                                name: 'dataTableUtilsModule',
                                files: ['js/diskobolos/util/dataTableUtils.js']
                            },
                            {
                                files: ['js/plugins/jasny/jasny-bootstrap.min.js', 'css/plugins/jasny/jasny-bootstrap.min.css']
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
                data: {pageTitle: 'Uvjeti natječaja',
                    displayName: 'Uvjeti natječaja'},
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                            },
                            {
                                serie: true,
                                files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
                            },
                            {
                                serie: true,
                                name: 'datatables',
                                files: ['js/plugins/dataTables/angular-datatables.js', 'https://cdn.datatables.net/responsive/2.1.0/js/dataTables.responsive.js',
                                    'https://cdn.datatables.net/responsive/2.1.0/css/responsive.dataTables.css', 'https://cdn.datatables.net/select/1.2.2/js/dataTables.select.min.js',
                                    'https://cdn.datatables.net/select/1.2.2/css/select.dataTables.min.css']
                            },
                            {
                                serie: true,
                                name: 'datatables.buttons',
                                files: ['https://cdn.datatables.net/buttons/1.3.1/js/dataTables.buttons.min.js', 'https://cdn.datatables.net/buttons/1.2.2/js/buttons.colVis.min.js', 'js/plugins/dataTables/angular-datatables.buttons.min.js', 'https://cdn.datatables.net/select/1.2.2/js/dataTables.select.min.js', 'https://cdn.datatables.net/select/1.2.2/css/select.dataTables.min.css']
                            },
                            {
                                files: ['js/plugins/jasny/jasny-bootstrap.min.js', 'css/plugins/jasny/jasny-bootstrap.min.css']
                            },
                            {
                                name: 'ui.select',
                                files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
                            },
                            {
                                insertBefore: '#loadBefore',
                                name: 'toaster',
                                files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
                            }
                        ]);
                    }
                }
            })

            .state('evaluation.rankingAndCategorizationOfSpors', {
                url: "/rankingAndCategorizationOfSpors",
                templateUrl: "views/rankingAndCategorizationOfSpors.html",
                data: {pageTitle: 'Vrednovanje sportova',
                    displayName: 'Vrednovanje sportova'},
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                            },
                            {
                                serie: true,
                                files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
                            },
                            {
                                files: ['js/plugins/moment/moment.min.js']
                            },
                            {
                                serie: true,
                                name: 'datatables',
                                files: ['js/plugins/dataTables/angular-datatables.js', 'https://cdn.datatables.net/responsive/2.1.0/js/dataTables.responsive.js',
                                    'https://cdn.datatables.net/responsive/2.1.0/css/responsive.dataTables.css', 'https://cdn.datatables.net/select/1.2.2/js/dataTables.select.min.js',
                                    'https://cdn.datatables.net/select/1.2.2/css/select.dataTables.min.css']
                            },
                            {
                                serie: true,
                                name: 'datatables.buttons',
                                files: ['https://cdn.datatables.net/buttons/1.3.1/js/dataTables.buttons.min.js', 'https://cdn.datatables.net/buttons/1.2.2/js/buttons.colVis.min.js', 'js/plugins/dataTables/angular-datatables.buttons.min.js', 'https://cdn.datatables.net/select/1.2.2/js/dataTables.select.min.js', 'https://cdn.datatables.net/select/1.2.2/css/select.dataTables.min.css']
                            },
                            {
                                insertBefore: '#loadBefore',
                                name: 'toaster',
                                files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
                            }
                        ]);
                    }
                }
            })

            .state('evaluation.categorizationOfSportsPerSportClub', {
                url: "/categorizationOfSportsPerSportClub",
                templateUrl: "views/categorizationOfSportsPerSportClub.html",
                data: {pageTitle: 'Vrednovanje sportskih udruga', displayName: 'Vrednovanje sportskih udruga'
                },
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                            },
                            {
                                serie: true,
                                files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
                            },
                            {
                                files: ['js/plugins/moment/moment.min.js']
                            },
                            {
                                serie: true,
                                name: 'datatables',
                                files: ['js/plugins/dataTables/angular-datatables.js', 'https://cdn.datatables.net/responsive/2.1.0/js/dataTables.responsive.js',
                                    'https://cdn.datatables.net/responsive/2.1.0/css/responsive.dataTables.css', 'https://cdn.datatables.net/select/1.2.2/js/dataTables.select.min.js',
                                    'https://cdn.datatables.net/select/1.2.2/css/select.dataTables.min.css']
                            },
                            {
                                serie: true,
                                name: 'datatables.buttons',
                                files: ['https://cdn.datatables.net/buttons/1.3.1/js/dataTables.buttons.min.js', 'https://cdn.datatables.net/buttons/1.2.2/js/buttons.colVis.min.js', 'js/plugins/dataTables/angular-datatables.buttons.min.js', 'https://cdn.datatables.net/select/1.2.2/js/dataTables.select.min.js', 'https://cdn.datatables.net/select/1.2.2/css/select.dataTables.min.css']
                            }
                        ]);
                    }
                }
            })



            /*
             Registar neprofitnih organizacija
             */

            .state('content.registerOfNonprofitOrganizations', {
                url: "/registerOfNonprofitOrganizations",
                templateUrl: "views/registerOfNonprofitOrganizations.html",
                data: {pageTitle: 'Registar neprofitabilnih organizacija', displayName: 'Registar neprofitabilnih organizacija'}
            })


            /*
             Registar udruga Republike Hrvatske
             */

            .state('content.registerOfAssociationsCRO', {
                url: "/registerOfAssociationsCRO",
                templateUrl: "views/registerOfAssociationsCRO.html",
                data: {pageTitle: 'Registar udruga Republike Hrvatske', displayName: 'Registar udruga Republike Hrvatske'}
            })

            /*
             Registar udruga Republike Hrvatske
             */

            .state('content.nomenklaturaSportovaISportskihGrana', {
                url: "/nomenklaturaSportovaISportskihGrana",
                templateUrl: "views/nomenklaturaSportovaISportskihGrana.html",
                data: {pageTitle: 'Nomenklatura sportova i sportskih grana', displayName: 'Nomenklatura sportova i sportskih grana'},
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                files: ['js/plugins/pdfjs/build/pdf.js']
                            },
                            {
                                name: 'pdf',
                                files: ['js/plugins/pdfjs//angular-pdf.js']
                            }

                        ]);
                    }
                }
            })

            /*
             Location
             */

            .state('content.location', {
                url: "/location",
                templateUrl: "views/location.html",
                data: {pageTitle: 'Udaljenost putovanja na gostujuća natjecanja udruge', displayName: 'Udaljenost putovanja na gostujuća natjecanja udruge'},
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                        ]);
                    }
                }

            })

            /*
             Public Call 
             */

            .state('content.publicCall', {
                url: "/javnipoziv",
                templateUrl: "views/publicCall.html",
                data: {pageTitle: 'Javni poziv - sport', displayName: 'Javni poziv - sport'},
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                files: ['js/plugins/pdfjs/build/pdf.js']
                            },
                            {
                                name: 'pdf',
                                files: ['js/plugins/pdfjs//angular-pdf.js']
                            }
                        ]);
                    }
                }

            })

            /*
             Vrednovanje obrasci
             */
            .state('evaluationForms', {
                abstract: true,
                url: "",
                templateUrl: "views/common/content.html"
            })

            .state('evaluationForms.evaluationSportsClub', {
                url: "/vrednovanjeProgramaSportkogKluba",
                templateUrl: "views/evaluationSportsClub.html",
                data: {pageTitle: 'Vrednovanje programa sportskog kluba', displayName: 'Vrednovanje programa sportskog kluba'},
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                files: ['js/plugins/pdfjs/build/pdf.js']
                            },
                            {
                                name: 'pdf',
                                files: ['js/plugins/pdfjs//angular-pdf.js']
                            }
                        ]);
                    }
                }

            })


            .state('evaluationForms.evaluationManifestation', {
                url: "/vrednovanjeProgramaOrganizatora",
                templateUrl: "views/evaluationManifestation.html",
                data: {pageTitle: 'Vrednovanje programa organizatora', displayName: 'Vrednovanje programa organizatora'},
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                files: ['js/plugins/pdfjs/build/pdf.js']
                            },
                            {
                                name: 'pdf',
                                files: ['js/plugins/pdfjs//angular-pdf.js']
                            }
                        ]);
                    }
                }

            })


            .state('evaluationForms.evaluationTeamClub', {
                url: "/vrednovanjeProgramaKlubovaMomcadskiSportovi",
                templateUrl: "views/evaluationTeamClub.html",
                data: {pageTitle: 'Vrednovanje programa klubova u momčadskim sportovima', displayName: 'Vrednovanje programa klubova u momčadskim sportovima'},
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                files: ['js/plugins/pdfjs/build/pdf.js']
                            },
                            {
                                name: 'pdf',
                                files: ['js/plugins/pdfjs//angular-pdf.js']
                            }
                        ]);
                    }
                }

            })


            .state('evaluationForms.evaluationCoaches', {
                url: "/vrednovanjeProgramaTrenera",
                templateUrl: "views/evaluationCoaches.html",
                data: {pageTitle: 'Vrednovanje programa trenera', displayName: 'Vrednovanje programa trenera'},
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                files: ['js/plugins/pdfjs/build/pdf.js']
                            },
                            {
                                name: 'pdf',
                                files: ['js/plugins/pdfjs//angular-pdf.js']
                            }
                        ]);
                    }
                }

            })
            /*
             Profile
             */
            .state('content.profile', {
                url: "/profile",
                templateUrl: "views/profile.html",
                data: {pageTitle: 'Profile'},
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                name: 'ngImgCrop',
                                files: ['js/plugins/ngImgCrop/ng-img-crop.js', 'css/plugins/ngImgCrop/ng-img-crop.css']
                            },
                            {
                                insertBefore: '#loadBefore',
                                name: 'toaster',
                                files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
                            }
                        ]);
                    }
                }
            })

            /*
             Sports buildings
             */
            .state('content.sportsBuildings', {
                url: "/sportsBuildings",
                templateUrl: "views/sportsBuildings.html",
                data: {pageTitle: 'Registar sportskih građevina', displayName: 'Registar sportskih građevina'},
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                serie: true,
                                files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
                            },
                            {
                                files: ['js/plugins/moment/moment.min.js']
                            },
                            {
                                serie: true,
                                name: 'datatables',
                                files: ['js/plugins/dataTables/angular-datatables.js', 'https://cdn.datatables.net/responsive/2.1.0/js/dataTables.responsive.js',
                                    'https://cdn.datatables.net/responsive/2.1.0/css/responsive.dataTables.css', 'https://cdn.datatables.net/select/1.2.2/js/dataTables.select.min.js',
                                    'https://cdn.datatables.net/select/1.2.2/css/select.dataTables.min.css']
                            },
                            {
                                serie: true,
                                name: 'datatables.buttons',
                                files: ['https://cdn.datatables.net/buttons/1.3.1/js/dataTables.buttons.min.js', 'https://cdn.datatables.net/buttons/1.2.2/js/buttons.colVis.min.js', 'js/plugins/dataTables/angular-datatables.buttons.min.js', 'https://cdn.datatables.net/select/1.2.2/js/dataTables.select.min.js', 'https://cdn.datatables.net/select/1.2.2/css/select.dataTables.min.css']
                            }
                        ]);
                    }
                }
            })

            .state('content.geographicalOverviewOfMemberRegisters', {
                url: "/geographicalOverviewOfMemberRegisters",
                templateUrl: "views/geographicalOverviewOfMemberRegisters.html",
                data: {pageTitle: 'Prikaz članica na karti', displayName: 'Prikaz članica na karti'},
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                serie: true,
                                files: ['js/plugins/leaflet/leaflet.js', 'js/plugins/leaflet/leaflet.css']
                            },
                            {
                                serie: true,
                                files: ['https://api.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v0.4.0/leaflet.markercluster.js', 'https://api.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v0.4.0/MarkerCluster.css',
                                    'https://api.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v0.4.0/MarkerCluster.Default.css']
                            },
                            {
                                serie: true,
                                files: ['js/plugins/leaflet/dist/leaflet.awesome-markers.js', 'js/plugins/leaflet/dist/leaflet.awesome-markers.css']
                            },
                            {
                                name: 'leaflet-directive',
                                files: ['js/plugins/leaflet/angular-leaflet-directive.min.js']
                            },
                            {
                                name: 'ui.select',
                                files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
                            }
                        ]);
                    }
                }
            })

            .state('content.financialResources', {
                url: "/financialResources",
                templateUrl: "views/financialResources.html",
                data: {pageTitle: 'Prikaz članica na karti', displayName: 'Sredstva po sportovima'},
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                name: 'ui.grid',
                                files: ['js/plugins/ui-grid/ui-grid.min.js', 'css/plugins/ui-grid/ui-grid.min.css']
                            },
                            {
                                name: 'ui.grid.selection',
                                files: ['js/plugins/ui-grid/selection.js']
                            },
                            {
                                name: 'ui.grid.exporter',
                                files: ['js/plugins/ui-grid/exporter.js']
                            },
                            {
                                name: 'ui.grid.edit',
                                files: ['js/plugins/ui-grid/gridEdit.js']
                            },
                            {
                                name: 'ui.grid.treeBase',
                                files: ['js/plugins/ui-grid/tree-base.js']
                            },
                            {
                                name: 'ui.grid.grouping',
                                files: ['js/plugins/ui-grid/grouping.js']
                            },
                            {
                                name: 'ui.grid.edit',
                                files: ['js/plugins/ui-grid/ui-grid.min.js', 'css/plugins/ui-grid/ui-grid.min.css']
                            }                                                        
                        ]);
                    }
                }
            })

            /*
             Login
             */
            .state('login', {
                url: "/login",
                templateUrl: "views/login.html",
                data: {pageTitle: 'Login', specialClass: 'login-bg'},
                params: {
                    'toState': 'content.dashboard', // default state to proceed to after login
                    'toParams': {}
                },
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                insertBefore: '#loadBefore',
                                name: 'toaster',
                                files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
                            },
                            {
                                names: 'eventUtilsModule',
                                files: ['js/diskobolos/util/eventUtils.js']
                            }
                        ]);
                    }
                }
            });


}
angular
        .module('inspinia')
        .config(config)
        .run(function ($rootScope, $state, _, sessionStorageService, jwtHelper, ROLE_PERMISSION_LEVEL) {
            // register listener to watch state changes
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
                console.log("stateChangeStart from: " + fromState.name + " to: " + toState.name);
                if (toState.name === "login") {
                    // do nothing in case when net state is login
                    return;
                }
                // get token from the session
                sessionStorageService.getJwtToken().then(function (token) {
                    if (token === null || _.isUndefined(token)) {
                        // no logged user, we should be going to #login
                        if (next.name !== "login") {
                            $state.go("login");
                        }
                    } else {
                        var jwtObj = jwtHelper.decodeToken(token);
                        // fill in authenticatedUser object
                        $rootScope.authenticatedUser = {
                            userId: undefined,
                            roles: [],
                            username: '',
                            role: ''
                        };
                        $rootScope.authenticatedUser.userId = jwtObj.uid;
                        for (var i = 0; i < jwtObj.aut.length; i++) {
                            $rootScope.authenticatedUser.roles.push(jwtObj.aut[i]);
                        }
                        $rootScope.authenticatedUser.username = jwtObj.sub;
                        // find role with the highest permission level
                        $rootScope.authenticatedUser.role = _.max($rootScope.authenticatedUser.roles, function (roles) {
                            return roles.permissionLevel;
                        });
                    }
                }, function (response) {
                    // in case we get an error we need to redirect to the login page and clean data from the session                
                    $state.go("login");
                    sessionStorageService.removeJwtToken();
                });
            });
        });
