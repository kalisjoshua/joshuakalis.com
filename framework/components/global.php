<?php

function load_json ($file) {
    return json_decode((is_file($file) ? file_get_contents($file) : "{}"));
}

// build menu structure
// **consider reading in meta information from each page for links of main menu
/*function build_menu($request_uri) {
    $menu = glob("../views/*.tmpl");

    array_walk(
        $menu,
        function (&$item, $key, $depth) {
            $page = preg_replace("/..\/views\/(.*)\.\w+$/", "$1", $item);
            $item = json_decode("{\"link\": \"$page\", \"url\": \"$depth$page\"}");
        },
        str_pad("", (substr_count($request_uri, "/") - 1) * 3, "../")
    );
    
    return $menu;
}*/