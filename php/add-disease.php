<?php
include 'db.php';
$name = $_POST["name"];
$found = $_POST["found"];
$mostYears = $_POST["most_years"];
$deathCase = $_POST["death_case"];
$history = $_POST["history"];
$c->query("INSERT INTO disease_names (id, name, found, most_years, death_case, history) VALUES ('" . uniqid() . "', '" . $name . "', " . $found . ", " . $mostYears . ", " . $deathCase . ", '" . $history . "')");