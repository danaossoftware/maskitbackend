<?php
include 'db.php';
include 'common.php';
$ip = getIP();
$c->query("DELETE FROM sessions WHERE ip='" . $ip . "'");