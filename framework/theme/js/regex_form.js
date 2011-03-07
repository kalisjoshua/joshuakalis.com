(function ($) {
    $(function () {	
        (function (regexEval) {
        	// the form should never submit
        	$(".RegExp form#regex").
            	submit(function (event) {
            		event.preventDefault();
            	});
        	// add event handlers to the regex form fields
        	$(".RegExp form#regex #haystack, .RegExp form#regex input[type=checkbox]").change(regexEval);
        	$(".RegExp form#regex #pattern").keyup(regexEval);
        }(function (event) {
    		try {
    			var haystack = $("#haystack").val(),
    				pattern = new RegExp($("#pattern").val(), 
    					($("#global")[0].checked ? "g" : "") +
    					($("#insensitive")[0].checked ? "i" : "") +
    					($("#multiline")[0].checked ? "m" : "")),
    				matches = pattern.exec(haystack);
		    
    			if (haystack && pattern) {
    				$(matches).each(function(indx, ele) {
    					haystack = haystack.replace(RegExp("(" + ele + ")", "g"), "<span>$1</span>");
    				});
    				$("#results").html("<pre>" + haystack + "</pre>");
    			}
    		}
    		catch (err) {
    			// attempting to create a new RegExp Object with an incomplete pattern
    			// will throw and error but we don't need to handle that error here.
    		}
    	}));
    });
}(jQuery));