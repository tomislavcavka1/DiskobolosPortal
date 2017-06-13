/**
 * AngularJS controller responsible for fetching, creation, edit and deletion of the terms of competition data.
 * 
 * @author Tomislav Čavka
 */
var termsOfCompetitionModule = angular.module('termsOfCompetitionModule', []);

termsOfCompetitionModule.controller('termsOfCompetitionController', function (
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
        DTColumnDefBuilder) {

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
            .withLanguage(dataTableUtils.getDataTableTranslations())
            .withOption('order', [0, 'asc'])
            .withPaginationType('full_numbers')
            .withButtons(dataTableUtils.getDataTableButtons([1, 2, 3, 4], false))
            .withOption('select', true)
            .withOption('responsive', true);

    $scope.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(-1).withOption('responsivePriority', 1)
    ];
            
    $scope.init = function() {
        EvaluationDataFactory.fetchMemberRegistersWithAssociatedEvaluations({questionnaireType: QUESTIONNAIRE_TYPE.termsOfCondition}, function (response) {        
            $scope.termsOfConditions = response.evaluationQuestionDefJson;
        },
        function (error) {
            //fail
            $scope.error = error;
        });        
    };

    $scope.editData = function (id) {

        EvaluationDataFactory.findAllByMemberRegisterAndQuestionnaireType({memberRegisterId: id, questionnaireType: QUESTIONNAIRE_TYPE.termsOfCondition}, function (response) {
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
    
    $scope.init();

});

termsOfCompetitionModule.controller('EditTermsOfCompetitionModalCtrl', function (
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
    $scope.data.termsOfCompetitions = [];
    $scope.answers = {};
    $scope.questionItems = [];
    $scope.generalConditionsFirstPart = [];
    $scope.generalConditionsSecondPart = [];
    $scope.generalConditionsDocumentationFirstPart = [];
    $scope.generalConditionsDocumentationSecondPart = [];
    $scope.automaticDeactivationOfAMember = [];

    EvaluationDataFactory.findAllByQuestionnaireType({questionnaireType: QUESTIONNAIRE_TYPE.termsOfCondition}, function (response) {
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
                            body: "Uvjeti natječaja za odabranu stavku su uspješno izmijenjeni.",
                            showCloseButton: true,
                            timeout: 5000
                        });

                        EvaluationDataFactory.fetchMemberRegistersWithAssociatedEvaluations({questionnaireType: QUESTIONNAIRE_TYPE.termsOfCondition}, function (response) {

                                $scope.termsOfConditions = response.evaluationQuestionDefJson;

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
