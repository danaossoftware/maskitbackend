<?php
include 'db.php';
$id = $_POST["id"];
$serial = $_POST["serial"];
$c->query("UPDATE serials SET serial='" . $serial . "' WHERE id='" . $id . "'");