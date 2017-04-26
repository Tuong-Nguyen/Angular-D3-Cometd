(function(){
	var client = angular.module('client');

	var serverController = function($scope, kafka, $interval, $filter){
		window.scope = $scope;
        $scope.records = [];
        var dateTime = new Date();
        $scope.groupName = "Oceana_" + $filter('date')(dateTime, 'HHmmss');
        $scope.instanceName = "Instance_" + $filter('date')(dateTime, 'HHmmss');
        $scope.isReady = false;
        $scope.display = false;
        $scope.urlInstance = '';
        $scope.status = "Create Instance";
        $scope.flag = true;
        $scope.status = false;
        $scope.isPump = false;

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
				            	console.log(res);
				            	$scope.records = $scope.records.concat(res);
				            	for(var i = 0; i < res.length; i ++){
				                    if(angular.isUndefined(res[i].value.pump)){
				                    	$scope.status = "Listening Pump";
				                    	$scope.flag = false;
					                    $scope.topicName = res[i].value.subscriptionRequest.measuresStream;
					                    $scope.data = {
								            "records": [
								                {
								                  "key": res[i].key,
								                  "value": res[i].value
								                }

								            ]
								        }


					                    kafka.addRecord($scope.data, $scope.topicName ).then(function(data){
					                    	console.log("++++++++++++++ add a new message to topic ++++++++++++++++");
					                    	console.log($scope.data);
					                        console.log(data);
					                    })

					                    $scope.result = {
								            "records": [
								                {
								                  "key": res[i].key,
								                  "value": $scope.topicName
								                }

								            ]
								        }
					                    kafka.addRecord($scope.result, 'result' ).then(function(data){
					                        console.log(data);
					                    })
				                    }
				                    else{
				                    	$scope.status = "Ready";
				                    	$scope.isPump = true;
				                    }
				                }
				            }
				            else{
				            	$scope.status = "Sending";
				            	if(!angular.isUndefined($scope.data) && $scope.isPump == true){
				            		var dateTime = new Date();
				            		console.log($scope.data.records[0].value);
				            		$scope.data.records[0].value.time = $filter('date')(dateTime, 'HHmmss');
				            		kafka.addRecord($scope.data, $scope.topicName ).then(function(data){
				                    	console.log("++++++++++++++ add a new message to topic ++++++++++++++++");
				                    	console.log($scope.data);
				                        console.log(data);
				                    })
				            	}
				            }
				        })
        			}   
			    }, 2000);
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
			  "format": "json",
              "auto.offset.reset": "latest",
              "auto.commit.enable": "false"
			}

			kafka.createInstance($scope.groupName, $scope.newInstance).then(function(res){
				console.log('Create a new instance ' + res);
				$scope.urlInstance = res.base_uri;
				$scope.getResult = {
                  "topics": [
                      "RSR",
                      "pump"
                    ]
                }
                $scope.status = "Subscribe";
                //Subscribe
                kafka.subscribe($scope.urlInstance, $scope.getResult).then(function(res){
                  $scope.isReady = true;
                  $scope.status = "Listening";
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

	client.controller('serverController', serverController);
}());