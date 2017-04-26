(function(){
	var client = angular.module('client');

	var producerController = function($scope, kafka, $filter, $interval){
		window.scope = $scope;
        var dateTime = new Date();
        $scope.instanceName =  $filter('date')(dateTime, 'mmss');
        $scope.groupName = $filter('date')(dateTime, 'mmss');
        $scope.urlInstance = '';
        $scope.records = [];
        $scope.isReady = false;
        $scope.listenTopic = '';

        $scope.data = {
            "records": [
                {
                  "key": $scope.instanceName,
                  "value": ""
                }

            ]
        }


        //Add recode
        $scope.addRecord = function(){
            kafka.addRecord($scope.data, 'RSR').then(function(res){
                console.log(res);
            })
        }


        /**
         * [createInstance create a new instace]
         * @return {[type]} [description]
         */
        $scope.createInstance = function(){
            $scope.display = false;
            $scope.newInstance = {
              "name": $scope.instanceName,
              "format": "binary",
              "auto.offset.reset": "earliest",
              "auto.commit.enable": "false"
            }
            //Create and subscribe
            kafka.createInstance($scope.groupName, $scope.newInstance).then(function(res){
                console.log("++++++++++++++++++ create a new instance ++++++++++++++++");
                console.log(res);
                $scope.urlInstance = res.base_uri;

                $scope.getResult = {
                  "topics": [
                      "result"
                    ]
                }
                //Subscribe
                kafka.subscribe($scope.urlInstance, $scope.getResult).then(function(res){
                  $scope.isReady = true;
                })
            })

        }


        /**
         * [description]
         * @param  {[type]} )    {                       console.log("++++++++++++++++++ get result message ++++++++++++++++");            kafka.getRecords('result').then(function(res){                console.log(res);            })        } [description]
         * @param  {[type]} 5000 [description]
         * @return {[type]}      [description]
         */
        $scope.isPendding = false;
        var result = $interval(function () {
            console.log("++++++++++++++++++ get result message ++++++++++++++++");
            if($scope.isReady && !$scope.isPendding){
              $scope.isPendding = true;
                kafka.getRecords($scope.urlInstance).then(function(res){
                    console.log(res);
                    for(var i = 0; i < res.length; i++){
                        if(res[i].key === $scope.instanceName && res[i].topic == $scope.listenTopic){
                          $scope.records.push(res[i]);
                        }
                        else if(res[i].key === $scope.instanceName){
                            $scope.listenTopic = res[i].value
                            $scope.getResult = {
                              "topics": [
                                  "result",
                                  res[i].value
                                ]
                            }
                            console.log("++++++++++++++++++ add new topic ++++++++++++++++");
                            console.log($scope.getResult);
                            //Subscribe
                            kafka.subscribe($scope.urlInstance, $scope.getResult).then(function(res){
                              $scope.isReady = true;
                            })
                        }
                    }
                    $scope.isPendding = false;
                })
            }
        }, 5000);

        
	}

	client.controller('producerController', producerController);
}());