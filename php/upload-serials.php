<?php
include 'db.php';
$c->query("DELETE FROM serials");
$serialsJSON = json_decode($_POST["serials"]);
for ($i=0; $i<count($serialsJSON); $i++) {
    $serial = $serialsJSON[$i];
    $c->query("INSERT INTO serials (id, serial, type) VALUES ('" . uniqid() . "', '" . $serial->serial . "', '" . $serial->type . "')");
}