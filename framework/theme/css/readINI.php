<?php
$ini = parse_ini_file("variables.ini", true);
$ini = $ini[$prefs->scheme];

function map_names($v) { return "#$v"; }
$names = array_map("map_names", array_keys($ini));
function map_colors($v) { return "$v"; }
$colors = array_map("map_colors", array_values($ini));