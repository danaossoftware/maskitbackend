<?php
$fileName = $_POST["file_name"];
move_uploaded_file($_FILES["image"]["tmp_name"], "../userdata/imgs/" . $fileName);