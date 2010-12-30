<?php
$prefs = json_decode(file_get_contents("../../models/site.config.json"));

$activeScheme = $prefs->scheme;
$contentWidth = 796;
$sidebarWidth = 200;
$menuWidth = 100;

$schemes = Array(
    Array( // 0
        "title"     => "default joshuakalis.com",
        "attachment"=> "scroll",
        "body"      => "FFFFFF",
        "text"      => "1D1E1F",
        "menu"      => "09628D",
        "section"   => "4E90AD",
        "link"      => "666666"
    ),
    Array( // 1
        "title"     => "vibrant black",
        "attachment"=> "scroll",
        "body"      => "000000",
        "text"      => "F0F7E4",
        "menu"      => "543E5F",
        "section"   => "E1EFCA",
        "link"      => "D3CAD7"
    ),
    Array( // 2
        "title"     => "blue brown",
        "attachment"=> "scroll",
        "body"      => "211603",
        "text"      => "EBE7DC",
        "menu"      => "4E90AD",
        "section"   => "6FA2BC",
        "link"      => "CFC9B8"
    ),
    Array(// 3
        "title"     => "early sunrise",
        "attachment"=> "fixed",
        "body"      => "212534",
        "text"      => "D8DFE3",
        "menu"      => "793122",
        "section"   => "A7B9C3",
        "link"      => "D8DFE3"
    ),
    Array( // 4
        "title"     => "psycho stripes",
        "attachment"=> "scroll",
        "body"      => "E9EBDA",
        "text"      => "34403A",
        "menu"      => "771334",
        "section"   => "214832",
        "link"      => "771334"
    ),
    Array( // 5
        "title"     => "pale pinks and sage",
        "attachment"=> "scroll",
        "body"      => "233539",
        "text"      => "E2EDEF",
        "menu"      => "617F84",
        "section"   => "FEFCE4",
        "link"      => "FFFFFF"
    )
);
$colors = $schemes[$activeScheme];

// setup variables and values
$title = array_shift($colors);
$attachment = array_shift($colors);
foreach ($colors as $k => $v) {
    $$k = $colors[$k] = ($v != "")? "#$v" : "transparent";
}

// if the GET string contains anything this will display the color scheme
// may want to change this so that I can call themes dynamicaly with the request string
if (!empty($_GET)) { ?>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>CSS Colors</title>
<style>
body > div {
    float: left;
    margin: 0 4px;
    text-align: center;
    width: 100px;
    }
div > div {
    border: 1px solid #000000;
    height: 140px;
    }
</style>
</head>

<body>
<?php
echo "<h1>$title</h1>\n";
foreach ($colors as $k => $v) {
	echo "<div>$k<div style=\"background:$v;\"></div>$v</div>\n";
}
?>
</body>
</html>

<?php
}
