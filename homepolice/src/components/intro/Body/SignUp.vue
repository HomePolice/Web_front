<template>
  <div class="main">
    <div>
      <img src="../../../assets/graphic-login-i-pad_2018-11-03/graphic-login-i-pad.png"
           srcset="../../../assets/graphic-login-i-pad_2018-11-03/graphic-login-i-pad@2x.png 2x,
             ../../../assets/graphic-login-i-pad_2018-11-03/graphic-login-i-pad@3x.png 3x"
           class="Graphic_Login_iPad">

      <div  class="top">
        <img src="../../../assets/logo-sign-in_2018-11-03/logo-sign-in.png"
             srcset="../../../assets/logo-sign-in_2018-11-03/logo-sign-in@2x.png 2x,
               ../../../assets/logo-sign-in_2018-11-03/logo-sign-in@3x.png 3x"
             class="Logo_SignIn">

        <div class="Login_Text">
          회원가입
        </div>
      </div>
    </div>

    <form class="form">
      <div>
        <input type="text" id="id" name="id" placeholder="아이디">
      </div>
      <div>
        <input type="text" id="pw" name="pw" placeholder="비밀번호">
      </div>
      <div>
        <input type="text" id="check_pw" name="check_pw" placeholder="비밀번호 확인">
      </div>
      <div>
        <input type="text" id="device_id" name="device_id" placeholder="디바이스 번호">
      </div>
      <div>
        <button value="로그인" v-on:click="validate"> 가입하기 </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'sign-up',
  methods: {
    // 회원가입 처리
    validate: function (event){
      let id = document.getElementById("id").value
      let pw = document.getElementById("pw").value
      axios.post("http://13.209.93.63:3000/users/", {account: id, password: pw})
      .then(response => {
        if(response.data["success"]){
          console.log(response.data)
          this.$router.push('/signin')
        }
        else{
          alert('죄송합니다! 오류가 발생했습니다')
          this.$router.push('/signup')
        }
      })
    }
  }
}
</script>

<style scoped>
  .Graphic_Login_iPad {
    width: 100vw;
    object-fit: contain;
    position: absolute;
  }

  .Logo_SignIn {
    width: 200px;
    object-fit: contain;
    position: relative;
    margin-top: 82px;
  }

  .Login_Text {
    font-family: AppleSDGothicNeo;
    font-size: 20px;
    font-weight: 600;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #ffffff;
    position: relative;
    margin-top: 34px;
  }

  .top {
    text-align: center;
  }

  .form {
    margin-top: 120px;
    text-align: center;
  }

  input[type=text] {
    width: 40%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 32px;
    box-sizing: border-box;
  }

  button[value="로그인"] {
    width: 40%;
    padding: 12px 20px;
    margin: 20px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 32px;
    box-sizing: border-box;
    background-color: #3399ff;
    color: white;
  }

  .main {
    height: 90vh;
  }
</style>
