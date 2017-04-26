(function(){
	var client = angular.module('client');

	var consumerController = function($scope, kafka, $interval, $filter){
		window.scope = $scope;
        $scope.records = [];
        var dateTime = new Date();
        $scope.groupName = "Oceana_" + $filter('date')(dateTime, 'HHmmss');
        $scope.instanceName = "Instance_" + $filter('date')(dateTime, 'HHmmss');
        $scope.isReady = false;
        $scope.display = false;
        $scope.urlInstance = '';
        $scope.flag = true;

        var getRecords;

        //Waiting any ready
        $scope.isPendding = false;
        $scope.$watch('isReady', function (newValue, oldValue) {
        	if(newValue === true && $scope.urlInstance && $scope.flag){
        		getRecords = $interval(function () {
        			if(!$scope.isPendding){
        				$scope.isPendding = true;
	        			$scope.arrayUrl = [];
	        			$scope.display = true;
			        	kafka.getRecords($scope.urlInstance).then(function(res){
			        		$scope.isPendding = false;
				            console.log(res);
				            $scope.display = true;
				            if(res.length > 0){
				            	$scope.records = $scope.records.concat(res);
				            	for(var i = 0; i < res.length; i ++){
				                    $scope.data = {
							            "records": [
							                {
							                  "key": res[i].key,
							                  "value": res[i].value
							                }

							            ]
							        }
				                    $scope.flag = false;
				                    dateTime = new Date();
				                	$scope.newTopic = $filter('date')(dateTime, 'mmss');
				                    kafka.addRecord($scope.data, $scope.newTopic ).then(function(data){
				                    	console.log("++++++++++++++ add a new message to topic ++++++++++++++++");
				                    	console.log($scope.data);
				                        console.log(data);
				                    })

				                    $scope.result = {
							            "records": [
							                {
							                  "key": res[i].key,
							                  "value": $scope.newTopic
							                }

							            ]
							        }
				                    kafka.addRecord($scope.result, 'result' ).then(function(data){
				                        console.log(data);
				                    })
				                }
				            }
				        })
        			}   
			    }, 5000);
        	}
        })
        

        /**
         * [createInstance create a new instace]
         * @return {[type]} [description]
         */
        $scope.createInstance = function(){
        	$scope.display = false;
        	$scope.newInstance = {
			  "name": $scope.instanceName,
			  "format": "binary",
              "auto.offset.reset": "latest",
              "auto.commit.enable": "false"
			}

			kafka.createInstance($scope.groupName, $scope.newInstance).then(function(res){
				console.log('Create a new instance ' + res);
				$scope.urlInstance = res.base_uri;
				$scope.getResult = {
                  "topics": [
                      "RSR"
                    ]
                }
                //Subscribe
                kafka.subscribe($scope.urlInstance, $scope.getResult).then(function(res){
                  $scope.isReady = true;
                })
			})

        }

        /**
         * [createInstance description]
         * @return {[type]} [description]
         */
        $scope.deleteInstance = function(){
			kafka.deleteInstance($scope.urlInstance).then(function(res){
				console.log('Delete instance ' + res);
				$scope.records = [];
				$interval.cancel(getRecords);
				$scope.isReady = false;
			})

        }

        
	}

	client.controller('consumerController', consumerController);
}());