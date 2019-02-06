const SERVER_URL = "http://sainsgo.com/maskitbackend/php/";
var menuShown = false;

$(document).ready(function () {
    var hasBackFunction = (backKey !== "undefined");
    if (hasBackFunction) {
        Native.setHasBackFunction(1);
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

function openUsers() {
    window.location.href = "users.html";
}

function openSerialNumbers() {
    window.location.href = "serial.html";
}

function logout() {
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'logout.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            window.location.href = "login.html";
        }
    });
}