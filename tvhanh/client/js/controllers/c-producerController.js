(function(){
	var client = angular.module('client');

	var producerController = function($scope, kafka){
		window.scope = $scope;

        $scope.data = {
            "records": [
                {
                  "key": "type",
                  "value": ""
                }
            ]
        }


        //Add recode
        $scope.addRecord = function(){
            kafka.addRecord($scope.data).then(function(res){
                console.log(res);
            })
        }
	}

	client.controller('producerController', producerController);
}());