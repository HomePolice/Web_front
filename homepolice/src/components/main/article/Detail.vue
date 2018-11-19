<template>
  <div class="container">
    <div class="top">
      <img src="../../../../src/assets/ic-manual-24-px_2018-11-11/ic-manual-24-px.png"
           srcset="../../../../src/assets/ic-manual-24-px_2018-11-11/ic-manual-24-px@2x.png 2x,
             ../../../../src/assets/ic-manual-24-px_2018-11-11/ic-manual-24-px@3x.png 3x"
           class="ic_Manual_24px">
      <div class="manual">
        상세보기
      </div>
    </div>
      <span class="slide"><div id="popChart"></div></span>
      <span class="slide"><canvas id="lineChart"></canvas></span>
      <span class="slide"><div id="geoChart"></div></span>
  </div>
</template>

<script>
// 상세 차트 보기 페이지 컴포넌트
import axios from 'axios'
import localforage from 'localforage'

export default {
  name: 'detail',
  data () {
    return {
    }
  },
  mounted: function () {
    localforage.getItem('account').then((cookie) => {
      let counts = [], MAX = [], MIN = [], lineLabel = []

      function lineChart () {
        var lineCanvas = $('#lineChart')

        var lineData = {
          labels: lineLabel,
          datasets: [{
            backgroundColor: 'rgba(178, 235, 244, 0.5)',
            data: MAX,
            label: 'MAX',
            borderColor: '#FF0011',
            fill: 'end'
          }, {
            data: counts,
            label: '2.2.2.2',
            borderColor: '#22AA22',
            fill: false
          }, {
            backgroundColor: 'rgba(178, 235, 244, 0.5)',
            data: MIN,
            label: 'MIN',
            borderColor: '#FF0011',
            fill: 'start'
          }
          ]
        }

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
            enabled: true
          }
        }

        var linechart = new Chart(lineCanvas, {
          type: 'line',
          data: lineData,
          options: linechartOptions
        })
      }

      axios.post('http://127.0.0.1:3000/data/getThreshold', {account: cookie})
        .then(response => {
          MAX = JSON.parse(response.data[0]['max'])
          counts = JSON.parse(response.data[0]['origin'])
          MIN = JSON.parse(response.data[0]['min'])

          let d = new Date()
          let m = d.getMinutes()
          let h = d.getHours()
          let interval = 20 / counts.length
          for (let i = counts.length - 1; i >= 0; i--) {
            let cm = Math.floor((m - (interval * i)))
            if (cm < 0) {
              cm = cm + 60

              lineLabel.push((h - 1) + ':' + cm)
            } else {
              lineLabel.push(h + ':' + cm)
            }
          }

          lineChart()
        })
        .catch(e => { console.log(e) })

      var most5 = []
      var val = []

      function barChart () {
        var trace1 = {
          y: val[0],
          type: 'box',
          name: most5[0],
          marker: {
            color: 'rgb(8,81,156)',
            outliercolor: 'rgba(219, 64, 82, 0.6)',
            line: {
              outliercolor: 'rgba(219, 64, 82, 1.0)',
              outlierwidth: 2
            }
          },
          boxpoints: 'suspectedoutliers'
        }

        var trace2 = {
          y: val[1],
          type: 'box',
          name: most5[1],
          marker: {
            color: 'rgb(8,81,156)',
            outliercolor: 'rgba(219, 64, 82, 0.6)',
            line: {
              outliercolor: 'rgba(219, 64, 82, 1.0)',
              outlierwidth: 2
            }
          },
          boxpoints: 'suspectedoutliers'
        }

        var trace3 = {
          y: val[2],
          type: 'box',
          name: most5[2],
          marker: {
            color: 'rgb(8,81,156)',
            outliercolor: 'rgba(219, 64, 82, 0.6)',
            line: {
              outliercolor: 'rgba(219, 64, 82, 1.0)',
              outlierwidth: 2
            }
          },
          boxpoints: 'suspectedoutliers'
        }

        var trace4 = {
          y: val[3],
          type: 'box',
          name: most5[3],
          marker: {
            color: 'rgb(8,81,156)',
            outliercolor: 'rgba(219, 64, 82, 0.6)',
            line: {
              outliercolor: 'rgba(219, 64, 82, 1.0)',
              outlierwidth: 2
            }
          },
          boxpoints: 'suspectedoutliers'
        }

        var trace5 = {
          y: val[4],
          type: 'box',
          name: most5[4],
          marker: {
            color: 'rgb(8,81,156)',
            outliercolor: 'rgba(219, 64, 82, 0.6)',
            line: {
              outliercolor: 'rgba(219, 64, 82, 1.0)',
              outlierwidth: 2
            }
          },
          boxpoints: 'suspectedoutliers'
        }

        var data = [trace1, trace2, trace3, trace4, trace5]

        var layout = {
          title: 'Most 5 IP'
        }

        Plotly.newPlot('popChart', data, layout)
      }

      axios.post('http://127.0.0.1:3000/data/getMost5', {account: cookie})
        .then(response => {
          most5 = response.data.ip

          for (let i = 0; i < most5.length; i++) {
            axios.post('http://127.0.0.1:3000/data/getListByIp', {account: cookie, ip: most5[i]})
              .then(res => {
                val.push(res.data['ip'])
                if (i == most5.length - 1) {
                  barChart()
                }
              })
              .catch(err => console.log(err))
          }
        })
        .catch(error => console.log(error))

      var location = []
      var packetCount = []

      // This is zoomchart part, not working
      function geoChart () {
        var options = {
          area: { height: 700},
          container: document.getElementById('geoChart'),
          data: {
            preloaded: {
              nodes: location,
              links: packetCount
            }
          },
          events: {
            // 클릭 이벤트! 누르면 정보를 띄울수 있을것으로 생각됨
            onClick: function (event, args) {
              if (args.clickNode) alert('You clicked on ' + args.clickNode.data.id + '.')
              if (args.clickLink) alert('You clicked on a link.')
            }
          },
          layers: [
            {
              // 스타일을 결정하는 부분 입니다.
              name: 'Points',
              type: 'items',
              style: {
                nodeStyleFunction: function (node) {
                  node.label = node.data.id
                },
                linkStyleFunction: function (link) {
                  link.label = link.data.traffic
                },
                node: {
                  fillColor: '#09c',
                  lineColor: '#07a',
                  lineWidth: 2
                },
                nodeLabel: {
                  backgroundStyle: { fillColor: 'black' },
                  textStyle: { fillColor: 'white' }
                },
                linkLabel: {
                  backgroundStyle: { fillColor: 'rgba(0, 0, 0, 0.6)' },
                  textStyle: { fillColor: 'white' }
                }
              }
            }
          ],
          navigation: {
            // 처음 로딩되었을때 보일 지도 위치를 위경도로 지정, 기본 줌 상태도 지정
            initialLat: 37.566536,
            initialLng: 126.977966,
            initialZoom: 4,
            minZoom: 2
          }, // 더블클릭 불가능 지정
          advanced: { pointer: { noClickOnDoubleClick: false } }
        }
        var chart = new GeoChart(options)
      }

      axios.post('http://127.0.0.1:3000/data/geo', {account: cookie})
        .then(response => {
          let get = response.data

          for (let i = 0; i < get.length; i++) {
          // verizon api
            axios.get('http://www.mapquestapi.com/geocoding/v1/address?key=0VVYrAu2CsGcrHAfmBk4Qs2JGmErZ2dd&location=' + get[i]['nation'])
              .then(response => {
                let coordinate = response.data.results[0]['locations'][0]['latLng']
                location.push({'id': get[i]['nation'], 'coordinates': [coordinate['lng'], coordinate['lat']]})
                packetCount.push({'from': 'south korea', 'to': get[i]['nation'], 'traffic': get[i]['abnormal_count']})

                if (i == get.length - 1) {
                  console.log(location)
                  console.log(packetCount)
                  geoChart()
                }
              })
              .catch(err => console.log(err))
          }
        })
        .catch(err => console.log(err))
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>

<style scoped>
.slide {
  display: inline-block;
  width: 95%;
  height: 95%;
  margin: 1.5% 0;
	padding: 0.5% 1%;
	border-width: 2px;
  border-color: #aaa;
  border-style: outset;
}

.container {
  margin-left: 30px;
}
.top {
  margin-top: 80px;
  display: flex;
}
.top > div {
  font-size: 30px;
  padding-top: 6px;
}

img {
  width: 62px;
  height: 62px;
}

#DVSL-interaction {

}

</style>
