var plot_line_chart = function (d3, ISO_code, disease, vaccine, svg_id) {
  'use strict';

  const svg = d3.select(svg_id)
                .attr("transform", "translate(170,0)");

  // const width = +svg.attr('width');
  // const height = +svg.attr('height');

  const width = window.innerWidth*0.75;
  const height = window.innerHeight*0.75;

  const renderDisease = data => {

    var xValues = [];
    var yValues = [];
    var cName = "";
    var disease_string = disease.charAt(0).toUpperCase() + disease.slice(1)

    data.forEach(d => {
      cName = d.Cname;
      for (var i = 1980; i < 2019; i++){
        xValues.push(i.toString());
        // console.log(i.toString());
        yValues.push(d[i]);
      }
    });

    cName = cName.trim();
    // console.log(cName);
    // console.log(cName.charAt(cName.length - 1));
    if (cName.charAt(cName.length -1) == ")") {
      // console.log(cName);
      cName = cName.slice(0,cName.length - 6);
    }

    // console.log(xValues);
    // console.log(yValues);


    const title = cName + ": " + disease_string + " Incidence Rate";

    var xTicks = [];
    for (var i = 0; i < xValues.length; i += 5){
      // console.log()
      xTicks.push(xValues[i]);
    }
    // console.log(yValues);
    // const yValues = d => d[1980];

    const xAxisLabel = 'Year';
    const yAxisLabel = 'Incidence Rate';

    const margin = { top: 60, right: 105, bottom: 88, left: 105 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleLinear()
      .domain([1980, 2018])
      .range([0, innerWidth])
      .nice();

    // console.log(Math.max(...yValues))

    const yScale = d3.scaleLinear()
      .domain([0,Math.max(...yValues)])
      .range([innerHeight, 0])
      .nice();

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xAxis = d3.axisBottom(xScale)
      .tickSize(-innerHeight)
      .tickPadding(10)
      .tickFormat(function(n) { return n });

    // console.log(xTicks);
    // xAxis.tickValues(xTicks);

    const yAxis = d3.axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickPadding(5);

    const yAxisG = g.append('g').attr("class","disease-axis").call(yAxis);
    yAxisG.selectAll('.domain').remove();

    yAxisG.append('text')
        .attr('class', 'axis-label-disease')
        .attr('y', -60)
        .attr('x', -innerHeight / 2)
        .attr('fill', 'black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
        .text(yAxisLabel);

    const xAxisG = g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis);

    // xAxisG.select('.domain').remove();

    xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', 40)
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .text(xAxisLabel);

    const lineGenerator = d3.line()
      .x(function(d,i){
        // console.log("x - i: ", i);
        // console.log("x - d: ", d);
        return xScale(i+1980);
      })
      .y(function(d,i){
        // console.log("y - d: ", d);
        // console.log("y - yScale(d): ", yScale(d));
        return yScale(d);
      })
      .curve(d3.curveBasis);

    // console.log(lineGenerator(yValues));

    g.append('path')
        .attr('class', 'line-path')
        .attr('d', lineGenerator(yValues));

    g.append('text')
        .attr('class', 'title')
        .attr('y', -10)
        .attr('x', innerWidth / 2)
        .attr('text-anchor', 'middle')
        .text(title);
  };


  const renderVaccine = data => {

    var xValues = [];
    var yValues = [];
    var cName = "";
    var disease_string = disease.charAt(0).toUpperCase() + disease.slice(1)

    data.forEach(d => {
      cName = d.country;
      for (var i = 1980; i < 2019; i++){
        xValues.push(i.toString());
        // console.log(i.toString());
        yValues.push(d[i]);
      }
    });

    cName = cName.trim();
    // console.log(cName);
    // console.log(cName.charAt(cName.length - 1));
    if (cName.charAt(cName.length -1) == ")") {
      // console.log(cName);
      cName = cName.slice(0,cName.length - 5);
    }

    // console.log(xValues);
    // console.log(yValues);

    var xTicks = [];
    for (var i = 0; i < xValues.length; i += 5){
      // console.log()
      xTicks.push(xValues[i]);
    }
    // console.log(yValues);
    // const yValues = d => d[1980];

    const xAxisLabel = 'Year';
    const yAxisLabel = 'Immunization Rate';

    const margin = { top: 60, right: 105, bottom: 88, left: 105 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleLinear()
      .domain([1980, 2018])
      .range([0, innerWidth])
      .nice();

    // console.log(Math.max(...yValues))

    const yScale = d3.scaleLinear()
      .domain([0,Math.max(...yValues)])
      .range([innerHeight, 0])
      .nice();

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xAxis = d3.axisBottom(xScale)
      .tickSize(-innerHeight)
      .tickPadding(10)
      .tickFormat(function(n) { return n });

    // console.log(xTicks);
    // xAxis.tickValues(xTicks);

    const yAxis = d3.axisRight(yScale)
      .tickSize(-innerWidth)
      .tickPadding(5);

    const yAxisG = g.append('g').attr("class","vaccine-axis").attr('transform', `translate(${innerWidth},0)`).call(yAxis);
    yAxisG.selectAll('.domain').remove();

    yAxisG.append('text')
        .attr('class', 'axis-label-vaccine')
        .attr('y', 60)
        .attr('x', -innerHeight / 2)
        .attr('fill', 'black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
        .text(yAxisLabel);

    const xAxisG = g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis);

    // xAxisG.select('.domain').remove();

    xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', 40)
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .text(xAxisLabel);

    const lineGenerator = d3.line()
      .x(function(d,i){
        // console.log("x - i: ", i);
        // console.log("x - d: ", d);
        return xScale(i+1980);
      })
      .y(function(d,i){
        // console.log("y - d: ", d);
        // console.log("y - yScale(d): ", yScale(d));
        return yScale(d);
      })
      .curve(d3.curveBasis);

    // console.log(lineGenerator(yValues));

    g.append('path')
        .attr('class', 'line-path-vaccine')
        .attr('d', lineGenerator(yValues));
  };

  d3.csv('completeDiseases.csv')
    .then(data => {
      data.forEach(d => {
        for(var i = 1980; i < 2019 ; i++){
          d[i] = +d[i];
        }
      });
      // console.log("hello");
      var filtered_disease = data.filter(d => d.Disease === disease);
      var country_disease = filtered_disease.filter(d => d.ISO_code === ISO_code);
      // console.log(measles);
      // console.log(spn_measles);
      renderDisease(country_disease);
      // console.log("hello");
    });

  d3.csv('completeVaccines.csv')
    .then(data=> {
      data.forEach(d => {
        for(var i = 1980; i < 2019; i++) {
          d[i] = +d[i];
        }
      });
      //console.log("a");
      var filtered_vaccine = data.filter(d => d.vaccine === vaccine);
      var country_vaccine = filtered_vaccine.filter(d => d.iso3 === ISO_code);
      renderVaccine(country_vaccine);
    });
};

plot_line_chart(d3,"USA","measles","MCV1", "#map1");
plot_line_chart(d3,"ESP","measles","MCV1", "#map2");
plot_line_chart(d3,"GBR","measles","MCV1", "#map3");
plot_line_chart(d3,"FRA","measles","MCV1", "#map4");
