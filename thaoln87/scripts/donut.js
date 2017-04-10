/**
 * Created by lnthao on 4/10/2017.
 */
var myApp = angular.module("myApp", []);
var dataPath = "data/donut-data.json";
 myApp.controller("MainCtrl", function($scope){
     d3.json(dataPath, function(err, data) {
        if (err) { throw err; }
        $scope.data = data;
        $scope.$apply();
     });
 });
 myApp.controller("MainCtrlNg", function($scope, $http, $interval){
     $interval(function(){
         // cannot use style $http.get(..).success(..)
         $http.get(dataPath).then(function(response) {
             $scope.data = response.data;
             // no need to call $scope.$apply(), angular will do this automatically
         }, function(err) {
             throw err;
         });
     }, 1000);
 });
myApp.directive("donutChart", function () {
   function link(scope, element, attr) {
       var color = d3.schemeCategory10;
       var width = 300;
       var height = 300;
       var min = Math.min(width, height);
       var svg = d3.select(element[0]).append("svg");
       var pie = d3.pie().sort(null);
       var arc = d3.arc()
           .outerRadius(min / 2 * 0.9)
           .innerRadius(min / 2 * 0.5);

       svg.attrs({width: width, height: height});
       var g = svg.append("g")
       // center the donut
           .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

       var arcs = g.selectAll("path");

       scope.$watch('data', function(data) {
           if (!data) return;
           arcs.data(pie(data))
               .enter().append("path")
               .style("stroke", "white")
               .attrs({
                   "d": arc,
                   "fill": function(d, i){
                       return color[i];
                   }
               });
       }, true); // watch for changes within data itself

   }
   return {
       link: link,
       restrict: "E",
       scope: {data: "="}
   }
});
