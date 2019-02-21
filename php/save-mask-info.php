<?php
include 'db.php';
$maskId = $_POST["mask_id"];
$name = $_POST["name"];
$price = $_POST["price"];
$points = $_POST["points"];
$desc = $_POST["desc"];
$link = $_POST["link"];
$imgURL = $_POST["img_url"];
$c->query("UPDATE masks SET name='" . $name . "', price=" . $price . ", descr='" . $desc . "', link='" . $link . "', img_url='" . $imgURL . "' WHERE id='" . $maskId . "'");
$c->query("UPDATE rewards SET points=" . $points . " WHERE mask_id='" . $maskId . "'");