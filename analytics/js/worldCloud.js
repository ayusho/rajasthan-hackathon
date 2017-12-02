var dataset = [];
csv = d3.csv("csv/SBPOCUK_wordcloud.csv", function(data) {
   return { // for each csv row return an object with text and size
      text: data.words1,
      size: +data.Freq // cast this to a number with +
    };
})


d3.csv("csv/SBPOCUK_wordcloud.csv", function(d) {
    return { // for each csv row return an object with text and size
      text: d.words1,
      size: +d.Freq // cast this to a number with +
    }
  },
  function(data) {
    d3.layout.cloud().size([500, 500])
      .words(data)
      .padding(1)
      .rotate(function() { return ~~(Math.random() * 2) * 90; })
      .font("Impact")
      .fontSize(function(d) { return d.size/2.5; })
      .on("end", draw)
      .start();
  }
 )
    

 var fill = d3.scale.category20();
  
 

  function draw(words) {
    d3.select("#socalMediaWorldCloud").append("svg")
        .attr("width", 400)
        .attr("height", 320)
        .attr("class", "wordcloud")
        .append("g")
        .attr("transform", "translate(160,150)")
        .selectAll("text")
        .data(words)
        .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Impact") 
        .style("fill", function(d, i) { return fill(i); })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { 
            return d.text; });
  }