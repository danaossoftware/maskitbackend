<?php
include 'db.php';
$userId = $_GET["id"];
$c->query("DELETE FROM users WHERE id='" . $userId . "'");