var json = [{
    infusion: 'a'
    , volume: 200
    , alertTime: '02-02-2017 12:45'
    , remainingTime: '02-02-2017 14:45'
    , endTime: ''
    , alertVolume: ''
    , result: ''
        }]
window.onload = function () {
    var chart = new CanvasJS.Chart("chartContainer", {
        zoomEnabled: true
        , title: {
            text: "Chart With Date-Time Stamps Inputs"
        }
        , data: [
            {
                type: "area"
                , xValueType: "dateTime"
                , dataPoints: [
                    {
                        x: 1088620200000
                        , y: 71
                            }
                            , {
                        x: 1104517800000
                        , y: 55
                            }
                            , {
                        x: 1112293800000
                        , y: 50
                            }
                            , {
                        x: 1136053800000
                        , y: 65
                            }
                            , {
                        x: 1157049000000
                        , y: 95
                            }
                            , {
                        x: 1162319400000
                        , y: 68
                            }
                            , {
                        x: 1180636200000
                        , y: 28
                            }
                            , {
                        x: 1193855400000
                        , y: 34
                            }
                            , {
                        x: 1209580200000
                        , y: 14
                            }
                            , {
                        x: 1230748200000
                        , y: 34
                            }
                            , {
                        x: 1241116200000
                        , y: 44
                            }
                            , {
                        x: 1262284200000
                        , y: 84
                            }
                            , {
                        x: 1272652200000
                        , y: 4
                            }
                            , {
                        x: 1291141800000
                        , y: 44
                            }
                            , {
                        x: 1304188200000
                        , y: 11
                            }
      ]
    }
    ]
    });
    chart.render();
    //    callApi('sendData', {}, function (d) {
    //        console.log("sendData");
    //    });
    $('#btn-submit').click(function () {
        var infusion = $('#infusion').val();
        var volume = $('#volume').val();
        var alertVolume = $('#alertVolume').val();
        var value = {
            infusion: infusion
            , volume: volume
            , alertVolume: alertVolume
        };
        console.log(JSON.stringify(value, null, 2));
        callApi('sendData', value, function (d) {
            console.log(d);
            if (d.status) alert('form submit');
        });
    });
}

function callApi(ApiName, data, callback) {
    $.ajax({
        type: "GET"
        , dataType: "json"
        , cache: false
        , data: data
        , url: "http://localhost:3000/" + ApiName
        , complete: function (d) {
            var res = JSON.parse(d.responseText);
            callback(res);
        }
    });
}