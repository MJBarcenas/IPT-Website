var script_url = "https://script.google.com/macros/s/AKfycbxdINiVGDXLJvyPVw0cf6VzG3D1U0dzTsDxd73zDaL-/dev";
window.onload = check_user();

//Google script link

function show(e) {
    var result = e.result;
    alert(result);
    if (result != "None") {
        $("#signup").css("display", "none");
        $("#login").css("display", "none");
        $("#profile").css("display", "inline");
        $("#profile").css("font-family", "Poppins");
        $("#profile").html(result.split(" ")[0]);
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