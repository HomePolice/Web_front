<template>
  <div id="app">
      <router-view name="Body1"/>
    <div class="footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
// 최상위 컴포넌트 템플릿
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Footer: Footer
  }
}
</script>

<style>
  .footer{
    height: 9vh;
    border-top: lightgray 1px solid;
  }
</style>
