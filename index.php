<?php

$theme = "default";

$pageTitle = "joshua kalis - designer, programmer";
$pageDesc = "";
$siteMenu = Array(
	 "about"
	,"portfolio"
	,"resume"
	,"downloads"
//	,"projects"
);

$domain = ($_SERVER['HTTP_HOST'] != "jkd")? "http://joshuakalis.com": "http://jkd";

$page = strtolower(preg_replace("/^\/|\?.*/", "", $_SERVER['REQUEST_URI']));
if ($page == "") {
    $page = "about";
}

$document = "website/".$page.".php";
require "website/themes/$theme/template.php";
