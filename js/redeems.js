var redeems;

$(document).ready(function () {
    getRedeems();
});

function getRedeems() {
    $("#redeems").find("*").remove();
    get(SERVER_URL + 'get-redeems.php', null, function (a) {
        redeems = JSON.parse(a);
        displayRedeem(0);
    });
}

function displayRedeem(index) {
    if (index >= redeems.length) {
        setRedeemClickListener();
        return;
    }
    var redeem = redeems[index];
    var userId = redeem["user_id"];
    get(SERVER_URL+'get-user-info.php', {'user_id': userId}, function(a) {
        var userInfo = JSON.parse(a);
        var background = getRandomBackground();
        var date = getDateString(new Date(parseInt(redeem["date"])));
        $("#redeems").append("" +
            "<div class='redeem' style='margin-top: 10px; width: calc(100% - 40px); margin-left: 20px; margin-right: 20px; border-radius: 6px; box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .5); background-image: " + background + "; padding: 10px; display: flex; flex-flow: column nowrap;'>" +
                "<div style='color: white; font-weight: bold; font-size: 20px;'>Email: "+userInfo["email"]+"</div>" +
                "<div style='width: calc(100% - 20px); margin-left: 10px; margin-right: 10px; height: 1px; background-color: rgba(255, 255, 255, .5);'></div>"+
                "<div style='color: white; font-size: 17px;'><b>ID Masker:</b> "+redeem["mask_id"]+"</div>"+
                "<div style='color: white; font-size: 17px;'>"+date+"</div>"+
                "<div style='width: 100%; display: flex; justify-content: flex-end; flex-flow: row nowrap;'>" +
                    "<button class='blue-button check-redeem'>Cek</button>"+
                    "<button class='blue-button delete-redeem' style='margin-left: 8px;'>Hapus</button>"+
                "</div>"+
            "</div>"
        );
        displayRedeem(index+1);
    });
}

function setRedeemClickListener() {
    $(".check-redeem").unbind().on("click", function() {
        var redeem = $(this).parent().parent();
        var index = redeem.parent().children().index(redeem);
        var redeemInfo = redeems[index];
        window.location.href = "viewredeem.html?redeem_id="+redeemInfo["id"];
    });
    $(".delete-redeem").unbind().on("click", function() {
        var redeem = $(this).parent().parent();
        var index = redeem.parent().children().index(redeem);
        var redeemInfo = redeems[index];
        $("#confirm-title").html("Hapus Penukaran Poin");
        $("#confirm-desc").html("Apakah Anda yakin ingin menghapus info penukaran poin berikut?");
        $("#confirm-ok").unbind().on("click", function() {
            $("#confirm-container").hide();
            $("#loading-text").html("Menghapus info penukaran poin...");
            $("#loading-container").css("display", "flex");
            get(SERVER_URL+'delete-redeem.php', {'redeem_id': redeemInfo["id"]}, function(a) {
                $("#loading-container").hide();
                getRedeems();
            });
        });
        $("#confirm-cancel").unbind().on("click", function() {
            $("#confirm-container").hide();
        });
        $("#confirm-container").css("display", "flex");
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

function searchByEmail() {
    $("#redeems").find("*").remove();
    var email = $("#email").val();
    if (email == "") {
        getRedeems();
    } else {
        get(SERVER_URL + 'find-redeems-by-email.php', {'email': email}, function (a) {
            console.log(a);
            if (a < 0) {
                // User not found
            } else {
                redeems = JSON.parse(a);
                displayRedeem(0);
            }
        });
    }
}