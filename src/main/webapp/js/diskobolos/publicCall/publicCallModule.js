/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var publicCallModule = angular.module('publicCallModule', []);

publicCallModule.controller('publicCallController', function (
        $scope) {
    $scope.pdfUrl = 'pdf/javnipoziv.pdf';
    $scope.httpHeaders = {Authorization: 'Bearer some-aleatory-token'};

   

});


