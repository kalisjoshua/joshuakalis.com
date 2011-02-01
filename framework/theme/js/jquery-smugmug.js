!!window.jQuery && (function ($) {
    var Smugmug = window.Smugmug = {
            EndPoint: {
                "1.2.0": "/hack/json/1.2.0/",
                "1.2.1": "/services/api/json/1.2.1/",
                "1.2.2": "/services/api/json/1.2.2/"
            },
            Key: "6C3JkTZdWzQjswrYpAMOUgBAhIkpJtTx", // joshuakalis.smugmug.com API key
            SessionID: "",
            Version: "1.2.0"
        };
    
    Smugmug.apiCall = function (method, params, callback, use_https) {
        params.method = method;
        params.APIKey = Smugmug.Key;

        if (Smugmug.SessionID) {
            params.SessionID = Smugmug.SessionID;
        }
        
        var url =
            "http" + (use_https ? "s" : "") + "://api.smugmug.com" +
            Smugmug.EndPoint[Smugmug.Version] +
            "?" + $.param(params) +
            (Smugmug.Version > "1.2.1" ? "&Callback=?" : "&JSONCallback=?");
            
        $.get(url, null, callback, 'jsonp');
    };

    /* //doc//
    = Smugmug.login
        * options [optional] - object containing account email address and password or password hashed
        * callback [optional] - function to run after
    Either argument can be included or omitted and the function will perform as best it can with the information provided.
        
    == email & password
        options = {
            EmailAddress: "account_email_address",
            Password: "account_password"
        }

    == email & password (hashed)
        options = {
            EmailAddress: "account_email_address",
            PasswordHash: "account_password"
        }

    == anonymously
        options = {} or null
    */
    Smugmug.login = function (options, callback) {
        // if no arguments were passed in, fix the first one
        options = options || {};
        
        var login_method = "withPassword",
            options_type = Object.prototype.toString.call(options);

        if (!callback || !/Object/.test(options_type)) {
            // only one argument was passed in and it is not an Object
            if (/Function/.test(options_type)) {
                // the only argument is a function so we will use it as the callback
                callback = options;
            }
            options = {};
            login_method = "anonymously";
        }
        
        Smugmug.apiCall(
            "smugmug.login." + login_method,
            options,
            function (data) {
                // almost curry, so we can set the SessionID from smugmug
                Smugmug.SessionID = data.Login.Session.id;
                if (callback) {
                    callback();
                }
            },
            true
        );
    };


    /* //doc//
    = API Hooks (IIFE - Imediately Invoked Function Expression)
    Create functions for all API hooks provided by Smugmug proxy them through Smugmug.apiCall function.
    */
    (function (list, api, method, node, obj, signature) {
        // loop through all the API actions in the given array
        //      add new ones to the array as necessary
        while (list.length) {
            api = list.shift();
            obj = Smugmug;
            signature = "smugmug." + api;
            api = api.split(".");
            method = api.pop();
        
            while (!!(node = api.shift())) {
                obj = obj[node] = obj[node] || {};
            }
        
            // alias API function through Smugmug.apiCall
            obj[method] = (function (signature) {
                return function (params, callback) {
                    return Smugmug.apiCall(signature, params || {}, callback);
                };
            }(signature));
        }
    }([
        "albums.applyWatermark",
        "albums.changeSettings",
        "albums.create",
        "albums.delete",
        "albums.get",
        "albums.getInfo",
        "albums.removeWatermark",
        "albums.reSort",

        "albumtemplates.changeSettings",
        "albumtemplates.create",
        "albumtemplates.delete",
        "albumtemplates.get",

        "auth.checkAccessToken",
        "auth.getAccessToken",
        "auth.getRequestToken",

        "categories.create",
        "categories.delete",
        "categories.get",
        "categories.rename",

        "communities.get",

        "family.add",
        "family.get",
        "family.remove",
        "family.removeAll",

        "friends.add",
        "friends.get",
        "friends.remove",
        "friends.removeAll",

        "images.applyWatermark",
        "images.changePosition",
        "images.changeSettings",
        "images.crop",
        "images.delete",
        "images.get",
        "images.getEXIF",
        "images.getInfo",
        "images.getURLs",
        "images.removeWatermark",
        "images.rotate",
        "images.upload",
        "images.uploadFromURL",
        "images.zoomThumbnail",

        "login.anonymously",
        "login.withHash",
        "login.withPassword",

        "logout",

        "products.get",

        "sharegroups.albums.add",
        "sharegroups.albums.get",
        "sharegroups.albums.remove",
        "sharegroups.create",
        "sharegroups.delete",
        "sharegroups.get",
        "sharegroups.getInfo",

        "styles.getTemplates",

        "subcategories.create",
        "subcategories.delete",
        "subcategories.get",
        "subcategories.getAll",
        "subcategories.rename",

        "themes.get",

        "users.getDisplayName",
        "users.getTree",

        "watermarks.changeSettings",
        "watermarks.create",
        "watermarks.delete",
        "watermarks.get",
        "watermarks.getInfo"
    ]));
    
    $.fn.slideShow = function (options) {
        if (!this.length) {
            // if the element doesn't exist on the page exit
            return;
        }
        options = $.extend({}, {
                delay: 10000,
                size: "Medium"
            }, options);
        
        // use two images so that fading works
        // clone the image already in the markup to keep alt and title attributes
        this.
            find("img").
                first().
                    clone().
                    appendTo(this);
        
    	var images = this.find("img"),
    	    gallery = [],
    	    rotate = function () {
    	        images.
    	            first().
    	                fadeOut(1000, function () {
    	                    images.
    	                        last().
    	                            css({zIndex: "1"});
                	        images.
                	            first().
                	                css({zIndex: "0"}).
                	                attr("src", gallery[0]).
                	                show();
                	        gallery.push(gallery.shift());
                	        images.push(Array.prototype.shift.call(images));
                	        setTimeout(rotate, options.delay);
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
            	    
            		// initialize the images
            		images.
            		    first().
	                        css({zIndex: 1}).
            		        attr("src", gallery[0]).
            		        load(function () {
            		            $(this).
            		                show();
            		        });
            		images.
            		    last().
	                        css({zIndex: 0}).
            		        attr("src", gallery[1]).
            		        load(function () {
            		            $(this).
            		                show();
            		        });
            		gallery.push(gallery.shift(), gallery.shift());
            		setTimeout(rotate, options.delay);
            	});
	    });
    };

})(jQuery);
