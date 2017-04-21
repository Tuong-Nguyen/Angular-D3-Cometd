(function(){
	var client = angular.module('client');

	var consumerController = function($scope, kafka){
		window.scope = $scope;
        $scope.records = [];


        kafka.getRecords().then(function(res){
            console.log(res);
            $scope.records = res
        })
	}

	client.controller('consumerController', consumerController);
}());