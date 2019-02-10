<?php
include 'db.php';
$masks = [];
$results = $c->query("SELECT * FROM masks");
if ($results && $results->num_rows > 0) {
	while ($row = $results->fetch_assoc()) {
		array_push($masks, $row);
	}
}
echo json_encode($masks);