<?php
include 'db.php';
$email = $_GET["email"];
$results = $c->query("SELECT * FROM users WHERE email='" . $email . "'");
if ($results && $results->num_rows > 0) {
    $row = $results->fetch_assoc();
    $userId = $row["id"];
    $results = $c->query("SELECT * FROM redeems WHERE user_id='" . $userId . "'");
    $redeems = [];
    if ($results && $results->num_rows > 0) {
        while ($row = $results->fetch_assoc()) {
            array_push($redeems, $row);
        }
    }
    echo json_encode($redeems);
} else {
    echo -1;
}