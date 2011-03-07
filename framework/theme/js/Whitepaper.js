(function ($) {
    $.fn.Whitepaper = function () {
        if (!this.length) {
            return;
        }
        
        var Whitepaper;
        
        $(function () {
            var white = $("<div/>", {id: "Whitepaper_modal"}),
                paper = $("<div/>", {id: "Whitepaper_content"}),
                title = $("<div/>", {id: "Whitepaper_title"}),
                close = $("<a/>", {href: "#"}).html("X");
        
            Whitepaper = {
                hide: function (event) {
                    !!event && event.preventDefault();
                    white.fadeOut();
                    paper.fadeOut(function () {
                        $(this).empty();
                    });
                },
                show: function (content, caption) {
                    white.fadeIn();
                    paper.
                        css({
                            "top": 30 + $("html").scrollTop()
                        }).
                        append(title.
                            clone().
                            html(caption || "Project Detail").
                            append(close)).
                        append(content).
                        slideDown(800);
                }
            };
        
            close.click(Whitepaper.hide);
            white.click(Whitepaper.hide);
            $("body").append(white, paper);
        });
        
        return this.
            click(function (event) {
                event.preventDefault();
                Whitepaper.show($("<article class=\"whitepaper\"><h1>Whitepaper</h1></article>").
                    append($(this).parents("article:first").html()));
            });
    };
}(jQuery));