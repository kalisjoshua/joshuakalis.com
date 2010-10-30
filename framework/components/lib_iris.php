<?php

/* [markdown]
# lib_iris($tmpl, $json) #

* $tmpl - (string) a template string for formatting data
* $json - (string) json encoded object

Returns the template filled in with the data.

## Example ##

echo lib_iris(
    file_get_contents(<file_name>.tmpl),
    file_get_contents(<file_name>.json)
);

*/
function lib_iris($tmpl, $json) {
    $tmpl = preg_replace(Array("/\n/", "/^\t+/", "/^\s{4}/"), Array("~n~", "~t~"), $tmpl);
    
    $tmpl = _lib_iris_recurse($tmpl, json_decode($json, TRUE));
    
    return preg_replace(Array("/~n~/", "/~t~/"), Array("\n", "    "), $tmpl);
} 

/* [markdown]
# _lib_iris_node($tmpl) #

* $tmpl - (string) a template string for formatting data

Returns the next variable from the template string passed in. Returned result is an array, created by preg_match function, containing: the token-string (variable name surrounded by curly-braces), just the token string, and (only if a block statement) the full block statement.

*/
function _lib_iris_node($tmpl) {
    preg_match("/\{([^}]+)\}(.*?)\{\/\\1\}/", $tmpl, $block);    
    preg_match("/\{([^\/}]+)\}/", $tmpl, $simple);
    
    if (empty($block)) {
        return $simple;
    }
    
    if (empty($simple)) {
        return $block;
    }

    // return the variable closest to the begining of the string
    return (strpos($tmpl, $block[0]) > strpos($tmpl, $simple[0])) ? $simple: $block;
}

/* [markdown]
# _lib_iris_recurse($tmpl, $json) #

* $tmpl - (string) a template string for formatting data
* $json - (string) json encoded object

Recurse down into a template based on the variables in the template.

*/
function _lib_iris_recurse($tmpl, $json) {
    $node = _lib_iris_node($tmpl);
    
    do {
        $temp = "";
        if(count($node) == 2) {
            // simple
            $temp = (empty($json[$node[1]])) ? "": ($node[1] == "#") ? $json : $json[$node[1]];
        }
        else if(count($node) == 3) {
            // block
            
            // split the block between the template for the data that is available and the fallback for when the data is not available
            $branch = preg_split("/\{\?$node[1]\}/", $node[2]);
            $branch = (empty($json[$node[1]])) ? $branch[1]: $branch[0];
            
            if (is_array($json[$node[1]])) {
                // loop over the array/object members so that they are all displayed
                foreach ($json[$node[1]] as $key => $value) {
                    $temp .= _lib_iris_recurse($branch, $value);
                }
                if ($temp == "") {
                    $temp = $branch;
                }
            }
            else {
                $temp = $branch;
            }
        }
        
        // replace, in the template, the node with the applied template
        $tmpl = substr($tmpl, 0, strpos($tmpl, $node[0])) . $temp . substr($tmpl, strpos($tmpl, $node[0]) + strlen($node[0]));
        
        // get the next node
        $node = _lib_iris_node($tmpl);
        
    } while(!empty($node));
    
    return $tmpl;
}
