<?php

require "jsmin.php";

header('Content-type: text/javascript');

ob_start();

foreach(Array(
    "libs/lightbox0.5.min.js",
    "jquery-smugmug.js",
    "main.js"
    ) as $f) {
        echo JSMin::minify(file_get_contents($f));
}

ob_end_flush();