function slideOnOff(value){
    console.log(value);
    if(value == 1){
        $('#first').show();
        $('#second').hide();
        $('#third').hide();
    }
    else if(value ==2){
        $('#first').hide();
        $('#second').show();
        $('#third').hide();
    }
    else{
        $('#first').hide();
        $('#second').hide();
        $('#third').show();
    }
}

function barChart(){
    var trace1 = {
        y: [0.75, 5.25, 5.5, 6, 6.2, 6.6, 6.80, 7.0, 7.2, 7.5, 7.5, 7.75, 8.15, 8.15, 8.65, 8.93, 9.2, 9.5, 10, 10.25, 11.5, 12, 16, 20.90, 22.3, 23.25],
        type: 'box',
        name: '213.17.0.45',
        marker: {
          color: 'rgb(8,81,156)',
          outliercolor: 'rgba(219, 64, 82, 0.6)',
          line: {
            outliercolor: 'rgba(219, 64, 82, 1.0)',
            outlierwidth: 2
          }
        },
        boxpoints: 'suspectedoutliers'
    };
      
    var trace2 = {
        y: [0.75, 5.25, 5.5, 6, 6.2, 6.6, 6.80, 7.0, 7.2, 7.5, 7.5, 7.75, 8.15, 8.15, 8.65, 8.93, 9.2, 9.5, 10, 10.25, 11.5, 12, 16, 20.90, 22.3, 23.25],
        type: 'box',
        name: '114.114.114.114',
        marker: {
          color: 'rgb(8,81,156)',
          outliercolor: 'rgba(219, 64, 82, 0.6)',
          line: {
            outliercolor: 'rgba(219, 64, 82, 1.0)',
            outlierwidth: 2
          }
        },
        boxpoints: 'suspectedoutliers'
    };
      
    var trace3 = {
        y: [0.75, 5.25, 5.5, 6, 6.2, 6.6, 6.80, 7.0, 7.2, 7.5, 7.5, 7.75, 8.15, 8.15, 8.65, 8.93, 9.2, 9.5, 10, 10.25, 11.5, 12, 16, 20.90, 22.3, 23.25],
        type: 'box',
        name: '2.2.2.2',
        marker: {
          color: 'rgb(8,81,156)',
          outliercolor: 'rgba(219, 64, 82, 0.6)',
          line: {
            outliercolor: 'rgba(219, 64, 82, 1.0)',
            outlierwidth: 2
          }
        },
        boxpoints: 'suspectedoutliers'
    };
      
    var trace4 = {
        y: [0.75, 5.25, 5.5, 6, 6.2, 6.6, 6.80, 7.0, 7.2, 7.5, 7.5, 7.75, 8.15, 8.15, 8.65, 8.93, 9.2, 9.5, 10, 10.25, 11.5, 12, 16, 20.90, 22.3, 23.25],
        type: 'box',
        name: '1.1.1.1',
        marker: {
          color: 'rgb(8,81,156)',
          outliercolor: 'rgba(219, 64, 82, 0.6)',
          line: {
            outliercolor: 'rgba(219, 64, 82, 1.0)',
            outlierwidth: 2
          }
        },
        boxpoints: 'suspectedoutliers'
    };
    
    var data = [trace1, trace2, trace3, trace4];
      
    var layout = {
        title: 'Box Plot Styling Outliers'
    };
      
    Plotly.newPlot('popChart', data, layout);
}

function lineChart(){
    var lineCanvas = $("#lineChart");

    let counts = [282,350,411,502,635];
    let MIN = [], MAX = [];
    for(let i = 0; i < counts.length; i++){
        MIN.push(counts[i] * 0.8);
        MAX.push(counts[i] * 1.2);
    }
    MAX[3] = MAX[3] - 100;
    MAX[4] = MAX[3];
    MIN[4] = MIN[4] - 200;

    var lineData = {
        labels: ["10/29","10/30","10/31","11/1","11/2"],
        datasets: [{ 
            backgroundColor: 'rgba(241, 95, 95, 0.5)',
            data: MAX,
            label: "MAX",
            borderColor: "#FF0011",
            fill: 'end'
          }, {
            data: counts,
            label: "2.2.2.2",
            borderColor: "#22AA22",
            fill: false
          }, { 
            backgroundColor: 'rgba(178, 235, 244, 0.5)',
            data: MIN,
            label: "MIN",
            borderColor: "#FF0011",
            fill: '0'
          }
        ]
    };

    var linechartOptions = {
        title: {
          display: true,
          text: '날짜별 각 IP 패킷 데이터 발생 수'
        },
        plugins: {
            filler: {
                propagate: true
            }
        },
        legend: {
            display: false
        },
        tooltips: {
            enabled: false
        }
    };

    var linechart = new Chart(lineCanvas, {
        type: 'line',
        data:lineData,
        options: linechartOptions
    });
}

// This is zoomchart part, not working
function geoChart(){
    var options = {
        area: { height: 700},
        container: document.getElementById("geoChart"),
        data: {
            preloaded: {
                nodes: [
                    // 노드 - 위도 경도를 다 찍어야한다
                    { id: "Squaw Valley", coordinates: [-119.181449, 36.707146] }, // long, lat
                    { id: "Atlanta", coordinates: [-84.388846, 33.752504] },
                    { id: "New York", coordinates: [-73.996705, 40.74838] },
                    { id: "Lake Placid", coordinates: [-81.364918, 27.294474] }
                ],
                links: [
                    // 링크
                    { from: "New York", to: "Atlanta", drivingTime: "13 hours 3 mins" },
                    { from: "New York", to: "Squaw Valley", drivingTime: "1 day 18 hours" },
                    { from: "New York", to: "Lake Placid", drivingTime: "17 hours 33 mins" },
                    { from: "Lake Placid", to: "Squaw Valley", drivingTime: "1 day 15 hours" },
                    { from: "Atlanta", to: "Squaw Valley", drivingTime: "1 day 10 hours" }
                ]
            }
        },
        events: {
            // 클릭 이벤트! 누르면 정보를 띄울수 있을것으로 생각됨
            onClick: function (event, args) {
                if (args.clickNode) alert("You clicked on " + args.clickNode.data.id + ".");
                if (args.clickLink) alert("You clicked on a link.");
            }
        },
        layers: [
            {
                // 스타일을 결정하는 부분 입니다.
                name: "Points",
                type: "items",
                style: {
                    nodeStyleFunction: function (node) {
                        node.label = node.data.id;
                    },
                    linkStyleFunction: function (link) {
                        link.label = link.data.drivingTime;
                    },
                    node: {
                        fillColor: "#09c",
                        lineColor: "#07a",
                        lineWidth: 2
                    },
                    nodeLabel: {
                        backgroundStyle: { fillColor: "black" },
                        textStyle: { fillColor: "white" }
                    },
                    linkLabel: {
                        backgroundStyle: { fillColor: "rgba(0, 0, 0, 0.6)" },
                        textStyle: { fillColor: "white" }
                    }
                }
            }
        ],
        navigation: {
            // 처음 로딩되었을때 보일 지도 위치를 위경도로 지정, 기본 줌 상태도 지정
            initialLat: 35.04409,
            initialLng: -90.246213,
            initialZoom: 4,
            minZoom: 4
        },  // 더블클릭 불가능 지정
        advanced: { pointer: { noClickOnDoubleClick: false } }
    };

    chart = new GeoChart(options);

}

$(document).ready(function () {
    barChart();
    lineChart();
    geoChart();
    slideOnOff(3);
});