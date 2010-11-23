<?php
header('Content-type: text/css');
$isIE = preg_match( "/MSIE/", $_SERVER['HTTP_USER_AGENT'] );
ob_start("compress");
function compress($buffer) {
    return preg_replace(array('/\s*([,\{\}:;])\s*/', '/[\n\r\t]+/', '!/\*[^*]*\*+([^/][^*]*\*+)*/!'), array('\1', ''), $buffer);
}

include("reset.css");

include("content.css.php");
include("layout.css.php");
include("regex.css.php");

include("lightbox0.5.css");

ob_end_flush();
?>