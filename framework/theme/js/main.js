$(document).ready(function(){
    // email links in plain-text
    $("span.email").replaceWith(function () {
        if (this === window) {
            return;
        }
        var email = $(this).text().replace(/~/g, "");
        return $("<a></a>").
            attr("href", "mailto:" + email).
            text(email);
    });
    
    $("nav a").
        click(function (event) {
            event.preventDefault();
            $("body").
                fadeOut(300, function () {
                    window.location.href = event.target;
                });
        });
    $("body").fadeIn(1000);

    // external links
    $("a").
        filter(function () {
            return this.hostname && window.location.hostname !== this.hostname && !$(this).find("img").length;
        }).
        append($("<img>", {
            alt: "external link icon",
            "class": "external",
            height: 14,
            src: "framework/theme/images/external.gif"
        }));
	
	$("figure.slideshow").slideShow({AlbumID: "15391642"});
	
	$("article.whitepaper").Whitepaper();
	
	$("a[rel=Imagezoom]").Imagezoom();
	
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

    // add interactivity to all sections that have more than one item		
    $(".Resume article h2").
        unbind("click").
        click(function () {
            // show/hide all but the first item in a section
            $(this).
                toggleClass("open").
                nextUntil("h2").
                not("h2 + div, h2 + div + div").
                stop().
                delay(200).
                slideToggle(700);
        }).
        filter(function () {
            // only apply behavior to sections with more than one item in the section
            return $(this).nextUntil("h2").length > 2;
        }).
        addClass("accordion").
        click();
});

