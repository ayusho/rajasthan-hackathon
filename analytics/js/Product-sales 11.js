$(window).load(function() {
    $('#loading').hide();
});
function resetChart(chartId) {
    var plottedCharts  =   dc.chartRegistry.list();
    for(chart in plottedCharts) {
        if(plottedCharts[chart].anchor() ===  '#'+chartId) {
            plottedCharts[chart].filterAll();
        }
    }
    dc.redrawAll();
}
function resetAll() {
    dc.filterAll();
    dc.renderAll();
}
function baseChart() {
    this.csvFileName        =   '';
    this.crossFilterDataSet =   '';
    this.chartTypes         =   new Array();
    this.setCsvFileName     =   function(csvFileName) {
        this.csvFileName    =   csvFileName;
    };
    this.getCsvFileName     =   function() {
        return this.csvFileName;
    };
    this.getCrossFilterDataSet   =   function() {
        return this.crossFilterDataSet;
    };
    this.errorMessage    =   function(errorMessage) {
        console.log(errorMessage);
    };
    this.resetAll      =   function() {
        this.generateChart(this.getCsvFileName());
        dc.filterAll();
    };   
    this.generateChart   =   function(csvFileName) {
        if(csvFileName !== '') {
            this.setCsvFileName(csvFileName);
            var baseChartObj    =   this;
            d3.csv(this.getCsvFileName(), function (csv) {
                baseChartObj.crossFilterDataSet =   crossfilter(csv);
                var mainChart               =	dc.geoChoroplethChart("#main-chart");
                var lineChartAccOpenDate         = dc.lineChart("#lcp-account-opening-date-linechart");
                 var rowChartProductType      =   dc.rowChart("#row-chart-for-product-type");
                var mainChartDimension	=	baseChartObj.crossFilterDataSet.dimension(function (d) {
                        return d["CITY"];
                });
                
                var geoProjection = d3.geo.stereographic().center([1.5, 57 ]).scale(6200)
                
               csv.forEach(function(d) {
			   if(d.OPENING_DATE!='NA'){
                    d.dd = parseDateFormatwithTimeStamp2(d.OPENING_DATE);                    
                    d.month = d3.time.month(d.dd);
                   }
                });

                
                runDimension        = baseChartObj.crossFilterDataSet.dimension(function(d) {
                    return d.month;
                });
                speedSumGroup       = runDimension.group().reduceCount(function(d) {
                    return d.ID;
                });
               
                runDimensionProductType        = baseChartObj.crossFilterDataSet.dimension(function(d) {
                    return  d.PRODUCT_TYPE;
                });
                speedSumGroupProductType       = runDimensionProductType.group();
                
                var mainChartGroup = mainChartDimension.group().reduceCount(function(d) { return d.CUST_PROP_CITY; });
                d3.json("geo/ukjson.txt", function (statesJson) {
                        mainChart.width(650)
                            .height(720)
                            .dimension(mainChartDimension)
                            .group(mainChartGroup)
                            .colors(d3.scale.quantize().range(["#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494"]))
                            .colorDomain(function() {
        [dc.utils.groupMin(this.group(), this.valueAccessor()),
         dc.utils.groupMax(this.group(), this.valueAccessor())];
    })
							.on("preRender", function(chart) {
    chart.colorDomain(d3.extent(chart.data(), chart.valueAccessor()));
})
							.on("preRedraw", function(chart) {
        chart.colorDomain(d3.extent(chart.data(), chart.valueAccessor()));
})
                            .colorCalculator(function (d) { return d ? mainChart.colors()(d) : '#ccc'; })
                            .overlayGeoJson(statesJson.features, "state", function (d) {
                                    return d.properties.NAME2;
                            })
                            .title(function (d) {
                                    return "City: "+d.key+"\nTotal Sales: " + (d.value ? d.value : 0);
                            })
                            .label(function (d) {
                                    return d.key;
                            })
                            .renderLabel(true)
                            .projection(geoProjection)
                            ;
                     mainChart.render();
                    						var pieCharta    =   dc.pieChart('#pie-chart-for-gender');
						var pieChartDimensiona	=	baseChartObj.crossFilterDataSet.dimension(function (d) {
								var dimensionColumn =   'GENDER';
								return d[dimensionColumn];
						});
						var pieChartGroupa	=	pieChartDimensiona.group().reduceCount(function(d) {
								var groupColumn =   'GENDER';
								return d[groupColumn];
						});
						var colorScale = d3.scale.ordinal().range(["#007ACC", "#0099FF", "#33ADFF", "#66C2FF", "#99D6FF", "#CCEBFF"]);
						pieCharta							.width(300)
							.height(270)
							.slicesCap(2)
							.innerRadius(100)
							.dimension(pieChartDimensiona)
							.group(pieChartGroupa)
							.legend(dc.legend().x(135).y(100).itemHeight(20).gap(10))
							//.ordinalColors(["#56B2EA","#E064CD","#F8B700","#78CC00","#7B71C5"])
							.colors(d3.scale.category20())
							.othersLabel('Others')
							.title(function(d){
								return d.key+": "+d.value;
							})
							.label(function(d){
								var i,sum = 0;
								for( i=0;i<pieChartGroupa.all().length;i++)
								{
									sum=sum+pieChartGroupa.all()[i].value;
								}
								return parseFloat(((d.value/sum) * 100)).toFixed(2)+"%";
								//return parseFloat(((d.value/pieChartDimension.top(Number.POSITIVE_INFINITY).length) * 100)).toFixed(2)+"%";
							})
							.minAngleForLabel(0.5)
							.on("filtered", function(chart){
								if(chart.hasFilter()) {
								   // console.log(chart.filters());
									var CurentFilters    =   chart.filters().join();
									//$(chart.anchor()+'-current-filters').show();
									$(chart.anchor()+'-reset-link').show();
									//$(chart.anchor()+'-current-filters').php("Current Filters: "+CurentFilters.replace(/</g, "&lt;").replace(/>/g, "&gt;"));
								}
								else {
									$(chart.anchor()+'-current-filters').hide();
									$(chart.anchor()+'-reset-link').hide();
									$(chart.anchor()+'-current-filters').html("");
								}
							});
					   pieCharta.render();
                    						var pieChartb    =   dc.pieChart('#pie-chart-for-age');
						var pieChartDimensionb	=	baseChartObj.crossFilterDataSet.dimension(function (d) {
								var dimensionColumn =   'AGE_GROUP';
								return d[dimensionColumn];
						});
						var pieChartGroupb	=	pieChartDimensionb.group().reduceCount(function(d) {
								var groupColumn =   'AGE_GROUP';
								return d[groupColumn];
						});
						var colorScale = d3.scale.ordinal().range(["#007ACC", "#0099FF", "#33ADFF", "#66C2FF", "#99D6FF", "#CCEBFF"]);
						pieChartb							.width(300)
							.height(270)
							.slicesCap(12)
							.innerRadius(0)
							.dimension(pieChartDimensionb)
							.group(pieChartGroupb)
							.legend(dc.legend().x(320).y(20).itemHeight(10).gap(5))
							//.ordinalColors(["#e41a1c", "#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33","#a65628","#f781bf","#999999"])
							.colors(d3.scale.category20())
							.othersLabel('Others')
							.title(function(d){
								return d.key+": "+d.value;
							})
							.label(function(d){
								var i,sum = 0;
								for( i=0;i<pieChartGroupb.all().length;i++)
								{
									sum=sum+pieChartGroupb.all()[i].value;
								}
								return parseFloat(((d.value/sum) * 100)).toFixed(2)+"%";
								//return parseFloat(((d.value/pieChartDimension.top(Number.POSITIVE_INFINITY).length) * 100)).toFixed(2)+"%";
							})
							.minAngleForLabel(0.3)
							.on("filtered", function(chart){
								if(chart.hasFilter()) {
								   // console.log(chart.filters());
									var CurentFilters    =   chart.filters().join();
									//$(chart.anchor()+'-current-filters').show();
									$(chart.anchor()+'-reset-link').show();
									//$(chart.anchor()+'-current-filters').php("Current Filters: "+CurentFilters.replace(/</g, "&lt;").replace(/>/g, "&gt;"));
								}
								else {
									$(chart.anchor()+'-current-filters').hide();
									$(chart.anchor()+'-reset-link').hide();
									$(chart.anchor()+'-current-filters').html("");
								}
							});
					   pieChartb.render();
                    						var pieChartc    =   dc.pieChart('#pie-chart-for-employment-type');
						var pieChartDimensionc	=	baseChartObj.crossFilterDataSet.dimension(function (d) {
								var dimensionColumn =   'EMP_TYPE';
								return d[dimensionColumn];
						});
						var pieChartGroupc	=	pieChartDimensionc.group().reduceCount(function(d) {
								var groupColumn =   'EMP_TYPE';
								return d[groupColumn];
						});
						var colorScale = d3.scale.ordinal().range(["#007ACC", "#0099FF", "#33ADFF", "#66C2FF", "#99D6FF", "#CCEBFF"]);
						pieChartc							.width(300)
							.height(270)
							.slicesCap(3)
							.innerRadius(0)
							.dimension(pieChartDimensionc)
							.group(pieChartGroupc)
							.legend(dc.legend().x(320).y(20))
							//.ordinalColors(["#56B2EA","#E064CD","#F8B700","#78CC00","#7B71C5"])
							.colors(d3.scale.category20())
							.othersLabel('Others')
							.title(function(d){
								return d.key+": "+d.value;
							})
							.label(function(d){
								var i,sum = 0;
								for( i=0;i<pieChartGroupc.all().length;i++)
								{
									sum=sum+pieChartGroupc.all()[i].value;
								}
								return parseFloat(((d.value/sum) * 100)).toFixed(2)+"%";
								//return parseFloat(((d.value/pieChartDimension.top(Number.POSITIVE_INFINITY).length) * 100)).toFixed(2)+"%";
							})
							.minAngleForLabel(0)
							.on("filtered", function(chart){
								if(chart.hasFilter()) {
								   // console.log(chart.filters());
									var CurentFilters    =   chart.filters().join();
									//$(chart.anchor()+'-current-filters').show();
									$(chart.anchor()+'-reset-link').show();
									//$(chart.anchor()+'-current-filters').php("Current Filters: "+CurentFilters.replace(/</g, "&lt;").replace(/>/g, "&gt;"));
								}
								else {
									$(chart.anchor()+'-current-filters').hide();
									$(chart.anchor()+'-reset-link').hide();
									$(chart.anchor()+'-current-filters').html("");
								}
							});
					   pieChartc.render();
                    						var pieChartd    =   dc.pieChart('#pie-chart-for-income-group');
						var pieChartDimensiond	=	baseChartObj.crossFilterDataSet.dimension(function (d) {
								var dimensionColumn =   'INCOME_GROUP';
								return d[dimensionColumn];
						});
						var pieChartGroupd	=	pieChartDimensiond.group().reduceCount(function(d) {
								var groupColumn =   'INCOME_GROUP';
								return d[groupColumn];
						});
						var colorScale = d3.scale.ordinal().range(["#007ACC", "#0099FF", "#33ADFF", "#66C2FF", "#99D6FF", "#CCEBFF"]);
						pieChartd							.width(300)
							.height(270)
							.slicesCap(3)
							.innerRadius(80)
							.dimension(pieChartDimensiond)
							.group(pieChartGroupd)
							.legend(dc.legend().x(320).y(20).itemHeight(10).gap(5))
							//.ordinalColors(["#56B2EA","#E064CD","#F8B700","#78CC00","#7B71C5"])
							.colors(d3.scale.category20())
							.othersLabel('Others')
							.title(function(d){
								return d.key+": "+d.value;
							})
							.label(function(d){
								var i,sum = 0;
								for( i=0;i<pieChartGroupd.all().length;i++)
								{
									sum=sum+pieChartGroupd.all()[i].value;
								}
								return parseFloat(((d.value/sum) * 100)).toFixed(2)+"%";
								//return parseFloat(((d.value/pieChartDimension.top(Number.POSITIVE_INFINITY).length) * 100)).toFixed(2)+"%";
							})
							.minAngleForLabel(0.5)
							.on("filtered", function(chart){
								if(chart.hasFilter()) {
								   // console.log(chart.filters());
									var CurentFilters    =   chart.filters().join();
									//$(chart.anchor()+'-current-filters').show();
									$(chart.anchor()+'-reset-link').show();
									//$(chart.anchor()+'-current-filters').php("Current Filters: "+CurentFilters.replace(/</g, "&lt;").replace(/>/g, "&gt;"));
								}
								else {
									$(chart.anchor()+'-current-filters').hide();
									$(chart.anchor()+'-reset-link').hide();
									$(chart.anchor()+'-current-filters').html("");
								}
							});
					   pieChartd.render();
                    						var pieCharte    =   dc.pieChart('#pie-chart-for-marital-status');
						var pieChartDimensione	=	baseChartObj.crossFilterDataSet.dimension(function (d) {
								var dimensionColumn =   'MAR_STAT';
								return d[dimensionColumn];
						});
						var pieChartGroupe	=	pieChartDimensione.group().reduceCount(function(d) {
								var groupColumn =   'MAR_STAT';
								return d[groupColumn];
						});
						var colorScale = d3.scale.ordinal().range(["#007ACC", "#0099FF", "#33ADFF", "#66C2FF", "#99D6FF", "#CCEBFF"]);
						pieCharte							.width(300)
							.height(270)
							.slicesCap(3)
							.innerRadius(0)
							.dimension(pieChartDimensione)
							.group(pieChartGroupe)
							.legend(dc.legend().x(320).y(20).itemHeight(10).gap(5))
							//.ordinalColors(["#56B2EA","#E064CD","#F8B700","#78CC00","#7B71C5"])
							.colors(d3.scale.category20())
							.othersLabel('Others')
							.title(function(d){
								return d.key+": "+d.value;
							})
							.label(function(d){
								var i,sum = 0;
								for( i=0;i<pieChartGroupe.all().length;i++)
								{
									sum=sum+pieChartGroupe.all()[i].value;
								}
								return parseFloat(((d.value/sum) * 100)).toFixed(2)+"%";
								//return parseFloat(((d.value/pieChartDimension.top(Number.POSITIVE_INFINITY).length) * 100)).toFixed(2)+"%";
							})
							.minAngleForLabel(0.3)
							.on("filtered", function(chart){
								if(chart.hasFilter()) {
								   // console.log(chart.filters());
									var CurentFilters    =   chart.filters().join();
									//$(chart.anchor()+'-current-filters').show();
									$(chart.anchor()+'-reset-link').show();
									//$(chart.anchor()+'-current-filters').php("Current Filters: "+CurentFilters.replace(/</g, "&lt;").replace(/>/g, "&gt;"));
								}
								else {
									$(chart.anchor()+'-current-filters').hide();
									$(chart.anchor()+'-reset-link').hide();
									$(chart.anchor()+'-current-filters').html("");
								}
							});
					   pieCharte.render();
                    						var pieChartf    =   dc.pieChart('#pie-chart-for-customer-description');
						var pieChartDimensionf	=	baseChartObj.crossFilterDataSet.dimension(function (d) {
								var dimensionColumn =   'CUST_DESCRIPTION';
								return d[dimensionColumn];
						});
						var pieChartGroupf	=	pieChartDimensionf.group().reduceCount(function(d) {
								var groupColumn =   'CUST_DESCRIPTION';
								return d[groupColumn];
						});
						var colorScale = d3.scale.ordinal().range(["#007ACC", "#0099FF", "#33ADFF", "#66C2FF", "#99D6FF", "#CCEBFF"]);
						pieChartf							.width(300)
							.height(270)
							.slicesCap(4)
							.innerRadius(0)
							.dimension(pieChartDimensionf)
							.group(pieChartGroupf)
							.legend(dc.legend().x(320).y(20).itemHeight(10).gap(5))
							//.ordinalColors(["#56B2EA","#E064CD","#F8B700","#78CC00","#7B71C5"])
							.colors(d3.scale.category20())
							.othersLabel('Others')
							.title(function(d){
								return d.key+": "+d.value;
							})
							.label(function(d){
								var i,sum = 0;
								for( i=0;i<pieChartGroupf.all().length;i++)
								{
									sum=sum+pieChartGroupf.all()[i].value;
								}
								return parseFloat(((d.value/sum) * 100)).toFixed(2)+"%";
								//return parseFloat(((d.value/pieChartDimension.top(Number.POSITIVE_INFINITY).length) * 100)).toFixed(2)+"%";
							})
							.minAngleForLabel(0.3)
							.on("filtered", function(chart){
								if(chart.hasFilter()) {
								   // console.log(chart.filters());
									var CurentFilters    =   chart.filters().join();
									//$(chart.anchor()+'-current-filters').show();
									$(chart.anchor()+'-reset-link').show();
									//$(chart.anchor()+'-current-filters').php("Current Filters: "+CurentFilters.replace(/</g, "&lt;").replace(/>/g, "&gt;"));
								}
								else {
									$(chart.anchor()+'-current-filters').hide();
									$(chart.anchor()+'-reset-link').hide();
									$(chart.anchor()+'-current-filters').html("");
								}
							});
					   pieChartf.render();
                                        var minDateAccOpenDate = new Date("01/01/1973");
                    var maxDateAccOpenDate = new Date("12/31/2015");   
                    lineChartAccOpenDate
                      .width(930)
                      .height(300)
					  .elasticY(true)
                      .x(d3.time.scale().domain([minDateAccOpenDate,maxDateAccOpenDate]))
                     // .interpolate('step-before')
                      .renderArea(true)
                      .brushOn(true)
                      .mouseZoomable(true)
                      .renderDataPoints(true)
                      .clipPadding(10)
                      .yAxisLabel("No. of Accounts Opened")
                      .renderHorizontalGridLines(true)
                      .renderVerticalGridLines(true)
                      .transitionDuration(1000)
                      .margins({top: 30, right: 50, bottom: 25, left: 40})
                      .legend(dc.legend().x(750).y(20).itemHeight(13).gap(5))
                      .dimension(runDimension)
                      .group(speedSumGroup, 'Accounts opened yearly')
                      .xAxis();

                    lineChartAccOpenDate.render();
                    
                    
             
              
                    rowChartProductType.width(1113)
                        .height(1040)
                        .margins({top: 20, left: 10, right: 10, bottom: 20})
                        .group(speedSumGroupProductType)
                        .dimension(runDimensionProductType)
                        //.colors(d3.scale.ordinal().range(["#66C2FF"]))
						.colors(d3.scale.category20())
                        .gap(7)
                        .xAxis().ticks(4);

                    rowChartProductType.render();
                    
                    
                            
                });
            });
            return true;
        }
        else {
            this.errorMessage('Error reading CSV file.');
            return false;
        }
    };
    this.addNewChart    =   function(chartObj) {
        this.chartTypes.push(chartObj);
    };
}
var chart   =   new baseChart();
chart.generateChart('csv/SBPOCUK_R1.1_Dataset.csv');
