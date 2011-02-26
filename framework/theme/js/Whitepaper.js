(function (window, $) {
    $(function () {
        var white = $("<div/>", {id: "Whitepaper_modal"}),
            paper = $("<div/>", {id: "Whitepaper_content"});
        
        $.Whitepaper = {
            hide: function () {
                white.fadeOut();
                paper.fadeOut(function () {
                    $(this).empty();
                });
            },
            show: function (content) {
                white.fadeIn();
                paper.fadeIn().html(content);
            }
        };
        
        white.click($.Whitepaper.hide);
        
        $("body").append(white, paper);
    });
    $.fn.Whitepaper = function () {
        var template = $("<article/>", {
                class: "whitepaper"
            }).
            append("<h1>Whitepaper</h1>");
        
        this.click(function (event) {
            event.preventDefault();
            $.Whitepaper.show(template.clone().append(this.innerHTML));
        });
    };
}(window, jQuery));