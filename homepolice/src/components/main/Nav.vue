<template>
  <div>
    <div class="main_logo">
      <router-link to="/main">
        <img src="../../assets/logo-nav_2018-11-05/logo-nav.png"
             srcset="../../assets/logo-nav_2018-11-05/logo-nav@2x.png 2x,
             ../../assets/logo-nav_2018-11-05/logo-nav@3x.png 3x"
             class="Logo_Nav" @click="clickA" v-bind:class="{active:button1}">
      </router-link>
    </div>
    <div class="detail">
      <router-link to="/detail">
        <img src="../../assets/ic-nav-detail-24-px_2018-11-05/ic-nav-detail-24-px.png"
             srcset="../../assets/ic-nav-detail-24-px_2018-11-05/ic-nav-detail-24-px@2x.png 2x,
               ../../assets/ic-nav-detail-24-px_2018-11-05/ic-nav-detail-24-px@3x.png 3x"
             class="ic_Nav_Detail_24px" @click="clickB" v-bind:class="{active:button2}">
      </router-link>
    </div>
    <div class="board">
      <router-link to="/board">
        <img src="../../assets/ic-nav-manual-24-px_2018-11-05/ic-nav-manual-24-px.png"
             srcset="../../assets/ic-nav-manual-24-px_2018-11-05/ic-nav-manual-24-px@2x.png 2x,
               ../../assets/ic-nav-manual-24-px_2018-11-05/ic-nav-manual-24-px@3x.png 3x"
             class="ic_Nav_Manual_24px" @click="clickC" v-bind:class="{active:button3}">
      </router-link>
    </div>
  </div>
</template>

<script>
// 컴포넌트
// 하단부
export default {
  name: 'nav',
  data () {
    return {
      button1: true,
      button2: false,
      button3: false
    }
  },
  methods: {
    clickA: function () {
      this.button1 = true
      this.button2 = false
      this.button3 = false
    },
    clickB: function () {
      this.button1 = false
      this.button2 = true
      this.button3 = false
    },
    clickC: function () {
      this.button1 = false
      this.button2 = false
      this.button3 = true
    }
  }
}
</script>

<style scoped>
  .Logo_Nav {
    width: 40px;
  }

  .ic_Nav_Detail_24px, .ic_Nav_Manual_24px {
    width: 50px;
  }

  .main_logo {
    margin-top: 39px;
  }

  .detail {
    margin-top: 39px;
  }

  .board {
    margin-top: 39px;
  }

  .active {
    padding: 10px;
    border-bottom: #3399ff 3px solid;
    transition: 0.5s;
  }
</style>
