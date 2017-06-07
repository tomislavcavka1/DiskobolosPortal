/**
 * AngularJS controller responsible for fetching, creation, edit and deletion of the evaluation data.
 * 
 * @author Tomislav Čavka
 */
var evaluationModule = angular.module('evaluationModule', []);

evaluationModule.controller('evaluationController', function (
        $scope,
        $rootScope,
        _,
        $uibModal,
        DTOptionsBuilder,
        EvaluationDataFactory) {
            
    $scope.dtOptions = DTOptionsBuilder.newOptions()
    .withDOM('<"html5buttons"B>lTfgitp')
    .withButtons([
        {extend: 'copy'},
        {extend: 'csv'},
        {extend: 'excel', title: 'ExampleFile'},
        {extend: 'pdf', title: 'ExampleFile'},
        {extend: 'print',
            customize: function (win) {
                $(win.document.body).addClass('white-bg');
                $(win.document.body).css('font-size', '10px');

                $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
            }
        }
    ]);
    
    $scope.evaluationQuestions = {};
    $scope.answers = {};

    $scope.getEvaluationQuestions = function () {

        EvaluationDataFactory.getAllEvaluationQuestions({}, function (response) {
            //success
            $scope.evaluationQuestions = response.evaluationDtoQuestions;
        },
        function (error) {
            //fail
            $scope.error = error;
        });
    };
    
    // init call
    $scope.getEvaluationQuestions();
    
    
    $scope.createData = function () {

        var modalInstance = $uibModal.open({
            templateUrl: 'views/rankingAndCategorizationOfSportsModal.html',
            controller: 'CreateRankingAndCategorizationOfSportsModalCtrl',
            size: 'xlg',
            scope: $scope
        });

        modalInstance.result.then(function (response) {
            console.log('Modal for creation of a new Ranking And Categorization Of Sports item: ', 'rankingAndCategorizationOfSportsModal.html');
        });
    };
    
});


evaluationModule.controller('CreateRankingAndCategorizationOfSportsModalCtrl', function (
        $scope,
        $rootScope,
        $uibModalInstance,
        _,
        AppConstants) {
            
    $scope.crudAction = AppConstants.CrudActions['create'];
    $scope.data = {};            
    
     
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});


evaluationModule.controller('evaluationController2', function (
        $scope,
        $rootScope,
        _,
        $uibModal,
        DTOptionsBuilder,
        EvaluationDataFactory) {
            
    $scope.dtOptions = DTOptionsBuilder.newOptions()
    .withDOM('<"html5buttons"B>lTfgitp')
    .withButtons([
        {extend: 'copy'},
        {extend: 'csv'},
        {extend: 'excel', title: 'ExampleFile'},
        {extend: 'pdf', title: 'ExampleFile'},
        {extend: 'print',
            customize: function (win) {
                $(win.document.body).addClass('white-bg');
                $(win.document.body).css('font-size', '10px');

                $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
            }
        }
    ]);
    
    $scope.evaluationQuestions = {};
    $scope.answers = {};

    $scope.getEvaluationQuestions = function () {

        EvaluationDataFactory.getAllEvaluationQuestions({}, function (response) {
            //success
            $scope.evaluationQuestions = response.evaluationDtoQuestions;
        },
        function (error) {
            //fail
            $scope.error = error;
        });
    };
    
    // init call
    $scope.getEvaluationQuestions();
    
    
    $scope.createData = function () {

        var modalInstance = $uibModal.open({
            templateUrl: 'views/categorizationOfSportsPerSportClubModal.html',
            controller: 'CategorizationOfSportsPerSportClubModalCtrl',
            size: 'xlg',
            scope: $scope
        });

        modalInstance.result.then(function (response) {
            console.log('Modal for creation of a new Ranking And Categorization Of Sports item: ', 'rankingAndCategorizationOfSportsModal.html');
        });
    };
    
});


