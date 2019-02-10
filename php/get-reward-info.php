<?php
include 'db.php';
$maskId = $_GET["mask-id"];
$results = $c->query("SELECT * FROM rewards WHERE mask_id='" . $maskId . "'");
if ($results && $results->num_rows > 0) {
	echo json_encode($results->fetch_assoc());
} else {
	echo -1;
}