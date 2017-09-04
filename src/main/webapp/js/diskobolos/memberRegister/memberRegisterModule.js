/* global moment */

/**
 * AngularJS controller responsible for fetching, creation, edit and deletion of the member register data.
 * 
 * @author Tomislav Čavka
 * 
 */
var memberRegisterModule = angular.module('memberRegisterModule', []);

memberRegisterModule.controller('memberRegisterController', function (
        $scope,
        $rootScope,
        _,
        MemberRegisterDataFactory,
        $uibModal,
        DTOptionsBuilder,
        DTColumnDefBuilder,
        LocationDataFactory,
        MembershipCategoryDataFactory,
        SweetAlert,
        toaster,
        dataTableUtils) {

    $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withDOM('<"html5buttons"B>lTfgitp')
            .withLanguage(dataTableUtils.getDataTableTranslations())
            .withOption('order', [0, 'asc'])
            .withOption('stateSave', true)
            .withPaginationType('full_numbers')
            .withButtons(dataTableUtils.getDataTableButtons([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], true))
            .withOption('select', true)
            .withOption('responsive', true);

    $scope.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(-1).withOption('responsivePriority', 1),
        DTColumnDefBuilder.newColumnDef(-2).withOption('responsivePriority', 2),
        DTColumnDefBuilder.newColumnDef(-3).withOption('responsivePriority', 3)
    ];

    $scope.$on('selectedMemberRegister', function (ev, selectedMemberRegister) {
        $rootScope.selectedMemberRegister = selectedMemberRegister;
    });

    $scope.memberRegisters = {
        bankAccounts: [],
        chairman: undefined,
        dateFrom: undefined,
        dateTo: undefined,
        emails: [],
        fax: undefined,
        id: undefined,
        identificationNumber: undefined,
        location: [],
        membershipCategory: {},
        sportCategory: {},
        name: undefined,
        numberOfNonProfitOrg: undefined,
        oib: undefined,
        phones: [],
        registerNumber: undefined,
        registrationDate: undefined,
        secretary: undefined
    };

    $scope.$on('memberRegisters', function (ev, memberRegisters) {
        $scope.memberRegisters = memberRegisters;
    });

    $scope.locations = {};
    $scope.membershipCategories = {};

    $scope.getMemberRegisters = function () {

        MemberRegisterDataFactory.getAllMemberRegisters({}, function (response) {
            //success
            $scope.memberRegisters = response.memberRegisters;

            for (var n = 0; n < $scope.memberRegisters.length; n++) {
                $scope.memberRegisters[n].phone = '';
                $scope.memberRegisters[n].fax = '';
                $scope.memberRegisters[n].mobile = '';
                $scope.memberRegisters[n].email = '';
                $scope.memberRegisters[n].bankAccount = '';
                // transform emails array to the one row string
                for (var j = 0; j < $scope.memberRegisters[n].emails.length; j++) {
                    $scope.memberRegisters[n].email += $scope.memberRegisters[n].emails[j].email + (j === $scope.memberRegisters[n].emails.length - 1 ? '' : ', ');
                }
                
                // transform phones array to the one row string
                for (var p = 0; p < $scope.memberRegisters[n].phones.length; p++) {
                    switch ($scope.memberRegisters[n].phones[p].phoneType) {
                        case 'PHONE':
                            $scope.memberRegisters[n].phone += (_.isEmpty($scope.memberRegisters[n].phone) ? '' : ', ') + $scope.memberRegisters[n].phones[p].phoneNumber;
                            break;
                        case 'FAX':
                            $scope.memberRegisters[n].fax += (_.isEmpty($scope.memberRegisters[n].fax) ? '' : ', ') + $scope.memberRegisters[n].phones[p].phoneNumber;
                            break;
                        case 'MOBILE':
                            $scope.memberRegisters[n].mobile += (_.isEmpty($scope.memberRegisters[n].mobile) ? '' : ', ') + $scope.memberRegisters[n].phones[p].phoneNumber;
                            break;
                        default:
                            break;
                    }
                }

                // transform bank accounts array to the one row string
                for (var k = 0; k < $scope.memberRegisters[n].bankAccounts.length; k++) {
                    $scope.memberRegisters[n].bankAccount += $scope.memberRegisters[n].bankAccounts[k].accountNumber + (k === $scope.memberRegisters[n].bankAccounts.length - 1 ? '' : ', ');
                }
                
                if($scope.memberRegisters[n].membershipCategory.description === 'UNKNOWN') {
                    $scope.memberRegisters[n].membershipCategory.description = '';
                }
                
                if($scope.memberRegisters[n].sportCategory.name === 'UNKNOWN') {
                    $scope.memberRegisters[n].sportCategory.name = '';
                }
            }

            LocationDataFactory.getAllLocations({}, function (response) {
                $scope.locations = response.locations;

                if (_.isArray($scope.memberRegisters) && $scope.memberRegisters.length > 0) {
                    for (var i = 0; i < $scope.memberRegisters.length; i++) {
                        $scope.memberRegisters[i].locations = $scope.locations;
                    }
                }

                MembershipCategoryDataFactory.getAllMembershipCategories({}, function (response) {
                    $scope.membershipCategories = _.filter(response.membershipCategories, function (obj) {
                       return obj.description !== 'UNKNOWN';
                    });

                    if (_.isArray($scope.memberRegisters) && $scope.memberRegisters.length > 0) {
                        for (var i = 0; i < $scope.memberRegisters.length; i++) {
                            $scope.memberRegisters[i].membershipCategories = $scope.membershipCategories;
                        }
                    }
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
        },
                function (error) {
                    //fail
                    $scope.error = error;
                });
    };
    
    $scope.editData = function (id) {

        $rootScope.selectedMemberRegister = _.find($scope.memberRegisters, function (obj) {
            return obj.id === id;
        });
        
        //broadcast selected member register item
        $rootScope.$broadcast('selectedMemberRegister', $rootScope.selectedMemberRegister);

        var modalInstance = $uibModal.open({
            templateUrl: 'views/memberRegisterModal.html',
            size: 'lg',
            controller: 'EditMemberRegisterModalCtrl',
            scope: $scope
        });

        $scope.sampleDate = new Date();

        modalInstance.result.then(function (response) {
            console.log('Modal name', 'memberRegisterModal.html');
        });
    };

    $scope.createData = function () {

        var modalInstance = $uibModal.open({
            templateUrl: 'views/memberRegisterModal.html',
            size: 'lg',
            controller: 'CreateMemberRegisterModalCtrl',
            scope: $scope
        });

        modalInstance.result.then(function (response) {
            console.log('Modal for creation of a member register item: ', 'memberRegisterModal.html');
        });
    };

    $scope.deleteData = function (id) {

        $rootScope.selectedMemberRegister = _.find($scope.memberRegisters, function (obj) {
            return obj.id === id;
        });
        
        //broadcast selected member register item
        $rootScope.$broadcast('selectedMemberRegister', $rootScope.selectedMemberRegister);

        SweetAlert.swal({
            title: "Da li ste sigurni da želite obrisati odabranu stavku?",
            text: "Nakon brisanja podaci će zauvijek biti izbrisani!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Potvrdi",
            cancelButtonText: "Odustani",
            closeOnConfirm: true,
            closeOnCancel: true},
                function (isConfirm) {
                    if (isConfirm) {
                        MemberRegisterDataFactory.deleteMemberRegisterData($rootScope.selectedMemberRegister, function (response) {

                            if (response.result === 200) {
                                console.log('Member register data is successfully deleted.');

                                toaster.pop({
                                    type: 'info',
                                    title: 'Uspješna brisanje stavke',
                                    body: "Odabrana stavka je uspješno obrisana.",
                                    showCloseButton: true,
                                    timeout: 5000
                                });

                                MemberRegisterDataFactory.getAllMemberRegisters({}, function (response) {
                                    //success
                                    $scope.memberRegisters = response.memberRegisters;

                                    LocationDataFactory.getAllLocations({}, function (response) {
                                        $scope.locations = response.locations;

                                        if (_.isArray($scope.memberRegisters) && $scope.memberRegisters.length > 0) {
                                            for (var i = 0; i < $scope.memberRegisters.length; i++) {
                                                $scope.memberRegisters[i].locations = $scope.locations;
                                            }
                                        }

                                        MembershipCategoryDataFactory.getAllMembershipCategories({}, function (response) {
                                            $scope.membershipCategories = _.filter(response.membershipCategories, function (obj) {
                                                return obj.description !== 'UNKNOWN';
                                            });

                                            if (_.isArray($scope.memberRegisters) && $scope.memberRegisters.length > 0) {
                                                for (var i = 0; i < $scope.memberRegisters.length; i++) {
                                                    $scope.memberRegisters[i].membershipCategories = $scope.membershipCategories;
                                                }
                                            }
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

                                    $rootScope.$broadcast('memberRegisters', $scope.memberRegisters);
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
                                        body: "Greška prilikom brisanja odabrane stavke ",
                                        showCloseButton: true,
                                        timeout: 5000
                                    });
                                });
                    }
                });
    };

    $scope.getMemberRegisters();
});

// Controller that is responsible for member register edit functionality
memberRegisterModule.controller('EditMemberRegisterModalCtrl', function (
        $scope,
        $rootScope,
        $uibModalInstance,
        _,
        AppConstants,
        MemberRegisterDataFactory,
        toaster,
        LocationDataFactory,
        MembershipCategoryDataFactory,
        SportDataFactory) {

    $scope.crudAction = AppConstants.CrudActions['edit'];

    $scope.data = {};
    $scope.data = $rootScope.selectedMemberRegister;
    $scope.data.phonesTags = [];
    $scope.data.mobilesTags = [];
    $scope.data.faxesTags = [];
    $scope.data.bankAccountsTags = [];
    $scope.data.emailsTags = [];
    $scope.locations = [];
    $scope.membershipCategories = [];
    // initialization of the address object
    $scope.address = {country: {}};

    // sets default value for location dropdown
    $scope.location = {selected: {}};
    $scope.location.selected = $rootScope.selectedMemberRegister.location;

    // sets default value for membership category dropdown
    $scope.membershipCategory = {selected: {}};
    $scope.membershipCategory.selected = $rootScope.selectedMemberRegister.membershipCategory;
    // sets default value for sport category dropdown
    $scope.sportCategory = {selected: {}};
    $scope.sportCategory.selected = $rootScope.selectedMemberRegister.sportCategory;  

    if (_.isArray($scope.data.locations) && $scope.data.locations.length > 0) {
        for (var i = 0; i < $scope.data.locations.length; i++) {
            $scope.locations.push($scope.data.locations[i]);
        }
    }

    if (_.isArray($scope.data.membershipCategories) && $scope.data.membershipCategories.length > 0) {
        for (var i = 0; i < $scope.data.membershipCategories.length; i++) {
            if($scope.data.membershipCategories[i].description !== 'UNKNOWN') {
                $scope.membershipCategories.push($scope.data.membershipCategories[i]);
            }
            
            if($scope.data.membershipCategories[i].description === 'SPORT') {
                SportDataFactory.getAllSports({}, function (response) {
                    $scope.sportCategories = _.filter(response.sports, function (obj) {
                        return obj.name !== 'UNKNOWN';
                    });
                    $scope.sportCategoryDisabled = false;
                },
                function (error) {
                    //fail
                    $scope.sportCategoryDisabled = true;
                    $scope.error = error;
                });
            }
        }
    }

    // initializes list of bank accounts for tag input element
    if (_.isArray($scope.data.bankAccounts) && $scope.data.bankAccounts.length > 0) {
        for (var i = 0; i < $scope.data.bankAccounts.length; i++) {
            $scope.data.bankAccountsTags.push({alreadyExists: true, id: $scope.data.bankAccounts[i].id, text: $scope.data.bankAccounts[i].accountNumber});
        }
    }

    // initializes list of emails for tag input element
    if (_.isArray($scope.data.emails) && $scope.data.emails.length > 0) {
        for (var i = 0; i < $scope.data.emails.length; i++) {
            $scope.data.emailsTags.push({alreadyExists: true, id: $scope.data.emails[i].id, text: $scope.data.emails[i].email});
        }
    }
    
    // initializes list of phones, mobile phones and faxes for tag input element
    if (_.isArray($scope.data.phones) && $scope.data.phones.length > 0) {
        for (var p = 0; p < $scope.data.phones.length; p++) {
            switch ($scope.data.phones[p].phoneType) {
                case 'PHONE':
                    $scope.data.phonesTags.push({alreadyExists: true, id: $scope.data.phones[p].id, text: $scope.data.phones[p].phoneNumber});
                    break;
                case 'FAX':
                    $scope.data.faxesTags.push({alreadyExists: true, id: $scope.data.phones[p].id, text: $scope.data.phones[p].phoneNumber});
                    break;
                case 'MOBILE':
                    $scope.data.mobilesTags.push({alreadyExists: true, id: $scope.data.phones[p].id, text: $scope.data.phones[p].phoneNumber});
                    break;
                default:
                    break;
            }
        }
    }
    
    $scope.loadSports = function($item, $model) {
        
        if($item.description === 'SPORT') {
            SportDataFactory.getAllSports({}, function (response) {
                $scope.sportCategories = _.filter(response.sports, function (obj) {
                    return obj.name !== 'UNKNOWN';
                });
                $scope.sportCategoryDisabled = false;
            },
            function (error) {
                //fail
                $scope.sportCategoryDisabled = true;
                $scope.error = error;
            });
        }
         
         $scope.sportCategory.selected = '';
         $scope.sportCategories = [];
    };

    $scope.ok = function () {
        // initialize data transfer object
        $scope.memberRegisterDto = {};
        $scope.memberRegisterDto = $scope.data;
        $scope.memberRegisterDto.phonesDto = [];
        $scope.memberRegisterDto.location = $scope.location.selected;
        $scope.memberRegisterDto.membershipCategory = $scope.membershipCategory.selected;
        if(!_.isUndefined($scope.sportCategory.selected) && !_.isEmpty($scope.sportCategory.selected)) {            
            $scope.memberRegisterDto.sportCategory = $scope.sportCategory.selected;
        }

        $scope.memberRegisterDto.phonesDto.push({category: 'PHONE', data: $scope.data.phonesTags});
        $scope.memberRegisterDto.phonesDto.push({category: 'MOBILE', data: $scope.data.mobilesTags});
        $scope.memberRegisterDto.phonesDto.push({category: 'FAX', data: $scope.data.faxesTags});
        $scope.memberRegisterDto.removedPhones = $scope.getRemovedItems($scope.memberRegisterDto.phonesDto);
        
        for (var i = 0; i < $scope.data.bankAccountsTags.length; i++) {
            if (_.isUndefined($scope.data.bankAccountsTags[i].alreadyExists)) {
                $scope.memberRegisterDto.bankAccounts.push({accountDescription: '', bankAccountType: 'ACCOUNT_NUMBER', accountNumber: $scope.data.bankAccountsTags[i].text, id: 0});
            }
        }

        for (var i = 0; i < $scope.data.emailsTags.length; i++) {
            if (_.isUndefined($scope.data.emailsTags[i].alreadyExists)) {
                $scope.memberRegisterDto.emails.push({id: 0, email: $scope.data.emailsTags[i].text});
            }
        }
        
        // find removed items
        $scope.memberRegisterDto.removedBankAccounts = $scope.findRemovedItems($scope.data.bankAccounts, $scope.data.bankAccountsTags);
        $scope.memberRegisterDto.removedEmails = $scope.findRemovedItems($scope.data.emails, $scope.data.emailsTags);

        // delete properties that are not the part of the model before sending to the service
        delete $scope.memberRegisterDto.bankAccountsTags;
        delete $scope.memberRegisterDto.emailsTags;
        delete $scope.memberRegisterDto.locations;
        delete $scope.memberRegisterDto.membershipCategories;

        $scope.memberRegisterDto.dateFrom = new Date($scope.memberRegisterDto.dateFrom);
        $scope.memberRegisterDto.dateTo = new Date($scope.memberRegisterDto.dateTo);
        $scope.memberRegisterDto.registrationDate = new Date($scope.memberRegisterDto.registrationDate);

        MemberRegisterDataFactory.editSelectedMemberRegister($scope.memberRegisterDto, function (response) {
            if (response.result === 200) {
                console.log('Member register data is successfully edited.');

                toaster.pop({
                    type: 'info',
                    title: 'Uspješna izmjena stavke',
                    body: "Podaci za odabranu stavku su uspješno izmijenjeni.",
                    showCloseButton: true,
                    timeout: 5000
                });

                MemberRegisterDataFactory.getAllMemberRegisters({}, function (response) {
                    //success
                    $scope.memberRegisters = response.memberRegisters;

                    for (var n = 0; n < $scope.memberRegisters.length; n++) {
                        $scope.memberRegisters[n].phone = '';
                        $scope.memberRegisters[n].fax = '';
                        $scope.memberRegisters[n].mobile = '';
                        $scope.memberRegisters[n].email = '';
                        $scope.memberRegisters[n].bankAccount = '';
                        // transform emails array to the one row string
                        for (var j = 0; j < $scope.memberRegisters[n].emails.length; j++) {
                            $scope.memberRegisters[n].email += $scope.memberRegisters[n].emails[j].email + (j === $scope.memberRegisters[n].emails.length - 1 ? '' : ', ');
                        }

                        // transform bank accounts array to the one row string
                        for (var k = 0; k < $scope.memberRegisters[n].bankAccounts.length; k++) {
                            $scope.memberRegisters[n].bankAccount += $scope.memberRegisters[n].bankAccounts[k].accountNumber + (k === $scope.memberRegisters[n].bankAccounts.length - 1 ? '' : ', ');
                        }
                        
                        // transform phones array to the one row string
                        for (var p = 0; p < $scope.memberRegisters[n].phones.length; p++) {
                            switch ($scope.memberRegisters[n].phones[p].phoneType) {
                                case 'PHONE':
                                    $scope.memberRegisters[n].phone += (_.isEmpty($scope.memberRegisters[n].phone) ? '' : ', ') + $scope.memberRegisters[n].phones[p].phoneNumber;
                                    break;
                                case 'FAX':
                                    $scope.memberRegisters[n].fax += (_.isEmpty($scope.memberRegisters[n].fax) ? '' : ', ') + $scope.memberRegisters[n].phones[p].phoneNumber;
                                    break;
                                case 'MOBILE':
                                    $scope.memberRegisters[n].mobile += (_.isEmpty($scope.memberRegisters[n].mobile) ? '' : ', ') + $scope.memberRegisters[n].phones[p].phoneNumber;
                                    break;
                                default:
                                    break;
                            }
                        }
                        
                        if($scope.memberRegisters[n].membershipCategory.description === 'UNKNOWN') {
                            $scope.memberRegisters[n].membershipCategory.description = '';
                        }
                
                        if($scope.memberRegisters[n].sportCategory.name === 'UNKNOWN') {
                            $scope.memberRegisters[n].sportCategory.name = '';
                        }
                    }

                    LocationDataFactory.getAllLocations({}, function (response) {
                        $scope.locations = response.locations;

                        if (_.isArray($scope.memberRegisters) && $scope.memberRegisters.length > 0) {
                            for (var i = 0; i < $scope.memberRegisters.length; i++) {
                                $scope.memberRegisters[i].locations = $scope.locations;
                            }
                        }

                        MembershipCategoryDataFactory.getAllMembershipCategories({}, function (response) {
                            $scope.membershipCategories = _.filter(response.membershipCategories, function (obj) {
                                return obj.description !== 'UNKNOWN';
                            });

                            if (_.isArray($scope.memberRegisters) && $scope.memberRegisters.length > 0) {
                                for (var i = 0; i < $scope.memberRegisters.length; i++) {
                                    $scope.memberRegisters[i].membershipCategories = $scope.membershipCategories;
                                }
                            }
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

                    $rootScope.$broadcast('memberRegisters', $scope.memberRegisters);
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
                        body: "Greška prilikom izmjene odabrane stavke",
                        showCloseButton: true,
                        timeout: 5000
                    });
                });

        $uibModalInstance.close();
    };

    /** Function that will delete all the removed items from the original list of items
     * 
     * @param {Array} listOfItems original list of items
     * @param {Array} tagsList list that is bind to the tag element
     * @returns {Array|memberRegisterModule_L112.$scope.removedItems}
     */
    $scope.findRemovedItems = function (listOfItems, tagsList) {
        $scope.removedItems = [];

        if (listOfItems.length > tagsList.length) {
            for (var i = 0; i < listOfItems.length; i++) {

                var removedItemObj = _.find(tagsList, function (obj) {
                    return obj.id === listOfItems[i].id;
                });

                if (_.isUndefined(removedItemObj)) {
                    $scope.removedItems.push(listOfItems[i]);
                }
            }
        }

        return $scope.removedItems;
    };
    
    $scope.getRemovedItems = function (listOfTagItems) {
        $scope.addedItems = [];
        $scope.removedItemsList = [];
        for (var i = 0; i < $rootScope.selectedMemberRegister.phones.length; i++) {
            for (var j = 0; j < listOfTagItems.length; j++) {
                for (var k = 0; k < listOfTagItems[j].data.length; k++) {

                    var addedItemObj = _.find($scope.addedItems, function (obj) {
                        return obj.id === listOfTagItems[j].data[k].id;
                    });
                    if (_.isUndefined(addedItemObj)) {
                        $scope.addedItems.push(listOfTagItems[j].data[k]);
                    }
                }
            }
        }

        for (var n = 0; n < $scope.selectedMemberRegister.phones.length; n++) {

            var addedItemObj = _.find($scope.addedItems, function (obj) {
                return obj.id === $scope.selectedMemberRegister.phones[n].id;
            });
            if (_.isUndefined(addedItemObj)) {
                $scope.removedItemsList.push($scope.selectedMemberRegister.phones[n]);
            }
        }

        return $scope.removedItemsList;
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

// Controller that is responsible for member register create functionality
memberRegisterModule.controller('CreateMemberRegisterModalCtrl', function (
        $scope,
        $rootScope,
        $uibModalInstance,
        _,
        AppConstants,
        MemberRegisterDataFactory,
        toaster,
        LocationDataFactory,
        MembershipCategoryDataFactory,
        $timeout,
        SportDataFactory) {

    $scope.crudAction = AppConstants.CrudActions['create'];

    $scope.data = {};
    $scope.data.bankAccountsTags = [];
    $scope.data.emailsTags = [];
    $scope.locations = [];
    $scope.membershipCategories = [];
    $scope.location = {
        countryCode: '',
        address: '',
        longitude: undefined,
        latitude: undefined,
        postalCode: undefined,
        city: ''
    };
    $scope.membershipCategory = {selected: {}};
    $scope.sportCategory = {selected: {}};
    $scope.sportCategoryDisabled = true;

    // initialization of the date fields
//    $scope.data.dateFrom = new Date().toLocaleFormat(); // toLocaleFormat() doesn't work on Chrome
    $scope.data.dateFrom = moment(new Date()).format('YYYY-MM-DD');
//    $scope.data.dateTo = new Date().toLocaleFormat(); // toLocaleFormat() doesn't work on Chrome
    $scope.data.dateTo = moment(new Date()).format('YYYY-MM-DD');
//    $scope.data.registrationDate = new Date().toLocaleFormat(); // toLocaleFormat() doesn't work on Chrome
    $scope.data.registrationDate = moment(new Date()).format('YYYY-MM-DD');

    $scope.init = function () {
        LocationDataFactory.getAllLocations({}, function (response) {
            $scope.locations = response.locations;

            MembershipCategoryDataFactory.getAllMembershipCategories({}, function (response) {
                $scope.membershipCategories = _.filter(response.membershipCategories, function (obj) {
                    return obj.description !== 'UNKNOWN';
                });
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
    
    $scope.loadSports = function($item, $model) {
        
        if($item.description === 'SPORT') {
            SportDataFactory.getAllSports({}, function (response) {
                
                $scope.sportCategories = _.filter(response.sports, function (obj) {
                    return obj.name !== 'UNKNOWN';
                });
                $scope.sportCategoryDisabled = false;
            },
            function (error) {
                //fail
                $scope.sportCategoryDisabled = true;
                $scope.error = error;
            });
        }
         
         $scope.sportCategory.selected = '';
         $scope.sportCategories = [];
    };

    $scope.ok = function () {
        // initialize data transfer object
        $scope.memberRegisterDto = {};
        $scope.memberRegisterDto = $scope.data;
        $scope.memberRegisterDto.phonesDto = [];
        $scope.memberRegisterDto.bankAccounts = [];
        $scope.memberRegisterDto.emails = [];
        $scope.memberRegisterDto.location = $scope.location;
        $scope.memberRegisterDto.membershipCategory = $scope.membershipCategory.selected;
        $scope.memberRegisterDto.sportCategory = $scope.sportCategory.selected;
        
        $scope.memberRegisterDto.phonesDto.push({category: 'PHONE', data: $scope.data.phonesTags});
        $scope.memberRegisterDto.phonesDto.push({category: 'MOBILE', data: $scope.data.mobilesTags});
        $scope.memberRegisterDto.phonesDto.push({category: 'FAX', data: $scope.data.faxesTags});

        for (var i = 0; i < $scope.data.bankAccountsTags.length; i++) {
            $scope.memberRegisterDto.bankAccounts.push({accountDescription: '', bankAccountType: 'ACCOUNT_NUMBER', accountNumber: $scope.data.bankAccountsTags[i].text, id: null});
        }

        for (var i = 0; i < $scope.data.emailsTags.length; i++) {
            $scope.memberRegisterDto.emails.push({id: null, email: $scope.data.emailsTags[i].text});
        }

        // delete properties that are not the part of the model before sending to the service
        delete $scope.memberRegisterDto.bankAccountsTags;
        delete $scope.memberRegisterDto.emailsTags;
        delete $scope.memberRegisterDto.locations;
        delete $scope.memberRegisterDto.membershipCategories;

        $scope.memberRegisterDto.dateFrom = new Date($scope.memberRegisterDto.dateFrom);
        $scope.memberRegisterDto.dateTo = new Date($scope.memberRegisterDto.dateTo);
        $scope.memberRegisterDto.registrationDate = new Date($scope.memberRegisterDto.registrationDate);

        MemberRegisterDataFactory.createMemberRegisterData($scope.memberRegisterDto, function (response) {

                if (response.result === 200) {
                    console.log('Member register data is successfully created.');

                    toaster.pop({
                        type: 'info',
                        title: 'Uspješna izmjena stavke',
                        body: "Podaci za odabranu stavku su uspješno kreirani.",
                        showCloseButton: true,
                        timeout: 5000
                    });

                    MemberRegisterDataFactory.getAllMemberRegisters({}, function (response) {
                        //success
                        $scope.memberRegisters = response.memberRegisters;

                        for (var n = 0; n < $scope.memberRegisters.length; n++) {
                            $scope.memberRegisters[n].phone = '';
                            $scope.memberRegisters[n].fax = '';
                            $scope.memberRegisters[n].mobile = '';
                            $scope.memberRegisters[n].email = '';
                            $scope.memberRegisters[n].bankAccount = '';
                            // transform emails array to the one row string
                            for (var j = 0; j < $scope.memberRegisters[n].emails.length; j++) {
                                $scope.memberRegisters[n].email += $scope.memberRegisters[n].emails[j].email + (j === $scope.memberRegisters[n].emails.length - 1 ? '' : ', ');
                            }

                            // transform bank accounts array to the one row string
                            for (var k = 0; k < $scope.memberRegisters[n].bankAccounts.length; k++) {
                                $scope.memberRegisters[n].bankAccount += $scope.memberRegisters[n].bankAccounts[k].accountNumber + (k === $scope.memberRegisters[n].bankAccounts.length - 1 ? '' : ', ');
                            }

                            // transform phones array to the one row string
                            for (var p = 0; p < $scope.memberRegisters[n].phones.length; p++) {
                                switch ($scope.memberRegisters[n].phones[p].phoneType) {
                                    case 'PHONE':
                                        $scope.memberRegisters[n].phone += (_.isEmpty($scope.memberRegisters[n].phone) ? '' : ', ') + $scope.memberRegisters[n].phones[p].phoneNumber;
                                        break;
                                    case 'FAX':
                                        $scope.memberRegisters[n].fax += (_.isEmpty($scope.memberRegisters[n].fax) ? '' : ', ') + $scope.memberRegisters[n].phones[p].phoneNumber;
                                        break;
                                    case 'MOBILE':
                                        $scope.memberRegisters[n].mobile += (_.isEmpty($scope.memberRegisters[n].mobile) ? '' : ', ') + $scope.memberRegisters[n].phones[p].phoneNumber;
                                        break;
                                    default:
                                        break;
                                }
                            }
                            
                            if($scope.memberRegisters[n].membershipCategory.description === 'UNKNOWN') {
                                $scope.memberRegisters[n].membershipCategory.description = '';
                            }

                            if($scope.memberRegisters[n].sportCategory.name === 'UNKNOWN') {
                                $scope.memberRegisters[n].sportCategory.name = '';
                            }
                        }

                        LocationDataFactory.getAllLocations({}, function (response) {
                            $scope.locations = response.locations;

                            if (_.isArray($scope.memberRegisters) && $scope.memberRegisters.length > 0) {
                                for (var i = 0; i < $scope.memberRegisters.length; i++) {
                                    $scope.memberRegisters[i].locations = $scope.locations;
                                }
                            }

                            MembershipCategoryDataFactory.getAllMembershipCategories({}, function (response) {
                                $scope.membershipCategories = _.filter(response.membershipCategories, function (obj) {
                                    return obj.description !== 'UNKNOWN';
                                });

                                if (_.isArray($scope.memberRegisters) && $scope.memberRegisters.length > 0) {
                                    for (var i = 0; i < $scope.memberRegisters.length; i++) {
                                        $scope.memberRegisters[i].membershipCategories = $scope.membershipCategories;
                                    }
                                }
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

                        $rootScope.$broadcast('memberRegisters', $scope.memberRegisters);
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
                    body: "Greška prilikom kreiranja stavke ",
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

    /**
     * Function that searches geographical data for provided address
     * 
     * @param {type} address for which geographic data will be found
     * @returns {undefined}
     */
    $scope.findCoordinatesForAddress = function (location) {
        var geocoder = new google.maps.Geocoder();
        if (!_.isEmpty(location)) {
            geocoder.geocode({"address": location}, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
                    $timeout(function () {
                        $scope.location.latitude = results[0].geometry.location.lat();
                        $scope.location.longitude = results[0].geometry.location.lng();
                        for (var i = 0; i < results[0].address_components.length; i++) {
                            for (var j = 0; j < results[0].address_components[i].types.length; j++) {
                                if (results[0].address_components[i].types[j] === "country")
                                    $scope.location.countryCode = results[0].address_components[i].short_name;
                                if (results[0].address_components[i].types[j] === "postal_code")
                                    $scope.location.postalCode = results[0].address_components[i].short_name;
                                if (results[0].address_components[i].types[j] === "route")
                                    $scope.location.address = results[0].address_components[i].long_name;
                                if (results[0].address_components[i].types[j] === "street_number")
                                    $scope.location.streetNumber = results[0].address_components[i].short_name;
                                if (results[0].address_components[i].types[j] === "locality") {
                                    $scope.location.city = results[0].address_components[i].long_name;
                                    $scope.data.location.city = $scope.location.city;
                                }
                            }
                        }

                        $scope.location.address = $scope.location.address + ' ' + $scope.location.streetNumber;
                        delete $scope.location.streetNumber;
                    }, 0);
                } else {
                    toaster.pop({
                        type: 'error',
                        title: 'Greška',
                        body: 'Za upisanu adresu nije moguće dohvatiti podatke!',
                        showCloseButton: true,
                        timeout: 5000
                    });
                }
            });
        }
    };

    $scope.init();
});

