var masks;
var selectedMaskIndex = 0;
var maskImgURL = "";
var maskMenuShown = false;
var editMaskDialogShown = false;
var confirmDialogShown = false;

$(document).ready(function () {
    getMasks();
});

function getMasks() {
    $("#loading-text").html("Memuat...");
    $("#loading-container").css("display", "flex");
    $("#masks").find("*").remove();
    get(SERVER_URL + 'get-masks.php', null, function (a) {
        masks = JSON.parse(a);
        for (var i = 0; i < masks.length; i++) {
            var mask = masks[i];
            $("#masks").append("" +
                "<div class='mask' style='width: 250px; border-radius: 10px; box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .5); background-color: white; display: flex; flex-flow: column nowrap; margin-top: 10px; cursor: pointer;'>" +
                "<div style='border-top-left-radius: 10px; border-top-right-radius: 10px; width: 100%; height: 150px; display: flex; justify-content: center; align-items: center;'>" +
                "<img src='" + mask["img_url"] + "' width='130px' height='130px'>" +
                "</div>" +
                "<div style='position: relative; height: 30px;'>" +
                "<div style='position: absolute; left: 0; top: 0; font-weight: bold; color: black; margin-left: 10px; margin-right: 30px;'>" + mask["name"] + "</div>" +
                "<div style='position: absolute; top: 0; right: 0; width: 25px; height: 100%; display: flex; justify-content: center; align-items: center;'>" +
                "<img src='img/edit.png' width='15px' height='15px'>" +
                "       </div>" +
                "</div>" +
                "<div style='width: 100%; display: flex; flex-flow: row nowrap; justify-content: flex-end;'>" +
                "<div style='color: #e74c3c; margin-right: 10px; margin-bottom: 5px;'>Rp " + mask["price"] + "</div>" +
                "</div>" +
                "</div>"
            );
        }
        $("#loading-container").hide();
        setMaskClickListener();
    });
}

function setMaskClickListener() {
    $(".mask").unbind().on("click", function () {
        var index = $(this).parent().children().index(this);
        selectedMaskIndex = index;
        $("#mask-menu").css("display", "flex");
        maskMenuShown = true;
    });
}

function editMask() {
    $("#loading-text").html("Memuat...");
    $("#loading-container").css("display", "flex");
    var mask = masks[selectedMaskIndex];
    var maskId = mask["id"];
    $.ajax({
        type: 'GET',
        url: SERVER_URL + 'get-mask-info.php',
        data: {'mask_id': maskId},
        dataType: 'text',
        cache: false,
        success: function (a) {
            Native.log(a);
            if (a < 0) {
                // Error
            } else {
                var rewardInfo = JSON.parse(a);
                $("#mask-name").val(mask["name"]);
                $("#mask-price").val(mask["price"]);
                $("#minimum-points").val(rewardInfo["points"]);
                $("#mask-desc").val(mask["descr"]);
                $("#mask-link").val(mask["link"]);
                maskImgURL = mask["img_url"];
                $("#mask-img").attr("src", maskImgURL);
                $("#edit-mask-title").html("Edit Masker");
                $("#edit-mask").css("display", "flex");
                editMaskDialogShown = true;
                $("#edit-mask-ok").unbind().on("click", function () {
                    saveMaskInfo();
                });
                $("#edit-mask-cancel").unbind().on("click", function () {
                    cancelEdittingMask();
                });
                $("#mask-menu").hide();
                maskMenuShown = false;
                $("#loading-container").hide();
            }
        }
    });
}

function changeMaskPicture() {
    Native.changeMaskPicture();
}

function cancelEdittingMask() {
    $("#edit-mask").hide();
    editMaskDialogShown = false;
}

