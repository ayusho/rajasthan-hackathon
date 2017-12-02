var items = $('#v-nav>ul>li').each(function () {
    $(this).click(function () {
        //remove previous class and add it to clicked tab
        items.removeClass('current');
        $(this).addClass('current');
        $('#v-nav>div.tab-content').hide().eq(items.index($(this))).show();
        window.location.hash = $(this).attr('tab');
        if ((window.location.hash == '#tab1')) {
            console.log('done');
        }
        else if ((window.location.hash == '#tab1')) {
            console.log('done');
        }
    });
});
window.onload = function () {
    var lineChart = new CanvasJS.Chart("lineChart", {
        animationEnabled: true
        , theme: "light2"
        , title: {
            text: "Simple Line Chart"
        }
        , axisY: {
            includeZero: false
        }
        , data: [{
            type: "line"
            , dataPoints: [
                {
                    y: 450
                        }
                        , {
                    y: 414
                        }
                        , {
                    y: 520
                    , indexLabel: "highest"
                    , markerColor: "red"
                    , markerType: "triangle"
                        }
                        , {
                    y: 460
                        }
                        , {
                    y: 450
                        }
                        , {
                    y: 500
                        }
                        , {
                    y: 480
                        }
                        , {
                    y: 480
                        }
                        , {
                    y: 410
                    , indexLabel: "lowest"
                    , markerColor: "DarkSlateGrey"
                    , markerType: "cross"
                        }
                        , {
                    y: 500
                        }
                        , {
                    y: 480
                        }
                        , {
                    y: 510
                        }
		]
	}]
    });
    var pieChart = new CanvasJS.Chart("pieChart", {
        animationEnabled: true
        , title: {
            text: "Desktop Search Engine Market Share - 2016"
        }
        , data: [{
            type: "pie"
            , startAngle: 240
            , yValueFormatString: "##0.00\"%\""
            , indexLabel: "{label} {y}"
            , dataPoints: [
                {
                    y: 79.45
                    , label: "Google"
                        }
                        , {
                    y: 7.31
                    , label: "Bing"
                        }
                        , {
                    y: 7.06
                    , label: "Baidu"
                        }
                        , {
                    y: 4.91
                    , label: "Yahoo"
                        }
                        , {
                    y: 1.26
                    , label: "Others"
                        }
		]
	}]
    });
    lineChart.render();
    pieChart.render();
}