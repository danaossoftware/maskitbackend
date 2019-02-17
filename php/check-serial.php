<?php
include 'db.php';
$serial = $_GET["serial"];
$results = $c->query("SELECT * FROM serials WHERE serial='" . $serial . "'");
if ($results && $results->num_rows > 0) {
    echo 0;
} else {
    echo -1;
}