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

    // myWords = myWords.map((v) => ({ ...v, size: scale(v.value) }));

    var fontFamily = "sans-serif";
    var fontScale = 15;
    var padding = 0;
    var height = 300;
    var width = $("#word-cloud-div").width();
    const rotate = () => 0; // () => (~~(Math.random() * 6) - 3) * 30

    var data = words
      .sort((a, b) => d3.descending(a.value, b.value))
      .slice(0, 250);
    // .map(([text, value]) => ({ text, value }));

    console.log(data);

    const svg = d3
      .select("#word-cloud-div")
      .append("svg")
      .attr("height", height)
      .attr("width", width)
      .attr("font-family", fontFamily)
      .attr("text-anchor", "middle");

    const w_cloud = d3.layout
      .cloud()
      .size([width, height])
      .words(data.map((d) => Object.create(d)))
      .padding(padding)
      .rotate(rotate)
      .font(fontFamily)
      .fontSize((d) => Math.sqrt(d.value) * fontScale)
      .on("word", ({ size, x, y, rotate, text, isPositive }) => {
        svg
          .append("text")
          .attr("font-size", size)
          .attr("fill", isPositive ? "#00FF00" : "#FF0000")
          .attr("transform", `translate(${x},${y}) rotate(${rotate})`)
          .text(text);
      });

    w_cloud.start();
  }
});
