<?php
include 'db.php';
$name = $_POST["name"];
$price = intval($_POST["price"]);
$points = intval($_POST["points"]);
$desc = $_POST["desc"];
$link = $_POST["link"];
$imgURL = $_POST["img_url"];
$maskId = uniqid();
$c->query("INSERT INTO masks (id, name, img_url, link, mask_code, filter_code, descr, price) VALUES ('" . $maskId . "', '" . $name . "', '" . $imgURL . "', '" . $link . "', '" . $desc . "', " . $price . ")");
$c->query("INSERT INTO rewards (id, mask_id, points, mask_code, filter_code, name, img_url, descr, url) VALUES ('" . uniqid() . "', '" . $maskId . "', " . $points . ", '" . $name . "', '" . $imgURL . "', '" . $desc . "', '" . $link . "')");