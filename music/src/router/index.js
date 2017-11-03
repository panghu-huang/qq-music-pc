import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../pages/home/home.vue'
import SingerListPage from '../pages/singer-list/singer-list.vue'
import AlbumListPage from '../pages/album-list/album-list.vue'
import RankPage from '../pages/rank/rank.vue'
import PlayListPage from '../pages/play-list/play-list.vue'
import RadioPage from '../pages/radio/radio.vue'
import MvPage from '../pages/mv/mv.vue'
import AlbumMallPage from '../pages/album-mall/album-mall.vue'
import SingerPage from '../pages/singer/singer.vue'
import AlbumPage from '../pages/album/album.vue'
import SearchPage from '../pages/search/search.vue'
import LoginPage from '../pages/login/login.vue'
import RegisterPage from '../pages/register/register.vue'
import ForgetPwdPage from '../pages/forget-pwd/forget-pwd.vue'
import UserCenterPage from '../pages/user-center/user-center.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/singer-list',
      name: 'SingerListPage',
      component: SingerListPage
    },
    {
      path: '/album-list',
      name: 'AlbumListPage',
      component: AlbumListPage
    },
    {
      path: '/rank',
      name: 'RankPage',
      component: RankPage
    },
    {
      path: '/play-list',
      name: 'PlayListPage',
      component: PlayListPage
    },
    {
      path: '/radio',
      name: 'RadioPage',
      component: RadioPage
    },
    {
      path: '/mv',
      name: 'MvPage',
      component: MvPage
    },
    {
      path: '/album-mall',
      name: 'AlbumMallPage',
      component: AlbumMallPage
    },
    {
      path: '/singer',
      name: 'SingerPage',
      component: SingerPage
    },
    {
      path: '/album',
      name: 'AlbumPage',
      component: AlbumPage
    },
    {
      path: '/search',
      name: 'SearchPage',
      component: SearchPage
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'RegisterPage',
      component: RegisterPage
    },
    {
      path: '/forget-pwd',
      name: 'ForgetPwdPage',
      component: ForgetPwdPage
    },
    {
      path: '/user-center',
      name: 'UserCenterPage',
      component: UserCenterPage
    }
  ]
})
