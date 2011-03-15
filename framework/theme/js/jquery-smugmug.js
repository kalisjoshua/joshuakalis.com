!!window.jQuery && (function ($) {
    $.fn.slideShow = function (options) {
        options = $.extend({}, {
            delay: 10000,
            size: "Medium"
        }, options);
        
    	var wrapper = this,
    	    gallery = [],
    	    rotate = function () {
    	        $.when($("<img/>", {"src": gallery[0]})).
    	            done(function (element) {
    	                wrapper.
    	                    slideDown(function () {
    	                        element.
    	                            appendTo(wrapper).
    	                            hide().
    	                            fadeIn(function () {
    	                                wrapper.
    	                                    find("img").
    	                                        not(":last").
    	                                            remove();
    	                            });
                                gallery.push(gallery.shift());
                                setTimeout(rotate, options.delay);
    	                    });
    	            });
	        };
    	
	    Smugmug.login(function () {
        	Smugmug.images.get(
        	    {
        	        AlbumID: options.AlbumID,
        	        Heavy: 1
        	    },
        	    function(response, len, rand) {
            		$.each(response.Images, function () {
            			gallery.push(this[(options.size || "Medium") + "URL"]);
            		});
            		
            		// randomize the gallery array
        	        len = gallery.length;
        	        while (len--) {
        	            rand = parseInt(Math.random() * gallery.length, 10);
        	            gallery = gallery.slice(0, rand).concat(gallery[len], gallery.slice(rand + 1));
        	        }
        	        
            		rotate();
                });
	    });
	    
	    return wrapper.
	        empty();
    };

})(jQuery);
