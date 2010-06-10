<!DOCTYPE html>
<html>
<head>
<title>Colors</title>
<meta charset="utf-8" />
<!--[if IE]>
<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
</head>

<body>
<?php
require "_variables.php";

foreach( $colors as $key => $value ) {
	echo "$names[$key]<br />$key - #$value<div style=\"background:#$value;border:1px solid #000000;height:40px;margin:1px;width:100px;\"></div>";
}
?>
</body>
</html>