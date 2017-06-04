/**
 * Module that provides functionality of sharing data between two different controllers.
 * 
 * @author Tomislav Čavka
 */
'use strict';

var shareDataModule = angular.module('shareDataModule', []);

shareDataModule.factory('Data', function () {

    var data = {
        AuthenticatedUser: {
            userId: undefined,
            roles: [],
            username: '',
            role: ''
        }       
    };

    return {
        getAuthenticatedUser: function () {
            return data.AuthenticatedUser;
        },
        setAuthenticatedUser: function (authenticatedUser) {
            data.AuthenticatedUser = authenticatedUser;
        }
    };
});

