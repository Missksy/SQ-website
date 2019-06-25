$(function () {
    //push to top
    $('.btn-pushToTop').click(function (e) {
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        $('html,body').animate({ scrollTop: 0 }, 'slow');
    });

    var urlcontacts = "http://contactsqs2.apphb.com/Service.svc/rest/contacts";

    // Duplicate Contacts
    function bindDuplicateContacts() {
        $.ajax({
            type: "GET",
            dataType: "json",
            data: {},
            url: urlcontacts,
            success: function (items) {

                var arrayResults = [];

                for (var i = 0; i < items.length; i++) {
                    //is it in the array already?
                    //  debugger;
                    //Ok, lets iniciate;
                    for (var j = i + 1; j < items.length; j++) {
                        if (checkVariables(items[i], items[j])) {
                            if ($.inArray(items[i], arrayResults) === -1) {
                                arrayResults.push(items[i]);
                            }
                            if ($.inArray(items[j], arrayResults) === -1) {
                                arrayResults.push(items[j]);
                                j = 0;
                                i = 0;
                            }

                        }
                    }
                }
                // arrayResults.sort(SortByEmail);

                //Create new X
                var html = '<form action="/" method="post">';
                html += '<table class="table table-striped table-bordered" >';
                html += '<tr>';
                html += '<th width="10%">Nome</th>';
                html += '<th width="10%">Sobrenome</th>';
                html += '<th width="50%">Email</th>';
                html += '<th>Telefone</th>';
                html += '<th>Fonte</th>';
                html += '<th>Manter</th>';
                html += '<th>Apagar</th>';
                html += '</tr>';

                for (var d = 0; d < arrayResults.length; d++) {
                    html += '<tr class="py-1">';
                    html += '<td width="10%"> <input type="hidden" name="Guid" id="Guid' + d + '" value="' + arrayResults[d].Guid + '" />' + arrayResults[d].GivenName + '</td>';
                    html += '<td width="10%">' + arrayResults[d].Surname + '</td>';
                    html += '<td width="45%">' + arrayResults[d].Email + '</td>';
                    html += '<td>' + arrayResults[d].Phone + '</td>';
                    html += '<td>' + arrayResults[d].Source + '</td>';
                    html += '<td class="text-center"><div class="custom-control custom-radio"><input type="radio" id="customRadio' + d + 'A" name="customRadio' + d + '" value="1" class="custom-control-input"><label class="custom-control-label" for="customRadio' + d + 'A"></label></div></td>';
                    html += '<td class="text-center"> <div class="custom-control custom-radio"> <input type="radio" id="customRadio' + d + 'B" name="customRadio' + d + '" value="0" class="custom-control-input"><label class="custom-control-label" for="customRadio' + d + 'B"></label> </div></td>';
                    html += '</tr>';
                    if (d === arrayResults.length - 1) {
                        //Close new X 
                        html += '</table>';
                        html += '<div class="text-center"><button type="submit" class="btn btn-primary rounded mb-5 ">Aplicar</button><div>';
                        html += '</form>';
                        break;
                    } else if (!checkVariables(arrayResults[d], arrayResults[d + 1])) {
                        //Close new X and create new X
                        html += '</table>';
                        html += '<table class="table table-striped table-bordered" >';
                        html += '<tr>';
                        html += '<th width="10%">Nome</th>';
                        html += '<th width="10%">Sobrenome</th>';
                        html += '<th width="45%">Email</th>';
                        html += '<th>Telefone</th>';
                        html += '<th>Fonte</th>';
                        html += '<th>Manter</th>';
                        html += '<th>Apagar</th>';
                        html += '</tr>';
                    }

                }
                $('.listing').append(html);


                $("form button").click(function (e) {
                    e.preventDefault();
                    // get selected value
                    var selected = $("input[type='radio']:checked");

                    var elementIds = [];
                    $.each(selected, function (i, el) {
                        if ($.inArray(el.name, elementIds) === -1) elementIds.push(el);
                    });

                    if (arrayResults.length !== selected.length) {
                        alert("At least one group is blank");
                        return;
                    }

                    var deletedContacts = [];

                    // check if an option was selected
                    for (var i = 0; i < selected.length; i++) {
                        // debugger;
                        if (selected[i].value === "0") {
                            //Guid
                            deletedContacts.push($('#Guid' + i).val());
                        }
                    }
                    console.log(deletedContacts);

                    window.localStorage.setItem("deletedContactsSize", deletedContacts.length.toString());
                    for (var j = 0; j < deletedContacts.length; j++) {
                        window.localStorage.setItem("deletedContacts" + j, deletedContacts[j].toString());
                    }

                    alert('lista criada!');
                    //window.location = "duplicateFree.html";

                });
            }
        });
    }

    function checkVariables(i, j) {

        if (i.Email === j.Email) {
            return true;
        }
        if (i.Phone === j.Phone) {
            return true;
        }
        if (i.Surname === j.Surname && i.GivenName === j.GivenName) {
            return true;
        }
        return false;
    }



    bindDuplicateContacts();
});
