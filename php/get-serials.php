<?php
include 'db.php';
$start = $_GET["start"];
$results = $c->query("SELECT * FROM serials LIMIT " . $start . ", 10");
$serials = [];
if ($results && $results->num_rows > 0) {
    while ($row = $results->fetch_assoc()) {
        array_push($serials, $row);
    }
}
echo json_encode($serials);