<?php
include 'db.php';
$id = $_POST["id"];
$name = $_POST["name"];
$found = $_POST["found"];
$mostYears = $_POST["most_years"];
$deathCase = $_POST["death_case"];
$history = $_POST["history"];
$c->query("UPDATE disease_names SET name='" . $name . "', found=" . $found . ", most_years=" . $mostYears  . ", death_case=" . $deathCase . ", history='" . $history . "' WHERE id='" . $id . "'");