evaluationModule.controller('CategorizationOfSportsPerSportClubModalCtrl', function (
        $scope,
        $rootScope,
        $uibModalInstance,
        _,
        AppConstants) {
            
    $scope.crudAction = AppConstants.CrudActions['create'];
    $scope.data = {};            
    
   
        
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

evaluationModule.controller('termsOfCompetitionController', function (
        $scope,
        $rootScope,
        _,
        $uibModal,
        DTOptionsBuilder,
        EvaluationDataFactory,
        toaster,
        MemberRegisterDataFactory) {
            
    $scope.$on('selectedEvaluationAnswers', function (ev, selectedEvaluationAnswers) {
        $rootScope.selectedEvaluationAnswers = selectedEvaluationAnswers;
    });
    
    $scope.termsOfConditions = {};
    $rootScope.selectedMemberRegister = {};

    $scope.$on('termsOfConditions', function (ev, termsOfConditions) {
        $scope.termsOfConditions = termsOfConditions;
    });
    
    $scope.$on('selectedMemberRegister', function (ev, selectedMemberRegister) {
        $rootScope.selectedMemberRegister = selectedMemberRegister;
    });
            
    $scope.dtOptions = DTOptionsBuilder.newOptions()
    .withDOM('<"html5buttons"B>lTfgitp')
    .withButtons([
        {extend: 'copy'},
        {extend: 'csv'},
        {extend: 'excel', title: 'ExampleFile'},
        {extend: 'pdf', title: 'ExampleFile'},
        {extend: 'print',
            customize: function (win) {
                $(win.document.body).addClass('white-bg');
                $(win.document.body).css('font-size', '10px');

                $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
            }
        }
    ]);
    
    
    EvaluationDataFactory.fetchMemberRegistersWithAssociatedEvaluations({}, function (response) {
        
        $scope.termsOfConditions = response.termsOfConditionDtoJson;
        
    },
    function (error) {
        //fail
        $scope.error = error;
    });
                
    $scope.createData = function () {

        var modalInstance = $uibModal.open({
            templateUrl: 'views/termsOfCompetitionModal.html',
            controller: 'TermsOfCompetitionModalCtrl',
            size: 'xlg',
            scope: $scope
        });

        modalInstance.result.then(function (response) {
            console.log('Modal: ', 'termsOfCompetitionModal.html');
        });
    };
    
    $scope.editData = function (id) {

        EvaluationDataFactory.fetchEvaluationAnswersByMemberRegisterId({memberRegisterId: id}, function (response) {
            $scope.evaluationAnswer = response.evaluationAnswersJson;
            
            //broadcast selected member register item
            $rootScope.$broadcast('selectedEvaluationAnswers', $scope.evaluationAnswer);
                        
                MemberRegisterDataFactory.getMemberRegisterById({memberRegisterId: id}, function (response) {                
                    //broadcast selected member register item
                    $rootScope.$broadcast('selectedMemberRegister', response.memberRegister);

                }, function (error) {
                toaster.pop({
                        type: 'error',
                        title: 'Greška',
                        body: "Greška prilikom dohvata članice registra",
                        showCloseButton: true,
                        timeout: 5000
                    });
                });            
            
            
            var modalInstance = $uibModal.open({
                templateUrl: 'views/editTermsOfCompetitionModal.html',
                controller: 'EditTermsOfCompetitionModalCtrl',
                size: 'xlg',
                scope: $scope
            });        

            modalInstance.result.then(function (response) {
                console.log('Modal: ', 'termsOfCompetitionModal.html');
            });
        }, function (error) {
            toaster.pop({
                type: 'error',
                title: 'Greška',
                body: "Greška prilikom dohvata uvjeta natječaja",
                showCloseButton: true,
                timeout: 5000
            });
        });
    };
    
});


evaluationModule.controller('TermsOfCompetitionModalCtrl', function (
        $scope,
        $rootScope,
        $uibModalInstance,
        _,
        AppConstants,
        EvaluationDataFactory,
        MemberRegisterDataFactory,
        toaster) {
            
    $scope.crudAction = AppConstants.CrudActions['create'];
    $scope.data = {};            
    
    $scope.evaluationQuestions = {};
    $scope.answers = {};    
    // sets default value for location dropdown
    $scope.memberRegister = {selected: {}};

    $scope.getEvaluationQuestions = function () {
        
        MemberRegisterDataFactory.getAllMemberRegisters({}, function (response) {
            //success
            $scope.memberRegisters = response.memberRegisters;   
            
            EvaluationDataFactory.getAllEvaluationQuestions({}, function (response) {
                //success
                $scope.evaluationQuestions = response.evaluationDtoQuestions;
            },
            function (error) {
                //fail
                $scope.error = error;
            });
        },
        function (error) {
            //fail
            $scope.error = error;
        });       
    };
    
    $scope.ok = function () {
        
          $scope.evaluationAnswers = [];
          for(var question in $scope.answers) {             
              var answer = {                  
                  id: undefined,
                  memberRegister: $scope.memberRegister.selected,
                  answer: $scope.answers[question]
              };
              $scope.evaluationAnswers.push(answer);
          }
          
          $scope.data.evaluationAnswers = $scope.evaluationAnswers;
          
          EvaluationDataFactory.storeEvaluationAnswers($scope.data, function (response) {

                if (response.result === 200) {
                        console.log('Evaluation answers are successfully added!');

                        toaster.pop({
                            type: 'info',
                            title: 'Uspješno kreiranje stavke',
                            body: "Uvjeti natječaja za odabranu stavku su uspješno kreirani.",
                            showCloseButton: true,
                            timeout: 5000
                        });

                    }
                },
                function (error) {
                    //fail
                    $scope.error = error;

                    toaster.pop({
                        type: 'error',
                        title: 'Greška',
                        body: "Greška prilikom kreiranja uvjeta natječaj",
                        showCloseButton: true,
                        timeout: 5000
                    });
                });
        
	// close modal view
       $uibModalInstance.close();
    };
       
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    
    // init call
    $scope.getEvaluationQuestions();
        
});


evaluationModule.controller('EditTermsOfCompetitionModalCtrl', function (
        $scope,
        $rootScope,
        $uibModalInstance,
        _,
        AppConstants,
        EvaluationDataFactory,        
        toaster) {
            
    $scope.crudAction = AppConstants.CrudActions['edit'];    
    $scope.data = {};
    $scope.data = $rootScope.selectedEvaluationAnswers;
    $scope.data.termsOfCompetitions = [];
    $scope.answers = {};
    $scope.questionItems = [];
    $scope.generalConditionsFirstPart = [];
    $scope.generalConditionsSecondPart = [];
    $scope.generalConditionsDocumentationFirstPart = [];
    $scope.generalConditionsDocumentationSecondPart = [];
    $scope.automaticDeactivationOfAMember = [];
    
    EvaluationDataFactory.getAllEvaluationQuestions({}, function (response) {
        //success
        $scope.evaluationQuestions = response.evaluationDtoQuestions;
        
        for (var i = 0; i < $scope.evaluationQuestions.length; i++) {                           
                         
              $scope.evaluationQuestions[i].initValue = _.find($rootScope.selectedEvaluationAnswers, function (obj) {
                return obj.answer.evaluationQuestionDef.question === $scope.evaluationQuestions[i].question;
              });
              
              for(var j=0; j < $scope.evaluationQuestions[i].items.length; j++) {                  
                $scope.questionItems.push({item: $scope.evaluationQuestions[i].items[j]});
              }
              
              switch ($scope.evaluationQuestions[i].group) {                                                 
                  case 'GENERAL_CONDITIONS_1':
                      $scope.generalConditionsFirstPart.push({questionDef: $scope.evaluationQuestions[i]});
                      break;
                  case 'GENERAL_CONDITIONS_2':
                      $scope.generalConditionsSecondPart.push({questionDef: $scope.evaluationQuestions[i]});
                      break;                  
                  case 'GENERAL_CONDITIONS_DOCUMENTATION_1':
                      $scope.generalConditionsDocumentationFirstPart.push({questionDef: $scope.evaluationQuestions[i]});
                      break;
                  case 'GENERAL_CONDITIONS_DOCUMENTATION_2':
                      $scope.generalConditionsDocumentationSecondPart.push({questionDef: $scope.evaluationQuestions[i]});
                      break;
                  case 'AUTOMATIC_DEACTIVATION_OF_A_MEMBER':
                      $scope.automaticDeactivationOfAMember.push({questionDef: $scope.evaluationQuestions[i]});
                      break;                                            
                  default:
                      break;
              }                          
        }        
    },
    function (error) {
        //fail
        $scope.error = error;
    });
    
    
    $scope.ok = function () {
          
          $scope.evaluationAnswersDto = {};
          $scope.evaluationAnswers = [];
          for(var question in $scope.answers) {
              // handle only questions that have answer
              if(!_.isUndefined($scope.answers[question])) {         
                $scope.evaluationAnswer = _.find($rootScope.selectedEvaluationAnswers, function (obj) {
                  return obj.answer.evaluationQuestionDef.question === question;
                });

                $scope.answerItem = _.find($scope.questionItems, function (obj) {
                  return obj.item.id === $scope.answers[question];
                });

                var answer = {         
                    id: _.isUndefined($scope.evaluationAnswer) ? undefined : $scope.evaluationAnswer.id,
                    memberRegister: $rootScope.selectedMemberRegister,
                    answer: _.isUndefined($scope.answerItem) ? undefined : $scope.answerItem.item
                };
                $scope.evaluationAnswers.push(answer);
              }
          }
          
          $scope.evaluationAnswersDto.evaluationAnswers = $scope.evaluationAnswers;
          
          EvaluationDataFactory.editEvaluationAnswers($scope.evaluationAnswersDto, function (response) {

                if (response.result === 200) {
                        console.log('Evaluation answers are successfully edited!');

                        toaster.pop({
                            type: 'info',
                            title: 'Uspješna izmjena stavke',
                            body: "Uvjeti natječaja za odabranu stavku su uspješno izmijenjeni.",
                            showCloseButton: true,
                            timeout: 5000
                        });
                        
                        EvaluationDataFactory.fetchMemberRegistersWithAssociatedEvaluations({}, function (response) {
        
                            $scope.termsOfConditions = response.termsOfConditionDtoJson;
                            
                            $rootScope.$broadcast('termsOfConditions', $scope.termsOfConditions);
        
                        },
                        function (error) {
                            //fail
                            $scope.error = error;
                        });
                    }
                },
                function (error) {
                    //fail
                    $scope.error = error;

                    toaster.pop({
                        type: 'error',
                        title: 'Greška',
                        body: "Greška prilikom izmjene uvjeta natječaj",
                        showCloseButton: true,
                        timeout: 5000
                    });
                });
        
	// close modal view
       $uibModalInstance.close();
    };
       
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    
});
