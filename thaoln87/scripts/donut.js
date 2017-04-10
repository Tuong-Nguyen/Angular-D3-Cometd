/**
 * Created by lnthao on 4/10/2017.
 */
var color = d3.schemeCategory10;
var data = [10, 20, 30];
var width = 300;
var height = 300;
var min = Math.min(width, height);
var svg = d3.select("body").append("svg");
var pie = d3.pie().sort(null);
var arc = d3.arc()
    .outerRadius(min / 2 * 0.9)
    .innerRadius(min / 2 * 0.5);

svg.attrs({width: width, height: height});
var g = svg.append("g")
    // center the donut
    .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

g.selectAll("path").data(pie(data))
    .enter().append("path")
    .style("stroke", "white")
    .attrs({
        "d": arc,
        "fill": function(d, i){
            return color[i];
        }
    });