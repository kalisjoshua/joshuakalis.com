<?php
$cache = "cached.js";

if (file_exists($cache)) {
    echo "//cached file\n";
    @readfile($cache);
    exit();
}
else {
    header('Content-type: text/javascript');
    ob_start();
    require "jsmin.php";
    foreach(Array(
        "jquery1.4.2.min.js",
        "lightbox0.5.min.js",
        "_scripts.js",
        "regex.js"
        ) as $f){echo JSMin::minify(file_get_contents($f));}
    
    // generate a new cache file
    if ($fp = @fopen($cache, 'w+')) {
        echo "\n//~~cache file ceated\n";
    }
    
    echo "\n//~~".ob_get_length()."\n";

    // save the contents of output buffer to the file
    @fwrite($fp, ob_get_contents());
    @fclose($fp); 

    ob_end_flush();
}