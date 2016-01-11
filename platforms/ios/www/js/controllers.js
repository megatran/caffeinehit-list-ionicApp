var app = angular.module('caffeinehit.controllers', []);

app.controller("YelpController", function ($scope, YelpService) {
	$scope.yelp = YelpService;

	$scope.doRefresh = function() {
		if (!$scope.yelp.isLoading) {
			//see refresh() in services.js
			$scope.yelp.refresh().then(function() {
				//once the promise returns and resolves, call $scope.$broadcast to sense an event in angular
				$scope.$broadcast('scroll.refreshComplete');
			});
		}
	};

	$scope.loadMore = function() {
		console.log("loadMore");
		if ( !$scope.yelp.isLoading && $scope.yelp.hasMore) {
			$scope.yelp.next().then(function() {
				$scope.$broadcast('scroll.infiniteScrollComplete');
			});
		}
	};

	$scope.getDirections = function(cafe) {
		console.log("Getting Directions");
		var destination = [
			cafe.location.coordinate.latitude,
			cafe.location.coordinate.longtitude
		];

		var source = [
			$scope.yelp.lat,
			$scope.yelp.lon
		];

		launchnavigator.navigate(destination, source);
	};

	$scope.openMap = function(cafe) {
		console.log("Opening cafe in maps app")
	}
});
