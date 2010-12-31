<?php

// include all files in the components directory
foreach (glob("../components/*.php") as $filename) {
    require $filename;
}

// start JSON object for data templating
$site = load_json("../models/site.config.json");

$site->domain = (($_SERVER['HTTP_HOST'] != $site->url->local)? $site->url->live: $site->url->local);
$site->year = gmdate("Y");

//$site->menu = build_menu($_SERVER['REQUEST_URI']);
$site->menu = load_json("../models/sitemap.json");

$page = strtolower(preg_replace("/^\/|\?.*/", "", $_SERVER['REQUEST_URI']));
$page = ($page != "") ? $page : $site->menu[0]->link;

if (!is_file("../views/$page.tmpl")) {
    header("Location: $site->domain/404");
    exit;
}

// page specific meta information
preg_match("/<!--\n(.*?)(?>\n-->)(.*)/sm", file_get_contents("../views/$page.tmpl"), $matches);
foreach (split("\n", $matches[1]) as $info) {
    $info = split("=", $info);
    $site->meta->$info[0] = $info[1];
}

$site->page = ($site->meta->title != "") ? $site->meta->title: $page;
$site->description = ($site->meta->description != "") ? $site->meta->description: $site->description;

// render main content
$site->content = lib_iris(
    $matches[2],
    json_encode(load_json("../models/$page.json"))
);

// render full page
echo lib_iris(
    file_get_contents("../theme/layout.tmpl"),
    json_encode($site)
);
