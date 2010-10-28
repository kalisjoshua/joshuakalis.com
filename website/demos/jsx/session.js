"use strict";
// Provide the XMLHttpRequest class for IE 5.x-6.x:
// Other browsers (including IE 7.x-8.x) ignore this when XMLHttpRequest is predefined
if (typeof window.XMLHttpRequest === "undefined") {
    window.XMLHttpRequest = function () {
        try {
            return new ActiveXObject("Msxml2.XMLHTTP.6.0");
        } catch (a) {}
        try {
            return new ActiveXObject("Msxml2.XMLHTTP.3.0");
        } catch (b) {}
        try {
            return new ActiveXObject("Msxml2.XMLHTTP");
        } catch (c) {}
        try {
            return new ActiveXObject("Microsoft.XMLHTTP");
        } catch (d) {}
        throw new Error("XMLHttpRequest not supported by this browser.");
    };
}

var Session = (function () {
    var
        obj = {
            alarms      : [ 5, 2, 1 ],
            duration    : 20,
            postee      : "session.txt",
            redirect    : "end.html",
            
            // custom alert and confirm functions
            notify      : function (q) {
                alert(q);
            },
            remind      : function (q) {
                return confirm(q);
            },
            
            // localized verbiage
            units       : [ "minutes", "seconds" ],
            messages    : {
                description : "Accessibility enhancement; warning users of impending server timeouts and provide chances to exted a session.",
                error       : "An error with the browser has prevented the application from extending your session.",
                expired     : "Sorry, the session expired while waiting for your response.",
                fail        : "Sorry, there was an error in the connection with the server; your session might be closed.",
                reminder    : "Your session will expire in approximately %r. Would you like to extend your session at this time?"
            }
        },
        ref = {
            xhr: new window.XMLHttpRequest()
        };
    
    function cleanup() {
        // clear old timeouts when starting a new session
        if (ref.currentAlert) {
            clearTimeout(ref.currentAlert);
        }
        if (ref.finalTimeout) {
            clearTimeout(ref.finalTimeout);
        }
    }
    
    obj.close = function () {
        cleanup();
        if (obj.redirect) {
            window.location = obj.redirect;
        }
    };
    
    obj.extend = function () {
        if (ref.xhr) {
            ref.xhr.open("POST", obj.postee, false); // POST to avoid caching
            ref.xhr.send("");
            if ((ref.xhr.status === 200) && (ref.xhr.responseText.substring(0, 4) === "true")) {
                obj.start();
                return true;
            }
            else {
                obj.notify(obj.messages.fail);
            }
        }
        else {
            obj.notify(obj.messages.error);
        }
        
        cleanup(); // run cleanup instead of close; even if the xhr fails the session may still live
        return false;
    };
    
    obj.query = function () {
        // ask the user if they would like to extend the session
        var reply = obj.remind(obj.messages.reminder.replace("%r", obj.remaining(true)));
        if (ref.sessionEnd > Date.parse(Date())) {
            if (reply) {
                obj.extend();
            }
            else {
                // if there is time between the last alarm and the final timeout, leave the user alone
                if (ref.alarmsCopy.length > 0) {
                    ref.currentAlert = setTimeout(obj.query, ref.alarmsCopy.shift()  * 60000);
                }
            }
        }
        else {
            obj.notify(obj.messages.expired);
        }
    };
    
    obj.remaining = function (format) {
        // remaining miliseconds till timeout
        var result = (ref.sessionEnd - Date.parse(Date())) / 1000;
        if (format) {
            // format the time remaining into a more usable string
            if (result <= 60) {
                result = parseInt(result, 10) + " " + obj.units[1];
            }
            else {
                result = parseInt(result / 60, 10) + " " + obj.units[0];
            }
        }
        return result;    
    };
    
    obj.start = function (options) {
        // check for developer-defined options
        for (var opt in options) {
            if (options.hasOwnProperty(opt)) {
                obj[opt] = options[opt];
            }
        }
        
        // alarms needs to be copied so that shift() does not destroy the original
        ref.alarmsCopy = obj.alarms.slice();
        
        // get the millisecond value of the current date-time and add the millisecond value of the total timeout duration
        ref.sessionEnd = Date.parse(Date()) + obj.duration * 60000;
        
        // be nice to current page; clear previous page configuration
        cleanup();

        // schedule "confirm" prompt to open at the first alarm time
        ref.currentAlert = setTimeout(obj.query, (obj.duration - ref.alarmsCopy.shift())  * 60000);
        
        // schedule final redirection to given page
        ref.finalTimeout = setTimeout(obj.close, obj.duration  * 60000);
    };
    
    obj.toString = function () {
        return obj.messages.description || "Notify users of session time limits.";
    };
    
    obj.start({});
    return obj;
}());
