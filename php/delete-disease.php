<?php
include 'db.php';
$diseaseId = $_GET["disease-id"];
$c->query("DELETE FROM disease_names WHERE id='" . $diseaseId . "'");