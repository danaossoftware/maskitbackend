$(document).ready(function() {
    var params = location.search;
    params = params.substr(1, params.length);
    var redeemId = params.split("&")[0].split("=")[1];
    get(SERVER_URL+'get-redeem-info.php', {'redeem-id': redeemId}, function(a) {
        if (a < 0) {
            // Not found
        } else {
            var redeemInfo = JSON.parse(a);
            var maskId = redeemInfo["mask_id"];
            var buyerId = redeemInfo["user_id"];
            get(SERVER_URL+"get-mask-info.php", {'mask_id': maskId}, function(a) {
                var maskInfo = JSON.parse(a);
                $("#mask-img").attr("src", maskInfo["img_url"]);
                $("#mask-name").html(maskInfo["name"]);
                $("#mask-link").html(maskInfo["link"]);
                $("#mask-code").html(maskInfo["mask_code"]);
                $("#filter-code").html(maskInfo["filter_code"]);
                $("#mask-price").html("Rp "+formatMoney(parseInt(maskInfo["price"]))+",-");
                $("#mask-points").html(""+maskInfo["points"]+" poin");
                get(SERVER_URL+'get-user-info.php', {'user_id': buyerId}, function(a) {
                    var userInfo = JSON.parse(a);
                    $("#buyer-name").html(userInfo["name"]);
                    $("#buyer-email").html(userInfo["email"]);
                    var phone = userInfo["phone"];
                    $("#buyer-phone").html(phone);
                    $("#call-buyer").on("click", function() {
                        Native.callBuyer(phone);
                    });
                });
            });
        }
    });
});

function backKey() {
    window.location.href = "redeems.html";
}

function backToRedeems() {
    window.location.href = "redeems.html";
}