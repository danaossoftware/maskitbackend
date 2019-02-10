<?php
include 'db.php';
$adminId = $_POST["id"];
$name = $_POST["name"];
$email = $_POST["email"];
$phone = $_POST["phone"];
$password = $_POST["password"];
$c->query("UPDATE admins SET name='" . $name . "', email='" . $email . "', phone='" . $phone . "', password='" . $password . "' WHERE id='" . $adminId . "'");