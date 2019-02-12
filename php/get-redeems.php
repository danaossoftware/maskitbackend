<?php
include 'db.php';
$results = $c->query("SELECT * FROM redeems");
$redeems = [];
if ($results && $results->num_rows > 0) {
    while ($row = $results->fetch_assoc()) {
        array_push($redeems, $row);
    }
}
echo json_encode($redeems);