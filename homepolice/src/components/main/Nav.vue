<template>
  <div>
    <div class="main_logo">
      <router-link to="/main">
        <img src="../../assets/logo-nav_2018-11-05/logo-nav.png"
             srcset="../../assets/logo-nav_2018-11-05/logo-nav@2x.png 2x,
             ../../assets/logo-nav_2018-11-05/logo-nav@3x.png 3x"
             class="Logo_Nav">
      </router-link>
    </div>
    <div class="detail">
      <router-link to="/detail">
        <img src="../../assets/ic-nav-detail-24-px_2018-11-05/ic-nav-detail-24-px.png"
             srcset="../../assets/ic-nav-detail-24-px_2018-11-05/ic-nav-detail-24-px@2x.png 2x,
               ../../assets/ic-nav-detail-24-px_2018-11-05/ic-nav-detail-24-px@3x.png 3x"
             class="ic_Nav_Detail_24px">
      </router-link>
    </div>
    <div class="board">
      <router-link to="/board">
        <img src="../../assets/ic-nav-manual-24-px_2018-11-05/ic-nav-manual-24-px.png"
             srcset="../../assets/ic-nav-manual-24-px_2018-11-05/ic-nav-manual-24-px@2x.png 2x,
               ../../assets/ic-nav-manual-24-px_2018-11-05/ic-nav-manual-24-px@3x.png 3x"
             class="ic_Nav_Manual_24px">
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nav'
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

  .main_logo img {
    padding: 10px;
    border-bottom: black 5px solid;
  }
</style>
