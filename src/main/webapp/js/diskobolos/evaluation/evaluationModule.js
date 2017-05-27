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

evaluationModule.controller('evaluationController3', function (
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
            templateUrl: 'views/termsOfCompetitionModal.html',
            controller: 'TermsOfCompetitionModalCtrl',
            size: 'xlg',
            scope: $scope
        });

        modalInstance.result.then(function (response) {
            console.log('Modal for creation of a new Ranking And Categorization Of Sports item: ', 'rankingAndCategorizationOfSportsModal.html');
        });
    };
    
});


evaluationModule.controller('TermsOfCompetitionModalCtrl', function (
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
