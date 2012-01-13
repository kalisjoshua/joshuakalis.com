Smugmug("6C3JkTZdWzQjswrYpAMOUgBAhIkpJtTx");

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
            this.blur();
        });
    
    if (/Jan 18 2012/.test(Date())) {
        $("#StopSOPA")
            .click(function () {
                $(this).remove();
            })
            .show();

        $("body")
            .css("visibility", "visible")
            .show();
    } else {
        $("body").
            fadeOut(0).
            css("visibility", "visible").
            fadeIn(1000);
    }

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

    $("figure.slideshow").slideShow({AlbumID: "17358575"});

    $("article.whitepaper figure").Whitepaper("article");

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

