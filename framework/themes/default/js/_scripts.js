$(document).ready(function(){
	var regexEval = function (event) {
		try {
			var haystack = $("#haystack").val(),
				pattern = new RegExp($("#pattern").val(), 
					($("#global")[0].checked ? "g" : "") +
					($("#insensitive")[0].checked ? "i" : "") +
					($("#multiline")[0].checked ? "m" : "")),
				result = pattern.exec(haystack),
				matches = result.slice(1);
		
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
		
		if (event.keyCode === 13) {
			event.preventDefault();
		}
	};
	
	// add event handlers to the regex form fields
	$(".RegExp form#regex #haystack, .RegExp form#regex input[type=checkbox]").change(regexEval);
	$(".RegExp form#regex #pattern").keyup(regexEval);
	
    //$("a[href*=http://]").not("[href*=http://joshua]").addClass("external");
    $('a.Portfolio').lightBox(); // this is a comment

	// add interactivity to all sections that have more than one item
	$(".Portfolio h2, .Resume h2").click(function () {
		// show/hide all but the first item in a section
	    $("div." + this.innerHTML).slice(1).slideToggle(1000);
	    $(this).toggleClass("open");
	})
		.filter(function (inde) {
			// only apply behavior to sections with more than one item in the section
			return $("div." + this.innerHTML).length > 1;
		})
		.addClass("accordion")
		.click();
});