<?php
$activeScheme = 0;
$theme = json_decode(file_get_contents("../../../models/site.config.json"))->theme;
$schemes = Array(
	//		pageBG		contentBG	contentFG	menuBG1		menuFG1		menuBG2		menuFG2		accent1		accent2
	//		0			1			2			3			4			5			6			7			8
	 Array( "FFFFFF",	"FFFFFF",	"1D1E1F",	"09628D",	"666666",	"FFFFFF",	"FFFFFF",	"4E90AD",	"D2DDD5" )
	,Array( "000000",	"000000",	"EADEDD",	"541B15",	"BBBBBB",	"000000",	"000000",	"902D24",	"000000" )
	,Array( "211603",	"FFFFFF",	"FFFFFF",	"6FA2BC",	"666666",	"211603",	"FFFFFF",	"4E90AD",	"211603" )
);
$colors = $schemes[$activeScheme];

$contentWidth = 796;
$sidebarWidth = 200;

$bodyBG =		"#" . $colors[0];
$contentBG =	"#" . $colors[1];
$contentFG =	"#" . $colors[2];
$menuBG1 =		"#" . $colors[3];
$menuFG1 =		"#" . $colors[4];
$accent1 =		"#" . $colors[7];
$accent2 =		"#" . $colors[8];

$names = Array(
	 "bodyBG"
	,"contentBG"
	,"contentFG"
	,"menuBG1"
	,"menuFG1"
	,"menuBG2"
	,"menufG2"
	,"accent1"
	,"accent2"
);

// if the GET string contains anything this will display the color scheme
// may want to change this so that I can call themes dynamicaly with the request string
if (!empty($_GET)) { ?>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>Colors</title>
</head>

<body>
<?php
foreach( $colors as $key => $value ) {
	echo "<div style=\"float:left;\">$names[$key]<br />$key - #$value<div style=\"background:#$value;border:1px solid #000000;height:200px;margin:10px;width:90px;\"></div></div>";
}
?>

<!--[if IE]>
<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
</body>
</html>

<?php
}
