(function(){
	var client = angular.module('client');

	var d3DataController = function($scope, socket){
		window.scope = $scope;
		$scope.chart = {};
		$scope.data = [];
		$scope.chartType = [{value: "discreteBarChart", title: "Discrete Bar Chart"}, {value: "pieChart", title: "Pie Chart"}]
		$scope.chart.selectedType = "discreteBarChart";
		$scope.initPage = function(){
			socket.emit("sync", function(res){
				console.log("Initial page successfully")
			})
		}

		$scope.changeData = function(index, field, $event){
			console.log(event.target.value);
			if(field === 'label'){
				$scope.data[0].values[index].label = event.target.value;
			}
			else{
				$scope.data[0].values[index].value = event.target.value;
			}
			
		}

		/**
		 * [description]
		 * @param  {[type]} data){			console.log("updating data          .........");			$scope.data [description]
		 * @return {[type]}                                 [description]
		 */
		socket.on("newData", function(res){
			console.log("updating data .........");
			$scope.data = res.data;
			$scope.chart.selectedType = res.type;
		})

		/**
		 * [update description]
		 * @return {[type]} [description]
		 */
		$scope.update = function(){
			socket.emit('update', $scope.data, function(res){
				console.log("update data: " + res)
			})
		}

		/**
		 * [changeChartType Change config]
		 * @param  {[type]} option [description]
		 * @return {[type]}        [description]
		 */
		$scope.changeChartType = function(option){
			console.log("update config ......");
			console.log(option.value);
			socket.emit('updateConfig', option.value, function(res){
				console.log(res);
			})
		}
	}

	client.controller('d3DataController', d3DataController);
}());