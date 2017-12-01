const movieTitles = ["The Cooking Wizard", "The Light Horse", "Galaxy Battle", "Merriam: The King of Cat", "Curry Potter"];
const colorAssociation = ["blue", "red", "green", "purple", "black"];
const diameter = 50;

populateData();

function scaleRating(rating) {
    return rating*10;
}

function populateData() {

  var testData = [ [ [ 1.2822182364437713, 1.0012883700674866 ],
    [ 1.2434467896823245, 1.115945295095515 ],
    [ 1.3870210301666883, 1.1511911667116865 ],
    [ 1.4374747814128406, 1.1342921739210536 ],
    [ 1.2768074984059061, 1.1840478929988287 ] ],
  [ [ 1.7395945194301947, 1.6206620464678678 ],
    [ 1.864103622874934, 1.5030923706985604 ],
    [ 1.6797192176339855, 1.6070760336614311 ],
    [ 1.7421982249261532, 1.5278528874510615 ],
    [ 1.8172482410736808, 1.6426379820453882 ] ],
  [ [ 2.1201244415449763, 2.0417139384530056 ],
    [ 2.2103498787351508, 2.0344914851024716 ],
    [ 2.2024078686279194, 1.9825799245352327 ],
    [ 2.2751764250475404, 2.048220595196488 ],
    [ 2.3222494113992083, 1.972002052598182 ] ],
  [ [ 2.7078105337141336, 2.4220360493523048 ],
    [ 2.666444255867105, 2.434935797872829 ],
    [ 2.740838603425653, 2.34367816815585 ],
    [ 2.6609023085227945, 2.4147516637713338 ],
    [ 2.6739484872942763, 2.4639118087918677 ] ],
  [ [ 3.1191330871960035, 2.883897292121273 ],
    [ 3.044865071649751, 2.9803943679766443 ],
    [ 3.175819580745824, 2.863336205317893 ],
    [ 3.1732445105867413, 2.8369862197921347 ],
    [ 3.114899899278388, 2.8645680175530197 ] ],
  [ [ 3.470712211889554, 3.4058080204970147 ],
    [ 3.4611147842824703, 3.237854488783616 ],
    [ 3.5679418658777564, 3.415022495784989 ],
    [ 3.658023797354777, 3.317939591743652 ],
    [ 3.5011322720404965, 3.2790459807416936 ] ],
  [ [ 4.003661548259363, 3.770395559510151 ],
    [ 4.079922071007031, 3.854432253547819 ],
    [ 4.056631877396341, 3.674972769129562 ],
    [ 3.9661016144255883, 3.724201068335857 ],
    [ 4.053079546988596, 3.789032297669519 ] ],
  [ [ 4.369720263651662, 4.309982557942673 ],
    [ 4.4770979300847475, 4.321941510144349 ],
    [ 4.431565050574866, 4.255720831340194 ],
    [ 4.415491899823301, 4.142098382020117 ],
    [ 4.517065871532364, 4.230388691263085 ] ],
  [ [ 4.89948726766408, 4.622416570688784 ],
    [ 4.993710336278793, 4.65182702358425 ],
    [ 4.779085151137108, 4.6121705996673406 ],
    [ 4.8620161577872185, 4.575425069496433 ],
    [ 4.932432859169907, 4.63930834236406 ] ] ];


    var svg = d3.select("body").append("svg")
                .attr("width", 960)
         			  .attr("height", 500);

       /*
       var background = svg.append("rect")
       		.attrs({
             "width": "100%",
             "height": "100%",
             "fill": "black"
           })
           */

       var ball = svg.append("circle")
             .attr("r", 73)
             .attr("cx", 480)
             .attr("cy", 250)
             .style("fill", "#ffe41e");



  // for (var i = 0; i < testData.length; i++) {
  //   for (var j = 0; j < testData[i].length; j++) {
  //     var color = colorAssociation[j];
  //     var cx = scaleRating(testData[i][j][0]);
  //     var cy = scaleRating(testData[i][j][1]);
  //
  //     console.log(color, cx, cy);
  //
  //     d3.select('#viz')
  //       .append("svg")
  //       .attr("width", diameter)
  //       .attr("height", diameter)
  //       .append("circle")
  //       .attr("cx", 100 + cx)
  //       .attr("cy", 200 + cy)
  //       .attr("r", diameter/2)
  //       .style("fill", color);
  //   }
  // }
}


