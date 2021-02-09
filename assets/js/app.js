// @TODO: YOUR CODE HERE!
var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
  };
  
  var width = svgWidth - margin.left - margin.right;
  var height = svgHeight - margin.top - margin.bottom;

  var chosenXAxis = "% in Poverty";
  var chosenYAxis = "Age";

  var xLabels = ["% in Poverty", "% without Healthcare", "% Smokes"];
  var yLabels = ["Age", "Income", "Obesity"];




  var svg = d3
  .select(".#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

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
  
    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);
  
    return xAxis;
  }


function xRenderCircles(circlesGroup, newXScale, chosenXAxis) {

    circlesGroup.transition()
        .duration(1000)
        .attr("cx", d => newXScale(d[chosenXAxis]));

    return circlesGroup;
    }  

function yScale(data, chosenYAxis) {
    // create scales
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d => d[chosenYAxis]) * 0.8,
        d3.max(data, d => d[chosenYAxis]) * 1.2
        ])
        .range([height, 0]);

    return xLinearScale;
    
    }
    
function yRenderAxes(newYScale, yAxis) {
    var leftAxis = d3.axisBottom(newYScale);
    
    yAxis.transition()
        .duration(1000)
        .call(leftAxis);
    
    return yAxis;
    }
    
    
function yRenderCircles(circlesGroup, newYScale, chosenYAxis) {

    circlesGroup.transition()
        .duration(1000)
        .attr("cy", d => newYScale(d[chosenYAxis]));

    return circlesGroup;
    }


function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {
    if (chosenXAxis === xLabels[0]) {
        var xLabel = xLabels[0];
    }
    if (chosenXAxis === xLabels[1]) {
        var xLabel = xLabels[1];
    }
    if (chosenXAxis === xLabels[2]) {
        var xLabel = xLabels[2];
    }

    if (chosenYAxis === yLabels[0]) {
        var yLabel = yLabels[0];
    }
    if (chosenYAxis === yLabels[1]) {
        var yLabel = yLabels[1];
    }
    if (chosenYAxis === yLabels[2]) {
        var yLabel = yLabels[2];
    }

    var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
            return (`${d.state}<br>${xLabel} ${d[chosenXAxis]}<br>${yLabel} ${chosenYAxis}`);
        });

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  return circlesGroup;
}





d3.csv("assets/data/data.csv").then(successHandle, errorHandle);


function errorHandle(error) {
    throw err;
}

function successHandle(data) {
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
    var yLinearScale = xScale(data, chosenYAxis);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

    var yAxis = chartGroup.append("g")
        .classed("y-axis", true)
        .call(leftAxis);
}