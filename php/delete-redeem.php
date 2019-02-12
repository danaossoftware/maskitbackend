<?php
include 'db.php';
$redeemId = $_GET["redeem_id"];
$c->query("DELETE FROM redeems WHERE id='" .$redeemId . "'");