<?php
include 'db.php';
$maskId = $_GET["id"];
$c->query("DELETE FROM masks WHERE id='" . $maskId . "'");
$c->query("DELETE FROM rewards WHERE mask_id='" . $maskId . "'");