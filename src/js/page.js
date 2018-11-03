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
    var popCanvas = $("#popChart");

    // 세로 바 차트
    var densityData = {
        label: 'IP 별 패킷 데이터 발생 수',
        data: [150, 34, 76, 118, 52],
        backgroundColor: [
        'rgba(0, 99, 132, 0.6)',
        'rgba(30, 99, 132, 0.6)',
        'rgba(60, 99, 132, 0.6)',
        'rgba(90, 99, 132, 0.6)',
        'rgba(120, 99, 132, 0.6)'
        ],
        borderColor: [
        'rgba(0, 99, 132, 1)',
        'rgba(30, 99, 132, 1)',
        'rgba(60, 99, 132, 1)',
        'rgba(90, 99, 132, 1)',
        'rgba(120, 99, 132, 1)'
        ],
        borderWidth: 2,
        hoverBorderWidth: 0
    };
    
    var chartOptions = {
        scales: {
        yAxes: [{
            barPercentage: 0.5
        }]
        },
        elements: {
        rectangle: {
            borderSkipped: 'left',
        }
        }
    };
    
    var barChart = new Chart(popCanvas, {
        type: 'horizontalBar',
        data: {
        labels: ["1.1.1.1", "2.2.2.2", "114.114.114.114", "213.10.189.76", "192.168.0.1"],
        datasets: [densityData],
        },
        options: chartOptions
    });
}

function lineChart(){
    var lineCanvas = $("#lineChart");

    var lineData = {
        labels: ["10/29","10/30","10/31","11/1","11/2"],
        datasets: [{ 
            data: [86,114,106,106,107],
            label: "1.1.1.1",
            borderColor: "#3e95cd",
            fill: false
          }, { 
            data: [282,350,411,502,635],
            label: "2.2.2.2",
            borderColor: "#8e5ea2",
            fill: false
          }, { 
            data: [168,170,178,190,203],
            label: "114.114.114.114",
            borderColor: "#3cba9f",
            fill: false
          }, { 
            data: [40,70,100,160,240],
            label: "213.10.189.76",
            borderColor: "#e8c3b9",
            fill: false
          }, { 
            data: [60,63,72,102,79],
            label: "192.168.0.1",
            borderColor: "#c45850",
            fill: false
          }
        ]
    };

    var chartOptions = {
        title: {
          display: true,
          text: '날짜별 각 IP 패킷 데이터 발생 수'
        }
    };

    var linechart = new Chart(lineCanvas, {
        type: 'line',
        data:lineData,
        options: chartOptions
    });
}

// This is zoomchart part, not working
function geoChart(){
    var options = {
        area: { height: 500},
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
                // 스타일을 결정하는 부분
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