function saveMaskInfo() {
    var maskId = masks[selectedMaskIndex]["id"];
    var name = $("#mask-name").val();
    var price = $("#mask-price").val();
    var minimumPoints = $("#minimum-points").val();
    var desc = $("#mask-desc").val();
    var link = $("#mask-link").val();
    if (name == "" || price == "" || minimumPoints == "" || link == "") {
        showToast("Mohon masukkan semua data");
        return;
    }
    $("#loading-text").html("Menyimpan...");
    $("#loading-container").css("display", "flex");
    var fd = new FormData();
    fd.append("name", name);
    fd.append("price", parseInt(price));
    fd.append("points", parseInt(minimumPoints));
    fd.append("desc", desc);
    fd.append("link", link);
    fd.append("img_url", maskImgURL);
    fd.append("mask_id", maskId);
    post(SERVER_URL + 'save-mask-info.php', fd, function (a) {
        $("#edit-mask").hide();
        editMaskDialogShown = false;
        $("#loading-container").hide();
        getMasks();
    });
}

function maskImageUploaded(imgURL) {
    $("#loading-container").hide();
    maskImgURL = imgURL;
    $("#mask-img").attr("src", imgURL);
}

function showLoadingDialog(message) {
    $("#loading-text").html(message);
    $("#loading-container").css("display", "flex");
}

function hideLoadingDialog(message) {
    $("#loading-container").hide();
}

function addMask() {
	try {
    maskImgURL = "";
    $("#edit-mask-title").html("Tambah Masker");
    $("#mask-name").val("");
    $("#mask-price").val("");
    $("#minimum-points").val("");
    $("#mask-desc").val("");
    $("#mask-link").val("");
    $("#edit-mask").css("display", "flex");
    editMaskDialogShown = true;
    $("#mask-img").attr("src", "");
    $("#edit-mask-ok").unbind().on("click", function () {
        var name = $("#mask-name").val();
        var price = $("#mask-price").val();
        var minimumPoints = $("#minimum-points").val();
        var desc = $("#mask-desc").val();
        var link = $("#mask-link").val();
        if (name == "" || price == "" || minimumPoints == "") {
            showToast("Mohon masukkan semua data");
            return;
        }
        $("#loading-text").html("Menambah masker...");
        $("#loading-container").css("display", "flex");
        var fd = new FormData();
        fd.append("name", name);
        fd.append("price", parseInt(price));
        fd.append("points", parseInt(minimumPoints));
        fd.append("desc", desc);
        fd.append("link", link);
        fd.append("img_url", maskImgURL);
        post(SERVER_URL + 'add-mask.php', fd, function (a) {
			console.log(a);
            $("#edit-mask").hide();
            editMaskDialogShown = false;
            $("#loading-container").hide();
            getMasks();
        });
    });
    $("#edit-mask-cancel").unbind().on("click", function () {
		try {
			$("#edit-mask").hide();
			editMaskDialogShown = false;
			cancelEdittingMask();
		} catch (e) {
			console.log(e.toString());
		}
    });
	} catch (e) {
		console.log(e.toString());
	}
}

function deleteMask() {
    $("#confirm-desc").html("Apakah Anda yakin ingin menghapus masker ini?");
    $("#confirm-title").html("Hapus Masker");
    $("#confirm-ok").unbind().on("click", function () {
        $("#mask-menu").hide();
        maskMenuShown = false;
        $("#confirm-container").hide();
        confirmDialogShown = false;
        $("#loading-text").html("Menghapus masker...");
        $("#loading-container").css("display", "flex");
        var mask = masks[selectedMaskIndex];
        get(SERVER_URL + 'delete-mask.php', {'id': mask["id"]}, function (a) {
            $("#loading-container").hide();
            getMasks();
        });
    });
    $("#confirm-cancel").unbind().on("click", function () {
        $("#mask-menu").hide();
        maskMenuShown = false;
        $("#confirm-container").hide();
        confirmDialogShown = false;
    });
    $("#confirm-container").css("display", "flex");
    confirmDialogShown = true;
}

function closeMaskMenuDialog() {
    $("#mask-menu").hide();
    maskMenuShown = false;
}

function backKey() {
    if (menuShown) {
        closeMenu();
    } else if (maskMenuShown) {
        closeMaskMenuDialog();
    } else if (editMaskDialogShown) {
        $("#edit-mask").hide();
        editMaskDialogShown = false;
    } else if (confirmDialogShown) {
        $("#confirm-container").hide();
        confirmDialogShown = false;
    } else {
        Native.finishApp();
    }
}