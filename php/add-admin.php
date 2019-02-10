<?php
include 'db.php';
$userId = uniqid();
$name = $_POST["name"];
$email = $_POST["email"];
$phone = $_POST["phone"];
$password = $_POST["password"];
$c->query("INSERT INTO admins (id, email, password, name, phone) VALUES ('" . $userId . "', '" . $email . "', '" . $password . "', '" . $name . "', '" . $phone . "')");