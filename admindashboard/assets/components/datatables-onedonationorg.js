var isActiveOptions = { "true" : "true", "false": "false"};

$(document).ready(function() {

    var columnDefs = [
        {
        data: "BeneficiaryID",
        title: "Beneficiary ID",
        type: "num",
        disabled: true
        },
  
        {
        data: "BeneficiaryName",
        title: "Beneficiary Org Name",
        required: true,
        maxLength: 100
        },
       
        {
        data: "IsActive",
        title: "Is Active",
        type : "select",
        required: true,
        options : isActiveOptions,
        select2 : { width: "100%"},
        render: function (data, type, row, meta) {
            if (data == null || !(data in isActiveOptions)) return null;
            return isActiveOptions[data];
        }
        }
    ];

    var myTable;

    var url_get_all = 'http://localhost:3000/api/donationorgadmin';
    var url_add_update_delete = 'http://localhost:3000/api/donationorg/';




    myTable = $('#onedonationorgeditor').DataTable({
        "sPaginationType": "full_numbers",
        ajax: {
            url : url_get_all,
            // our data is an array of objects, in the root node instead of /data node, so we need 'dataSrc' parameter
            dataSrc : ''
        },
        columns: columnDefs,
        dom: 'Bfrtip',        // Needs button container
        select: 'single',
        responsive: true,
        altEditor: true,     // Enable altEditor
        closeModalOnSuccess: false,
        buttons: [
            {
                text: 'Add',
                name: 'add'        // do not change name
            },
            {
                extend: 'selected', // Bind to Selected row
                text: 'Edit',
                name: 'edit'        // do not change name
            },
            {
                extend: 'selected', // Bind to Selected row
                text: 'Delete',
                name: 'delete'      // do not change name
            },
            {
                text: 'Refresh',
                name: 'refresh'      // do not change name
            }
        ],
        onAddRow: function(datatable, rowdata, success, error) {
            $.ajax({
                // a tipycal url would be / with type='POST'
                url: url_add_update_delete,
                type: 'POST',
                data: rowdata,
                success: success,
                error: error
            });
        },
        onDeleteRow: function(datatable, rowdata, success, error) {
            $.ajax({
                // a tipycal url would be /{id} with type='DELETE'
                url: url_add_update_delete + rowdata.BeneficiaryID,
                type: 'DELETE',
                data: rowdata,
                success: success,
                error: error
            });
        },
        onEditRow: function(datatable, rowdata, success, error) {
            $.ajax({
                // a tipycal url would be /{id} with type='PUT'
                url: url_add_update_delete + rowdata.BeneficiaryID,
                type: 'PUT',
                data: rowdata,
                success: success,
                error: error
            });
        }
    });


});

