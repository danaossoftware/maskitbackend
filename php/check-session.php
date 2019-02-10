<?php
session_start();
if (isset($_SESSION["maskitbe_user_id"]) && $_SESSION["maskitbe_user_id"] != "") {
	echo 0;
} else {
	echo -1;
}