var dataset = [ [ [ 1.2822182364437713, 1.0012883700674866 ],
  [ 1.2434467896823245, 1.115945295095515 ],
  [ 1.3870210301666883, 1.1511911667116865 ],
  [ 1.4374747814128406, 1.1342921739210536 ],
  [ 1.2768074984059061, 1.1840478929988287 ] ],
[ [ 1.7395945194301947, 1.6206620464678678 ],
  [ 1.864103622874934, 1.5030923706985604 ],
  [ 1.6797192176339855, 1.6070760336614311 ],
  [ 1.7421982249261532, 1.5278528874510615 ],
  [ 1.8172482410736808, 1.6426379820453882 ] ],
[ [ 2.1201244415449763, 2.0417139384530056 ],
  [ 2.2103498787351508, 2.0344914851024716 ],
  [ 2.2024078686279194, 1.9825799245352327 ],
  [ 2.2751764250475404, 2.048220595196488 ],
  [ 2.3222494113992083, 1.972002052598182 ] ],
[ [ 2.7078105337141336, 2.4220360493523048 ],
  [ 2.666444255867105, 2.434935797872829 ],
  [ 2.740838603425653, 2.34367816815585 ],
  [ 2.6609023085227945, 2.4147516637713338 ],
  [ 2.6739484872942763, 2.4639118087918677 ] ],
[ [ 3.1191330871960035, 2.883897292121273 ],
  [ 3.044865071649751, 2.9803943679766443 ],
  [ 3.175819580745824, 2.863336205317893 ],
  [ 3.1732445105867413, 2.8369862197921347 ],
  [ 3.114899899278388, 2.8645680175530197 ] ],
[ [ 3.470712211889554, 3.4058080204970147 ],
  [ 3.4611147842824703, 3.237854488783616 ],
  [ 3.5679418658777564, 3.415022495784989 ],
  [ 3.658023797354777, 3.317939591743652 ],
  [ 3.5011322720404965, 3.2790459807416936 ] ],
[ [ 4.003661548259363, 3.770395559510151 ],
  [ 4.079922071007031, 3.854432253547819 ],
  [ 4.056631877396341, 3.674972769129562 ],
  [ 3.9661016144255883, 3.724201068335857 ],
  [ 4.053079546988596, 3.789032297669519 ] ],
[ [ 4.369720263651662, 4.309982557942673 ],
  [ 4.4770979300847475, 4.321941510144349 ],
  [ 4.431565050574866, 4.255720831340194 ],
  [ 4.415491899823301, 4.142098382020117 ],
  [ 4.517065871532364, 4.230388691263085 ] ],
[ [ 4.89948726766408, 4.622416570688784 ],
  [ 4.993710336278793, 4.65182702358425 ],
  [ 4.779085151137108, 4.6121705996673406 ],
  [ 4.8620161577872185, 4.575425069496433 ],
  [ 4.932432859169907, 4.63930834236406 ] ] ];
