// // @TODO: YOUR CODE HERE!
// var margin = {
//     top: 20,
//     right: 40,
//     bottom: 80,
//     left: 100
//   };
  
//   var width = svgWidth - margin.left - margin.right;
//   var height = svgHeight - margin.top - margin.bottom;

//   var chosenXAxis = "Household Median Income";
//   var chosenYAxis = "Obesity";


//   var svg = d3
//   .select(".#scatter")
//   .append("svg")
//   .attr("width", svgWidth)
//   .attr("height", svgHeight);

// // Append an SVG group
// var chartGroup = svg.append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);

// function xScale(data, chosenXAxis) {
// // create scales
//     var xLinearScale = d3.scaleLinear()
//         .domain([d3.min(data, d => d[chosenXAxis]) * 0.8,
//         d3.max(data, d => d[chosenXAxis]) * 1.2
//         ])
//         .range([0, width]);

//     return xLinearScale;

// }

// function xRenderAxes(newXScale, xAxis) {
//     var bottomAxis = d3.axisBottom(newXScale);
  
//     xAxis.transition()
//       .duration(1000)
//       .call(bottomAxis);
  
//     return xAxis;
//   }


// function xRenderCircles(circlesGroup, newXScale, chosenXAxis) {

//     circlesGroup.transition()
//         .duration(1000)
//         .attr("cx", d => newXScale(d[chosenXAxis]));

//     return circlesGroup;
//     }  

// function yScale(data, chosenYAxis) {
//     // create scales
//     var xLinearScale = d3.scaleLinear()
//         .domain([d3.min(data, d => d[chosenYAxis]) * 0.8,
//         d3.max(data, d => d[chosenYAxis]) * 1.2
//         ])
//         .range([height, 0]);

//     return xLinearScale;
    
//     }
    
// function yRenderAxes(newYScale, yAxis) {
//     var leftAxis = d3.axisBottom(newYScale);
    
//     yAxis.transition()
//         .duration(1000)
//         .call(leftAxis);
    
//     return yAxis;
//     }
    
    
// function yRenderCircles(circlesGroup, newYScale, chosenYAxis) {

//     circlesGroup.transition()
//         .duration(1000)
//         .attr("cy", d => newYScale(d[chosenYAxis]));

//     return circlesGroup;
//     }



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
}