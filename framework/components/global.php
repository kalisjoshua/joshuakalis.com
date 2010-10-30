<?php

function load_json ($file) {
    return json_decode(file_get_contents($file));
}
