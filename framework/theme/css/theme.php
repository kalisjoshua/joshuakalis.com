<?php
$prefs = json_decode(file_get_contents("../../models/site.config.json"));
require("readINI.php");
unset($ini["bg_image"], $ini["attachment"]);
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />

<title>Current Theme - joshuakalis.com</title>
<meta name="author" content="Joshua T Kalis" />

<style>
div {
    float: left;
    position: relative;
    width: 20%;
    }
div.color {
    float: none;
    height: 200px;
    margin: 10px;
    width: auto;
    }
</style>

</head>
<body>

<script>
function colorNode (name, color) {
    var node = document.createElement("DIV");
        
    node.innerHTML =
        "<p>" + name + ": " + color + "</p>" +
        "<div class=\"color\" style=\"background:" + color + ";\"></div>";
    
    document.body.appendChild(node);
}

(function (colors) {
    var count = 0,
        node;
    for (node in colors) {
        colorNode(node, colors[node]);
    }
}(<?php echo json_encode($ini); ?>));
</script>

</body>
</html>