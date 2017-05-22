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
});
