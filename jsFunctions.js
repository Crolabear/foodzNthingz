// --------------- histogram  input json must have -- 
// word
// frequency

var drawGraph = function (fileName,s1,xleng, yleng,idName,axisUse=false) {
    // note idName is for where to append the canvas to
    d3.json(fileName,function(xdata) {
      // specify the width and length of canvas, and margin  
      var w = xleng;
      var h = yleng;
      var xaxisposition = yleng/5;
      var margin = {top:yleng/100,right:xleng/300,left:xleng/300,bottom:yleng/300};
      var shrink=s1;  // shrink b/c too tall, need to multiply by 0.01 to shrink it
      
      
      
      // create the canvas we draw in, with 
      var canvas = d3.select(idName).append("svg")
        .attr("width",w-margin.left-margin.right)
        .attr("height",h-margin.top-margin.bottom);
      
      // setting up scale.
 
      xs= d3.scale.ordinal()
        .rangeRoundBands([0,w-margin.left-margin.right],0); 
        // a note on rangeRoundBand 
        // [begin, end], absolute horizontal pixel location
        // why do we need to have begin then...
      
      //now add X axis:
      var xAxis = d3.svg.axis()
        .scale(xs)
        .orient("bottom");
      
      xs.domain(xdata.map(function(d) { return d.word; }));
      if (axisUse == true) {
      canvas.append("g")
        .attr("class","xax")
        .attr("transform", "translate(" + 0 + ","+(h-xaxisposition)+")")
        .call(xAxis);
       } 
        
      // add Y axis 
      /*  not sure if we need the y axis
      ys = d3.scale.linear()
        .range([h,0]);
      
      ys.domain([0, d3.max(xdata, function(d) { return d.frequency; })]);

      var yAxis = d3.svg.axis()
        .scale(ys)
        .orient("left");  
        
      canvas.append("g")
        .call(yAxis);
      */  
      // another way to write it is use scale? to be continue...x
      
      // a note on input domain and range
      // input is specified by your data... from min(dataset) to max
      // output range is up to you... how big you want the graph to be
      // once that's specified, linearScale will proportionally shrink or expand the domain to fit the range.
      

      var tip = d3.tip()
        .attr("class","d3-tip")
        .offset([-30,20])
        .html(function(d) {
          return d.word+ ": " + d.frequency;
        })
        
      canvas.call(tip);



        
      // create elements to put on canvas
      var bars = canvas.selectAll(".bar")
        .data(xdata)
        .enter()
        .append("g");
      
      // append rectangles to bars, specifying:
      // attr x, attr y -- > locations
      // attr width --> width of bar
      // attr height --> height of bar
      
      // since bars is binded to data... using the .data().enter() process
      // this results in multiple bars. we need to use i to iterate and specify the 
      // absolute locations.. otherwise, they all overlap and seen as 1 bar.

      bars.append("rect")
        .attr("class","fig1")
        .attr("x",function(d) {return xs(d.word)})
        .attr("y",function(d) {return h-d.frequency*shrink-xaxisposition})
        .attr("width",xs.rangeBand()*0.9)
        .attr("height",function(d) {return d.frequency*shrink})
        .attr("fill","steelblue")
        .on("mouseover",tip.show)
        .on("mouseout",tip.hide);

    });
    
    return 0;



}





// --------------- WordCloud  input json must have -- 
// word
// frequency


