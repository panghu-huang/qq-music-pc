<template>
  <div class="app-header">
    <header ref="header" @click="_stopPropagation">
      <ul class="clear-fix">
        <li class="blank-li">
          <router-link to="/"><img src="../../assets/logo.png"></router-link>
        </li>
        <router-link to="/" tag="li">
          <a>音乐馆</a>
        </router-link>
        <router-link to="/user-center" tag="li">
          <a href="javascript:">我的音乐</a>
        </router-link>
        <li><a href="#">客户端</a></li>
        <li><a href="#">音乐号</a></li>
        <li><a href="#">VIP</a></li>
      </ul>
      <!--搜索框-->
      <div class="search">
        <input type="text"
               :placeholder="specialKey"
               class="keyword"
               @focus="onFocus"
               @keyup.enter="doSearch"
               v-model="keyword">
        <span class="icon-search"
              @click="doSearch"></span>
      </div>
      <!--已登录用户-->
      <img v-if="userInfo"
           class="user-avatar"
           @click="toUserCenter"
           @mouseover="_showUserInfo"
           @mouseout="_hideUserInfo"
           :src="'http://localhost:3000/users/getAvatar?username='+userInfo.username">
      <a href="javascript:" v-else @click="login" class="login">登录</a>
      <a href="#" class="button1">开通绿砖豪华版</a>
      <a href="#" class="button2">开通付费包</a>
      <div class="result-layer" :style="resultLayerStyle" v-show="showResultLayer">
        <div v-show="showHotKey">
          <div class="hot-key" v-for="(item,index) in hotKeys">
          <span>
            <i>{{index+1}}</i>
            {{item.k}}
          </span>
            <span v-text="getListenNum(item.n)"></span>
          </div>
        </div>
        <div class="search-result" v-show="!showHotKey">
          <!--单曲搜索结果-->
          <div class="song-result" v-if="searchResult.song">
            <div class="result-title">
              <i class="icon-song"></i>
              <span>单曲</span>
            </div>
            <div class="song-list result-list">
              <span v-for="item in searchResult.song.itemlist">
                {{item.name}} - {{item.singer}}
              </span>
            </div>
          </div>
          <!--歌手搜索结果-->
          <div class="singer-result" v-if="searchResult.singer">
            <div class="result-title">
              <i class="icon-singer"></i>
              <span>歌手</span>
            </div>
            <div class="singer-list result-list">
              <span v-for="item in searchResult.singer.itemlist">
                {{item.name}}
              </span>
            </div>
          </div>
          <!--专辑搜索结果-->
          <div class="album-result" v-if="searchResult.album">
            <div class="result-title">
              <i class="icon-album"></i>
              <span>专辑</span>
            </div>
            <div class="album-list result-list">
              <span v-for="item in searchResult.album.itemlist">
                {{item.name}}
              </span>
            </div>
          </div>
          <!--MV搜索结果-->
          <div class="mv-result" v-if="searchResult.mv">
            <div class="result-title">
              <i class="icon-mv"></i>
              <span>MV</span>
            </div>
            <div class="mv-list result-list">
              <span v-for="item in searchResult.album.itemlist">
                {{item.name}}
              </span>
            </div>
          </div>
        </div>
      </div>
      <!--已经登录的用户信息-->
      <div class="user-info"
           v-if="userInfo"
           v-show="showUserInfo"
           @mouseover="_showUserInfo"
           @mouseout="_hideUserInfo"
           @click="toUserCenter"
           :style="userInfoStyle">
        <div class="top">
          <img :src="'http://localhost:3000/users/getAvatar?username='+userInfo.username"
               class="user-avatar">
          <span>{{userInfo.nickname}}</span>
        </div>
        <div class="bottom">
          <div class="bottom-item">
            <span>{{userInfo.songList.length}}</span>
            <span>歌单</span>
          </div>
          <div class="bottom-item">
            <span>{{userInfo.follow.length}}</span>
            <span>关注</span>
          </div>
          <div class="bottom-item">
            <span>{{userInfo.fans.length}}</span>
            <span>粉丝</span>
          </div>
        </div>
      </div>
    </header>
    <nav ref="nav">
      <ul class="clear-fix">
        <li>
          <router-link to="/">首页</router-link>
        </li>
        <li>
          <router-link to="/singer-list">歌手</router-link>
        </li>
        <li>
          <router-link to="/album-list">专辑</router-link>
        </li>
        <li>
          <router-link to="/rank">排行榜</router-link>
        </li>
        <li>
          <router-link to="/play-list">分类歌单</router-link>
        </li>
        <li>
          <router-link to="/radio">电台</router-link>
        </li>
        <li>
          <router-link to="/mv">MV</router-link>
        </li>
        <li>
          <router-link to="/album-mall">数字专辑</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
