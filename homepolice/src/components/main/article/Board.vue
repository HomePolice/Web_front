<template>
  <div class="container">
    <div class="top">
      <img src="../../../../src/assets/ic-manual-24-px_2018-11-11/ic-manual-24-px.png"
           srcset="../../../../src/assets/ic-manual-24-px_2018-11-11/ic-manual-24-px@2x.png 2x,
             ../../../../src/assets/ic-manual-24-px_2018-11-11/ic-manual-24-px@3x.png 3x"
           class="ic_Manual_24px">
      <div class="manual">
        게시판
      </div>
    </div>
    <div class="button">
      <router-link to="/board/pre">
      <button @click="clickA" v-bind:class="{active:button1}">보안정보</button>
      </router-link>
      <router-link to="/board/post">
        <button @click="clickB" v-bind:class="{active:button2}">대처방법</button>
      </router-link>
    </div>
    <div>

    </div>
    <div>

    </div>
    <transition name="sec" mode="out-in">
      <router-view name="Sec" class="sec"/>
    </transition>
  </div>
</template>

<script>
// 게시판 페이지 컴포넌트
export default {
  name: 'board',
  data () {
    return {
      button1: true,
      button2: false
    }
  },
  methods: {
    clickA: function () {
      this.button1 = true
      this.button2 = false
    },
    clickB: function () {
      this.button1 = false
      this.button2 = true
    }
  }

}
</script>

<style scoped>
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

   .active {
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

  button {
    width: 180px;
    margin-top: 24px;
    font-size: 26px;
    padding: 12px 20px;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 32px;
    box-sizing: border-box;
    background-color: white;
    color: #c9c9c9;
  }

  .manual {
    font-family: AppleSDGothicNeo;
    color: #757575;
  }

  .sec-enter-active {
    transition: all 0.5s ease;
  }

  .sec-enter {
    opacity: 0;
    /*transform: translateY(-30vh);*/
  }

  .sec-leave-active {
    transition: all 0.5s ease;
  }

  .sec-leave-to {
    opacity: 0;
  }
</style>
