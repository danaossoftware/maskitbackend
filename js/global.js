const SERVER_URL = "http://192.168.43.139/maskitbackend/php/";
var menuShown = false;

$(document).ready(function () {
    try {
        var hasBackFunction = (backKey !== "undefined");
        if (hasBackFunction) {
            Native.setHasBackFunction(1);
        }
    } catch (e) {
        console.log(e.toString());
    }
});

function openMenu() {
    $("#overlay").show();
    $("#menu-container").css("margin-left", "0");
    menuShown = true;
}

function closeMenu() {
    $("#overlay").hide();
    $("#menu-container").css("margin-left", "-250px");
    menuShown = false;
}

function openDiseases() {
    window.location.href = "diseases.html";
}

function openDiseaseStatistics() {
    window.location.href = "statistics.html";
}

function openAdmins() {
    window.location.href = "admins.html";
}

function openUsers() {
    window.location.href = "users.html";
}

function openSerialNumbers() {
    window.location.href = "masks.html";
}

function logout() {
    get(SERVER_URL+'logout.php', null, function(a) {
        window.location.href = "login.html";
    });
}

function showToast(text) {
    $("#toast-text").html(text);
    $("#toast-container").css("display", "flex");
    setTimeout(function() {
        $("#toast-container").hide();
    }, 3000);
}

function get(url, params, successFunc) {
    if (params == null) {
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'text',
            success: function (data, textStatus, request) {
                successFunc(data);
            }
        });
    } else {
        $.ajax({
            type: 'GET',
            url: url,
            data: params,
            dataType: 'text',
            success: function (data, textStatus, request) {
                successFunc(data);
            }
        });
    }
}

function post(url, fd, successFunc) {
    $.ajax({
        type: 'POST',
        url: url,
        data: fd,
        processData: false,
        contentType: false,
        cache: false,
        success: function(data, textStatus, request) {
            successFunc(data);
        }
    });
}