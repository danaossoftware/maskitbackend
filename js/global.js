const SERVER_URL = "http://sainsgo.com/maskitbackend/php/";
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
    menuShown = !menuShown;
    if (menuShown) {
        $("#overlay").show();
        $("#menu-container").css("margin-left", "0");
    } else {
        $("#overlay").hide();
        $("#menu-container").css("margin-left", "-250px");
    }
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

function openMasks() {
    window.location.href = "masks.html";
}

function openSerialNumbers() {
    window.location.href = "serials.html";
}

function openRedeems() {
    window.location.href = "redeems.html";
}

function logout() {
    get(SERVER_URL+'logout.php', null, function(a) {
        window.location.href = "login.html";
    });
}

function showToast(text) {
    $("#toast-text").html(text);
    $("#toast-container").css("display", "flex").hide().fadeIn(300);
    setTimeout(function() {
        $("#toast-container").fadeOut(300);
    }, 3000);
}

function get(url, params, successFunc) {
    if (params == null) {
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'text',
            cache: false,
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
            cache: false,
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

function getDateString(dateInt) {
    var date = new Date(dateInt);
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var dateString = ""+day;
    dateString += " ";
    dateString += getMonthName(month);
    dateString += " ";
    dateString += year;
    return dateString;
}

function getMonthNames() {
    return ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
}

function getMonthName(month) {
    return getMonthNames()[month];
}

function formatMoney(n, c, d, t) {
    var c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;

    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

function show(msg) {
    showToast(msg);
}

function isAndroid() {
    if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
    ){
        return true;
    }
    else {
        return false;
    }
}