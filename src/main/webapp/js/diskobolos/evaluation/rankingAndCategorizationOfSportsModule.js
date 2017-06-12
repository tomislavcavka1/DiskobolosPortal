/**
 * AngularJS controller responsible for fetching, creation, edit and deletion of the ranking and categorization of sports data.
 * 
 * @author Tomislav Čavka
 */
var rankingAndCategorizationOfSportsModule = angular.module('rankingAndCategorizationOfSportsModule', []);

rankingAndCategorizationOfSportsModule.controller('rankingAndCategorizationOfSportsController', function (
        $scope,
        $rootScope,
        _,
        $uibModal,
        DTOptionsBuilder,
        EvaluationDataFactory,
        toaster,
        MemberRegisterDataFactory,
        QUESTIONNAIRE_TYPE) {

    $scope.$on('selectedEvaluationAnswers', function (ev, selectedEvaluationAnswers) {
        $rootScope.selectedEvaluationAnswers = selectedEvaluationAnswers;
    });

    $scope.rankingAndCategorizationOfSports = {
        id: undefined,
        name: '',
        criterionOfSportInternationalFederation: 0,
        criterionOfSportNationalAlliance: 0,
        criterionOfSportCountyAlliance: 0,
        criterionOfSportCityOfZadar: 0,
        sportStatusOfPublicInterest: 0,
        sportStatusTownZadar: 0,
        olympicSportsStatus: 0,
        importanceForTeachingTzk: 0,
        sportsQualityNumberOfCategorizedAthletes: 0,
        sportsQualityAccomplishedSportsResultsCroatia: 0,
        sportsQualityAccomplishedSportsResultsTownOfZadar: 0,
        totalPoints: 0
    };
    $rootScope.sum = {};
    $rootScope.selectedMemberRegister = {};
    $rootScope.totalPointsPerMemberRegister = {};

    $scope.$on('rankingAndCategorizationOfSports', function (ev, rankingAndCategorizationOfSports) {
        $scope.rankingAndCategorizationOfSports = rankingAndCategorizationOfSports;        
    });

    $scope.$on('selectedMemberRegister', function (ev, selectedMemberRegister) {
        $rootScope.selectedMemberRegister = selectedMemberRegister;
    });
    
    $scope.$on('selectedMemberRegister', function (ev, selectedMemberRegister) {
        $rootScope.selectedMemberRegister = selectedMemberRegister;
    });
    
    $scope.$on('sum', function (ev, sum) {
        $rootScope.sum = sum;
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
            
    $scope.init = function() {
        EvaluationDataFactory.fetchMemberRegistersWithAssociatedEvaluations({questionnaireType: QUESTIONNAIRE_TYPE.rankingAndCategorizationOfSports}, function (response) {        
            $scope.rankingAndCategorizationOfSports = response.evaluationQuestionDefJson;                        
            
            for(var i=0; i < $scope.rankingAndCategorizationOfSports.length; i++) {
                if($scope.rankingAndCategorizationOfSports[i].totalPoints === 0)  {
                    $scope.rankingAndCategorizationOfSports[i].criterionOfSportInternationalFederation = 0;
                    $scope.rankingAndCategorizationOfSports[i].criterionOfSportNationalAlliance = 0;
                    $scope.rankingAndCategorizationOfSports[i].criterionOfSportCountyAlliance = 0;
                    $scope.rankingAndCategorizationOfSports[i].criterionOfSportCityOfZadar = 0;
                    $scope.rankingAndCategorizationOfSports[i].sportStatusOfPublicInterest = 0;
                    $scope.rankingAndCategorizationOfSports[i].sportStatusTownZadar = 0;
                    $scope.rankingAndCategorizationOfSports[i].olympicSportsStatus = 0;
                    $scope.rankingAndCategorizationOfSports[i].importanceForTeachingTzk = 0;
                    $scope.rankingAndCategorizationOfSports[i].sportsQualityNumberOfCategorizedAthletes = 0;
                    $scope.rankingAndCategorizationOfSports[i].sportsQualityAccomplishedSportsResultsCroatia = 0;
                    $scope.rankingAndCategorizationOfSports[i].sportsQualityAccomplishedSportsResultsTownOfZadar = 0;
                }
                
                $rootScope.totalPointsPerMemberRegister[$scope.rankingAndCategorizationOfSports[i].id] = $scope.rankingAndCategorizationOfSports[i].totalPoints;
            }
        },
        function (error) {
            //fail
            $scope.error = error;
        });        
    };


    $scope.editData = function (id) {

        EvaluationDataFactory.findAllByMemberRegisterAndQuestionnaireType({memberRegisterId: id, questionnaireType: QUESTIONNAIRE_TYPE.rankingAndCategorizationOfSports}, function (response) {
            $scope.evaluationAnswer = response.evaluationAnswersJson;

            //broadcast selected member register item
            $rootScope.$broadcast('selectedEvaluationAnswers', $scope.evaluationAnswer);

            MemberRegisterDataFactory.getMemberRegisterById({memberRegisterId: id}, function (response) {
                //broadcast selected member register item
                $rootScope.sum = $rootScope.totalPointsPerMemberRegister[id];
                $rootScope.$broadcast('selectedMemberRegister', response.memberRegister);
                $rootScope.$broadcast('sum', $rootScope.sum);

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
                templateUrl: 'views/rankingAndCategorizationOfSportsModal.html',
                controller: 'EditRankingAndCategorizationOfSportsModalCtrl',
                size: 'xlg',
                scope: $scope
            });

            modalInstance.result.then(function (response) {
                console.log('Modal: ', 'rankingAndCategorizationOfSportsModal.html');
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
    
    $scope.init();
    
});


rankingAndCategorizationOfSportsModule.controller('EditRankingAndCategorizationOfSportsModalCtrl', function (
        $scope,
        $rootScope,
        $uibModalInstance,
        _,
        AppConstants,
        EvaluationDataFactory,
        toaster,
        QUESTIONNAIRE_TYPE) {
            
    $scope.crudAction = AppConstants.CrudActions['edit'];
    $scope.data = {};
    $scope.data = $rootScope.selectedEvaluationAnswers;
    $scope.answers = {};
    $scope.questionItems = [];
    $scope.criterionOfSportDevelopmentInternationalFederation = [];
    $scope.criterionOfSportNationalAlliance = [];
    $scope.criterionOfSportCountyAlliance = [];
    $scope.criterionOfSportCityOfZadar = [];
    $scope.publicInterestOfSportPublicInterest = [];
    $scope.publicInterestOfSportTownZadar = [];
    $scope.publicInterestOfSportOlympicStatus = [];
    $scope.publicInterestOfSportImportanceForTeachingTzk = [];
    $scope.sportsQualityNumbeOfCategorizedAthletes = [];
    $scope.sportsQualityAchievedSportsResultsInCroatia = [];
    $scope.sportsQualityAchievedSportsResultsInTownZadar = [];
    $scope.totalPoints = [];
    $scope.points = [];
    
    EvaluationDataFactory.findAllByQuestionnaireType({questionnaireType: QUESTIONNAIRE_TYPE.rankingAndCategorizationOfSports}, function (response) {
                //success
                $scope.evaluationQuestions = response.evaluationDtoQuestions;                

                for (var i = 0; i < $scope.evaluationQuestions.length; i++) {

                    $scope.evaluationQuestions[i].initValue = _.find($rootScope.selectedEvaluationAnswers, function (obj) {
                        return obj.answer.evaluationQuestionDef.question === $scope.evaluationQuestions[i].question;
                    });

                    for (var j = 0; j < $scope.evaluationQuestions[i].items.length; j++) {
                        $scope.questionItems.push({item: $scope.evaluationQuestions[i].items[j]});
                    }                                        

                    switch ($scope.evaluationQuestions[i].group) {
                        case 'INTERNATIONAL_FEDERATION':
                            $scope.criterionOfSportDevelopmentInternationalFederation.push({questionDef: $scope.evaluationQuestions[i]});
                            break;
                        case 'NATIONAL_ALLIANCE':
                            $scope.criterionOfSportNationalAlliance.push({questionDef: $scope.evaluationQuestions[i]});
                            break;
                        case 'COUNTY_ALLIANCE':
                            $scope.criterionOfSportCountyAlliance.push({questionDef: $scope.evaluationQuestions[i]});
                            break;
                        case 'CITY_OF_ZADAR':
                            $scope.criterionOfSportCityOfZadar.push({questionDef: $scope.evaluationQuestions[i]});
                            break;
                        case 'PUBLIC_INTEREST':
                            $scope.publicInterestOfSportPublicInterest.push({questionDef: $scope.evaluationQuestions[i]});
                            break;
                        case 'TRADITION_OF_SPORT_ZADAR':
                            $scope.publicInterestOfSportTownZadar.push({questionDef: $scope.evaluationQuestions[i]});
                            break;
                        case 'OLYMPIC_SPORTS_STATUS':
                            $scope.publicInterestOfSportOlympicStatus.push({questionDef: $scope.evaluationQuestions[i]});
                            break;
                        case 'IMPORTANCE_FOR_TEACHING_TZK':
                            $scope.publicInterestOfSportImportanceForTeachingTzk.push({questionDef: $scope.evaluationQuestions[i]});
                            break;
                        case 'NUMBER_OF_CATEGORIZED_ATHLETES':
                            $scope.sportsQualityNumbeOfCategorizedAthletes.push({questionDef: $scope.evaluationQuestions[i]});
                            break;
                        case 'ACHIEVED_SPORTS_RESULTS_IN_CROATIA':
                            $scope.sportsQualityAchievedSportsResultsInCroatia.push({questionDef: $scope.evaluationQuestions[i]});
                            break;
                        case 'ACHIEVED_SPORTS_RESULTS_IN_TOWN_ZADAR':
                            $scope.sportsQualityAchievedSportsResultsInTownZadar.push({questionDef: $scope.evaluationQuestions[i]});
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
    
    /**
     * Calculates total points for the ranking questionnaire 
     * 
     * @param {type} question represents key for the question
     * @returns {undefined}
     */
    $scope.calculateTotal = function(question) {
        $scope.answerItem = _.find($scope.questionItems, function (obj) {
            return obj.item.id === $scope.answers[question];
        });
        
        $scope.points[question] = $scope.answerItem.item.value;
        
        $scope.totalPointsValue = _.find($scope.totalPoints, function (obj) {
            return obj.key === question;
        });
        
        if(!_.isUndefined($scope.totalPoints[question])) {       
            if($scope.totalPoints[question] !== $scope.answerItem.item.value) {
                    $scope.sum -= $scope.totalPoints[question];                    
                    $scope.sum += $scope.answerItem.item.value;
                    $scope.totalPoints[question] = $scope.answerItem.item.value;
            }
        } else {
            $scope.totalPoints[question] = $scope.answerItem.item.value;
            $rootScope.sum += $scope.totalPoints[question];
        }
    };
    
    $scope.ok = function () {

        $scope.evaluationAnswersDto = {};
        $scope.evaluationAnswers = [];
        for (var question in $scope.answers) {
            // handle only questions that have answer
            if (!_.isUndefined($scope.answers[question])) {
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
                            body: "Rangiranje i kategorizacija za odabranu stavku su uspješno izmijenjeni.",
                            showCloseButton: true,
                            timeout: 5000
                        });

                        EvaluationDataFactory.fetchMemberRegistersWithAssociatedEvaluations({questionnaireType: QUESTIONNAIRE_TYPE.rankingAndCategorizationOfSports}, function (response) {

                                $scope.rankingAndCategorizationOfSports = response.evaluationQuestionDefJson;
                                
                                for(var i=0; i < $scope.rankingAndCategorizationOfSports.length; i++) {
                                    if($scope.rankingAndCategorizationOfSports[i].totalPoints === 0)  {
                                        $scope.rankingAndCategorizationOfSports[i].criterionOfSportInternationalFederation = 0;
                                        $scope.rankingAndCategorizationOfSports[i].criterionOfSportNationalAlliance = 0;
                                        $scope.rankingAndCategorizationOfSports[i].criterionOfSportCountyAlliance = 0;
                                        $scope.rankingAndCategorizationOfSports[i].criterionOfSportCityOfZadar = 0;
                                        $scope.rankingAndCategorizationOfSports[i].sportStatusOfPublicInterest = 0;
                                        $scope.rankingAndCategorizationOfSports[i].sportStatusTownZadar = 0;
                                        $scope.rankingAndCategorizationOfSports[i].olympicSportsStatus = 0;
                                        $scope.rankingAndCategorizationOfSports[i].importanceForTeachingTzk = 0;
                                        $scope.rankingAndCategorizationOfSports[i].sportsQualityNumberOfCategorizedAthletes = 0;
                                        $scope.rankingAndCategorizationOfSports[i].sportsQualityAccomplishedSportsResultsCroatia = 0;
                                        $scope.rankingAndCategorizationOfSports[i].sportsQualityAccomplishedSportsResultsTownOfZadar = 0;
                                    }
                                    $rootScope.totalPointsPerMemberRegister[$scope.rankingAndCategorizationOfSports[i].id] = $scope.rankingAndCategorizationOfSports[i].totalPoints;
                                }
                                $rootScope.$broadcast('rankingAndCategorizationOfSports', $scope.rankingAndCategorizationOfSports);

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
                        body: "Greška prilikom izmjene rangiranja i kategorizacije sportova",
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


