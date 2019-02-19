<?php
include 'db.php';
$id = $_POST["id"];
$serial = $_POST["serial"];
$type = $_POST["type"];
$c->query("UPDATE serials SET serial='" . $serial . "', type='" . $type . "' WHERE id='" . $id . "'");