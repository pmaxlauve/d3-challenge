// @TODO: YOUR CODE HERE!
var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
  };

  var svgWidth = 960;
  var svgHeight = 700;
  
  var width = svgWidth - margin.left - margin.right;
  var height = svgHeight - margin.top - margin.bottom;

  var chosenXAxis = "age";
  var chosenYAxis = "smokes";






  var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


  function renderText(circleText, newXScale, newYScale, chosenXAxis, chosenYAxis) {
    circletextGroup.transition()
      .duration(1000)
      .attr("x", d => newXScale(d[chosenXAxis]))
      .attr("y", d => newYScale(d[chosenYAxis]));
        
    return circleText;
  }

function xScale(data, chosenXAxis) {
// create scales
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d => d[chosenXAxis]) * 0.8,
        d3.max(data, d => d[chosenXAxis]) * 1.2
        ])
        .range([0, width]);

    return xLinearScale;

}

function xRenderAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
  
    xAxis.call(bottomAxis);
  
    return xAxis;
  }


function renderCircles(circlesGroup, newXScale, newYScale, chosenXAxis, chosenYAxis) {
    circlesGroup.attr("cx", d => newXScale(d[chosenXAxis]))
        .attr("cy", d => newYScale(d[chosenYAxis]));
    return circlesGroup;
}

function yScale(data, chosenYAxis) {
    // create scales
    var yLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d => d[chosenYAxis]) * 0.9,
        d3.max(data, d => d[chosenYAxis]) * 1.2
        ])
        .range([height, 0]);

    return yLinearScale;
    
    }
    
function yRenderAxes(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);
    
    yAxis.call(leftAxis);
    
    return yAxis;
    }
    
    



function updateToolTip(circlesGroup) {

    var xLabel = "Median Age";
    var yLabel = "Smokers"
    

    var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.state}<hr>${xLabel}: ${d.age}%<br>${yLabel}: ${d.smokes}%`)
        
        });

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  return circlesGroup;
}





d3.csv("assets/data/data.csv").then(function(data, err) {


if (err) throw err;


    console.log(data);
    
    
    data.map(function(entry) {
        entry.poverty = +entry.poverty;
        entry.age = +entry.age;
        entry.income = +entry.income;
        entry.healthcare = +entry.healthcare;
        entry.obesity = +entry.obesity;
        entry.smokes = +entry.smokes; 
    });


    var xLinearScale = xScale(data, chosenXAxis);
    var yLinearScale = yScale(data, chosenYAxis);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .call(bottomAxis);

    var yAxis = chartGroup.append("g")
        .classed("y-axis", true)
        .call(leftAxis);


var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .attr("r", 18)
    .attr("fill", "#399874")
    .attr("opacity", ".25");

var circleText = chartGroup.selectAll()
    .data(data)
    .enter()
    .append("text")
    .text(d => (d.abbr))
    .attr("x", d => xLinearScale(d[chosenXAxis]))
    .attr("y", d => yLinearScale(d[chosenYAxis]))
    .style("font-size", "13px")
    .style("text-anchor", "middle")
    .style('fill', 'white');


var dataGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);



    var ageLabel = dataGroup.append("text")
        .attr("x", 0)
        .attr("y", 20)
        .attr("value", "age")
        .classed("active", true)
        .text("Median Age");

    var smokesLabel = dataGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", 400)
        .attr("y", -430 )
        .attr("value", "smokes")
        .classed("active", true)
        .text("% Smokers");



    var circlesGroup = updateToolTip(circlesGroup);
  

});





