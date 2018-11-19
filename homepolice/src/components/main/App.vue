<template>
  <div class="main">
    <div class="header">
      <Header></Header>
    </div>
    <div class="body">
      <div class="nav">
        <Nav></Nav>
      </div>
      <div class="article">
        <router-view name="Article"/>
      </div>
    </div>
  </div>
</template>

<script>
// 컴포넌트
// 메인페이지의 상위 parent

import Nav from '../../components/main/Nav'
import Header from '../../components/main/Header'

export default {
  name: 'app',
  components: {
    Nav: Nav,
    Header: Header
  }
}
</script>

<style scoped>
  .main {
    display: flex;
    min-height: 90vh;
    width: 100%;
    flex-direction: column;
  }

  .header {
    width: 100%;
    border-bottom: lightgray 1px solid;
  }

  .nav {
    width: 100px;
    height: auto;
    background-color: #ffffff;
    border-right: lightgray 1px solid;
    text-align: center;
  }

  .body {
    width: 100%;
    min-height: 82vh;
    display: flex;
    background-color: #ffffff;
  }

  .article {
    width: 100%;
  }

</style>
