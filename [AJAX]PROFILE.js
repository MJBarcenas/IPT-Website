//Profile
function doGet(e) {
    // Variable for the type of action to be made.
    var op = e.parameter.action;

    //The link to the spreadsheet that you will be using. Change this if necessary.
    var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mt6TXP5snKNDs1C1Ard5CjNUc_XTK3dfC39EF1RLH3U/edit#gid=0");
    var sheet = ss.getSheetByName("CurrentUser");

    if (op == "logout") {
        return delete_value(e, sheet);
    } else if (op == "check") {
        return check_user(e, sheet);
    }
}

function check_user(request, sheet) {

    var user = sheet.getRange(2, 1).getValue();

    if (user == "") {
        result = "None";
    } else {
        var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mt6TXP5snKNDs1C1Ard5CjNUc_XTK3dfC39EF1RLH3U/edit#gid=0");
        var sheet = ss.getSheetByName("Accounts");
        var last = sheet.getLastRow();

        for (var i = 1; i <= last; i++) {
            var curr = sheet.getRange(i, 1).getValue();
            if (curr == user) {
                var number = sheet.getRange(i, 3).getValue();
                var address = sheet.getRange(i, 4).getValue();
                result = [user, number, address];
            }
        }
    }
    result = JSON.stringify({
        "result": result
    });

    return ContentService
        .createTextOutput(request.parameter.callback + "(" + result + ")")
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function delete_value(request, sheet) {
    sheet.deleteRow(2);

    var result = "Log out";

    result = JSON.stringify({
        "result": result
    });

    return ContentService
        .createTextOutput(request.parameter.callback + "(" + result + ")")
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
}