(function(){
	var client = angular.module('client');

	var d3Controller = function($scope, socket){
		window.scope = $scope;
		$scope.data = [];
		//Default config
		$scope.options = {
		    chart: {
		        type: 'discreteBarChart',
		        height: 10,
		        margin : {
		            top: 20,
		            right: 20,
		            bottom: 60,
		            left: 55
		        },
		        x: function(d){ return d.label; },
		        y: function(d){ return d.value; },
		        showValues: true,
		        valueFormat: function(d){
		            return d3.format(',.4f')(d);
		        },
		        transitionDuration: 500,
		        xAxis: {
		            axisLabel: 'X Axis'
		        },
		        yAxis: {
		            axisLabel: 'Y Axis',
		            axisLabelDistance: 30
		        }
		    }
		};

		$scope.config = {
		    visible: true, // default: true
		    extended: false, // default: false
		    disabled: false, // default: false
		    refreshDataOnly: true, // default: true
		    deepWatchOptions: false, // default: true
		    deepWatchData: false, // default: true
		    deepWatchDataDepth: 1, // default: 2
		    debounce: 10 // default: 10
		};

		/**
		 * [events description]
		 * @type {Object}
		 */
		$scope.events = {
		    someEvent1: function(e, scope){
		        /* do smth, scope - is internal directive scope */
		        console.log('event 1');
		    },
		    someEvent2: function(e, scope){
		        /* do smth, scope - is internal directive scope */
		        console.log('event 2');
		    },
		};

		/**
		 * [initPage description]
		 * @return {[type]} [description]
		 */
		$scope.initPage = function(){
			socket.emit("sync", function(res){
				console.log("Initial page successfully")
			})
		}

		/**
		 * [description]
		 * @param  {[type]} data){			console.log("updating data          .........");			$scope.data [description]
		 * @return {[type]}                                 [description]
		 */
		socket.on("newData", function(res){
			console.log("updating data .........");
			render(res);
		})

		/**
		 * [Update config]
		 * @param  {[type]} res){			console.log("updating config        ........." + res.type);			render(res);		} [description]
		 * @return {[type]}                                [description]
		 */
		socket.on("updateConfig", function(res){
			console.log("updating config ........." + res.type);
			render(res);
		})

		/**
		 * [refresh description]
		 * @return {[type]} [description]
		 */
		$scope.refresh = function(){
			$scope.api.refresh();
		}

		/**
		 * [render Render data and config]
		 * @param  {[type]} res [description]
		 * @return {[type]}     [description]
		 */
		function render(res){
			if(res.type === 'discreteBarChart'){
				$scope.data = res.data;
				$scope.options = {
				    chart: {
				        type: 'discreteBarChart',
				        height: 450,
				        margin : {
				            top: 20,
				            right: 20,
				            bottom: 60,
				            left: 55
				        },
				        x: function(d){ return d.label; },
				        y: function(d){ return d.value; },
				        showValues: true,
				        valueFormat: function(d){
				            return d3.format(',.4f')(d);
				        },
				        transitionDuration: 500,
				        xAxis: {
				            axisLabel: 'X Axis'
				        },
				        yAxis: {
				            axisLabel: 'Y Axis',
				            axisLabelDistance: 100
				        }
				    }
				};
			}
			else if(res.type === 'pieChart'){
				$scope.data = res.data[0].values;
				$scope.options = {
		            chart: {
		                type: 'pieChart',
		                height: 500,
		                x: function(d){return d.label;},
		                y: function(d){return d.value;},
		                showLabels: true,
		                duration: 500,
		                labelThreshold: 0.01,
		                labelSunbeamLayout: true,
		                legend: {
		                    margin: {
		                        top: 5,
		                        right: 35,
		                        bottom: 5,
		                        left: 0
		                    }
		                }
		            }
		        };
			}
		}
	}

	client.controller('d3Controller', d3Controller);
}());