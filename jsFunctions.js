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
        .attr("width",xs.rangeBand())
        .attr("height",function(d) {return d.frequency*shrink})
        .attr("fill","steelblue")
        .on("mouseover",tip.show)
        .on("mouseout",tip.hide);

    });
    
    return 0;



}