const SERVER_URL = "http://sainsgo.com/maskitbackend/php/";
var menuShown = false;

$(document).ready(function () {

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