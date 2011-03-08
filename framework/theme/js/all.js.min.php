<?php

require "jsmin.php";

header('Content-type: text/javascript');

ob_start();

foreach(Array(
    "Whitepaper.js",
    "Imagezoom.js",
    "regex_form.js",
    "jquery-smugmug.js",
    "main.js"
    ) as $f) {
        //echo file_get_contents($f);
        echo JSMin::minify(file_get_contents($f));
}

ob_end_flush();