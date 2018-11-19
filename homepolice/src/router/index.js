import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '../components/intro/Body/SignIn'
import SignUp from '../components/intro/Body/SignUp'
import App from '../components/main/App'
import Main from '../components/main/article/Main'
import Detail from '../components/main/article/Detail'
import Board from '../components/main/article/Board'
import Pre from '../components/main/article/Sec/Pre'
import Post from '../components/main/article/Sec/Post'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/signin',
      name: SignIn,
      components: {
        Body1: SignIn
      }
    },
    {
      path: '/signup',
      name: SignUp,
      components: {
        Body1: SignUp
      }
    },
    {
      path: '/',
      name: App,
      components: {
        Body1: App
      },
      children: [
        {
          path: '/main',
          components: {
            Article: Main
          }
        },
        {
          path: '/detail',
          components: {
            Article: Detail
          }
        },
        {
          path: '/board',
          redirect: '/board/pre',
          components: {
            Article: Board
          },
          children: [
            {
              path: 'pre',
              components: {
                Sec: Pre
              }
            },
            {
              path: 'post',
              components: {
                Sec: Post
              }
            }
          ]
        }
      ]
    }
  ]
})
