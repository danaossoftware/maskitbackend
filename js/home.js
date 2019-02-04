function openDiseases() {
    window.location.href = "diseases.html";
}

function openDiseaseStatistics() {
    window.location.href = "statistics.html";
}

function openUsers() {
    window.location.href = "users.html";
}

function openSerialNumbers() {
    window.location.href = "serial.html";
}

function logout() {
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'logout.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            window.location.href = "login.html";
        }
    });
}