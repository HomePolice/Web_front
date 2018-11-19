<template>
  <div>
    <div class="container">
      <div class="title">
        당황하지 마시고, 다음의 절차를 따라주세요!
      </div>
      <div class="content">
        <div class="content-title">
          (1) 먼저 랜선을 뽑거나 와이파이를 꺼주세요.
        </div>
        <div class="content-body">
          외부 인터넷과 차단되면 임시방편으로 데이터 유출을 막을 수 있습니다!
        </div>
      </div>
      <div class="content">
        <div class="content-title">
          (2) 사이버 수사대에 해킹 신고 접수를 진행해주세요.
        </div>
        <div class="content-body">
          <a href="http://cyberbureau.police.go.kr/crime/sub1.jsp?mid=010101" style="color: #3399ff">사이버 수사대에 해킹 신고하러 가기</a>
        </div>
      </div>
      <div class="content">
        <div class="content-title">
          (3) 한국인터넷진흥원에 피해사실을 알려주세요. 대응 방법을 알려줄 거에요.
        </div>
        <div class="content-body">
          <a href="https://www.krcert.or.kr/consult/hacking.do" style="color: #3399ff;">한국인터넷진흥원에 신고하러 가기</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 사전 사후 메뉴얼 페이지 컴포넌트
export default {
  name: 'post'
}
</script>

<style scoped>
  .container {
    min-height: 300px;
    margin: 10px;
    padding: 10px;
  }

  .title {
    font-size: 30px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .content {
    padding: 10px;
  }

  .content-title {
    font-size: 20px;
  }

  .content-body {
    margin-top: 5px;
    margin-left: 32px;
    color: #757575;
  }

  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
    /*color: black;*/
  }

  a:visited {
    color: #3399ff;
  }


</style>
