<?php
include 'db.php';
$redeemId = $_GET["redeem-id"];
$results = $c->query("SELECT * FROM redeems WHERE id='" . $redeemId . "'");
if ($results && $results->num_rows > 0) {
    $row = $results->fetch_assoc();
    echo json_encode($row);
} else {
    echo -1;
}