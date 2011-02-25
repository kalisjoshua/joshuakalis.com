<?php
header('Content-type: text/css');
$days_to_cache = 30;
header('Expires: '.gmdate('D, d M Y H:i:s',time() + (60 * 60 * 24 * $days_to_cache)).' GMT');

$prefs = json_decode(file_get_contents("../../models/site.config.json"));
$ini = parse_ini_file("variables.ini", true);
$ini = $ini[$prefs->scheme];

function map_names($v) { return "#$v"; }
$names = array_map("map_names", array_keys($ini));
function map_colors($v) { return "$v"; }
$colors = array_map("map_colors", array_values($ini));

$replace = array('/\s*([,\{\}:;])\s*/', '/[\n\r\t]+/', '!/\*[^*]*\*+([^/][^*]*\*+)*/!');
$min = array('\1', '');
/* */
function min_css($buffer) {
    global $colors, $names, $replace, $min;
    $buffer = str_replace($names, $colors, $buffer);
    $buffer = preg_replace($replace, $min, $buffer);
    return $buffer;
};
ob_start("min_css");

include("html5boilerplate.css");
include("960.css");

include("layout.css");
include("content.css");

include("regex.css");
include("lightbox0.5.css");

ob_end_flush();
/* */