<?php
$template = "default";
$page = strtolower(preg_replace('/(?:[^\/]*\/)|(?:\.php)/', '', $_SERVER['REQUEST_URI']));
$cache = "/cache/$page.html";
$siteURL = "http://joshuakalis.com";
if ($_SERVER['HTTP_HOST'] == "localhost") {
    $siteURL = "http://localhost/jkd/website";
}
$siteTitle = "joshua kalis - designer / programmer";
$siteDesc = "Joshua T Kalis is a web developer with a focus on usable and accessible web applications.";
$siteMenu = Array(
	 "about"
	,"portfolio"
	,"resume"
);

require "$template/template.php";
