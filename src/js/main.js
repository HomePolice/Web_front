
$(document).ready(function () {
    // 도넛 차트
    var half_pie = document.getElementById("rank");
    var score = 40;
    var myChart = new Chart(half_pie, {
        type: 'doughnut',
        data: {
            labels: ["현재 등급", "전체 파이"],
            datasets: [{
                label: '# of Votes',
                data: [score, 100-score],
                backgroundColor: [
                    'rgba(255, 0, 100, 0.2)',
                    'rgba(220, 220, 220, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 0, 100,1)',
                    'rgba(220, 220, 220, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                display: false
            },
            rotation: 1 * Math.PI,
            circumference: 1 * Math.PI
        }
    });

    // zoomchart part

    function nodeStyle(node) {
        node.label = node.data.id;
        node.fillColor = "rgba(0, 100, 200, 0.5)";
    }

    function linkStyle(link) {
        link.fromDecoration = "circle";
        link.toDecoration = "arrow";
        link.fillColor = "#de672c";
    }

    let netNode = [{id: "1.1.1.1"}, {id: "2.2.2.2"}, {id: "114.114.114.114"}, {id: "213.10.189.76"}, {id: "192.168.0.1"}]
    let packets = [
        { id: "1", from: "1.1.1.1", to: "192.168.0.1" }, 
        { id: "2", from: "2.2.2.2", to: "192.168.0.1" }, 
        { id: "3", from: "114.114.114.114", to: "192.168.0.1" }, 
        { id: "4", from: "213.10.189.76", to: "192.168.0.1" }, 
        { id: "5", from: "192.168.0.1", to: "2.2.2.2" }
    ]

    var nc = new NetChart({
        container: document.getElementById("netchart"),
        area: { height: 350 },
        data: { // 경로 사용 가능 ex) xxx.csv or .json
            preloaded: {
                nodes: netNode,
                links: packets
            }
        },
        interaction: { selection: { lockNodesOnMove: true } },
        style: {
            nodeStyleFunction: nodeStyle,
            linkStyleFunction: linkStyle
        }
    });
});