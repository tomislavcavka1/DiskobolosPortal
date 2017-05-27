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
        DTColumnBuilder,
        $compile,
        LocationDataFactory,
        MembershipCategoryDataFactory,
        SweetAlert,
        toaster) {

    var language = {
        "sEmptyTable": "Nema podataka u tablici",
        "sInfo": "Prikazano _START_ do _END_ od _TOTAL_ rezultata",
        "sInfoEmpty": "Prikazano 0 do 0 od 0 rezultata",
        "sInfoFiltered": "(filtrirano iz _MAX_ ukupnih rezultata)",
        "sInfoPostFix": "",
        "sInfoThousands": ",",
        "sLengthMenu": "Prikaži _MENU_ rezultata po stranici",
        "sLoadingRecords": "Dohvaćam...",
        "sProcessing": "Obrađujem...",
        "sSearch": "Pretraži:",
        "sZeroRecords": "Ništa nije pronađeno",
        "oPaginate": {
            "sFirst": "Prva",
            "sPrevious": "Nazad",
            "sNext": "Naprijed",
            "sLast": "Zadnja"
        },
        "oAria": {
            "sSortAscending": ": aktiviraj za rastući poredak",
            "sSortDescending": ": aktiviraj za padajući poredak"
        }
    }

    $scope.vm = {};
    $scope.vm.dtInstance = {};


    $scope.childInfo = function (user, event) {

        var scope = $scope.$new(true);
        scope.user = user;

        var link = angular.element(event.currentTarget),
                icon = link.find('.glyphicon'),
                tr = link.parent().parent(),
                table = $scope.vm.dtInstance.DataTable,
                row = table.row(tr);
        //
        if (row.child.isShown()) {
            icon.removeClass('glyphicon glyphicon-chevron-up').addClass('glyphicon glyphicon-chevron-down');
            row.child.hide();
            tr.removeClass('shown');
        } else {
            icon.removeClass('glyphicon glyphicon-chevron-down').addClass('glyphicon glyphicon-chevron-up');
            row.child($compile('<div tmpl class="clearfix"></div>')(scope)).show();
            tr.addClass('shown');
        }
    }


    $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withDOM('<"html5buttons"B>lTfgitp')
            .withLanguage(language)
            .withOption('order', [0, 'asc'])
            .withPaginationType('full_numbers')
            .withButtons([
                {extend: 'colvis', text: 'Prikaz polja u tablici', columns: [1, 2, 3, 4]},
                {extend: 'copy', text: 'Kopiraj'},
                {extend: 'csv'},
                {extend: 'excel', title: 'ExampleFile'},
                {extend: 'pdf', title: 'ExampleFile', exportOptions: {
                        columns: [1, 2, 3, 4]
                    }},
                {extend: 'print', text: 'Ispis',
                    customize: function (win) {
                        $(win.document.body).addClass('white-bg');
                        $(win.document.body).css('font-size', '10px');

                        $(win.document.body).find('table')
                                .addClass('compact')
                                .css('font-size', 'inherit');
                    }
                }
            ]);

    $scope.$on('selectedMemberRegister', function (ev, selectedMemberRegister) {
        $rootScope.selectedMemberRegister = selectedMemberRegister;
    });

    $scope.memberRegisters = {};

    $scope.$on('memberRegisters', function (ev, memberRegisters) {
        $scope.memberRegisters = memberRegisters;
    });

    $scope.locations = {};
    $scope.membershipCategories = {};

    $scope.getMemberRegisters = function () {

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
                    $scope.membershipCategories = response.membershipCategories;

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
                                            $scope.membershipCategories = response.membershipCategories;

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
        $timeout) {

    $scope.crudAction = AppConstants.CrudActions['edit'];

    $scope.data = {};
    $scope.data = $rootScope.selectedMemberRegister;
    $scope.data.bankAccountsTags = [];
    $scope.data.emailsTags = [];
    $scope.locations = [];
    $scope.membershipCategories = [];
    // initialization of the address object
    $scope.address = {country: {}};

    // sets default value for location dropdown
    $scope.location = {selected: {}};
    $scope.location.selected = $rootScope.selectedMemberRegister.location;

    // sets default value for membership categpry dropdown
    $scope.membershipCategory = {selected: {}};
    $scope.membershipCategory.selected = $rootScope.selectedMemberRegister.membershipCategory;

    if (_.isArray($scope.data.locations) && $scope.data.locations.length > 0) {
        for (var i = 0; i < $scope.data.locations.length; i++) {
            $scope.locations.push($scope.data.locations[i]);
        }
    }

    if (_.isArray($scope.data.membershipCategories) && $scope.data.membershipCategories.length > 0) {
        for (var i = 0; i < $scope.data.membershipCategories.length; i++) {
            $scope.membershipCategories.push($scope.data.membershipCategories[i]);
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

    $scope.ok = function () {
        // initialize data transfer object
        $scope.memberRegisterDto = {};
        $scope.memberRegisterDto = $scope.data;
        $scope.memberRegisterDto.location = $scope.location.selected;
        $scope.memberRegisterDto.membershipCategory = $scope.membershipCategory.selected;

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

                    LocationDataFactory.getAllLocations({}, function (response) {
                        $scope.locations = response.locations;

                        if (_.isArray($scope.memberRegisters) && $scope.memberRegisters.length > 0) {
                            for (var i = 0; i < $scope.memberRegisters.length; i++) {
                                $scope.memberRegisters[i].locations = $scope.locations;
                            }
                        }

                        MembershipCategoryDataFactory.getAllMembershipCategories({}, function (response) {
                            $scope.membershipCategories = response.membershipCategories;

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

    /**
     * Function that searches geographical data for provided address
     * 
     * @param {type} address for which geographic data will be found
     * @returns {undefined}
     */
    $scope.findCoordinatesForAddress = function (address) {
        var geocoder = new google.maps.Geocoder();
        if (!_.isEmpty(address)) {
            geocoder.geocode({"address": address}, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
                    $timeout(function () {
                        $scope.address.latitude = results[0].geometry.location.lat();
                        $scope.address.longitude = results[0].geometry.location.lng();
                        for (var i = 0; i < results[0].address_components.length; i++) {
                            for (var j = 0; j < results[0].address_components[i].types.length; j++) {
                                if (results[0].address_components[i].types[j] === "country")
                                    $scope.address.country.isoCode2 = results[0].address_components[i].short_name;
                                if (results[0].address_components[i].types[j] === "postal_code")
                                    $scope.address.municipalityNumber = results[0].address_components[i].short_name;
                                if (results[0].address_components[i].types[j] === "route")
                                    $scope.address.street = results[0].address_components[i].long_name;
                                if (results[0].address_components[i].types[j] === "street_number")
                                    $scope.address.streetNumber = results[0].address_components[i].short_name;
                                if (results[0].address_components[i].types[j] === "locality")
                                    $scope.address.city = results[0].address_components[i].long_name;
                            }
                        }
                    }, 0);
                } else {
                    toaster.pop({
                        type: 'error',
                        title: 'Greška',
                        body: 'Cannot find coordinates for filled in address: ' + address,
                        showCloseButton: true,
                        timeout: 5000
                    });
                }
            });
        }
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
        MembershipCategoryDataFactory) {

    $scope.crudAction = AppConstants.CrudActions['create'];

    $scope.data = {};
    $scope.data.bankAccountsTags = [];
    $scope.data.emailsTags = [];
    $scope.locations = [];
    $scope.membershipCategories = [];
    $scope.location = {selected: {}};
    $scope.membershipCategory = {selected: {}};

    // initialization of the date fields
    $scope.data.dateFrom = new Date();
    $scope.data.dateTo = new Date();
    $scope.data.registrationDate = new Date();

    $scope.init = function () {
        LocationDataFactory.getAllLocations({}, function (response) {
            $scope.locations = response.locations;

            MembershipCategoryDataFactory.getAllMembershipCategories({}, function (response) {
                $scope.membershipCategories = response.membershipCategories;
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
        // initialize data transfer object
        $scope.memberRegisterDto = {};
        $scope.memberRegisterDto = $scope.data;
        $scope.memberRegisterDto.bankAccounts = [];
        $scope.memberRegisterDto.emails = [];
        $scope.memberRegisterDto.location = $scope.location.selected;
        $scope.memberRegisterDto.membershipCategory = $scope.membershipCategory.selected;

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

                    LocationDataFactory.getAllLocations({}, function (response) {
                        $scope.locations = response.locations;

                        if (_.isArray($scope.memberRegisters) && $scope.memberRegisters.length > 0) {
                            for (var i = 0; i < $scope.memberRegisters.length; i++) {
                                $scope.memberRegisters[i].locations = $scope.locations;
                            }
                        }

                        MembershipCategoryDataFactory.getAllMembershipCategories({}, function (response) {
                            $scope.membershipCategories = response.membershipCategories;

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


    $scope.init();
});

