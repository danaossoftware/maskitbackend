<?php
include 'db.php';
$userId = $_POST["id"];
$name = $_POST["name"];
$email = $_POST["email"];
$phone = $_POST["phone"];
$password = $_POST["password"];
$c->query("UPDATE users SET name='" . $name . "', email='" . $email . "', phone='" . $phone . "', password='" . $password . "' WHERE id='" . $userId . "'");