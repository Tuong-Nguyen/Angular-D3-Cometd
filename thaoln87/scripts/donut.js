/**
 * Created by lnthao on 4/10/2017.
 */
var myApp = angular.module("myApp", []);
myApp.directive("donutChart", function () {
   function link(scope, element, attr) {
       var color = d3.schemeCategory10;
       var data = scope.data;
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

       var arcs = g.selectAll("path").data(pie(data))
           .enter().append("path")
           .style("stroke", "white")
           .attrs({
               "d": arc,
               "fill": function(d, i){
                   return color[i];
               }
           });
       scope.$watch('data', function(data) {
           arcs.data(pie(data)).attr('d', arc);
       }, true); // watch for changes within data itself

   }
   return {
       link: link,
       restrict: "E",
       scope: {data: "="}
   }
});
