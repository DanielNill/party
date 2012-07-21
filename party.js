(function(window){
    var Party = function(){

        this.loggingUrl = String;
        this.location = window.location;

        //execute script in encapsulated code
        this.execute = function(script){
            return eval(script);
        }

        //log message to remote server
        this.log = function(data){
            this.iframe({
                url: loggingUrl,

            })
        };

        //definition of connection object
        var connection = {
            url: String,
            data: object,
            beforeSend: function(){},
            onSend: function(){},
            complete: function(){},
            success: function(){},
            error: function(){}
        };

        //send data via socket connection
        this.socket = function(connection){
            if("WebSocket" in window){
                var socket = new WebSocket(connection.url);
                if(connection.onMessage !== undefined){
                    socket.onMessage(connection.onMessage())
                }
            }
            else{
                this.log({
                    message: 'A user at ' + this.location.href + ' attempted to execute functionality using a socket connection with a browser that does not support WebSockets',
                    location: this.location,
                    nav: navigator
                });
            }
        };

        //send data via iframe connection
        this.iframe = function(connection){
            var iframe = document.createElement('iframe');
            iframe.setAttribute('src', connection.url);
            // for IE
            iframe.setAttribute('frameBorder', '1');
            iframe.setAttribute('scrolling', 'auto');
            if (iframe.style.setAttribute) {
                iframe.style.setAttribute('cssText', 'position: absolute; left: -100px; top:0px;');
            }
            // Need a certain size otherwise IE7 does not fire resize event
            iframe.setAttribute('width', 30);
            iframe.setAttribute('height', 30);
            iframe.setAttribute('style', 'position: absolute; left: -100px; top:0px;');
            iframe.appendChild();
        };

        //send data via jsonp
        this.jsonp = function(connection){
            
        }

        //send data through cross origin resource sharing
        this.cors = function(connection){

        }
    })

    //make the Party object global
    window.Party = Party;

    //get the contents of this script and execut it
    var scripts = document.getElementsByTagName("script");

    for(var i = 0; i < scripts.length; i++){
        if(scripts[i].src && scripts[i].src.match(/party\.js$/)){ 
            eval(scripts[i].text);
        }
    }
})(window)

