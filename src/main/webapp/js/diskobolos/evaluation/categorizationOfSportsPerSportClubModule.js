/**
 * AngularJS controller responsible for fetching, creation, edit and deletion of the categorization of sports per sport club data.
 * 
 * @author Tomislav Čavka
 */
var categorizationOfSportsPerSportClubModule = angular.module('categorizationOfSportsPerSportClubModule', []);

categorizationOfSportsPerSportClubModule.controller('categorizationOfSportsPerSportClubController', function (
        $scope,
        $rootScope,
        _,
        $uibModal,
        DTOptionsBuilder,
        EvaluationDataFactory,
        toaster,
        MemberRegisterDataFactory,
        QUESTIONNAIRE_TYPE,
        dataTableUtils,
        DTColumnDefBuilder,
        colorUtils) {

    $scope.$on('selectedEvaluationAnswers', function (ev, selectedEvaluationAnswers) {
        $rootScope.selectedEvaluationAnswers = selectedEvaluationAnswers;
    });

    $scope.categorizationOfSportsPerSports = {
        id: undefined,
        name: '',
        categorizationOnNationalFederationLevel: 0,
        categorizationOnSportTypeLevel: 0,
        categorizationAccordingToAge: 0,
        categorizationOnCompetitionSystemLevel: 0,
        categorizationBasedOnNumberOfTeamMembersCompeting: 0,
        categorizationAccordingToMassInSportsSchools: 0,
        categorizationAccordingToProfessionalStaff: 0,
        categorizationAccordingToTraditionOfTownZadar: 0,
        cofficiencyOfSportsCategory: 0,
        questionnairePercentage: 0,
        percentageColor: 'red',
        totalPoints: 0
    };
    $rootScope.categorizationSum = {};
    $rootScope.selectedMemberRegister = {};
    $rootScope.totalPointsPerMemberRegister = {};

    $scope.$on('categorizationOfSportsPerSports', function (ev, categorizationOfSportsPerSports) {
        $scope.categorizationOfSportsPerSports = categorizationOfSportsPerSports;
    });

    $scope.$on('selectedMemberRegister', function (ev, selectedMemberRegister) {
        $rootScope.selectedMemberRegister = selectedMemberRegister;
    });

    $scope.$on('categorizationSum', function (ev, categorizationSum) {
        $rootScope.categorizationSum = categorizationSum;
    });

    $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withDOM('<"html5buttons"B>lTfgitp')
            .withLanguage(dataTableUtils.getDataTableTranslations())
            .withOption('order', [0, 'asc'])
            .withOption('stateSave', true)
            .withPaginationType('full_numbers')
            .withButtons(dataTableUtils.getDataTableButtons([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], true))
            .withOption('select', true)
            .withOption('responsive', true);

    $scope.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(-1).withOption('responsivePriority', 1),
        DTColumnDefBuilder.newColumnDef(-2).withOption('responsivePriority', 2),
        DTColumnDefBuilder.newColumnDef(-3).withOption('responsivePriority', 3)
    ];

    $scope.init = function () {
        EvaluationDataFactory.fetchMemberRegistersWithAssociatedEvaluations({questionnaireType: QUESTIONNAIRE_TYPE.categorizationOfSportsPerSports}, function (response) {
            $scope.categorizationOfSportsPerSports = response.evaluationQuestionDefJson;

            for (var i = 0; i < $scope.categorizationOfSportsPerSports.length; i++) {
                if ($scope.categorizationOfSportsPerSports[i].totalPoints === 0) {
                    $scope.categorizationOfSportsPerSports[i].categorizationOnNationalFederationLevel = 0;
                    $scope.categorizationOfSportsPerSports[i].categorizationOnSportTypeLevel = 0;
                    $scope.categorizationOfSportsPerSports[i].categorizationAccordingToAge = 0;
                    $scope.categorizationOfSportsPerSports[i].categorizationOnCompetitionSystemLevel = 0;
                    $scope.categorizationOfSportsPerSports[i].categorizationBasedOnNumberOfTeamMembersCompeting = 0;
                    $scope.categorizationOfSportsPerSports[i].categorizationAccordingToMassInSportsSchools = 0;
                    $scope.categorizationOfSportsPerSports[i].categorizationAccordingToProfessionalStaff = 0;
                    $scope.categorizationOfSportsPerSports[i].categorizationAccordingToTraditionOfTownZadar = 0;
                    $scope.categorizationOfSportsPerSports[i].cofficiencyOfSportsCategory = 0;
                }

                $scope.categorizationOfSportsPerSports[i].percentageColor = colorUtils.colorBasedOnPercentageValue($scope.categorizationOfSportsPerSports[i].questionnairePercentage);
                $rootScope.totalPointsPerMemberRegister[$scope.categorizationOfSportsPerSports[i].id] = $scope.categorizationOfSportsPerSports[i].totalPoints;
            }
        },
                function (error) {
                    //fail
                    $scope.error = error;
                });
    };


    $scope.editData = function (id) {

        EvaluationDataFactory.findAllByMemberRegisterAndQuestionnaireType({memberRegisterId: id, questionnaireType: QUESTIONNAIRE_TYPE.categorizationOfSportsPerSports}, function (response) {
            $scope.evaluationAnswer = response.evaluationAnswersJson;

            //broadcast selected member register item
            $rootScope.$broadcast('selectedEvaluationAnswers', $scope.evaluationAnswer);

            MemberRegisterDataFactory.getMemberRegisterById({memberRegisterId: id}, function (response) {
                //broadcast selected member register item
                $rootScope.categorizationSum = $rootScope.totalPointsPerMemberRegister[id];
                $rootScope.$broadcast('selectedMemberRegister', response.memberRegister);
                $rootScope.$broadcast('categorizationSum', $rootScope.categorizationSum);

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
                templateUrl: 'views/categorizationOfSportsPerSportClubModal.html',
                controller: 'EditCategorizationOfSportsPerSportClubCtrl',
                size: 'xlg',
                scope: $scope
            });

            modalInstance.result.then(function (response) {
                console.log('Modal: ', 'categorizationOfSportsPerSportClubModal.html');
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


categorizationOfSportsPerSportClubModule.controller('EditCategorizationOfSportsPerSportClubCtrl', function (
        $scope,
        $rootScope,
        $uibModalInstance,
        _,
        AppConstants,
        EvaluationDataFactory,
        toaster,
        QUESTIONNAIRE_TYPE,
        colorUtils) {

    $scope.crudAction = AppConstants.CrudActions['edit'];
    $scope.data = {};
    $scope.data = $rootScope.selectedEvaluationAnswers;
    $scope.answers = {};
    $scope.questionItems = [];
    $scope.categorizationAccordingToNumberOfRegisteredClubsInNationalFederation = [];
    $scope.categorizationByTypeOfSport = [];
    $scope.categorizationAccordingToAgeCategories = [];
    $scope.categorizationAccordingToRankOfCompetitionSystem = [];
    $scope.categorizationAccordingToNumberOfTeamMembersCompeting = [];
    $scope.categorizationAccordingToMassInSportsSchools = [];
    $scope.categorizationAccordingToProfessionalStaff = [];
    $scope.categorizationAccordingToTraditionOfTownZadar = [];
    $scope.cofficiencyOfSportsCategory = [];
    $scope.totalPoints = [];
    $scope.points = [];

    EvaluationDataFactory.findAllByQuestionnaireType({questionnaireType: QUESTIONNAIRE_TYPE.categorizationOfSportsPerSports}, function (response) {
        //success
        $scope.evaluationQuestions = response.evaluationDtoQuestions;

        for (var i = 0; i < $scope.evaluationQuestions.length; i++) {

            $scope.evaluationQuestions[i].initValue = _.find($rootScope.selectedEvaluationAnswers, function (obj) {
                return obj.answer.evaluationQuestionDef.question === $scope.evaluationQuestions[i].question;
            });

            for (var j = 0; j < $scope.evaluationQuestions[i].items.length; j++) {
                $scope.questionItems.push({item: $scope.evaluationQuestions[i].items[j]});
            }

            $scope.points[$scope.evaluationQuestions[i].question] = !_.isUndefined($scope.evaluationQuestions[i].initValue) ? parseInt($scope.evaluationQuestions[i].initValue.answer.value) : undefined;
            $scope.totalPoints[$scope.evaluationQuestions[i].question] = !_.isUndefined($scope.evaluationQuestions[i].initValue) ? parseInt($scope.evaluationQuestions[i].initValue.answer.value) : undefined;

            switch ($scope.evaluationQuestions[i].group) {
                case 'CATEGORIZATION_ON_NATIONAL_FEDERATION_LEVEL':
                    $scope.categorizationAccordingToNumberOfRegisteredClubsInNationalFederation.push({questionDef: $scope.evaluationQuestions[i]});
                    break;
                case 'CATEGORIZATION_ON_SPORT_TYPE_LEVEL':
                    $scope.categorizationByTypeOfSport.push({questionDef: $scope.evaluationQuestions[i]});
                    break;
                case 'CATEGORIZATION_ACCORDING_TO_AGE':
                    $scope.categorizationAccordingToAgeCategories.push({questionDef: $scope.evaluationQuestions[i]});
                    break;
                case 'CATEGORIZATION_ON_COMPETITION_SYSTEM_LEVEL':
                    $scope.categorizationAccordingToRankOfCompetitionSystem.push({questionDef: $scope.evaluationQuestions[i]});
                    break;
                case 'CATEGORIZATION_BASED_ON_NUMBER_OF_TEAM_MEMBERS_COMPETING':
                    $scope.categorizationAccordingToNumberOfTeamMembersCompeting.push({questionDef: $scope.evaluationQuestions[i]});
                    break;
                case 'CATEGORIZATION_BASED_ON_MASS_IN_SPORTS_SCHOOLS':
                    $scope.categorizationAccordingToMassInSportsSchools.push({questionDef: $scope.evaluationQuestions[i]});
                    break;
                case 'CATEGORIZATION_BASED_ON_PROFESSIONAL_STAFF':
                    $scope.categorizationAccordingToProfessionalStaff.push({questionDef: $scope.evaluationQuestions[i]});
                    break;
                case 'CATEGORIZATION_BASED_ON_TRADITION_OF_TOWN_ZADAR':
                    $scope.categorizationAccordingToTraditionOfTownZadar.push({questionDef: $scope.evaluationQuestions[i]});
                    break;
                case 'SPORT_CATEGORY_COEFFICIENT':
                    $scope.cofficiencyOfSportsCategory.push({questionDef: $scope.evaluationQuestions[i]});
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
    $scope.calculateTotal = function (question) {
        $scope.answerItem = _.find($scope.questionItems, function (obj) {
            return obj.item.id === $scope.answers[question];
        });

        $scope.points[question] = $scope.answerItem.item.value;

        if (!_.isUndefined($scope.totalPoints[question])) {
            if ($scope.totalPoints[question] !== $scope.answerItem.item.value) {
                $scope.categorizationSum -= $scope.totalPoints[question];
                $scope.categorizationSum += $scope.answerItem.item.value;
                $scope.totalPoints[question] = $scope.answerItem.item.value;
            }
        } else {
            $scope.totalPoints[question] = $scope.answerItem.item.value;
            $rootScope.categorizationSum += $scope.totalPoints[question];
        }
        $rootScope.$broadcast('categorizationSum', $rootScope.categorizationSum);
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
                    body: "Kategorizacija sporta za sportske klubove je uspješno izmijenjena.",
                    showCloseButton: true,
                    timeout: 5000
                });

                EvaluationDataFactory.fetchMemberRegistersWithAssociatedEvaluations({questionnaireType: QUESTIONNAIRE_TYPE.categorizationOfSportsPerSports}, function (response) {

                    $scope.categorizationOfSportsPerSports = response.evaluationQuestionDefJson;

                    for (var i = 0; i < $scope.categorizationOfSportsPerSports.length; i++) {
                        if ($scope.categorizationOfSportsPerSports[i].totalPoints === 0) {
                            $scope.categorizationOfSportsPerSports[i].categorizationOnNationalFederationLevel = 0;
                            $scope.categorizationOfSportsPerSports[i].categorizationOnSportTypeLevel = 0;
                            $scope.categorizationOfSportsPerSports[i].categorizationAccordingToAge = 0;
                            $scope.categorizationOfSportsPerSports[i].categorizationOnCompetitionSystemLevel = 0;
                            $scope.categorizationOfSportsPerSports[i].categorizationBasedOnNumberOfTeamMembersCompeting = 0;
                            $scope.categorizationOfSportsPerSports[i].categorizationAccordingToMassInSportsSchools = 0;
                            $scope.categorizationOfSportsPerSports[i].categorizationAccordingToProfessionalStaff = 0;
                            $scope.categorizationOfSportsPerSports[i].categorizationAccordingToTraditionOfTownZadar = 0;
                            $scope.categorizationOfSportsPerSports[i].cofficiencyOfSportsCategory = 0;
                        }

                        $scope.categorizationOfSportsPerSports[i].percentageColor = colorUtils.colorBasedOnPercentageValue($scope.categorizationOfSportsPerSports[i].questionnairePercentage);
                        $rootScope.totalPointsPerMemberRegister[$scope.categorizationOfSportsPerSports[i].id] = $scope.categorizationOfSportsPerSports[i].totalPoints;
                    }
                    $rootScope.$broadcast('categorizationOfSportsPerSports', $scope.categorizationOfSportsPerSports);

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
                        body: "Greška prilikom izmjene kategorizacije sporta za sportske klubove",
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