// Setup data
//             var dataset = [];  // Initialize empty array
//             var numDataPoints = 15;  // Number of dummy data points
//             var maxRange = Math.random() * 1000;  // Max range of new values
//             for(var i=0; i<numDataPoints; i++) {
//                 var newNumber1 = Math.floor(Math.random() * maxRange);  // New random integer
//                 var newNumber2 = Math.floor(Math.random() * maxRange);  // New random integer
//                 dataset.push([newNumber1, newNumber2]);  // Add new number to array
//             }
//
//             // Setup settings for graphic
//             var canvas_width = 500;
//             var canvas_height = 300;
//             var padding = 30;  // for chart edges
//
//             // Create scale functions
//             var xScale = d3.scale.linear()  // xScale is width of graphic
//                             .domain([0, d3.max(dataset, function(d) {
//                                 return d[0];  // input domain
//                             })])
//                             .range([padding, canvas_width - padding * 2]); // output range
//
//             var yScale = d3.scale.linear()  // yScale is height of graphic
//                             .domain([0, d3.max(dataset, function(d) {
//                                 return d[1];  // input domain
//                             })])
//                             .range([canvas_height - padding, padding]);  // remember y starts on top going down so we flip
//
//             // Define X axis
//             var xAxis = d3.svg.axis()
//                             .scale(xScale)
//                             .orient("bottom")
//                             .ticks(5);
//
//             // Define Y axis
//             var yAxis = d3.svg.axis()
//                             .scale(yScale)
//                             .orient("left")
//                             .ticks(5);
//
//             // Create SVG element
//             var svg = d3.select("h3")  // This is where we put our vis
//                 .append("svg")
//                 .attr("width", canvas_width)
//                 .attr("height", canvas_height)
//
//             // Create Circles
//             svg.selectAll("circle")
//                 .data(dataset)
//                 .enter()
//                 .append("circle")  // Add circle svg
//                 .attr("cx", function(d) {
//                     return xScale(d[0]);  // Circle's X
//                 })
//                 .attr("cy", function(d) {  // Circle's Y
//                     return yScale(d[1]);
//                 })
//                 .attr("r", 2);  // radius
//
//             // Add to X axis
//             svg.append("g")
//                 .attr("class", "x axis")
//                 .attr("transform", "translate(0," + (canvas_height - padding) +")")
//                 .call(xAxis);
//
//             // Add to Y axis
//             svg.append("g")
//                 .attr("class", "y axis")
//                 .attr("transform", "translate(" + padding +",0)")
//                 .call(yAxis);
//
//             // On click, update with new data
//             d3.select("h4")
//                 .on("click", function() {
//                     var numValues = dataset.length;  // Get original dataset's length
//                     var maxRange = Math.random() * 1000;  // Get max range of new values
//                     dataset = [];  // Initialize empty array
//                     for(var i=0; i<numValues; i++) {
//                         var newNumber1 = Math.floor(Math.random() * maxRange);  // Random int for x
//                         var newNumber2 = Math.floor(Math.random() * maxRange);  // Random int for y
//                         dataset.push([newNumber1, newNumber2]);  // Add new numbers to array
//                     }
//
//                     // Update scale domains
//                     xScale.domain([0, d3.max(dataset, function(d) {
//                         return d[0]; })]);
//                     yScale.domain([0, d3.max(dataset, function(d) {
//                         return d[1]; })]);
//
//                     // Update circles
//                     svg.selectAll("circle")
//                         .data(dataset)  // Update with new data
//                         .transition()  // Transition from old to new
//                         .duration(1000)  // Length of animation
//                         .each("start", function() {  // Start animation
//                             d3.select(this)  // 'this' means the current element
//                                 .attr("fill", "red")  // Change color
//                                 .attr("r", 5);  // Change size
//                         })
//                         .delay(function(d, i) {
//                             return i / dataset.length * 500;  // Dynamic delay (i.e. each item delays a little longer)
//                         })
//                         //.ease("linear")  // Transition easing - default 'variable' (i.e. has acceleration), also: 'circle', 'elastic', 'bounce', 'linear'
//                         .attr("cx", function(d) {
//                             return xScale(d[0]);  // Circle's X
//                         })
//                         .attr("cy", function(d) {
//                             return yScale(d[1]);  // Circle's Y
//                         })
//                         .each("end", function() {  // End animation
//                             d3.select(this)  // 'this' means the current element
//                                 .transition()
//                                 .duration(500)
//                                 .attr("fill", "black")  // Change color
//                                 .attr("r", 2);  // Change radius
//                         });
//
//                         // Update X Axis
//                         svg.select(".x.axis")
//                             .transition()
//                             .duration(1000)
//                             .call(xAxis);
//
//                         // Update Y Axis
//                         svg.select(".y.axis")
//                             .transition()
//                             .duration(100)
//                             .call(yAxis);
//                 }); * value accessor - returns the value to encode for a given data object.
//  * scale - maps value to a visual display encoding, such as a pixel position.
//  * map function - maps from data value to display value
//  * axis - sets up axis
//  */
//
// // setup x
// var xValue = function(d) { return d[0];}, // data -> value
//     xScale = d3.scale.linear().range([0, width]), // value -> display
//     xMap = function(d) { return xScale(xValue(d));}, // data -> display
//     xAxis = d3.svg.axis().scale(xScale).orient("bottom");
//
// // setup y
// var yValue = function(d) { return d[1];}, // data -> value
//     yScale = d3.scale.linear().range([height, 0]), // value -> display
//     yMap = function(d) { return yScale(yValue(d));}, // data -> display
//     yAxis = d3.svg.axis().scale(yScale).orient("left");
//
// // setup fill color
// var cValue = function(d) { return d.Manufacturer;},
//     color = d3.scale.category10();
//
// // add the graph canvas to the body of the webpage
// var svg = d3.select("body").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
// // add the tooltip area to the webpage
// var tooltip = d3.select("body").append("div")
//     .attr("class", "tooltip")
//     .style("opacity", 0);
//
// // load data
// d3.csv("cereal.csv", function(error, data) {
//
//   // change string (from CSV) into number format
//   data.forEach(function(d) {
//     d.Calories = +d.Calories;
//     d["Protein (g)"] = +d["Protein (g)"];
// //    console.log(d);
//   });
//
//   // don't want dots overlapping axis, so add in buffer to data domain
//   xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
//   yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);
//
//   // x-axis
//   svg.append("g")
//       .attr("class", "x axis")
//       .attr("transform", "translate(0," + height + ")")
//       .call(xAxis)
//     .append("text")
//       .attr("class", "label")
//       .attr("x", width)
//       .attr("y", -6)
//       .style("text-anchor", "end")
//       .text("Calories");
//
//   // y-axis
//   svg.append("g")
//       .attr("class", "y axis")
//       .call(yAxis)
//     .append("text")
//       .attr("class", "label")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 6)
//       .attr("dy", ".71em")
//       .style("text-anchor", "end")
//       .text("Protein (g)");
//
//   // draw dots
//   svg.selectAll(".dot")
//       .data(data)
//     .enter().append("circle")
//       .attr("class", "dot")
//       .attr("r", 3.5)
//       .attr("cx", xMap)
//       .attr("cy", yMap)
//       .style("fill", function(d) { return color(cValue(d));})
//       .on("mouseover", function(d) {
//           tooltip.transition()
//                .duration(200)
//                .style("opacity", .9);
//           tooltip.html(d["Cereal Name"] + "<br/> (" + xValue(d)
// 	        + ", " + yValue(d) + ")")
//                .style("left", (d3.event.pageX + 5) + "px")
//                .style("top", (d3.event.pageY - 28) + "px");
//       })
//       .on("mouseout", function(d) {
//           tooltip.transition()
//                .duration(500)
//                .style("opacity", 0);
//       });
//
//   // draw legend
//   var legend = svg.selectAll(".legend")
//       .data(color.domain())
//     .enter().append("g")
//       .attr("class", "legend")
//       .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
//
//   // draw legend colored rectangles
//   legend.append("rect")
//       .attr("x", width - 18)
//       .attr("width", 18)
//       .attr("height", 18)
//       .style("fill", color);
//
//   // draw legend text
//   legend.append("text")
//       .attr("x", width - 24)
//       .attr("y", 9)
//       .attr("dy", ".35em")
//       .style("text-anchor", "end")
//       .text(function(d) { return d;})
// });
