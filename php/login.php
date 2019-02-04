<?php
include 'db.php';
include 'common.php';
$email = $_GET["email"];
$password = $_GET["password"];
$results = $c->query("SELECT * FROM admins WHERE email='" . $email . "'");
if ($results && $results->num_rows > 0) {
    $row = $results->fetch_assoc();
    if ($row["password"] != $password) {
        echo -2;
        return;
    }
    $userId = $row["id"];
    $ip = getIP();
    $c->query("INSERT INTO sessions (id, user_id, ip, last_active) VALUES ('" . uniqid() . "', '" . $userId . "', '" . $ip . "', " . round(microtime(true)*1000) . ")");
    echo 0;
} else {
    echo -1;
}