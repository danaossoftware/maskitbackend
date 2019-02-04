<?php
include 'db.php';
$results = $c->query("SELECT * FROM disease_names");
$diseases = [];
while ($row = $results->fetch_assoc()) {
	array_push($diseases, $row);
}
echo json_encode($diseases);