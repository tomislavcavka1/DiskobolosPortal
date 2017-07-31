/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var pdfViewerModule = angular.module('pdfViewerModule', []);

pdfViewerModule.controller('publicCallController', function (
        $scope) {
    $scope.pdfUrl = 'pdf/javnipoziv.pdf';
    $scope.httpHeaders = {Authorization: 'Bearer some-aleatory-token'};


    $scope.printbtn = function () {

        $scope.wnd = window.open('pdf/javnipoziv.pdf');
        $scope.wnd.print();


    };
});

pdfViewerModule.controller('nomenclatureSportsController', function (
        $scope) {
    $scope.pdfUrl = 'pdf/nomenklaturasportovi.pdf';
    $scope.httpHeaders = {Authorization: 'Bearer some-aleatory-token'};


    $scope.printbtn = function () {

        $scope.wnd = window.open('pdf/nomenklaturasportovi.pdf');
        $scope.wnd.print();


    };
});



pdfViewerModule.controller('evaluationSportsClubController', function (
        $scope) {
    $scope.pdfUrl = 'pdf/vrednovanjaProgramaKlubovaPojedinacni.pdf';
    $scope.httpHeaders = {Authorization: 'Bearer some-aleatory-token'};


    $scope.printbtn = function () {

        $scope.wnd = window.open('pdf/vrednovanjaProgramaKlubovaPojedinacni.pdf');
        $scope.wnd.print();


    };
});


pdfViewerModule.controller('evaluationManifestationController', function (
        $scope) {
    $scope.pdfUrl = 'pdf/vrednovanjaProgramaPriredbe.pdf';
    $scope.httpHeaders = {Authorization: 'Bearer some-aleatory-token'};


    $scope.printbtn = function () {

        $scope.wnd = window.open('pdf/vrednovanjaProgramaPriredbe.pdf');
        $scope.wnd.print();


    };
});


pdfViewerModule.controller('evaluationTeamClubController', function (
        $scope) {
    $scope.pdfUrl = 'pdf/vrednovanjaProgramaKlubovaEkipni.pdf';
    $scope.httpHeaders = {Authorization: 'Bearer some-aleatory-token'};


    $scope.printbtn = function () {

        $scope.wnd = window.open('pdf/vrednovanjaProgramaKlubovaEkipni.pdf');
        $scope.wnd.print();


    };
});



pdfViewerModule.controller('evaluationCoachesController', function (
        $scope) {
    $scope.pdfUrl = 'pdf/vrednovanjaProgramaTrenera.pdf';
    $scope.httpHeaders = {Authorization: 'Bearer some-aleatory-token'};


    $scope.printbtn = function () {

        $scope.wnd = window.open('pdf/vrednovanjaProgramaTrenera.pdf');
        $scope.wnd.print();


    };
});
