<template>
  <div>
    <div class="top" v-if="rank >= 80">
      <div class="gage_chart">
        <img src="../../../assets/image/80.png" class="rank_img"/>
      </div>

      <div class="summary">
        <div class="summary_grade">
          당신의 스마트 홈
          <br>
          보안 등급은 A 입니다.
        </div>
        <div class="summary_info">
          현재 아무런 공격 위협을 받지 않는 매우 안전한 상태입니다.
          <br>
          앞으로도 지금처럼 관리한다면 당신의 데이터는 안전합니다!
        </div>
      </div>
    </div>
    <div class="top" v-else-if="rank >= 60">

      <div class="gage_chart">
        <img src="../../../assets/image/60.png" class="rank_img"/>
      </div>

      <div class="summary">
        <div class="summary_grade">
          당신의 스마트 홈
          <br>
          보안 등급은 B 입니다.
        </div>
        <div class="summary_info">
          현재 의심 사례가 발견되지만 대체적으로 안전한 상태입니다.
          <br>
          사전 메뉴얼을 참고하여 관리에 신경써주세요!
        </div>
      </div>
    </div>
    <div class="top" v-else-if="rank >= 40">

      <div class="gage_chart">
        <img src="../../../assets/image/40.png" class="rank_img"/>
      </div>

      <div class="summary">
        <div class="summary_grade">
          당신의 스마트 홈
          <br>
          보안 등급은 C 입니다.
        </div>
        <div class="summary_info">
          현재 발견되는 위협이 많아 조치가 필요합니다.
          <br>
          사후 대체 메뉴얼을 참고하여 조치를 취해주세요!
        </div>
      </div>
    </div>
    <div class="top" v-else>

      <div class="gage_chart">
        <img src="../../../assets/image/20.png" class="rank_img"/>
      </div>

      <div class="summary">
        <div class="summary_grade">
          당신의 스마트 홈
          <br>
          보안 등급은 D 입니다.
        </div>
        <div class="summary_info">
          현재 위협이 심각한 상태입니다.
          <br>
          사전 사후 대처메뉴얼을 참고해서 조치를 반드시 취해야합니다!
        </div>
      </div>
    </div>

    <div class="top_mid_margin">
      <div class="margin_text">
        스마트 홈 구성도
      </div>
    </div>
    <div class="mid">
      <div id="netchart"></div>
      <div class="detect_result">
        <div class="detect_result_top">
          새로운 IP 출현
        </div>
        <img src="../../../assets/graphic-ip-search_2018-11-06/graphic-ip-search.png"
             srcset="../../../assets/graphic-ip-search_2018-11-06/graphic-ip-search@2x.png 2x,
           ../../../assets/graphic-ip-search_2018-11-06/graphic-ip-search@3x.png 3x"
             class="Graphic_IPSearch">
        <div class="detect_result_mid">
          {{lNT}}
          <br>
          {{lIP}}
        </div>
        <button v-on:click='registerDrop'>차단하기</button>
      </div>
    </div>
    <div class="mid_bottom_margin">
      <div class="margin_text">
        이벤트 요약 정보
      </div>
    </div>
    <div class="bottom">
      <div class="bottom_head">
        <div class="bottom_head_item">
          탐지 IP
          <div class="count">
            {{lists.length}}
          </div>
        </div>

        <div class="bottom_head_item">
          차단 IP
          <div class="count">
            0
          </div>
        </div>
      </div>

      <div class="bottom_body">
        <div class="bottom_label">
            탐지 IP 리스트
        </div>

        <!--반복문으로 아래 뿌려주기-->
        <div v-for="list in lists">
          <div class="bottom_item">
            <div class="bottom_info">
              <div class="bottom_item_date">{{list["occured_time"]}}</div>
              <div class="bottom_item_ip">{{list["dest_ip"]}}</div>
            </div>
            <div class="bottom_exception">
              <div v-on:click='registerExcept'>예외등록</div>
            </div>
            <div class="bottom_button" v-on:click='registerDrop'>차단</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 메인 페이지 컴포넌트

import axios from 'axios'
import localforage from 'localforage'
import Message from 'vue-m-message'

