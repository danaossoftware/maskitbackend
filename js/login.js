var currentIndex = 0;

function login() {
    $("#error").hide();
    var email = $("#email").val();
    var password = $("#password").val();
    if (email == "" || password == "") {
        $("#error").html("Mohon isi semua data");
        $("#error").show();
        return;
    }
    get(SERVER_URL+"login.php", {'email': email, 'password': password}, function(a) {
        console.log(a);
        if (a == -1) {
            $("#error").html("Admin tidak ditemukan");
            $("#error").show();
        } else if (a == -2) {
            $("#error").html("Kata sandi salah");
            $("#error").show();
        } else if (a == 0) {
            window.location.href = "home.html";
        }
    });
}