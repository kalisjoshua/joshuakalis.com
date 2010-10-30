<?php

// include all files in the components directory
foreach (glob("../components/*.php") as $filename) {
    require $filename;
}

// start JSON object for data templating
$site = load_json("../models/site.config.json");

$site->domain = "http://".(($_SERVER['HTTP_HOST'] != $site->url->local)? $site->url->live: $site->url->local);
$site->year = gmdate("Y");

$page = strtolower(preg_replace("/^\/|\?.*/", "", $_SERVER['REQUEST_URI']));

// build menu structure
// **consider reading in meta information from each page for links of main menu
preg_match_all("/\//", $page, $matches);
$depth = str_pad("", count($matches[0]) * 3, "../");

$site->menu = 
    array_map(
        function ($node) {
            global $depth;
            $page = preg_replace("/..\/views\/(.*)\.\w+$/", "$1", $node);
            return json_decode("{\"link\": \"$page\", \"url\": \"$depth$page\"}");
        },
        glob("../views/*.tmpl")
    );

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
    (is_file("../models/$page.json") ? load_json("../models/$page.json") : "[]")
);

// render full page
echo lib_iris(
    file_get_contents("../themes/default/layout.tmpl"),
    json_encode($site)
);