export default {
  name: 'main',
  data () {
    return {
      lists: [],
      rank: 0,
      lIP: '',
      lNT: '',
      timer: ''
    }
  },
  methods: {
    registerExcept: function (event) {
      // 예외등록 차단등록 리스트 중 하나 특정할 수 있으면 바로 구현 가능
      alert('예외 등록되었습니다.')
    },
    registerDrop: function (event) {
      alert('차단 등록되었습니다.')
    },
    fetchEventsList: function () {
      localforage.getItem('account').then((cookie) => {
        axios.post('http://13.209.93.63:3000/data/getLatestIp', {account: cookie})
          .then(response => {
            if (response.data[0]['dest_ip'] === this.lIP || this.lIP.length <= 0) {
              this.lIP = response.data[0]['dest_ip']
              this.lNT = response.data[0]['nation']
            } else {
              Message.error('새로운 아이피 출연!')
              this.lIP = response.data[0]['dest_ip']
              this.lNT = response.data[0]['nation']
            }
          })
          .catch(e => { console.log(e) })
      })
    },
    cancelAutoUpdate: function () { clearInterval(this.timer) }
  },
  created: function () {
    this.fetchEventsList()
    this.timer = setInterval(this.fetchEventsList, 5000)
  },
  mounted () {
    localforage.getItem('account').then((cookie) => {
      axios.post('http://13.209.93.63:3000/data/lists', {account: cookie})
        .then(response => {
          this.lists = response.data
        })
        .catch(e => { console.log(e) })

      axios.post('http://13.209.93.63:3000/data/getLatestIp', {account: cookie})
        .then(response => {
          this.lIP = response.data[0]['dest_ip']
          this.lNT = response.data[0]['nation']
        })
        .catch(e => { console.log(e) })

      axios.post('http://13.209.93.63:3000/data/rank', {account: cookie})
        .then(response => {
          this.rank = response.data[0]['rank']
        })
        .catch(err => console.log(err))

      let nodes = []
      let edges = []
      let nation = []

      axios.post('http://13.209.93.63:3000/data/get2HopNet', {account: cookie})
        .then(response => {
          let ids = 1
          let t_edges = response.data.edge
          for (let i = 0; i < t_edges.length; i++) {
            for (let j = 0; j < t_edges[i].length; j++) {
              axios.post('http://api.ipstack.com/' + t_edges[i][j]['properties']['destIp'] + '?access_key=7fc9c7cb577799e568e7da72bbdc3fbf')
                .then(response => {
                  if (response.data.country_name == null) {
                    t_edges[i][j]['properties']['nation'] = 'south korea'
                  } else {
                    t_edges[i][j]['properties']['nation'] = response.data.country_name
                  }
                  nation.push(t_edges[i][j]['properties']['nation'])
                  nodes.push({'id': t_edges[i][j]['properties']['nation']})

                  if (i == t_edges.length - 1 && j == t_edges[i].length - 1) {
                    for (let i = 0; i < t_edges.length; i++) {
                      for (let j = 0; j < t_edges[i].length; j++) {
                        if (t_edges[i][j]['properties']['sourceIp'] === '10.0.0.95') {
                          nodes.push({'id': t_edges[i][j]['properties']['sourceIp'], 'name': 'camera'})
                        } else {
                          nodes.push({'id': t_edges[i][j]['properties']['sourceIp']})
                        }
                        edges.push({'id': ids, 'from': '10.0.0.95', 'to': t_edges[i][j]['properties']['nation']})
                        ids += 1
                        edges.push({'id': ids, 'from': t_edges[i][j]['properties']['nation'], 'to': t_edges[i][j]['properties']['destIp']})
                        ids += 1
                      }
                    }
                    nation = nation.reduce(function (a, b) { if (a.indexOf(b) < 0)a.push(b); return a }, [])
                    for (let i = 0; i < nation.length; i++) {
                      nodes.push({'id': nation[i], 'name': 'nation'})
                    }

                    nodes = Object.values(nodes.reduce((acc, cur) => Object.assign(acc, {[cur.id]: cur}), {}))

                    function nodeStyle (node) {
                      node.label = node.data.id
                      // 노드별 이미지 등록법
                      if (node.data.name == 'camera') {
                        node.fillColor = 'rgba(0, 0, 200, 0.2)'
                        node.image = '../../../assets/image/web-cam.png'
                      } else if (node.data.name == 'nation') {
                        node.fillColor = 'rgba(200, 0, 0, 0.2)'
                      } else {
                        node.fillColor = 'rgba(0, 200, 0, 0.2)'
                      }
                    }

                    function linkStyle (link) {
                      link.fromDecoration = 'circle'
                      link.toDecoration = 'arrow'
                      link.fillColor = '#de672c'
                    }

                    var nc = new NetChart({
                      container: document.getElementById('netchart'),
                      area: { height: 350 },
                      data: { // 경로 사용 가능 ex) xxx.csv or .json
                        preloaded: {
                          nodes: nodes,
                          links: edges
                        }
                      },
                      interaction: { selection: { lockNodesOnMove: true } },
                      style: {
                        nodeStyleFunction: nodeStyle,
                        linkStyleFunction: linkStyle
                      }
                    })
                  }
                })
            }
          }
        })
        .catch(e => { console.log(e) })
    }).catch((err) => {
      console.log(err)
    })
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
  .top {
    height: 260px;
    display: flex;
  }

  .gage_chart {
    width: 37%;
    // background-color: dodgerblue;
    text-align: center;
    vertical-align: center;
  }

  .summary {
    width: 63%;
  }

  .summary_grade {
    font-family: AppleSDGothicNeo;
    font-size: 38px;
    font-weight: bold;
    line-height: 1.42;
    color: #757575;
    margin-left: 30px;
    margin-top: 24px;
  }

  .summary_info {
    font-family: AppleSDGothicNeo;
    font-size: 19px;
    line-height: 1.42;
    color: #aeaeae;
    margin-left: 30px;
    margin-top: 10px;
  }

  .mid {
    height: 380px;
    display: flex;
    box-shadow: 1px 1px 1px #aaaaaa;
  }

  .network_chart {
    width: 70%;
    background-color: dodgerblue;
  }

  .detect_result {
    width: 30%;
    text-align: center;
    display: block;
  }

  .detect_result_top {
    font-size: 26px;
    font-weight: bold;
    color: #757575;
    margin-top: 22px;
  }

  .mid img {
    width: 150px;
    margin-top: 20px;
  }

  .detect_result_mid {
    font-weight: bold;
    font-size: 20px;
    color: #757575;
    line-height: 1.6;
    margin-top: 16px;
  }

  .mid button {
    width: 180px;
    margin-top: 24px;
    font-size: 26px;
    padding: 12px 20px;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 32px;
    box-sizing: border-box;
    background-color: #3399ff;
    color: white;
  }

  .bottom {
    min-height: 600px;
    box-shadow: 1px 1px 1px #aaaaaa;
  }

  .bottom .bottom_head {
    display: flex;
  }

  .bottom .bottom_head .bottom_head_item {
    margin-top: 20px;
    margin-left: 25px;
    padding: 20px;
    font-size: 20px;
    color: #bdbdbd;
  }

  .bottom .count {
    font-size: 40px;
    color: #757575;
  }

  .bottom .bottom_body {
    margin-left: 25px;
    padding: 20px;
    display: flex;
    flex-direction: column;
  }

  .bottom .bottom_label {
    font-size: 22px;
    color: #757575;
    border-bottom: lightgray 1px solid;
    padding-bottom: 20px;
  }

  .bottom .bottom_item {
    display: flex;
    margin-top: 10px;
    border-bottom: lightgray 1px solid;
    padding-bottom: 20px;
  }

  .bottom .bottom_info {
    width: 70%;
  }

  .bottom .bottom_exception {
    width: 20%;
    font-size: 24px;
    margin-top: 24px;
  }

  .bottom .bottom_button {
    width: 10%;
    font-size: 24px;
    margin-top: 24px;
    color: #3399ff;
  }

  .bottom_item_date {
    color: #cecece;
    font-size: 20px;
  }

  .bottom_item_ip {
    color: #757575;
    font-size: 24px;
    margin-top: 8px;
  }

  .top_mid_margin {
    height: 50px;
    background-color: #f4f6f8;
    padding-top: 30px;
  }

  .mid_bottom_margin {
    height: 50px;
    background-color: #f4f6f8;
    padding-top: 30px;
  }

  .margin_text {
    color: #757575;
    font-weight: bold;
    font-size: 20px;
    font-family: AppleSDGothicNeo;
    margin-left: 20px;
  }

  .rank_img {
    overflow: hidden;
    width: 100%;
  }

  #netchart {
    width: 100%;
  }

  .gage_chart img {
    margin-top:30px
  }

</style>
