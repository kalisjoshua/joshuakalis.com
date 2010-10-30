/*jslint white: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, newcap: true, immed: true, strict: true */
"use strict";

var Lotus = (function (window) {
    function resolve(obj, mmb) {
        mmb = mmb.split(".");
        for (var i = 0; i < mmb.length; i += 1) {
            obj = obj[mmb[i]];
        }
        return obj;
    }
    
    return function (data, template) {
        var nl = "~!~";
        return template.replace(/\n/g, nl
        ).replace(/\{if:([_\.\d\w]+)\}(.*)\{\/if:\1\}/gi, function (full, list, tmpl) {
            // conditional statement
            var bool = resolve(data, list);
            tmpl += (tmpl.indexOf("{else}") + 1) ? "": "{else}";
            tmpl = tmpl.split("{else}");
            return window.Lotus(bool, tmpl[(bool) ? 0: 1]);
        }).replace(/\{list:([_\.\d\w]+)\}(.*)\{\/list:\1\}/gi, function (full, list, tmpl) {
            // list iteration
            var i = 0,
                result = "";
            for (i; i < data.length; i += 1) {
                result += "\n" + window.Lotus(data[i], tmpl);
            }
            return result;
        }).replace(/\{map:([_\.\d\w]+)\}(.*)\{\/map:\1\}/gi, function (full, list, tmpl) {
            // hash table rendering
            return "<!-- {map:JSON} not implemented yet... sorry -->";
        }).replace(/\{([_\.\d\w]*?)\}/gi, function (full, member) {
            // object/member resolution
            return resolve(data, member);
        }).replace(new RegExp(nl, "g"), "\n");
    };
}(window));
