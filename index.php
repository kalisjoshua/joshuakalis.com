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

$API_request = strtolower(preg_replace("/\?.*/", "", $_SERVER['REQUEST_URI']));
$API_request = preg_match('/^\/?$/', $API_request)? Array("about"): explode("/", substr($API_request, 1));

$page = $API_request[0];

$document = "website/".$page.".php";
require "website/themes/$theme/template.php";
