$(function () {

    var urlcontacts = "http://contactsqs2.apphb.com/Service.svc/rest/contacts";

    // create dinamic table
    function table(items) {
        var table = $('#Contacts tbody');
        var html = "";
        table.html('');
        for (var i = 0; i < items.length; i++) {
            html += '<tr>';
            html += '<td>' + items[i].GivenName + '</td>';
            html += '<td>' + items[i].Surname + '</td>';
            html += '<td>' + items[i].Email + '</td>';
            html += '<td>' + items[i].Phone + '</td>';
            html += '<td>' + items[i].Source + '</td>';
            html += '</tr>';
        }
        $(table).append(html);
    }

    // Get all contacts
    function bindContacts() {
        $.ajax({
            type: "GET",
            dataType: "json",
            data: {},
            url: urlcontacts,
            success: function (data) {
                table(data);
            }
        });
    }


    bindContacts();
});
