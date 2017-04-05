/**
 * Created by lnthao on 4/3/2017.
 */
var dataset = [8, 12, 28, 7, 35, 24];
svg = d3.select("body").append("svg")
    .attr("width", 600)
    .attr("height", 400 );

svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
        return i * 61;
    })
    .attr("y", function(d, i) {
        return 400 - d * 5; // svg's height - rect's height
    })
    .attr("width", 60)
    .attr("height", function(d) {
        return d * 5;
    })
    .attr("fill", "orange");

var lessData = d3.range(4);
svg.selectAll("rect").data(lessData).attr("fill", "yellow");
// var moreData = d3.range(10);
// svg.selectAll("rect").data(moreData).attr("fill", "red");
