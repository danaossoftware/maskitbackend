<?php
include 'db.php';
include 'common.php';
$ip = getIP();
$results = $c->query("SELECT * FROM sessions WHERE ip='" . $ip . "'");
if ($results && $results->num_rows > 0) {
	echo 0;
} else {
	echo -1;
}