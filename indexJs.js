var script_url = "https://script.google.com/macros/s/AKfycbyMQohPz2W_5HVbM_h5Lhqff-SK4sJ3Gs6vhKILMct6/dev";
window.onload = check_user();

//Google script link

function hide(toHide, toShow) {
    $(`.${toHide}`).css("display", "none");
    $(`.${toShow}`).css("display", "inline");
    var date = new Date();
    var timeout = date.setSeconds(date.getSeconds() + 5);

    var x = setInterval(function() {

        var now = new Date();
        var remaining = timeout - now;

        if (remaining < 0) {
            clearInterval(x);
            $(`.${toHide}`).css("display", "inline");
            $(`.${toShow}`).css("display", "none");
            $(`.${toShow}`).css("display", "none");
        }

    }, 1000)
}

function show(e) {
    if (e.result == "Book success" || e.result == "Insufficient funds" || e.result == "Congratulations! Membership Successful!") {
        alert(e.result);
        window.location.replace("file:///D:/School/3rd%20Year%20-%20Second%20Semester%20[3I]/Integrative%20Programming%20and%20Technologies/Activities/Website/profile.html");
    } else if (e.result != "None") {
        var name = e.result.split(" ")[0];
        $("#signup").css("display", "none");
        $("#login").css("display", "none");
        $("#profile").css("display", "inline");
        $("#profile").css("font-family", "Poppins");
        $("#profile").html(name);
    }
}

function book(type, date, cost) {
    if (date != "None") {
        var bookDate = $(`.${date}`).val();
        var url = script_url + "?callback=show&date=" + bookDate + "&type=" + type + "&cost=" + cost + "&action=book";
    } else {
        var url = script_url + "?callback=show&date=" + date + "&type=" + type + "&cost=" + cost + "&action=book";
    }
    alert(url);

    jQuery.ajax({
        crossDomain: true,
        url: url,
        method: "GET",
        dataType: "jsonp"
    });
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

function insert_value() {
    var fullname = $("#Sfullname").val();
    var password = $("#Spassword").val();
    var number = $("#Snumber").val();
    var address = $("#Saddress").val();

    var url = script_url + "?callback=show&fullname=" + fullname + "&password=" + password + "&number=" + number + "&address=" + address + "&action=insert";

    //var url = `${script_url}?callback=show&fullname=${fullname}&password=${password}&number=${number}&address=${address}&action=insert`;
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