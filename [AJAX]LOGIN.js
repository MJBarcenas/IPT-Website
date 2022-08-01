//Login
function doGet(e) {
    // Variable for the type of action to be made.
    var op = e.parameter.action;

    //The link to the spreadsheet that you will be using. Change this if necessary.
    var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mt6TXP5snKNDs1C1Ard5CjNUc_XTK3dfC39EF1RLH3U/edit#gid=0");
    var sheet = ss.getSheetByName("Accounts");

    if (op == "insert") {
        return insert_value(e, sheet);
    } else if (op == "update") {
        return update_value(e, sheet);
    } else if (op == "delete") {
        return delete_value(e, sheet);
    } else if (op == "login") {
        return login_user(e, sheet);
    }
    return read_value(e, ss);
}

function login_user(request, sheet) {
    //Parameters that will get the username and 
    //password from the requestp
    var fullname = request.parameter.fullname;
    var password = request.parameter.password;

    //Boolean that will help us perform the
    //correct procedure;
    var flag = false;

    //Get the last row or essentially the
    //length of the database
    var last = sheet.getLastRow();

    var result;

    //Check each and every data to see
    //if the username already exists
    for (var i = 1; i <= last; i++) {
        var user = sheet.getRange(i, 1).getValue();
        if (user == fullname) {
            var pass = sheet.getRange(i, 2).getValue();
            if (pass == password) {
                flag = true;
                break;
            }
        }
    }

    //If username doesn't exist, it will insert and 
    //then provide a descriptive feedback
    if (flag) {
        result = "Login successful";
        new_user(fullname);
    } else {
        result = "Login failed";
    }
    result = JSON.stringify({
        "result": result
    });

    return ContentService
        .createTextOutput(request.parameter.callback + "(" + result + ")")
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function new_user(fullname) {
    var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mt6TXP5snKNDs1C1Ard5CjNUc_XTK3dfC39EF1RLH3U/edit#gid=0");
    var sheet = ss.getSheetByName("CurrentUser");
    var user = sheet.getRange(2, 1).getValue();

    if (user == "") {
        sheet.appendRow([fullname]);
    }
}

function insert_value(request, sheet) {
    //Parameters that will get the username and 
    //password from the requestp
    var fullname = request.parameter.fullname;
    var password = request.parameter.password;
    var number = request.parameter.number;
    var address = request.parameter.address;

    //Boolean that will help us perform the
    //correct procedure;
    var flag = true;

    //Get the last row or essentially the
    //length of the database
    var last = sheet.getLastRow();

    //Check each and every data to see
    //if the username already exists
    for (var i = 1; i <= last; i++) {
        var user = sheet.getRange(i, 1).getValue();
        if (user == fullname) {
            flag = false;
            result = "User already exist..";
        }
    }

    //If username doesn't exist, it will insert and 
    //then provide a descriptive feedback
    if (flag) {
        sheet.appendRow([fullname, password, number, address]);
        result = "Create account successful";
    }
    result = JSON.stringify({
        "result": result
    });

    return ContentService
        .createTextOutput(request.parameter.callback + "(" + result + ")")
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function update_value(request, sheet) {

    var fullname = request.parameter.fullname;
    var password = request.parameter.password;
    var number = request.parameter.number;
    var address = request.parameter.address;

    var flag = false;
    var lr = sheet.getLastRow();
    for (var i = 1; i <= lr; i++) {
        var user = sheet.getRange(i, 1).getValue();
        if (user == fullname) {
            sheet.getRange(i, 2).setValue(password);
            sheet.getRange(i, 3).setValue(number);
            sheet.getRange(i, 4).setValue(address);
            var result = "Password updated successfully";
            flag = true;
        }
    }
    if (!(flag)) {
        var result = "Username not found";
    }

    result = JSON.stringify({
        "result": result
    });

    return ContentService
        .createTextOutput(request.parameter.callback + "(" + result + ")")
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function delete_value(request, sheet) {
    //Declaring variables
    var fullname = request.parameter.fullname;
    var flag = false;
    var lr = sheet.getLastRow();

    for (var i = 1; i <= lr; i++) {
        var user = sheet.getRange(i, 1).getValue();
        if (user == fullname) {
            sheet.deleteRow(i);
            var result = "Account deleted successfully";
            flag = true;
        }
    }

    if (!(flag)) {
        var result = "Account not found";
    }

    result = JSON.stringify({
        "result": result
    });

    return ContentService
        .createTextOutput(request.parameter.callback + "(" + result + ")")
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function read_value(request, ss) {
    //Declare variables
    var output = ContentService.createTextOutput();
    var data = {};
    var sheet = "Accounts";

    //Read the data from the spreadsheet
    data.records = readData_(ss, sheet);
    var callback = request.parameters.callback;

    if (callback === undefined) {
        output.setContent(JSON.stringify(data));
    } else {
        output.setContent(callback + "(" + JSON.stringify(data) + ")");
    }
    output.setMimeType(ContentService.MimeType.JAVASCRIPT);

    //Return the data or the list of the data
    return output;
}

function readData_(ss, sheetname, properties) {
    if (typeof properties == "undefined") {
        properties = getHeaderRow_(ss, sheetname);
        properties = properties.map(function(p) { return p.replace(/\s+/g, '_'); });
    }

    var rows = getDataRows_(ss, sheetname);
    var data = [];

    for (var r = 0, l = rows.length; r < l; r++) {
        var row = rows[r];
        var record = {};

        for (var p in properties) {
            record[properties[p]] = row[p];
        }
        data.push(record);
    }
    return data;
}

function getDataRows_(ss, sheetname) {
    var sh = ss.getSheetByName(sheetname);

    return sh.getRange(2, 1, sh.getLastRow() - 1, sh.getLastColumn()).getValues();
}

function getHeaderRow_(ss, sheetname) {
    var sh = ss.getSheetByName(sheetname);

    return sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
}