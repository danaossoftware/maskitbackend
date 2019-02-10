<?php
include 'db.php';
include 'common.php';
session_start();
$_SESSION["maskitbe_user_id"] = "";
unset($_SESSION["maskitbe_user_id"]);
session_destroy();