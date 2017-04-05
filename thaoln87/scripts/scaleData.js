/**
 * Created by lnthao on 4/3/2017.
 */
var svg = d3.select("body").append("svg")
    .attr("width", window.innerWidth)
    .attr("height", window.innerHeight);

var data = [1, 5, 2, 4, 3, 2];

var heightScale = d3.scaleLinear() // y = mx + b
    .domain([0, d3.max(data)])
    .range([0, window.innerHeight - 40]);
var colorScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range(["red", "blue"]);

svg.selectAll("rect").data(data)
    .enter()
    .append("rect")
    .attr("width", 100)
    .attr("height", function(d){
        return heightScale(d);
    }) // equivalent heighScale
    .attr("x", function(d, i){ return i * 101;})
    .attr("y", function(d, i) { return window.innerHeight - heightScale(d) ;})
    .attr("fill", colorScale);