// note on scale and scale2... scale has to do with font size, 
//scale2 has to do with zoom range...how far or close do i zoom in or out, the smaller the value, the further i zoom out...
  function genWordCloud(fileName,canvasX,canvasY,spreadX,spreadY,scale,scale2,appendTo) { 
    d3.json(fileName,function(xdata) {
      //var frequency_list = [{"word":"study","frequency":40},{"word":"motion","frequency":15},{"word":"forces","frequency":10},{"word":"electricity","frequency":15},{"word":"movement","frequency":10},{"word":"relation","frequency":5},{"word":"things","frequency":10},{"word":"force","frequency":5},{"word":"ad","frequency":5},{"word":"energy","frequency":85},{"word":"living","frequency":5},{"word":"nonliving","frequency":5},{"word":"laws","frequency":15},{"word":"speed","frequency":45},{"word":"velocity","frequency":30},{"word":"define","frequency":5},{"word":"constraints","frequency":5},{"word":"universe","frequency":10},{"word":"physics","frequency":120},{"word":"describing","frequency":5},{"word":"matter","frequency":90},{"word":"physics-the","frequency":5},{"word":"world","frequency":10},{"word":"works","frequency":10},{"word":"science","frequency":70},{"word":"interactions","frequency":30},{"word":"studies","frequency":5},{"word":"properties","frequency":45},{"word":"nature","frequency":40},{"word":"branch","frequency":30},{"word":"concerned","frequency":25},{"word":"source","frequency":40},{"word":"google","frequency":10},{"word":"defintions","frequency":5},{"word":"two","frequency":15},{"word":"grouped","frequency":15},{"word":"traditional","frequency":15},{"word":"fields","frequency":15},{"word":"acoustics","frequency":15},{"word":"optics","frequency":15},{"word":"mechanics","frequency":20},{"word":"thermodynamics","frequency":15},{"word":"electromagnetism","frequency":15},{"word":"modern","frequency":15},{"word":"extensions","frequency":15},{"word":"thefreedictionary","frequency":15},{"word":"interaction","frequency":15},{"word":"org","frequency":25},{"word":"answers","frequency":5},{"word":"natural","frequency":15},{"word":"objects","frequency":5},{"word":"treats","frequency":10},{"word":"acting","frequency":5},{"word":"department","frequency":5},{"word":"gravitation","frequency":5},{"word":"heat","frequency":10},{"word":"light","frequency":10},{"word":"magnetism","frequency":10},{"word":"modify","frequency":5},{"word":"general","frequency":10},{"word":"bodies","frequency":5},{"word":"philosophy","frequency":5},{"word":"brainyquote","frequency":5},{"word":"words","frequency":5},{"word":"ph","frequency":5},{"word":"html","frequency":5},{"word":"lrl","frequency":5},{"word":"zgzmeylfwuy","frequency":5},{"word":"subject","frequency":5},{"word":"distinguished","frequency":5},{"word":"chemistry","frequency":5},{"word":"biology","frequency":5},{"word":"includes","frequency":5},{"word":"radiation","frequency":5},{"word":"sound","frequency":5},{"word":"structure","frequency":5},{"word":"atoms","frequency":5},{"word":"including","frequency":10},{"word":"atomic","frequency":10},{"word":"nuclear","frequency":10},{"word":"cryogenics","frequency":10},{"word":"solid-state","frequency":10},{"word":"particle","frequency":10},{"word":"plasma","frequency":10},{"word":"deals","frequency":5},{"word":"merriam-webster","frequency":5},{"word":"dictionary","frequency":10},{"word":"analysis","frequency":5},{"word":"conducted","frequency":5},{"word":"order","frequency":5},{"word":"understand","frequency":5},{"word":"behaves","frequency":5},{"word":"en","frequency":5},{"word":"wikipedia","frequency":5},{"word":"wiki","frequency":5},{"word":"physics-","frequency":5},{"word":"physical","frequency":5},{"word":"behaviour","frequency":5},{"word":"collinsdictionary","frequency":5},{"word":"english","frequency":5},{"word":"time","frequency":35},{"word":"distance","frequency":35},{"word":"wheels","frequency":5},{"word":"revelations","frequency":5},{"word":"minute","frequency":5},{"word":"acceleration","frequency":20},{"word":"torque","frequency":5},{"word":"wheel","frequency":5},{"word":"rotations","frequency":5},{"word":"resistance","frequency":5},{"word":"momentum","frequency":5},{"word":"measure","frequency":10},{"word":"direction","frequency":10},{"word":"car","frequency":5},{"word":"add","frequency":5},{"word":"traveled","frequency":5},{"word":"weight","frequency":5},{"word":"electrical","frequency":5},{"word":"power","frequency":5}];

      var frequency_list = xdata;
      //console.log(frequency_list);

 
    var color = d3.scale.linear()
      .domain([0,1,2,3,4,5,6,10,15,20,100])
      .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);

    d3.layout.cloud().size([spreadX, spreadY])
      .words(frequency_list)
      .rotate(0)
      .fontSize(function(d) { return d.frequency*scale; })
      .on("end", draw)
      .start();
//    console.log(words);

    function draw(words) {
      d3.select(appendTo).append("svg")
      .attr("width", canvasX)
      .attr("height", canvasY)
      .attr("class", "wordcloud")
      .append("g")
                // without the transform, words words would get cutoff to the left and top, they would
                // appear outside of the SVG area
      .attr("transform", "translate(320,200)")
      .selectAll("text")
      .data(words)
      .enter().append("text")
      .style("font-Size", function(d) { return d.frequency*scale2 + "px"; })
      .style("fill", function(d, i) { return color(i); })
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
        .text(function(d) { return d.word; });
      }
    
    });
}