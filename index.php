<?php

$template = "default";

$siteURL = ($_SERVER['HTTP_HOST'] != "localhost")? "http://joshuakalis.com": "http://localhost";
$sources = "$siteURL/website";
$resources = "$sources/themes/$template";
$portfolioFiles = "$sources/portfolio.files";

$siteTitle = "joshua kalis - designer, programmer";
$siteDesc = "";
$siteMenu = Array(
	 "about"
	,"portfolio"
	,"resume"
	,"downloads"
//	,"projects"
);

$API_request = strtolower(preg_replace("/\?.*/", "", $_SERVER['REQUEST_URI']));
$API_request = preg_match('/^\/?$/', $API_request)? Array("about"): explode("/", substr($API_request, 1));
if($API_request[0] == "error") {
    array_shift($API_request);
}

$page = $API_request[0];

$document = "website/".$page.".php";
require "website/themes/$template/template.php";
