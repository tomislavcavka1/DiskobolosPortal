/* 
 * Datatable util functions
 * 
 * @author Tomislav Čavka
 */
var dataTableUtilsModule = angular.module('dataTableUtilsModule', []);

dataTableUtilsModule.factory('dataTableUtils', function() {
  return {
    /**
     * Returns language configuration for the data table
     * 
     * @returns JSON object with translation options
     */
    getDataTableTranslations: function() {
      return {
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
        },
        select: {
            rows: {
                _: "%d retka izabrana",
                0: "0 redaka izabrano",
                1: "1 redak izabran"
            }
        },
        buttons: {
            copyTitle: 'Kopirali ste',
            copyKeys: '',
            copySuccess: {
                _: '%d linije kopirano',
                1: '1 linija kopirana'
            }
        }
      };      
    },
    /**
     * Gets buttons configuration for data tables
     * 
     * @param {type} columns array with list of columns
     * @param {type} memberRegister boolean flag that indicates whether it is a memberRegister view or not
     * @returns {Array}
     */
    getDataTableButtons: function(columns, memberRegister) {
        var buttonsOptions = [];
        buttonsOptions.push({extend: 'selectAll', text: 'Označi sve', exportOptions: {
                   columns: ':visible:not(.not-export-col)', modifier: {
                       selected: true
                   }
               }},
           {extend: 'selectNone', text: 'Odznači sve', exportOptions: {
                   columns: ':visible:not(.not-export-col)', modifier: {
                       selected: true
                   }
               }},
           {extend: 'colvis', text: '<i class="fa fa-list-ul" aria-hidden="true"></i> Prikaz polja u tablici',
               columns: columns},
           {extend: 'copy', text: '<i class="fa fa-files-o"></i> Kopiraj', exportOptions: {
                   columns: ':visible:not(.not-export-col)', modifier: {
                       selected: true
                   }
               }},
           {extend: 'csv', text: '<i class="fa fa-file-text-o"></i> CSV', exportOptions: {
                   columns: ':visible:not(.not-export-col)', modifier: {
                       selected: true
                   }
               }},
           {extend: 'excel', text: '<i class="fa fa-file-excel-o"></i> Excel', exportOptions: {
                   columns: ':visible:not(.not-export-col)', modifier: {
                       selected: true
                   }
           }});
           if(memberRegister) {
               buttonsOptions.push({extend: 'pdf', text: '<i class="fa fa-file-pdf-o"></i> PDF', orientation: 'landscape',
                    pageSize: 'LEGAL', exportOptions: {
                         columns: ':visible:not(.not-export-col)', modifier: {
                             selected: true
                         }
                }});
           } else {
                buttonsOptions.push({extend: 'pdf', text: '<i class="fa fa-file-pdf-o"></i> PDF', exportOptions: {
                         columns: ':visible:not(.not-export-col)', modifier: {
                             selected: true
                         }
                }});               
           }
           buttonsOptions.push({extend: 'print', text: '<i class="fa fa-print"></i> Ispis', exportOptions: {
                    columns: ':visible:not(.not-export-col)', modifier: {
                        selected: true
                    }
                },
                customize: function (win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');
                    $(win.document.body).find('table')
                            .addClass('compact')
                            .css('font-size', 'inherit');
                }
           });
           return buttonsOptions;
       }
    };
});





