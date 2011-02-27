(function (window, $) {
    $(function () {
        var white = $("<div/>", {id: "Whitepaper_modal"}),
            paper = $("<div/>", {id: "Whitepaper_content"}),
            title = $("<div/>", {id: "Whitepaper_title"}),
            close = $("<a/>", {href: "#"}).html("X");
        
        $.Whitepaper = {
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
                    append(title.
                        clone().
                        html(caption || "Project Detail").
                        append(close)).
                    append(content).
                    slideDown(800);
            }
        };
        
        close.click($.Whitepaper.hide);
        white.click($.Whitepaper.hide);
        $("body").append(white, paper);
    });
    $.fn.Whitepaper = function () {
        this.
            append($("<a class=\"whitepaper_preview\" href=\"#\"></a>").
                html("").
                click(function (event) {
                    event.preventDefault();
                    $.Whitepaper.show($("<article class=\"whitepaper\"><h1>Whitepaper</h1></article>").
                        append(this.parentNode.innerHTML));
                }));
    };
}(window, jQuery));