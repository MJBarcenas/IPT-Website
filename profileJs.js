var script_url = "https://script.google.com/macros/s/AKfycby9m1EPENg0T584KnBDjdcRkahbv2Fo72A2pD3lF6lUUMKA94S_E4LmS54-ae5KZOm2VA/exec";
window.onload = check_user();

//Google script link

function show(e) {
    var result = e.result;
    if (result == "Log out") {
        window.location.replace("file:///D:/School/3rd%20Year%20-%20Second%20Semester%20[3I]/Integrative%20Programming%20and%20Technologies/Activities/Website/index.html");
    } else if (result == "Update") {
        check_user();
    } else if (result != "None") {
        $("#signup").css("display", "none");
        $("#login").css("display", "none");
        $("#profile").css("display", "inline");
        $("#profile").css("font-family", "Poppins");
        $("#profile").html(result[0].split(" ")[0]);

        $("#name").html("Name: " + result[0]);
        $("#number").html("Number: " + "0" + result[1]);
        $("#address").html("Address: " + result[2]);
        $("#membership").html("Membership: " + result[3]);
        $("#money").html("Money: " + result[4]);

        $("#newname").val(result[0]);
        $("#newnumber").val("0" + result[1]);
        $("#newaddress").val(result[2]);

        readBookings();
    }

}

function check_user() {
    var url = script_url + "?callback=show&action=check";
    jQuery.ajax({
        crossDomain: true,
        url: url,
        method: "GET",
        dataType: "jsonp"
    });
}

function logout() {
    var url = script_url + "?callback=show&action=logout";
    jQuery.ajax({
        crossDomain: true,
        url: url,
        method: "GET",
        dataType: "jsonp"
    });
}

function update() {
    var newName = $("#newname").val();
    var newNumber = $("#newnumber").val();
    var newAddress = $("#newaddress").val();

    var url = script_url + "?callback=show&newname=" + newName + "&newnumber=" + newNumber + "&newaddress=" + newAddress + "&action=update";
    alert(url);
    jQuery.ajax({
        crossDomain: true,
        url: url,
        method: "GET",
        dataType: "jsonp",
    });
}

function readBookings() {
    var url = script_url + "?action=readBookings";
    alert(url);
    $.getJSON(url, function(json) {
        if (json.records.length > 0) {
            var table = document.createElement("table");
            var header = table.createTHead();
            var row = header.insertRow(0);
            var type = row.insertCell(0);
            var date = row.insertCell(1);

            type.innerHTML = "<b>Booking</b>";
            date.innerHTML = "<b>Date</b>";

            type.style.cssText = "text-align: center; font-size: 20px; color: black;";
            date.style.cssText = "text-align: center; font-size: 20px; color: black;";
        }

        for (var i = 0; i < json.records.length; i++) {
            if (json.records[i].service == undefined) {
                continue;
            }
            var tableRow = table.insertRow(-1);
            var tableCell1 = tableRow.insertCell(-1);
            tableCell1.innerHTML = json.records[i].service;
            tableCell1.style.cssText = "padding: 5px 20px;";
            var tableCell2 = tableRow.insertCell(-1);
            tableCell2.innerHTML = json.records[i].date;
            tableCell2.style.cssText = "padding: 5px 50px;";
        }

        var div = document.getElementById("bookings");
        div.innerHTML = "";
        div.appendChild(table);

    });
}