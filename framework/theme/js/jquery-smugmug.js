(function ($) {
    $.fn.slideShow = function (options) {
        options = $.extend({}, {
            delay: 10000,
            size: "Medium",
            transition: 1000
        }, options);
        
        var wrapper = this
                .empty()

            ,dim = {
                height: parseInt(wrapper.css("height"), 10)
                ,width: parseInt(wrapper.css("width"), 10)
            }

            ,drop = function (arr, indx) {

                return arr.slice(0, indx).concat(arr.slice(indx + 1))
            }

            ,gallery = []

            ,rotate = function () {
                if (gallery[0].jquery) {
                    gallery[0]
                        .hide()
                        .appendTo(wrapper)
                        .fadeIn();
                    gallery.push(gallery.shift());
                    setTimeout(rotate, options.delay);
                } else {
                    gallery[0] = $("<img>")
                        .attr("src", gallery[0])
                        .load(function () {
                            var w = this.width * dim.height / this.height;

                            $(this)
                                .attr("height", dim.height)
                                .css("margin-left", -(w / 2));
                            rotate();
                        });
                }
            }

            ,shuffle = function (arr) {
                var r;

                return arr.length === 1
                    ? arr
                    : [arr[(r = ~~(Math.random() * arr.length))]]
                        .concat(shuffle(drop(arr, r)));
            };
        
        Smugmug.login(function () {
            Smugmug.images.get(
                {
                    AlbumID: options.AlbumID,
                    Heavy: 1
                },
                function(response) {
                    gallery =
                        shuffle(response.Images
                            .map(function (node) {
                                return node[options.size + "URL"] || node["MediumURL"];
                            }));

                    wrapper.
                        slideDown(rotate);
                });
        });
        
        return wrapper;
    };

})(jQuery);
