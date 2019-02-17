var serials;
var currentSerial = 0;
var selectedSerial = 0;
var serialMenuShown = false;
var editSerialDialogShown = false;
var confirmDialogShown = false;

$(document).ready(function() {
    getSerials();
});

function getSerials() {
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'get-serials.php',
        data: {'start': currentSerial},
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a < 0) {
                // No serial
            } else {
                serials = JSON.parse(a);
                currentSerial += 10;
                for (var i=0; i<serials.length; i++) {
                    var serial = serials[i];
                    $("#serials").append(""+
                        "<div class='serial' style='margin-top: 10px; width: calc(100% - 60px); margin-left: 20px; margin-right: 20px; border-radius: 10px; box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .5); background-color: white; padding: 10px;'>"+
                            "<div style='color: black;'>"+serial["serial"]+"</div>"+
                        "</div>"
                    );
                }
                setSerialClickListener();
            }
        }
    });
}

function setSerialClickListener() {
    $(".serial").unbind().on("click", function() {
        $("#serial-menu").css("display", "flex").hide().fadeIn(500);
        var index = $(this).parent().children().index(this);
        selectedSerial = index;
    });
}

function closeSerialMenuDialog() {
    $("#serial-menu").fadeOut(500);
}

function editSerial() {
    var serialObj = serials[selectedSerial];
    $("#edit-serial-title").html("Edit Kode Serial");
    $("#serial").val("");
    $("#edit-serial").css("display", "flex");
    editSerialDialogShown = true;
    $("#edit-serial-ok").on("click", function() {
        var serial = $("#serial").val();
        if (serial == "") {
            return;
        }
        $("#loading-text").html("Menyimpan nomor serial...");
        $("#loading-container").css("display", "flex").hide().fadeIn(500);
        $.ajax({
            type: 'GET',
            url: SERVER_URL+'check-serial.php',
            data: {'serial': serial},
            dataType: 'text',
            cache: false,
            success: function(a) {
                if (a == 0) {
                    // Serial exists
                    $("#loading-container").fadeOut(500);
                    show("Kode serial sudah ada");
                } else {
                    var fd = new FormData();
                    fd.append("id", serialObj["id"]);
                    fd.append("serial", serial);
                    $.ajax({
                        type: 'POST',
                        url: SERVER_URL+'edit-serial.php',
                        data: fd,
                        processData: false,
                        contentType: false,
                        cache: false,
                        success: function(a) {
                            $("#loading-container").fadeOut(500);
                            show("Kode serial disimpan");
                            $("#serials").find("*").remove();
                            currentSerial = 0;
                            getSerials();
                        }
                    });
                }
            }
        });
    });
    $("#edit-serial-cancel").on("click", function() {
        $("#edit-serial").fadeOut(500);
        editSerialDialogShown = false;
    });
}

function deleteSerial() {
    var serialObj = serials[selectedSerial];
    $("#confirm-title").html("Hapus Serial");
    $("#confirm-desc").html("Apakah Anda yakin ingin menghapus kode serial ini?");
    $("#confirm-ok").unbind().on("click", function() {
        $("#confirm-container").hide();
        confirmDialogShown = false;
        $("#loading-text").html("Menghapus kode serial...");
        $("#loading-container").css("display", "flex").hide().fadeIn(500);
        $.ajax({
            type: 'GET',
            url: SERVER_URL+'delete-serial.php',
            data: {'id': serialObj["id"]},
            dataType: 'text',
            cache: false,
            success: function(a) {
                $("#loading-container").fadeOut(500);
                $("#serials").find("*").remove();
                currentSerial = 0;
                getSerials();
            }
        });
    });
    $("#confirm-cancel").unbind().on("click", function() {
        $("#confirm-container").fadeOut(500);
        confirmDialogShown = false;
    });
    $("#confirm-container").css("display", "flex");
    confirmDialogShown = true;
}

function addSerial() {
    $("#edit-serial-title").html("Tambah Kode Serial");
    $("#serial").val("");
    $("#edit-serial").css("display", "flex").hide().fadeIn(500);
    editSerialDialogShown = true;
    $("#edit-serial-ok").on("click", function() {
        var serial = $("#serial").val();
        if (serial == "") {
            return;
        }
        $("#loading-text").html("Menambah kode serial...");
        $("#loading-container").css("display", "flex").hide().fadeIn(500);
        var fd = new FormData();
        fd.append("serial", serial);
        $.ajax({
            type: 'POST',
            url: SERVER_URL+'add-serial.php',
            data: fd,
            processData: false,
            contentType: false,
            cache: false,
            success: function(a) {
                if (a == 0) {
                    $("#loading-container").fadeOut(500);
                    show("Kode serial ditambah");
                    $("#serials").find("*").remove();
                    currentSerial = 0;
                    getSerials();
                } else if (a == -1) {
                    $("#loading-container").fadeOut(500);
                    show("Tidak bisa menambahkan kode serial karena sudah digunakan");
                }
            }
        });
    });
    $("#edit-serial-cancel").on("click", function() {
        $("#edit-serial").fadeOut(500);
        editSerialDialogShown = false;
    });
}

function nextSerials() {
    getSerials();
}

function backKey() {
    if (menuShown) {
        closeMenu();
    } else if (serialMenuShown) {
        closeSerialMenuDialog();
    } else if (editSerialDialogShown) {
        $("#edit-serial").hide();
        editSerialDialogShown = false;
    } else if (confirmDialogShown) {
        $("#confirm-container").hide();
        confirmDialogShown = false;
    } else {
        Native.finishApp();
    }
}