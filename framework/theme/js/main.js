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
            this.blur();
            
            if (window.location.pathname !== event.target.pathname) {
                $("body").
                    fadeOut(300, function () {
                        window.location.href = event.target.href;
                    });
            }
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
            src: "framework/theme/images/external.gif",
            width: "14px"
        }));
	
	$("figure.slideshow").slideShow({AlbumID: "15391642"});
	
	$("article.whitepaper figure").Whitepaper();
	
	$("a[rel=Imagezoom]").Imagezoom();

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

