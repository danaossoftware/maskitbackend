var admins;
var selectedAdminIndex;
var adminMenuShown = false;
var editAdminMenuShown = false;
var alertShown = false;
var confirmDialogShown = false;
var addAdminDialogShown = false;

$(document).ready(function() {
    getAdmins();
});

function getAdmins() {
    $("#admins").find("*").remove();
    get(SERVER_URL+'get-admins.php', null, function(a) {
        if (a < 0) {
            // Error
        } else {
            admins = JSON.parse(a);
            for (var i=0; i<admins.length; i++) {
                var admin = admins[i];
                var background = getRandomBackground();
                $("#admins").append(""+
                    "<div class='admin' style='flex-shrink: 0; cursor: pointer; width: calc(100% - 20px); height: 40px; background: "+background+"; border-radius: 10px; display: flex; flex-flow: row nowrap; align-items: center; margin-top: 10px;'>" +
                    "<div style='margin-left: 20px; font-family: PalanquinBold; color: white; font-size: 18px;'>"+admin["email"]+"</div>"+
                    "</div>"
                );
            }
            setAdminClickListener();
        }
    });
}

function setAdminClickListener() {
    $(".admin").on("click", function() {
        var index = $(this).parent().children().index(this);
        selectedAdminIndex = index;
        $("#admin-menu").css("display", "flex");
        adminMenuShown = true;
    });
}

function editAdmin() {
    $("#admin-menu").hide();
    adminMenuShown = false;
    var admin = admins[selectedAdminIndex];
    $("#admin-name").val(admin["name"]);
    $("#admin-email").val(admin["email"]);
    $("#admin-phone").val(admin["phone"]);
    $("#admin-password").val(admin["password"]);
    $("#edit-admin").css("display", "flex");
    editAdminMenuShown = true;
    $("#edit-admin-title").html("Ubah Pengguna");
    $("#edit-admin-ok").unbind().on("click", function() {
        $("#edit-admin").hide();
        editAdminMenuShown = false;
        var admin = admins[selectedAdminIndex];
        var name = $("#admin-name").val();
        var email = $("#admin-email").val();
        var phone = $("#admin-phone").val();
        var password = $("#admin-password").val();
        if (name == "" || email == "" || password == "") {
            showToast("Mohon masukkan semua data");
            return;
        }
        $("#loading-text").html("Mengubah pengguna...");
        $("#loading-container").css("display", "flex");
        var fd = new FormData();
        fd.append("id", admin["id"]);
        fd.append("name", name);
        fd.append("email", email);
        fd.append("phone", phone);
        fd.append("password", password);
        post(SERVER_URL+'edit-admin.php', fd, function(a) {
            $("#loading-container").hide();
            getAdmins();
        });
    });
    $("#edit-admin-cancel").unbind().on("click", function() {
        $("#edit-admin").hide();
        editAdminMenuShown = false;
    });
}

function addAdmin() {
    $("#admin-name").val("");
    $("#admin-email").val("");
    $("#admin-phone").val("");
    $("#admin-password").val("");
    $("#edit-admin-title").html("Tambah Pengguna");
    $("#edit-admin").css("display", "flex");
    addAdminDialogShown = true;
    $("#edit-admin-ok").unbind().on("click", function() {
        $("#edit-admin").hide();
        addAdminDialogShown = false;
        var name = $("#admin-name").val();
        var email = $("#admin-email").val();
        var phone = $("#admin-phone").val();
        var password = $("#admin-password").val();
        if (name == "" || email == "" || password == "") {
            showToast("Mohon masukkan semua data");
            return;
        }
        $("#loading-text").html("Menambah pengguna...");
        $("#loading-container").css("display", "flex");
        var fd = new FormData();
        fd.append("name", name);
        fd.append("email", email);
        fd.append("phone", phone);
        fd.append("password", password);
        post(SERVER_URL+'add-admin.php', fd, function(a) {
            $("#loading-container").hide();
            getAdmins();
        });
    });
    $("#edit-admin-cancel").unbind().on("click", function() {
        $("#edit-admin").hide();
        addAdminDialogShown = false;
    });
}

function getRandomBackground() {
    var minimum = 0;
    var maximum = 5;
    var bgIndex = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    var background = "linear-gradient(to right, #13c2e9, #f645fa)";
    if (bgIndex == 1) {
        background = "linear-gradient(to right, #f12711, #f5ae19)";
    } else if (bgIndex == 2) {
        background = "linear-gradient(to right, #825fc1, #2ebe91)";
    } else if (bgIndex == 3) {
        background = "linear-gradient(to right, #01958b, #38ef7d)";
    } else if (bgIndex == 4) {
        background = "linear-gradient(to right, #01958b, #38ef7d)";
    } else if (bgIndex == 5) {
        background = "linear-gradient(to right, #1a2080, #26cfce)";
    }
    return background;
}

function deleteAdmin() {
    $("#admin-menu").hide();
    adminMenuShown = false;
    var totalAdmins = admins.length;
    if (totalAdmins == 1) {
        $("#alert-title").html("Peringatan");
        $("#alert-desc").html("Jumlah minimum admin yang diperbolehkan adalah 1, ini adalah admin utama.");
        $("#alert-ok").unbind().on("click", function() {
            $("#alert-container").hide();
            alertShown = false;
        });
        $("#alert-container").css("display", "flex");
        alertShown = true;
        return;
    }
    var admin = admins[selectedAdminIndex];
    $("#confirm-title").html("Hapus Pengguna");
    $("#confirm-desc").html("Apakah Anda yakin ingin menghapus pengguna ini?");
    $("#confirm-container").css("display", "flex");
    confirmDialogShown = true;
    $("#confirm-ok").unbind().on("click", function() {
        $("#confirm-container").hide();
        confirmDialogShown = false;
        $("#loading-text").html("Menghapus pengguna...");
        $("#loading-container").css("display", "flex");
        get(SERVER_URL+'delete-admin.php', {'id': admin["id"]}, function() {
            $("#loading-container").hide();
            getAdmins();
        });
    });
    $("#confirm-cancel").unbind().on("click", function() {
        $("#confirm-container").hide();
        confirmDialogShown = false;
    });
}

function closeAdminMenuDialog() {
    $("#admin-menu").hide();
    adminMenuShown = false;
}

function backKey() {
    if (menuShown) {
        closeMenu();
    } else if (adminMenuShown) {
        closeAdminMenuDialog();
    } else if (editAdminMenuShown) {
        $("#edit-admin").hide();
        editAdminMenuShown = false;
    } else if (alertShown) {
        $("#alert-container").hide();
        alertShown = false;
    } else if (confirmDialogShown) {
        $("#confirm-container").hide();
        confirmDialogShown = false;
    } else if (addAdminDialogShown) {
        $("#edit-admin").hide();
        addAdminDialogShown = false;
    } else {
        Native.finishApp();
    }
}