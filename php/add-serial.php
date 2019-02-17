<?php
include 'db.php';
$serial = $_POST["serial"];
$results = $c->query("SELECT * FROM serials WHERE serial='" . $serial . "'");
if ($results && $results->num_rows > 0) {
    echo -1;
    return;
}
$c->query("INSERT INTO serials (id, serial) VALUES ('" . uniqid() . "', '" . $serial . "')");
echo 0;