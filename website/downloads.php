
<h2>Downloads</h2>

<dl>
    <dt>Resumes</dt>
<?php
$dir = "website/resumes/";

if (is_dir($dir)) {
    if ($dh = opendir($dir)) {
        while (($file = readdir($dh)) !== false) {
            //echo "filename: $file : filetype: " . filetype($dir . $file) . "\n";
            if(!is_dir($file)) {
                $type = preg_replace("/.*\.([^\.]+)$/", "$1", $type = $file);
                echo "<dd><a class=\"filetype-$type\" href=\"$dir$file\">Resume - Kalis, Joshua<span>.$type</span></a></dd>";
            }
        }
        closedir($dh);
    }
}

?>
</dL>