Smugmug("6C3JkTZdWzQjswrYpAMOUgBAhIkpJtTx");

$.fn.ready(function(){
    var section = document.body.className;

    function sprite (text, type) {
        return $("<span>")
            .append(text.split(" ")[0])
            .addClass("sprite sprite-" + type)
            .bind("toggle", function () {
                this.innerHTML = text.replace(this.innerHTML, "");
            });
    }

    // email links in plain-text
    $("span.email")
        .replaceWith(function () {
            var email;

            if (this !== window) {
                email = $(this)
                    .text()
                    .replace(/~/g, "");

                return $("<a></a>")
                    .attr("href", "mailto:" + email)
                    .text(email);
            }
        });
    
    $("body")
        .fadeOut(0)
        .css("visibility", "visible")
        .fadeIn(1000);

    // external links
    (function (ext) {
        $("a")
            .filter(function () {
                return this.hostname && window.location.hostname !== this.hostname && !$(this).find("img").length;
            })
            .append(ext);
        }(sprite("&rarr;", "external")));

    $("figure.slideshow").slideShow({AlbumID: "17358575"});

    $("article.whitepaper figure").Whitepaper("article");

    $("a[rel=Imagezoom]").Imagezoom();

    // add interactivity to all sections that have more than one item		
    $(".Resume section")
        .find("h2")
        .filter(function (indx, node) {
            var
                self = $(node)

                siblings = self
                    .nextUntil("h2")
                    .slice(2);

            // only apply behavior to sections with more than one item in the section
            if (siblings.length) {

                self.data("siblings", siblings);

                return true;
            }
        })
        .addClass("accordion open")
        .append(sprite("", "openclose"))
        .on("click", function () {
            // show/hide all but the first item in a section
            $(this)
                .toggleClass("open close")
                .find(".sprite")
                    .trigger("toggle")
                    .end()
                .data("siblings")
                .stop()
                .slideToggle();
        })
        .trigger("click");

    if ("Projects" === section) {
        $(".grid_8")
            .find("h3, h4")
            .addClass("accordion")
            .append(sprite("+ -", "plusminus"))
            .hover(function () {
                $(this)
                    .find(".sprite")
                    .trigger("toggle");
            })
            .on("click", function () {
                $(this)
                    .find(".sprite")
                        .trigger("toggle")
                        .end()
                    .nextUntil(this.nodeName)
                    .stop()
                    .slideToggle();
            })
            .trigger("click");
    }

    (function () {
        var
            notice = $("#noticetorecruiters")
            ,popup = notice.clone().html()
            ,width = $(document).width()
            ,show = function () {
                TINY.box.show(popup, 0, width > 400 ? 400 : width);
            };

        notice
            .children(":first")
                .addClass("button")
                .on("click", show)
                .end()
            .children()
                .not(":first")
                .hide();

        /#notice/i.test(window.location.hash) && show();
    }());
});