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

$domain = ($_SERVER['HTTP_HOST'] != "localhost")? "http://joshuakalis.com": "http://localhost";

$page = strtolower(preg_replace("/\?.*/", "", $_SERVER['REQUEST_URI']));
$page = preg_match('/^\/?$/', $page)? Array("about"): explode("/", substr($page, 1));

$page = $page[0];

$document = "website/".$page.".php";
require "website/themes/$theme/template.php";
