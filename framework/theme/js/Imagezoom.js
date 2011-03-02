
(function ($) {
    var Imagezoom_kill = function (elms) {
        elms.fadeOut(function () {
            $(this).remove();
        });
    };
    $.fn.Imagezoom = function (options) {
        this.live("click", function (event) {
            event.preventDefault();
            
            var blind = $("<div/>", {id: "Imagezoom_blind"}),
                image = $("<img/>", {src: $(this).attr("href")});
            
            blind.
                click(function () {
                    Imagezoom_kill(blind.add(image));
                }).
                appendTo("body").
                fadeIn();
                
            image.
                hide().
                css({
                    left: "50%",
                    position: "absolute",
                    top: "50%",
                    zIndex: "99999"
                }).
                click(function () {
                    Imagezoom_kill(blind.add(image));
                }).
                load(function () {
                    var orig = {};
                    orig.height = this.height;
                    orig.marginTop = orig.height <= document.height ? orig.height : document.height;
                    orig.width = this.width;
                    
                    $(this).
                        css({
                            marginLeft: "-50px",
                            marginTop: -(Math.floor(orig.height * 100 / orig.width)),
                            width: "100px"
                        }).
                        appendTo("body").
                        show().
                        animate({
                            marginLeft: -Math.floor(orig.width / 2),
                            marginTop: -Math.floor(orig.marginTop / 2),
                            width: orig.width
                        }, 700);
                });
        });
    };
}(jQuery));