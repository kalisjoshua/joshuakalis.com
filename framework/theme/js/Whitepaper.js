(function ($) {
    var  controls = {
            hide: function (event) {
                !!event && event.preventDefault();

                white
                    .fadeOut();

                paper
                    .fadeOut(function () {
                        $(this).empty();
                    });
            }

            ,show: function (content, caption) {
                white
                    .appendTo("body")
                    .fadeIn();
                    
                paper
                    .appendTo("body")
                    .css({
                        "top": 30 + $("html").scrollTop()
                    })
                    .append(title
                        .clone()
                        .html(caption || "Project Detail")
                        .append(close()))
                    .append(content)
                    .slideDown(800);
            }
        }

        ,close = function () {

            return $("<a/>", {
                     click: controls.hide
                    ,href: "#"
                    ,text: "X"
                });
        }

        ,paper = $("<div/>", {
            id: "Whitepaper_content"
        })

        ,title = $("<div/>", {
            id: "Whitepaper_title"
        })

        ,white = $("<div/>", {
             click: controls.hide
            ,id: "Whitepaper_modal"
        });

    $.fn.Whitepaper = function (parent) {
        
        return this // jquery collection - implied .each
            .click(function (event) {
                event.preventDefault();

                var content = $(this)
                    .parents(parent + ":first")
                    .clone()
                        .find("figure")
                        .remove()
                        .end()
                    .html();
                
                controls
                    .show($("<article />")
                        .addClass("whitepaper")
                        .append("<h1>Whitepaper</h1>")
                        .append(content));
            });
    };
}(jQuery));
