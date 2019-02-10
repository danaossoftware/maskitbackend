var users;
var selectedUserIndex;
var userMenuShown = false;
var editUserMenuShown = false;
var confirmDialogShown = false;

$(document).ready(function() {
    getUsers();
});

function getUsers() {
    $("#users").find("*").remove();
    get(SERVER_URL+'get-users.php', null, function(a) {
        if (a < 0) {
            // Error
        } else {
            users = JSON.parse(a);
            for (var i=0; i<users.length; i++) {
                var user = users[i];
                var background = getRandomBackground();
                $("#users").append(""+
                    "<div class='user' style='flex-shrink: 0; cursor: pointer; width: calc(100% - 20px); height: 40px; background: "+background+"; border-radius: 10px; display: flex; flex-flow: row nowrap; align-items: center; margin-top: 10px;'>" +
                    "<div style='margin-left: 20px; font-family: PalanquinBold; color: white; font-size: 18px;'>"+user["email"]+"</div>"+
                    "</div>"
                );
            }
            setUserClickListener();
        }
    });
}

function setUserClickListener() {
    $(".user").on("click", function() {
        var index = $(this).parent().children().index(this);
        selectedUserIndex = index;
        $("#user-menu").css("display", "flex");
        userMenuShown = true;
    });
}

function editUser() {
    $("#user-menu").hide();
    userMenuShown = false;
    var user = users[selectedUserIndex];
    $("#user-name").val(user["name"]);
    $("#user-email").val(user["email"]);
    $("#user-phone").val(user["phone"]);
    $("#user-password").val(user["password"]);
    $("#edit-user").css("display", "flex");
    editUserMenuShown = true;
    $("#edit-user-title").html("Ubah Pengguna");
    $("#edit-user-ok").unbind().on("click", function() {
        $("#edit-user").hide();
        editUserMenuShown = false;
        var user = users[selectedUserIndex];
        var name = $("#user-name").val();
        var email = $("#user-email").val();
        var phone = $("#user-phone").val();
        var password = $("#user-password").val();
        if (name == "" || email == "" || password == "") {
            showToast("Mohon masukkan semua data");
            return;
        }
        $("#loading-text").html("Mengubah pengguna...");
        $("#loading-container").css("display", "flex");
        var fd = new FormData();
        fd.append("id", user["id"]);
        fd.append("name", name);
        fd.append("email", email);
        fd.append("phone", phone);
        fd.append("password", password);
        post(SERVER_URL+'edit-user.php', fd, function(a) {
            $("#loading-container").hide();
            getUsers();
        });
    });
    $("#edit-user-cancel").unbind().on("click", function() {
        $("#edit-user").hide();
        editUserMenuShown = false;
    });
}

function addUser() {
    $("#user-name").val("");
    $("#user-email").val("");
    $("#user-phone").val("");
    $("#user-password").val("");
    $("#edit-user-title").html("Tambah Pengguna");
    $("#edit-user").css("display", "flex");
    editUserMenuShown = true;
    $("#edit-user-ok").unbind().on("click", function() {
        $("#edit-user").hide();
        editUserMenuShown = false;
        var name = $("#user-name").val();
        var email = $("#user-email").val();
        var phone = $("#user-phone").val();
        var password = $("#user-password").val();
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
        post(SERVER_URL+'add-user.php', fd, function(a) {
            $("#loading-container").hide();
            getUsers();
        });
    });
    $("#edit-user-cancel").unbind().on("click", function() {
        $("#edit-user").hide();
        editUserMenuShown = false;
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

function deleteUser() {
    $("#user-menu").hide();
    userMenuShown = false;
    var user = users[selectedUserIndex];
    $("#confirm-title").html("Hapus Pengguna");
    $("#confirm-desc").html("Apakah Anda yakin ingin menghapus pengguna ini?");
    $("#confirm-container").css("display", "flex");
    confirmDialogShown = true;
    $("#confirm-ok").unbind().on("click", function() {
        $("#confirm-container").hide();
        confirmDialogShown = false;
        $("#loading-text").html("Menghapus pengguna...");
        $("#loading-container").css("display", "flex");
        get(SERVER_URL+'delete-user.php', {'id': user["id"]}, function() {
            $("#loading-container").hide();
            getUsers();
        });
    });
    $("#confirm-cancel").unbind().on("click", function() {
        $("#confirm-container").hide();
        confirmDialogShown = false;
    });
}

function confirmUser() {
    $("#user-menu").hide();
    userMenuShown = false;
    var user = users[selectedUserIndex];
    $("#confirm-title").html("Konfirmasi Pengguna");
    $("#confirm-desc").html("Apakah Anda yakin ingin mengkonfirmasi pengguna ini?");
    $("#confirm-container").css("display", "flex");
    confirmDialogShown = true;
    $("#confirm-ok").unbind().on("click", function() {
        $("#confirm-container").hide();
        confirmDialogShown = false;
        $("#loading-text").html("Mengkonfirmasi pengguna...");
        $("#loading-container").css("display", "flex");
        get(SERVER_URL+'confirm-user.php', {'id': user["id"]}, function() {
            $("#loading-container").hide();
            showToast("Pengguna sudah dikonfirmasi");
            getUsers();
        });
    });
    $("#confirm-cancel").unbind().on("click", function() {
        $("#confirm-container").hide();
        confirmDialogShown = false;
    });
}

function closeUserMenuDialog() {
    $("#user-menu").hide();
    userMenuShown = false;
}

function backKey() {
    if (menuShown) {
        closeMenu();
    } else if (userMenuShown) {
        closeUserMenuDialog();
    } else if (editUserMenuShown) {
        $("#edit-user").hide();
        editUserMenuShown = false;
    } else if (confirmDialogShown) {
        $("#confirm-container").hide();
        confirmDialogShown = false;
    }
}