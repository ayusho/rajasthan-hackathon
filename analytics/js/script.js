$(document).ready(function () {
    $("#flip").click(function () {
        $("#panel").slideToggle("slide");
    });
});
/* drag */
$(function () {
    $("#contain").sortable({
        connectWith: ".ui-widget-content",
        handle: ".divHeader",
        placeholder: "portlet-placeholder ui-corner-all"
    });
});
/*$(function() {
//    $( ".draggable" ).draggable({ containment: "#contain" });
    $( ".selector" ).draggable( "option", "zIndex", 9999 );
});*/
$(function () {
    $(".resizable").resizable();
});
function toggleChart(chartID, Obj) {
    if ($(Obj).hasClass('glyphicon-minus')) {
        $(Obj).removeClass('glyphicon-minus');
        $(Obj).addClass('glyphicon-plus');
        $('#' + chartID + " svg").hide(1000);
    }
    else {
        $(Obj).removeClass('glyphicon-plus');
        $(Obj).addClass('glyphicon-minus');
        $('#' + chartID + " svg").show(1000);
    }
}

function showHideChart(chartID, buttonId) {
    if ($('#' + chartID).is(':hidden')) {
        $('#' + chartID).show(1000);
        $('#' + buttonId).removeClass(activebutton);
        $('#' + buttonId).addClass(inactivebutton);
    } else {
        $('#' + chartID).hide(1000);
        $('#' + buttonId).removeClass(inactivebutton);
        $('#' + buttonId).addClass(activebutton);
    }
}

var parseDate = d3.time.format("%Y-%m-%dT%H:%M:%S.%L").parse;
var parseDate1 = d3.time.format("%d-%m-%Y").parse;
var parseDate2 = d3.time.format("%Y-%m-%d").parse;
var parseDateFormat = d3.time.format("%Y-%m-%d").parse;
var parseDateFormat1 = d3.time.format("%d-%m-%Y").parse;
var parseDateFormatwithTimeStamp = d3.time.format("%Y-%m-%d %H:%M:%S").parse;

var parseDateFormatwithTimeStamp1 = d3.time.format("%m/%d/%Y %H:%M").parse;
var parseDateFormatwithTimeStamp2 = d3.time.format("%d-%m-%Y %H:%M").parse;

$('#panel button').click(function () {
    $(this).toggleClass("chart_hidden_panel_button");
});

$(function () {

    $("#extruderRight").buildMbExtruder({
        position: "right",
        width: 300,
        extruderOpacity: .8,
        textOrientation: "tb",
        onExtOpen: function () { },
        onExtContentLoad: function () { },
        onExtClose: function () { }
    });

    $.fn.changeLabel = function (text) {
        $(this).find(".flapLabel").html(text);
        $(this).find(".flapLabel").mbFlipText();
    };

});
