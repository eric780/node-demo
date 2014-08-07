// Always use explicit dependency injection
app.factory('SocketIoService', ['$rootScope', function($rootScope) {

	var socket = io.connect();

	return  {

		on: function(eventName, callback) {

			socket.on(eventName, function() {

                if(localStorage.getItem("guid") == null){
                    localStorage.setItem("guid", new Date().getTime());
                    sleep(30);
                }
                //var hidden = '<div>' + localStorage.getItem("guid") + </div>';
                //$(hidden).appendTo('.panel').hide();

                var args = arguments;
				$rootScope.$apply(function() { callback.apply(socket, args); });
			});
		},

		emit: function(eventName, data, callback) {
			socket.emit(eventName, data);
		}

	};


    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }
        }
    }

}]);