(function($) {
    $.fn.slideShow = function(options) {
    	var img = this.find("img").
    	        click(function () {
    	            window.location.href = "http://joshuakalis.smugmug.com";
    	        }),
    	    photos = [],
    	    rotate = function () {
    	        img.attr("src", photos[0]);
    	        photos.push(photos.shift());
    	        setTimeout(rotate, 3000);
    	    };
	
    	$.smugmug.images(options, function(response) {
    		$.each(response.Images, function() {
    			photos.push(this[(options.size || "Medium") + "URL"]);
    		});
    		setTimeout(rotate, 3000);
    	});
    };
    
	$.smugmug = {
    	images: function(params, callback, use_https) {
    	    params.Heavy = -1;
    		params.method = "smugmug.images.get";
		
    		if (!params.AlbumID) {
    		    throw new Error("Must include album ID.");
    		}
    		    
            $.getJSON(
    		    "http" +
    		    (use_https ? "s" : "") +
    		    "://api.smugmug.com/hack/json/1.2.0/" +
    		    "?" + 
    		    $.param(params) +
    		    "&JSONCallback=?", callback);
    	}
    };
})(jQuery);