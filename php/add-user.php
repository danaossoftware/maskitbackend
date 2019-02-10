<?php
include 'db.php';
$userId = uniqid();
$name = $_POST["name"];
$email = $_POST["email"];
$phone = $_POST["phone"];
$password = $_POST["password"];
$c->query("INSERT INTO users (id, email, phone, password, name) VALUES ('" . $userId . "', '" . $email . "', '" . $phone . "', '" . $password . "', '" . $name . "')");