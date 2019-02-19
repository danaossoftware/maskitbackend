<?php
include 'db.php';
$id = $_GET["id"];
$results = $c->query("SELECT * FROM serials WHERE id='" . $id . "'");
if ($results && $results->num_rows > 0) {
    $row = $results->fetch_assoc();
    echo json_encode($row);
} else {
    echo -1;
}