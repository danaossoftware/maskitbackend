<?php
include 'db.php';
$name = $_POST["name"];
$price = intval($_GET["price"]);
$points = intval($_GET["points"]);
$desc = $_POST["desc"];
$link = $_POST["link"];
$imgURL = $_POST["img_url"];
$maskId = uniqid();
$c->query("INSERT INTO masks (id, name, img_url, link, descr, price) VALUES ('" . $maskId . "', '" . $name . "', '" . $imgURL . "', '" . $link . "', '" . $desc . "', " . $price . ")");
$c->query("INSERT INTO rewards (id, mask_id, points, mask_code, filter_code, name, img_url, descr, url) VALUES ('" . uniqid() . "', '" . $maskId . "', " . $points . ", '" . $name . "', '" . $imgURL . "', '" . $desc . "', '" . $link . "')");