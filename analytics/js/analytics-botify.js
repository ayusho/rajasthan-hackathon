$(window).load(function () {
    $('#loading').hide();
});

function resetChart(chartId) {
    var plottedCharts = dc.chartRegistry.list();
    for (chart in plottedCharts) {
        if (plottedCharts[chart].anchor() === '#' + chartId) {
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
    this.csvFileName = '';
    this.crossFilterDataSet = '';
    this.chartTypes = new Array();
    this.setCsvFileName = function (csvFileName) {
        this.csvFileName = csvFileName;
    };
    this.getCsvFileName = function () {
        return this.csvFileName;
    };
    this.getCrossFilterDataSet = function () {
        return this.crossFilterDataSet;
    };
    this.errorMessage = function (errorMessage) {
        console.log(errorMessage);
    };
    this.resetAll = function () {
        this.generateChart(this.getCsvFileName());
        dc.filterAll();
    };
    this.generateChart = function (csvFileName) {
        if (csvFileName !== '') {
            this.setCsvFileName(csvFileName);
            var baseChartObj = this;
            d3.csv(this.getCsvFileName(), function (csv) {
                baseChartObj.crossFilterDataSet = crossfilter(csv);
                //var mainChart               =	dc.geoChoroplethChart("#main-chart");
                //var yearlyBubbleChart = dc.bubbleChart('#lcp-account-bubblechart');

                var lineChartAccOpenDate = dc.lineChart("#lcp-account-opening-date-linechart");
                var rowChartProductType = dc.rowChart("#row-chart-for-product-type");
                //var rowChartProductType1      =   dc.rowChart("#lcp-account-bubblechart");
                var dataTable = dc.dataTable("#smf-data-table");
                var mainChartDimension = baseChartObj.crossFilterDataSet.dimension(function (d) {
                    return d["Lab Location"];
                });

                var geoProjection = d3.geo.stereographic().center([85, 28]).scale(2000)

                csv.forEach(function (d) {
                    if (d.QueryTime != 'NA') {
                        //console.log(d.Date)  
                        d.Date = parseDate(d.QueryTime);
                        d.monthh = d3.time.day(d.Date);
                        //console.log(d.Date) 
                        if (d.Date.getDay() == 1) {
                            d.day = "Monday"
                        }
                        else if (d.Date.getDay() == 2) {
                            d.day = "Tuesday"
                        }
                        else if (d.Date.getDay() == 3) {
                            d.day = "Wednesday"
                        }
                        else if (d.Date.getDay() == 4) {
                            d.day = "Thursday"
                        }
                        else if (d.Date.getDay() == 5) {
                            d.day = "Friday"
                        }
                        else if (d.Date.getDay() == 6) {
                            d.day = "Saturday"
                        }
                        else {
                            d.day = "Sunday"
                        }

                        if (d.Date.getMonth() == 0) {
                            d.month = "January"
                        }
                        else if (d.Date.getMonth() == 1) {
                            d.month = "February"
                        }
                        else if (d.Date.getMonth() == 2) {
                            d.month = "March"
                        }
                        else if (d.Date.getMonth() == 3) {
                            d.month = "April"
                        }
                        else if (d.Date.getMonth() == 4) {
                            d.month = "May"
                        }
                        else if (d.Date.getMonth() == 5) {
                            d.month = "June"
                        }
                        else if (d.Date.getMonth() == 6) {
                            d.month = "July"
                        }
                        else if (d.Date.getMonth() == 7) {
                            d.month = "August"
                        }
                        else if (d.Date.getMonth() == 8) {
                            d.month = "September"
                        }
                        else if (d.Date.getMonth() == 9) {
                            d.month = "October"
                        }
                        else if (d.Date.getMonth() == 10) {
                            d.month = "November"
                        }
                        else {
                            d.month = "December"
                        }
                        //console.log(d.day)
                        //console.log(d.month)
                    }
                });


                runDimension = baseChartObj.crossFilterDataSet.dimension(function (d) {

                    return d.monthh;
                });
                speedSumGroup = runDimension.group().reduceCount(function (d) {
                    return d.SessionId;
                });

                runDimensionProductType = baseChartObj.crossFilterDataSet.dimension(function (d) {
                    return d.day;
                });

                runDimensionProductTypeMonth = baseChartObj.crossFilterDataSet.dimension(function (d) {
                    return d.month;
                });

                speedSumGroupProductType = runDimensionProductType.group().reduceCount(function (d) {
                    return d.Username;
                });;

                speedSumGroupProductTypeSession = runDimensionProductType.group().reduceCount(function (d) {
                    return d.SessionId;
                });;

                speedSumGroupProductTypeSession1 = runDimensionProductType.group().reduceCount(function (d) {
                    return d.Username;
                });;

                //console.log(speedSumGroupProductType)


                var pieCharta = dc.pieChart('#pie-chart-for-gender');

                var pieChartDimensiona = baseChartObj.crossFilterDataSet.dimension(function (d) {
                    var dimensionColumn = 'AnswerSource';
                    return d[dimensionColumn];
                });
                //console.log(pieChartDimensionb)
                var pieChartGroupa = pieChartDimensiona.group()
                var colorScale = d3.scale.ordinal().range(["#007ACC", "#0099FF", "#33ADFF", "#66C2FF", "#99D6FF", "#CCEBFF"]);
                pieCharta.width(270)
                    .height(270)
                    .slicesCap(4)
                    .innerRadius(100)
                    .dimension(pieChartDimensiona)
                    .group(pieChartGroupa)
                    .legend(dc.legend().x(135).y(100).itemHeight(20).gap(10))

                    .colors(d3.scale.ordinal().range(["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"]))
                    .othersLabel('Others')
                    .title(function (d) {
                        return d.key + ": " + d.value;
                    })
                    .label(function (d) {
                        var i, sum = 0;
                        for (i = 0; i < pieChartGroupa.all().length; i++) {
                            sum = sum + pieChartGroupa.all()[i].value;
                        }
                        return parseFloat(((d.value / sum) * 100)).toFixed(2) + "%";

                    })
                    .minAngleForLabel(0.5)
                    .on("filtered", function (chart) {
                        if (chart.hasFilter()) {

                            var CurentFilters = chart.filters().join();

                            $(chart.anchor() + '-reset-link').show();

                        }
                        else {
                            $(chart.anchor() + '-current-filters').hide();
                            $(chart.anchor() + '-reset-link').hide();
                            $(chart.anchor() + '-current-filters').html("");
                        }
                    });
                pieCharta.render();

                var pieChartb = dc.pieChart('#pie-chart-for-age');
                var pieChartDimensionb = baseChartObj.crossFilterDataSet.dimension(function (d) {
                    var dimensionColumn = 'month';
                    return d[dimensionColumn];
                });
                var pieChartGroupb = pieChartDimensionb.group().reduceCount(function (d) {
                    return d.SessionId;
                });;

                var colorScale = d3.scale.ordinal().range(["#007ACC", "#0099FF", "#33ADFF", "#66C2FF", "#99D6FF", "#CCEBFF"]);
                pieChartb.width(270)
                    .height(270)
                    .slicesCap(12)
                    .innerRadius(0)
                    .dimension(pieChartDimensionb)
                    .group(pieChartGroupb)
                    .legend(dc.legend().x(320).y(20).itemHeight(10).gap(5))
                    .colors(d3.scale.ordinal().range(["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"]))
                    .othersLabel('Others')
                    .title(function (d) {
                        return d.key + ": " + d.value;
                    })
                    .label(function (d) {
                        var i, sum = 0;
                        for (i = 0; i < pieChartGroupb.all().length; i++) {
                            sum = sum + pieChartGroupb.all()[i].value;
                        }
                        return parseFloat(((d.value / sum) * 100)).toFixed(2) + "%";

                    })
                    .minAngleForLabel(0.3)
                    .on("filtered", function (chart) {
                        if (chart.hasFilter()) {

                            var CurentFilters = chart.filters().join();

                            $(chart.anchor() + '-reset-link').show();

                        }
                        else {
                            $(chart.anchor() + '-current-filters').hide();
                            $(chart.anchor() + '-reset-link').hide();
                            $(chart.anchor() + '-current-filters').html("");
                        }
                    });
                pieChartb.render();


                var pieChartc = dc.pieChart('#pie-chart-for-feedback');

                var pieChartDimensionc = baseChartObj.crossFilterDataSet.dimension(function (d) {
                    var dimensionColumn = 'Feedback';
                    return d[dimensionColumn];
                });
                //console.log(pieChartDimensionb)
                var pieChartGroupc = pieChartDimensionc.group()
                var colorScale = d3.scale.ordinal().range(["#007ACC", "#0099FF", "#33ADFF", "#66C2FF", "#99D6FF", "#CCEBFF"]);
                pieChartc.width(270)
                    .height(270)
                    .slicesCap(4)
                    .innerRadius(100)
                    .dimension(pieChartDimensionc)
                    .group(pieChartGroupc)
                    .legend(dc.legend().x(135).y(100).itemHeight(20).gap(10))

                    .colors(d3.scale.ordinal().range(["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"]))
                    .othersLabel('Others')
                    .title(function (d) {
                        return d.key + ": " + d.value;
                    })
                    .label(function (d) {
                        var i, sum = 0;
                        for (i = 0; i < pieChartGroupc.all().length; i++) {
                            sum = sum + pieChartGroupc.all()[i].value;
                        }
                        return parseFloat(((d.value / sum) * 100)).toFixed(2) + "%";

                    })
                    .minAngleForLabel(0.5)
                    .on("filtered", function (chart) {
                        if (chart.hasFilter()) {

                            var CurentFilters = chart.filters().join();

                            $(chart.anchor() + '-reset-link').show();

                        }
                        else {
                            $(chart.anchor() + '-current-filters').hide();
                            $(chart.anchor() + '-reset-link').hide();
                            $(chart.anchor() + '-current-filters').html("");
                        }
                    });
                pieChartc.render();


                var rangeOfDates = csv.map(function (d) {
                    return d.Date;
                });
                var maxDateAccOpenDate = d3.max(d3.values(rangeOfDates));
                var minDateAccOpenDate = d3.min(d3.values(rangeOfDates));
                minDateAccOpenDate = d3.time.day.offset(minDateAccOpenDate, -2);
                maxDateAccOpenDate = d3.time.day.offset(maxDateAccOpenDate, 2);
                lineChartAccOpenDate
                    .width(1250)
                    .height(400)
                    .elasticY(true)
                    .x(d3.time.scale().domain([minDateAccOpenDate, maxDateAccOpenDate]))
                    // .interpolate('step-before')
                    .ordinalColors(["#a6d96a"])
                    .renderArea(true)
                    .brushOn(true)
                    .mouseZoomable(true)
                    .renderDataPoints(true)
                    .clipPadding(10)
                    .yAxisLabel("Sessions")
                    .renderHorizontalGridLines(true)
                    .renderVerticalGridLines(true)
                    .transitionDuration(1000)
                    .margins({
                        top: 30,
                        right: 50,
                        bottom: 25,
                        left: 40
                    })
                    .legend(dc.legend().x(750).y(20).itemHeight(13).gap(5))
                    .dimension(runDimension)
                    .group(speedSumGroup, 'Sessions daily')
                    .xAxis();

                lineChartAccOpenDate.render();


                rowChartProductType.width(780)
                    .height(692)
                    .elasticX(true)
                    .margins({
                        top: 20,
                        left: 10,
                        right: 10,
                        bottom: 20
                    })
                    .group(speedSumGroupProductType)
                    .dimension(runDimensionProductType)
                    .colors(d3.scale.ordinal().range(["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5"]))
                    .gap(7)
                    .xAxis().ticks(4);

                rowChartProductType.render();


                dataTable.width(1100)
                    .height(1000)
                    .dimension(mainChartDimension)
                    .group(function (d) {
                        return '';
                    })
                    .size(100)
                    .columns([
                        'Query',
                        'Username',
                        'Date',
                        'AnswerSource',
                        'Feedback',
                        'QueryId',
                        'SessionId'    // d['date'], ie, a field accessor; capitalized automatically
                    ])
                    .renderlet(function (table) {
                        table.selectAll('.dc-table-group').classed('info', true);
                    })
                    .sortBy(function (d) {
                        return d.Date;
                    });

                dataTable.render();


            });
            return true;
        }
        else {
            console.log('error');
            this.errorMessage('Error reading CSV file.');
            return false;
        }
    };
    this.addNewChart = function (chartObj) {
        this.chartTypes.push(chartObj);
    };
}
var chart = new baseChart();
chart.generateChart('../csv/analyticsData.csv');