<style>
  a {
    text-decoration: none;
    color: #333333;
  }

  a:hover {
    color: #31C27C;
  }

  .app-header .home {
    background-color: #ffffff;
  }

  header {
    position: relative;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  header ul {
    width: auto;
    display: inline-block;
    height: 100%;
  }

  header ul li,
  .login {
    display: inline-block;
    height: 100%;
    line-height: 90px;
    font-size: 18px;
    color: #333;
    float: left;
    padding: 0 20px;
    list-style: none;
  }

  .blank-li {
    display: flex;
    align-items: center;
  }

  .blank-li a {
    line-height: 90px;
    display: flex;
    align-items: center;
  }

  .login {
    padding: 0 20px;
    font-size: 16px;
  }

  header ul li:hover,
  .login:hover {
    color: #31C27C;
  }

  header li.router-link-exact-active {
    background-color: #31C27C;
    color: #ffffff;
  }

  header li.router-link-exact-active a {
    color: #ffffff;
    display: inline;
  }

  header li.router-link-exact-active:hover {
    color: #ffffff;
  }

  .router-link-exact-active {
    color: #31C27C;
  }

  .search {
    display: flex;
    align-items: center;
    height: 36px;
    padding: 0 12px;
    border: 1px solid #adadad;
    border-radius: 4px;
  }

  header .icon-search {
    font-size: 18px;
    color: #919191;
    cursor: pointer;
  }

  header .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 0 16px;
    cursor: pointer;
  }

  header .user-info .user-avatar {
    width: 70px;
    height: 70px;
  }

  header .user-info {
    position: absolute;
    background-color: #ffffff;
    width: 300px;
    padding: 30px 0;
    z-index: 99;
  }

  header .user-info .top {
    display: flex;
    padding-bottom: 20px;
  }

  header .user-info .top span {
    display: inline-block;
    height: 32px;
    line-height: 32px;
  }

  header .user-info .top span:hover {
    color: #31C27C;
    cursor: pointer;
  }

  header .bottom {
    display: flex;
  }

  header .bottom .bottom-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #333;
  }

  header .bottom .bottom-item:nth-child(2) {
    border-left: 1px #dddddd solid;
    border-right: 1px #dddddd solid;
  }

  header .bottom .bottom-item span:first-child {
    font-size: 24px;
  }

  header .bottom .bottom-item span:last-child {
    font-size: 14px;
  }

  header .bottom .bottom-item span:hover {
    color: #31C27C;
    cursor: pointer;
  }

  .keyword {
    width: 180px;
    height: 100%;
    border: none;
    outline: none;
  }

  .button1,
  .button2 {
    font-size: 13px;
    padding: 0 8px;
    color: #ffffff;
    background-color: #31C27C;
    height: 36px;
    line-height: 36px;
  }

  .button1:hover {
    background-color: #2db171;
    color: #ffffff;
  }

  .button2 {
    color: #333;
    margin-left: 12px;
    border: 1px solid #c9c9c9;
    background-color: #ffffff;
  }

  .button2:hover {
    background-color: #c9c9c9;
    color: #333;
  }

  .app-header .result-layer {
    position: absolute;
    z-index: 99;
    border: 1px solid #adadad;
    border-top: none;
    background-color: #ffffff;
    font-size: 14px;
    transition: .4s;
  }

  .hot-key {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .hot-key span {
    margin: 8px;
  }

  .hot-key span:last-child {
    color: #a6a6a6;
    font-size: 12px;
  }

  .hot-key i {
    color: #f94c34;
    font-style: normal;
    margin: 2px;
  }

  .hot-key:hover {
    color: #ffffff;
    cursor: pointer;
    background-color: #31C27C;
  }

  .hot-key:hover i,
  .hot-key:hover span:last-child {
    color: #ffffff;
  }

  .app-header nav {
    width: 84%;
    margin-left: 8%;
    display: flex;
    justify-content: center;
    border-top: 1px solid #e4e4e4;
  }

  .app-header nav ul li {
    list-style: none;
    float: left;
    height: 32px;
    line-height: 32px;
    font-size: 15px;
    margin: 10px 24px;
    color: #333;
  }

  .app-header nav ul li:hover {
    color: #31C27C;
  }

  .search-result .result-title {
    display: flex;
    align-items: center;
    height: 40px;
  }

  .search-result .icon-song {
    font-size: 20px;
    color: #7f7f7f;
    margin: 4px;
  }

  .search-result .icon-singer,
  .search-result .icon-album {
    font-size: 18px;
    color: #7f7f7f;
    margin: 4px;
  }

  .search-result .icon-mv {
    font-size: 17px;
    color: #7f7f7f;
    margin: 5px;
  }

  .search-result .result-title span {
    color: #7f7f7f;
    font-size: 14px;
    margin: 8px;
  }

  .search-result .result-list span {
    font-size: 14px;
    display: inline-block;
    width: calc(100% - 34px - 8px);
    padding-left: 34px;
    padding-right: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 32px;
    line-height: 32px;
  }

  .search-result .result-list span:hover {
    color: #ffffff;
    background-color: #31C27C;
    cursor: pointer;
  }
</style>
<script type="text/ecmascript-6">
  import {getHotKey} from '../../api/home'
  import {debounce} from '../../common/js/util'
  import {search} from '../../api/search'
  import mutationTypes from '../../store/mutation-types'
  import {mapGetters} from 'vuex'

  export default{
    data() {
      return {
        specialKey: '',
        keyword: '',
        hotKeys: [],
        showResultLayer: false,
        resultLayerStyle: '',
        searchResult: {},
        showHotKey: true,
        showUserInfo: false,
        userInfoStyle: ''
      }
    },
    computed: {
      ...mapGetters(['userInfo'])
    },
    mounted() {
      document.body.addEventListener('click', this.closeResultLayer);
      getHotKey()
        .then(result => {
          if (result.code === 0) {
            console.log(result);
            this.hotKeys = result.data.hotkey.splice(0, 5);
            this.specialKey = result.data.special_key;
          }
        })
        .catch(error => {
          console.log('getHotKey error =>', error);
        });
      let _this = this;
      this.$watch('keyword', debounce(function (value) {
        if (!value) {
          _this.searchResult = {};
          _this.showHotKey = true;
          return;
        }
        search(value)
          .then(result => {
            if (result.code === 0) {
              _this.showHotKey = false;
              console.log(result);
              _this.searchResult = result.data;
            }
          })
          .catch(error => {
            console.log('search error-->', error)
          })
      }, 500))
    },
    methods: {
      _getHeight() {
        return this.$refs.header.clientHeight + this.$refs.nav.clientHeight;
      },
      onFocus(ev) {
        this.showResultLayer = true;
        let bound = ev.target.parentNode.getBoundingClientRect();
        this.resultLayerStyle = `width: ${bound.width - 6}px;left: ${bound.left + 2}px; top: ${bound.top + bound.height}px;`;
      },
      getListenNum(number) {
        let val = number;
        if (number >= 10000) {
          val = (number / 10000).toString();
          let vals = val.split('.');
          if (vals.length !== 1) {
            val = vals[0] + '.' + vals[1].substr(0, 1) + '万';
          }
        }
        return val;
      },
      closeResultLayer() {
        this.showResultLayer = false;
      },
      _stopPropagation(ev) {
        ev.stopPropagation();
      },
      doSearch() {
        this.showResultLayer = false;
        this.$store.commit(mutationTypes.SET_KEYWORD, this.keyword || this.specialKey);
        this.$router.push({
          path: '/search'
        })
      },
      login() {
        this.$router.push({
          path: '/login'
        })
      },
      _showUserInfo(ev) {
        this.showUserInfo = true;
        if (!this.userInfoStyle) {
          let rect = ev.target.getBoundingClientRect();
          this.userInfoStyle = `top: ${rect.bottom}px; left: ${rect.left}px;`;
        }
      },
      _hideUserInfo() {
        this.showUserInfo = false;
      },
      toUserCenter(ev) {
        let nodeName = ev.target.nodeName;
        if (nodeName === 'IMG' ||
          nodeName === 'SPAN') {
          this.$router.push({
            path: '/user-center'
          })
        }
      }
    },
    beforeDestroy() {
      document.body.addEventListener('click', this.closeResultLayer, false);
    }
  }
</script>
