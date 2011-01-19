$(document).ready(function(){
    $("span.email").replaceWith(function () {
        if (this === window) {
            return;
        }
        var email = $(this).text().replace(/~/g, "");
        return $("<a></a>").
            attr("href", "mailto:" + email).
            text(email);
    });

    $("a").filter(function () {
        return this.hostname && window.location.hostname !== this.hostname
    }).
    append(" <img alt=\"external link icon\" height=\"14px\" src=\"framework/theme/images/external.gif\" />");
    
	var regexEval = function (event) {
		try {
			var haystack = $("#haystack").val(),
				pattern = new RegExp($("#pattern").val(), 
					($("#global")[0].checked ? "g" : "") +
					($("#insensitive")[0].checked ? "i" : "") +
					($("#multiline")[0].checked ? "m" : "")),
				matches = pattern.exec(haystack).slice(1);
		
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
	};
	
	$("figure.photos").slideShow({AlbumID: "15391642"});
	
	// the form should never submit
	$(".RegExp form#regex").submit(function (event) {
		event.preventDefault();
	});
	// add event handlers to the regex form fields
	$(".RegExp form#regex #haystack, .RegExp form#regex input[type=checkbox]").change(regexEval);
	$(".RegExp form#regex #pattern").keyup(regexEval);
	
    $("a.Portfolio").lightBox(); // this is a comment

    // add interactivity to all sections that have more than one item		
    $(".Resume h2").
        add(".Portfolio h2").
        unbind("click").
        click(function () {
            // show/hide all but the first item in a section
            $(this).
                toggleClass("open").
                nextUntil("h2").
                not("h2 + div").
                slideToggle("slow");
        }).
        filter(function () {
            // only apply behavior to sections with more than one item in the section
            return $(this).nextUntil("h2").length > 1;
        }).
        addClass("accordion").
        click();
});