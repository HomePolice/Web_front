<template>
  <div>
    <div class="top">
      <div class="gage_chart">

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
          미국 뉴옥시
          <br>
          192.168.10.2
        </div>
        <button>차단하기</button>
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
            12
            new
          </div>
        </div>

        <div class="bottom_head_item">
          차단 IP
          <div class="count">
            2
            old
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
              <div>예외등록</div>
            </div>
            <div class="bottom_button">차단</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
let datas = []

export default {
  name: 'main',
  data(){
    return {
      lists: datas
    }
  },
  created: function() {

  },
  mounted() {
    axios.post("http://127.0.0.1:3000/data/lists", {account: 'test'})
    .then(response => {
      this.lists   = response.data
    })
    .catch(e => {console.log(e)})

    let nodes = []
    let edges = []

    axios.post("http://127.0.0.1:3000/data/get2HopNet", {account: 'test'})
    .then(response => {
      let ids = 1;
      let t_edges = response.data.edge
      for(let i = 0; i < t_edges.length; i++){
        for(let j = 0; j < t_edges[i].length; j++){
          if(t_edges[i][j]["properties"]["sourceIp"] === "10.0.0.95"){
            nodes.push({"id": t_edges[i][j]["properties"]["sourceIp"], "name": "camera"})
          }
          else{
            nodes.push({"id": t_edges[i][j]["properties"]["sourceIp"]})
          }
          edges.push({"id": ids, "from": t_edges[i][j]["properties"]["sourceIp"], "to": t_edges[i][j]["properties"]["destIp"]})
          ids += 1
        }
      }
      nodes = Object.values(nodes.reduce((acc,cur)=>Object.assign(acc,{[cur.id]:cur}),{}))
        
      function nodeStyle(node) {
            node.label = node.data.id;
            // 노드별 이미지 등록법
            if(node.data.name == "camera"){
                node.fillColor = "rgba(0, 0, 200, 0.2)";
                node.image = "../charts/data/image/web-cam.png";
            }
            else{
                node.fillColor = "rgba(0, 200, 0, 0.2)";
            }
          }

          function linkStyle(link) {
            link.fromDecoration = "circle";
            link.toDecoration = "arrow";
            link.fillColor = "#de672c";
          }


          var nc = new NetChart({
            container: document.getElementById("netchart"),
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
        });
    })
    .catch(e => {console.log(e)})
    
    
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
    background-color: dodgerblue;
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

  #netchart {
    width: 100%;
  }

</style>
