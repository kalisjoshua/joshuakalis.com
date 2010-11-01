<?php

function load_json ($file) {
    return json_decode((is_file($file) ? file_get_contents($file) : "{}"));
}
