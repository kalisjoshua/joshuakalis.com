<?php
$theme = json_decode(file_get_contents("../../../models/site.config.json"))->theme;

$activeScheme = 3;
$contentWidth = 796;
$sidebarWidth = 200;
$menuWidth = 100;

$schemes = Array(
    Array(
        "title"     => "default joshuakalis.com",
        "attachment"=> "scroll",
        "body"      => "FFFFFF",
        "text"      => "1D1E1F",
        "menu"      => "09628D",
        "accent"    => "4E90AD",
        "light"     => "666666"
    ),
    Array(
        "title"     => "",
        "attachment"=> "scroll",
        "body"      => "000000",
        "text"      => "F0F7E4",
        "menu"      => "543E5F",
        "accent"    => "E1EFCA",
        "light"     => "D3CAD7"
    ),
    Array(
        "title"     => "",
        "attachment"=> "scroll",
        "body"      => "211603",
        "text"      => "EBE7DC",
        "menu"      => "4E90AD",
        "accent"    => "6FA2BC",
        "light"     => "CFC9B8"
    ),
    Array(
        "title"     => "early sunrise",
        "attachment"=> "fixed",
        "body"      => "212534",
        "text"      => "D8DFE3",
        "menu"      => "793122",
        "accent"    => "A7B9C3",
        "light"     => "D8DFE3"
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
