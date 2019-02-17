var serials;

$(document).ready(function() {
    getSerials();
});

function getSerials() {
    $("#serials").find("*").remove();
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'get-serials.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a < 0) {
                // No serial
            } else {
                serials = JSON.parse(a);
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
        var index = $(this).parent().children().index(this);
        var serialObj = serials[index];
        $("#edit-serial-title").html("Edit Kode Serial");
        $("#serial").val("");
        $("#edit-serial").css("display", "flex");
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
                                getSerials();
                            }
                        });
                    }
                }
            });
        });
        $("#edit-serial-cancel").on("click", function() {
            $("#edit-serial").fadeOut(500);
        });
    });
}

function addSerial() {
    $("#edit-serial-title").html("Tambah Kode Serial");
    $("#serial").val("");
    $("#edit-serial").css("display", "flex").hide().fadeIn(500);
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
    });
}