$(document).ready(() => {
  if ($("#serverdata").length > 0) {
    const productData = JSON.parse(decodeURI($("#serverdata").data("test")));
    console.log(productData);
    const productReviews = productData.productReviews;

    productReviews.positive = productReviews.positive.reduce(function (
      count,
      word
    ) {
      count[word] = count.hasOwnProperty(word) ? count[word] + 1 : 1;
      return count;
    },
    {});

    productReviews.positive = Object.entries(productReviews.positive).map(
      (word) => {
        const [key, value] = word;
        return {
          text: key,
          value: value,
          isPositive: true,
        };
      }
    );

    productReviews.negative = productReviews.negative.reduce(function (
      count,
      word
    ) {
      count[word] = count.hasOwnProperty(word) ? count[word] + 1 : 1;
      return count;
    },
    {});

    productReviews.negative = Object.entries(productReviews.negative).map(
      (word) => {
        const [key, value] = word;
        return {
          text: key,
          value: value,
          isPositive: false,
        };
      }
    );

    var words = [...productReviews.positive, ...productReviews.negative];

    var data = words
      .sort((a, b) => d3.descending(a.value, b.value))
      .slice(0, 10);

    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 20, bottom: 30, left: 40 },
      width = $("#bar-chart-div").width() - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    // set the ranges
    var x = d3.scaleBand().range([0, width]).padding(0.1);
    var y = d3.scaleLinear().range([height, 0]);

    var svg = d3
      .select("#bar-chart-div")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Scale the range of the data in the domains
    x.domain(
      data.map(function (d) {
        return d.text;
      })
    );
    y.domain([
      0,
      d3.max(data, function (d) {
        return d.value;
      }),
    ]);

    // append the rectangles for the bar chart
    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .style("fill", (d) => (d.isPositive ? "#00FF00" : "#FF0000"))
      .attr("x", function (d) {
        return x(d.text);
      })
      .attr("width", x.bandwidth())
      .attr("y", function (d) {
        return y(d.value);
      })
      .attr("height", function (d) {
        return height - y(d.value);
      });

    // add the x Axis
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g").call(d3.axisLeft(y));
  }
});
