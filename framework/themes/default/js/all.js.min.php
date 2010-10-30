<?php

require "jsmin.php";

header('Content-type: text/javascript');

ob_start();

foreach(Array(
    "jquery1.4.2.min.js",
    "lightbox0.5.min.js",
    "_scripts.js",
    "regex.js"
    ) as $f) {
        echo JSMin::minify(file_get_contents($f));
}

ob_end_flush();