// Always use explicit dependency injection
app.factory('SocketIoService', ['$rootScope', function($rootScope) {

	var socket = io.connect();

	return  {

		on: function(eventName, callback) {

			socket.on(eventName, function() {
                if($('#hiding').length != 0){
                    localStorage.setItem("guid", $('#hiding').getAttribute('data-internal'));
                }

                if(localStorage.getItem("guid") == null /*&& ($('#hiding').getAttribute('data-internal')) == null*/){
                    localStorage.setItem("guid", new Date().getTime());
                    sleep(30);
                    var hidden = '<div id="hiding" data-internal="' + localStorage.getItem("guid") + '"></div>';
                    $(hidden).appendTo('.panel').hide();
                }
                /*else if($('#hiding').getAttribute('data-internal') != null){
                    localStorage.setItem("guid", $('#hiding').getAttribute('data-internal'));
                    sleep(30);
                }*/


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