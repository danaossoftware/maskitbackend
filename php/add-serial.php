<?php
include 'db.php';
$serial = $_POST["serial"];
$type = $_POST["type"];
$results = $c->query("SELECT * FROM serials WHERE serial='" . $serial . "'");
if ($results && $results->num_rows > 0) {
    echo -1;
    return;
}
$c->query("INSERT INTO serials (id, serial, type) VALUES ('" . uniqid() . "', '" . $serial . "', '" . $type . "')");
echo 0;