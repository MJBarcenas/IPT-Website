//Index
function doGet(e) {
    // Variable for the type of action to be made.
    var op = e.parameter.action;

    //The link to the spreadsheet that you will be using. Change this if necessary.
    var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mt6TXP5snKNDs1C1Ard5CjNUc_XTK3dfC39EF1RLH3U/edit#gid=0");
    var sheet = ss.getSheetByName("CurrentUser");

    if (op == "delete") {
        return delete_value(e, sheet);
    } else if (op == "check") {
        return check_user(e, sheet);
    } else if (op == "book") {
        return book(e, sheet)
    }
}

function book(request, sheet) {
    var user = sheet.getRange(2, 1).getValue();
    var type = request.parameter.type;
    var date = request.parameter.date;

    sheet = ss.getSheetByName("Bookings");

    sheet.appendRow([user, type, date]);

    var result = "Book success";

    result = JSON.stringify({
        "result": result
    });

    return ContentService
        .createTextOutput(request.parameter.callback + "(" + result + ")")
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function check_user(request, sheet) {
    var user = sheet.getRange(2, 1).getValue();

    if (user == "") {
        result = "None";
    } else {
        result = user;
    }
    result = JSON.stringify({
        "result": result
    });

    return ContentService
        .createTextOutput(request.parameter.callback + "(" + result + ")")
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function delete_value(sheet) {
    sheet.deleteRow(2);
}