//Google script link
var script_url = "https://script.google.com/macros/s/AKfycby3QJyjO7EvNLsIeVrrdZFyIVe-5hsheEfbJHuYGxE/dev";

function operate(operation) {
    if (operation == 'read') {

    } else {
        var fullname = $("#Sfullname").val();
        var password = $("#Spassword").val();
        var number = $("#Snumber").val();
        var address = $("#Saddress").val();

        var url = script_url + "?callback=ctrlq&fullname=" + fullname + "&password=" + password + "&number=" + number + "&address=" + address + "&action=" + operation;
        jQuery.ajax({
            crossDomain: true,
            url: url,
            method: "GET",
            dataType: "jsonp"
        });
    }
}

function show(e) {
    alert(e.result);
    var result = e.result;

    if (result == "Create account successful") {
        location.reload();
    } else if (result == "Login successful") {
        window.location.replace("file:///D:/School/3rd%20Year%20-%20Second%20Semester%20[3I]/Integrative%20Programming%20and%20Technologies/Activities/Website/index.html");
    }

}

function check_user() {
    var fullname = $("#Lfullname").val();
    var password = $("#Lpassword").val();

    var url = script_url + "?callback=show&fullname=" + fullname + "&password=" + password + "&action=login";

    //var url = `${script_url}?callback=show&fullname=${fullname}&password=${password}&number=${number}&address=${address}&action=insert`;
    alert(url);
    jQuery.ajax({
        crossDomain: true,
        url: url,
        method: "GET",
        dataType: "jsonp"
    });
}

function signup() {
    var fullname = $("#Sfullname").val();
    var password = $("#Spassword").val();
    var number = $("#Snumber").val();
    var address = $("#Saddress").val();

    var url = script_url + "?callback=show&fullname=" + fullname + "&password=" + password + "&number=" + number + "&address=" + address + "&action=signup";
    alert(url);
    //var url = `${script_url}?callback=show&fullname=${fullname}&password=${password}&number=${number}&address=${address}&action=insert`;
    jQuery.ajax({
        crossDomain: true,
        url: url,
        method: "GET",
        dataType: "jsonp"
    });
}

function update_value() {
    var fullname = $("#Sfullname").val();
    var password = $("#Spassword").val();
    var number = $("#Snumber").val();
    var address = $("#Saddress").val();

    var url = script_url + "?callback=ctrlq&fullname=" + fullname + "&password=" + password + "&number=" + number + "&address=" + address + "&action=update";
    alert(url);
    jQuery.ajax({
        crossDomain: true,
        url: url,
        method: "GET",
        dataType: "jsonp"
    });
}

function delete_value() {
    var fullname = $("#Sfullname").val();
    var password = $("#Spassword").val();
    var number = $("#Snumber").val();
    var address = $("#Saddress").val();

    var url = script_url + "?callback=ctrlq&fullname=" + fullname + "&password=" + password + "&number=" + number + "&address=" + address + "&action=delete";
    alert(url);
    jQuery.ajax({
        crossDomain: true,
        url: url,
        method: "GET",
        dataType: "jsonp"
    });
}

function read_value() {
    var url = script_url + "?action=read";

    $.getJSON(url, function(json) {
        for (var i = 0; i < json.records.length; i++) {

            tr = table.insertRow(-1);
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = json.records[i].username;
            tabCell = tr.insertCell(-1);
            tabCell.innerHTML = json.records[i].password;
        }


        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
    });
}

function openTab(evt, tab) {
    var i, tablinks, tabcontent, first;
    try {
        first = document.getElementById("first")
        first.id = first.id.replace("first", "")
    } catch (error) {

    }
    tabcontent = document.getElementsByClassName("container");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tab).style.display = "block";
    evt.currentTarget.className += " active";
}