<?php
include 'db.php';
$results = $c->query("SELECT * FROM serials");
$serials = [];
if ($results && $results->num_rows > 0) {
    while ($row = $results->fetch_assoc()) {
        array_push($serials, $row);
    }
}
echo json_encode($serials);