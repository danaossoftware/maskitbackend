function login() {
    $("#error").hide();
    var email = $("#email").val();
    var password = $("#password").val();
    if (email == "" || password == "") {
        $("#error").html("Mohon isi semua data");
        $("#error").show();
        return;
    }
    $.ajax({
        type: 'GET',
        url: SERVER_URL+"login.php",
        data: {'email': email, 'password': password},
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a == -1) {
                $("#error").html("Admin tidak ditemukan");
                $("#error").show();
            } else if (a == -2) {
                $("#error").html("Kata sandi salah");
                $("#error").show();
            } else if (a == 0) {
                window.location.href = "home.html";
            }
        }
    });
}