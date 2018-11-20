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
          로그인
        </div>
      </div>
    </div>

    <div class="form">
      <div>
        <input type="text" id="account" name="account" placeholder="아이디">
      </div>
      <div>
        <input type="text" id="password" name="password" placeholder="비밀번호">
      </div>
      <div>
        <button value="로그인" v-on:click="validate">로그인</button>
      </div>
    </div>

    <div class="bottom">
      아직 홈폴리스 회원이 아니신가요?
      <router-link to="/signup" class="signup">회원가입</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import localforage from 'localforage';

export default {
  name: 'sign-in',
  methods: {
    // 로그인 처리
    validate: function (event){
      let id = document.getElementById("account").value
      let pw = document.getElementById("password").value
      axios.post("http://13.209.93.63:3000/users/validation", {account: id, password: pw})
      .then(response => {
        if(response.data["success"]){
          // HTML5 Localstorage 활용
          localforage.setItem('account', id).then((value) => {
          console.log('we saved ' + value);
          }).catch((err) => {
            console.log(err);
          });
          this.$router.push('/main')
        }
        else{
          alert('아이디와 비밀번호를 확인해주세요!')
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

  .bottom {
    text-align: center;
    font-family: AppleSDGothicNeo;
    margin-top: 450px;
  }

  .signup {
    color: #3399ff;
    text-decoration: none;
  }

  .main {
    height: 90vh;
  }
</style>
