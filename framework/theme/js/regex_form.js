/*jshint laxcomma:true*/
/*global jQuery*/
(function ($) {
    "use strict";

    function entt (str, is_r) {
        return str
            .replace(/</g, (is_r ? "(?:&lt;)" : "&lt;"))
            .replace(/>/g, (is_r ? "(?:&gt;)" : "&gt;"));
    }

    function pre (str) {
        return "<pre>%1</pre>"
            .replace("%1", str);
    }

    // return a valid regular expression or false
    function regex (temp) {
        try {
            temp = RegExp.apply(null, entt(temp, true).match(rREGEX).slice(1));
            return (rBLANK !== temp.toString() ? temp : false);
        } catch (err) {
            return false;
        }
    }

    function wrap (str, regex, sub) {
        return entt(str)
            .replace(regex, sub || "<span>$&</span>") || str;
    }

    var rBLANK = (new RegExp()).toString()
      , rREGEX = /^\/(.*)\/([gim]{0,3})$/;

    $.fn.ready(function () {
        $("fieldset").hide();

        var haystack  = $("#haystack")
          , pattern   = $("#pattern")
          , replace   = $("#replace")
          , results   = $("#results")
          , run       = function (event) {
                event && event.preventDefault();

                var temp = regex(pattern.val());

                // highlight the text only if the current pattern is valid
                results.html(pre(temp
                    ? wrap(haystack.val(), temp, replace.val())
                    : entt(haystack.val())));
            };

        // the form should never actually submit
        $("#regex")
            .on("submit", run);

        haystack
            .on("change", run);

        pattern
            .add(replace)
            .on("keyup", run);
    });
}(jQuery));
