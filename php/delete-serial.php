<?php
include 'db.php';
$id = $_GET["id"];
$c->query("DELETE FROM serials WHERE id='" . $id . "'");