<?php
include 'db.php';
$diseaseId = $_GET["disease-id"];
$c->query("DELETE FROM diseases WHERE id='" . $diseaseId . "'");