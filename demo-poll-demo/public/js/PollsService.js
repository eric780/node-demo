// Always use explicit dependency injection
app.factory('PollsService', ['$http', function($http) {

	var pollsService = {

		async: function() {
			var promise = $http.get('/api/polls').then(function(res) {
				console.log(res);
				return res.data;
			});

			return promise;
		},

		getPoll: function(pollId) {
			var promise = $http.get('/api/poll/' + pollId).then(function(res) {
				console.log(res);
				return res.data;
			});

			return promise;
		},

		createPoll: function(newPoll) {

			var toCreate = { "poll" : newPoll };
			var promise = $http.post('/api/poll', toCreate).then(function(res) {
				console.log(res);
				return res.data;
			});

			return promise;
		},

        submitVote: function(pollId, answerIndex) {

            var toUpdate = { 'pollId': pollId, 'answerIndex': answerIndex, 'guid': localStorage.getItem("guid") };
            var promise = $http.put('/api/poll/' + pollId, toUpdate).then(function(res) {
                console.log(res);
                return res.data;
            });

            return promise;
        }

	};

	return pollsService;
}]);
