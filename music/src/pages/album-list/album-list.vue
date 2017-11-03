<template>
  <div class="album-list-wrapper">
    <div class="album-list">
      <div class="album-tag" v-if="tag!=={}">
        <!--语种列表-->
        <ul class="clear-fix">
          <li>语种</li>
          <li v-for="(item,index) in tag.language"
              :class="{'current-tag':index===languageIndex}"
              @click="onLanguageSelect(index)"
              v-text="item.name"></li>
        </ul>
        <!--流派列表-->
        <ul class="clear-fix">
          <li>流派</li>
          <li v-for="(item,index) in tag.genre"
              :class="{'current-tag':index===genreIndex}"
              @click="onGenreSelect(index)"
              v-text="item.name"></li>
        </ul>
        <!--价格列表-->
        <ul class="clear-fix">
          <li>价格</li>
          <li v-for="(item,index) in tag.pay"
              :class="{'current-tag':index===payIndex}"
              @click="onPaySelect(index)"
              v-text="item.name"></li>
        </ul>
        <!--最后一行列表一级菜单-->
        <ul class="clear-fix">
          <li>筛选</li>
          <li v-text="type"
              @click="showMenu"
              :class="{'current-tag':typeIndex!==-101}"></li>
          <li v-text="year"
              @click="showMenu"
              :class="{'current-tag':yearIndex!==-101}"></li>
          <li v-text="company"
              @click="showMenu"
              :class="{'current-tag':companyIndex!==-101}"></li>
        </ul>
        <!--隐藏的菜单-->
        <div class="second-menu" ref="menu">
          <ul class="clear-fix">
            <li v-for="(item,index) in menuItems"
                :class="{'current-tag':index===payIndex}"
                @click="onItemSelect(index)"
                v-text="item.name"></li>
          </ul>
        </div>
      </div>
      <div class="selected-tags-wrapper">
        <!--最后一行选择的筛选项-->
        <div class="selected-tags">
          <span>XX唱片</span>
          <span>2017</span>
        </div>
        <!--最新还是最热排序-->
        <div class="new-or-hot">
          <span class="new-tag current-tag" @click="changeSort(1)">最新</span>
          <span class="hot-tag" @click="changeSort(2)">最热</span>
        </div>
      </div>
      <!--专辑列表显示-->
      <div class="albums-wrapper clear-fix">
        <div class="album" v-for="item in albumList" @click="onAlbumClick(item.album_mid)">
          <div class="image-wrapper">
            <img v-lazy="'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+item.album_mid+'.jpg?max_age=2592000'">
          </div>
          <span class="album-name" v-text="item.album_name"></span>
          <span class="singer-name" v-text="item.singer_name"></span>
          <span class="album-time" v-text="item.public_time"></span>
        </div>
      </div>
      <!--分页组件-->
      <pagination
        @onPageChange="onPageChange"
        :totalPage="totalPage"
        :currentPage="page"></pagination>
    </div>
  </div>
</template>
<style scoped>
  .album-list-wrapper {
    width: 100%;
    background-color: #f0f0f0;
    padding-bottom: 20px;
  }

  .album-list {
    width: 86%;
    margin-left: 7%;
  }

  .album-tag {
    padding: 20px 0;
    margin-bottom: 20px;
  }

  .album-tag ul {
    margin: 12px 0;
  }

  .album-tag ul li {
    float: left;
    font-size: 14px;
    color: #333;
    user-select: none;
    padding: 2px 6px;
    margin: 4px 6px;
  }

  .album-tag ul li:hover {
    color: #31C27C;
    cursor: pointer;
  }

  .second-menu {
    padding: 20px;
    position: absolute;
    width: calc(86% - 80px);
    left: 7%;
    margin-left: 20px;
    background-color: #fff;
    display: none;
    z-index: 3;
    box-shadow: 2px 2px 10px #777777;
  }

  .selected-tags-wrapper {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
  }

  .selected-tags-wrapper span {
    padding: 8px 12px;
    color: #333;
    background-color: #ffffff;
    border: #cbcbcb 1px solid;
    font-size: 16px;
  }

  .selected-tags-wrapper span:hover {
    color: #31C27C;
    cursor: pointer;
  }

  .current-tag {
    color: #ffffff !important;
    background: #31C27C !important;
  }

  .album {
    width: calc((100% - 4 * 32px) / 5);
    display: flex;
    flex-direction: column;
    margin: 16px;
    float: left;
  }

  .album:hover {
    cursor: pointer;
  }

  .album:nth-child(5n+1) {
    margin-left: 0;
  }

  .album:nth-child(5n+5) {
    margin-right: 0;
  }

  .image-wrapper {
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    overflow: hidden;
    margin-bottom: 8px;
  }

  .image-wrapper img {
    width: 100%;
    transition: .4s;
  }

  .image-wrapper:hover img {
    transform: scale(1.1);
    cursor: pointer;
  }

  .album span {
    display: inline-block;
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    margin: 2px 0;
  }

  .album-name {
    color: #333333;
  }

  .singer-name,
  .album-time {
    color: #9c9c9c;
  }

  .albums-wrapper {
    margin-bottom: 20px;
  }
</style>
<script type="text/ecmascript-6">
  import {getAlbumList} from '../../api/album'
  import Pagination from '../../components/pagination/pagination.vue'
  import mutationTypes from '../../store/mutation-types'
  const EMPTY_NUMBER = -101;
  const SELECT_NUMBER = -102;
  const DEFAULT_YEAR = '年代';
  const DEFAULT_TYPE = '类别';
  const DEFAULT_COMPANY = '唱片公司';

  export default{
    data() {
      return {
        tag: {},
        languageIndex: 0,
        genreIndex: 0,
        payIndex: 0,
        typeIndex: EMPTY_NUMBER,
        yearIndex: EMPTY_NUMBER,
        companyIndex: EMPTY_NUMBER,
        filterIndex: 0,
        type: '类别',
        year: '年代',
        company: '唱片公司',
        menuItems: [],
        albumList: [],
        page: 1,
        totalPage: 0
      }
    },
    mounted() {
      // 默认按最新排序
      this.sort = 1;
      document.body.addEventListener('click', this._closeMenu);
      getAlbumList()
        .then(result => {
          console.log(result.data);
          this.tag = result.data.tag;
          this.albumList = result.data.albumlist;
          this.totalPage = Math.ceil(result.data.sum / result.data.pagesize);
        })
        .catch(error => {
          console.log('getAlbumList error-->', error);
        })
    },
    methods: {
      /**
       * 当语种选择时
       * @param index 语种下标
       */
      onLanguageSelect(index) {
        this.languageIndex = index;
        this.page = 1;
        this._getAlbumList();
      },
      /**
       * 当流派选择时
       * @param index 流派下标
       */
      onGenreSelect(index) {
        this.genreIndex = index;
        this.page = 1;
        this._getAlbumList();
      },
      /**
       * 当价格选择时
       * @param index 价格下标
       */
      onPaySelect(index) {
        this.payIndex = index;
        this.page = 1;
        this._getAlbumList();
      },
      /**
       * 隐藏的菜单点击事件
       * @param index 隐藏菜单下标
       */
      onItemSelect(index) {
        let tag = this.tag;
        let filterIndex = this.filterIndex;
        if (filterIndex === 0) {
          if (index === 0) {
            this.typeIndex = EMPTY_NUMBER;
            if (this.type !== DEFAULT_TYPE)
              this.type = DEFAULT_TYPE;
          } else {
            this.typeIndex = index;
            this.type = tag.type[index].name;
          }
        } else if (filterIndex === 1) {
          if (index === 0) {
            this.yearIndex = EMPTY_NUMBER;
            if (this.year !== DEFAULT_YEAR)
              this.year = DEFAULT_YEAR;
          } else {
            this.yearIndex = index;
            this.year = tag.year[index].name;
          }
        } else {
          if (index === 0) {
            this.companyIndex = EMPTY_NUMBER;
            if (this.company !== DEFAULT_COMPANY)
              this.company = DEFAULT_COMPANY;
          } else {
            this.companyIndex = index;
            this.company = tag.company[index].name;
          }
        }
        this.page = 1;
        this._getAlbumList();
      },
      /**
       * 最后一行点击事件显示隐藏菜单
       * @param e 点击事件event
       */
      showMenu(e) {
        e.stopPropagation();
        if (e.target.textContent === this.year) {
          this.menuItems = this.tag.year;
          this.yearIndex = SELECT_NUMBER;
          this.filterIndex = 1;
        }
        else if (e.target.textContent === this.type) {
          this.menuItems = this.tag.type;
          this.typeIndex = SELECT_NUMBER;
          this.filterIndex = 0;
        }
        else {
          this.menuItems = this.tag.company;
          this.companyIndex = SELECT_NUMBER;
          this.filterIndex = 2;
        }
        let top = e.target.getBoundingClientRect().top + document.body.scrollTop + 30;
        let menu = this.$refs.menu;
        menu.style.display = 'block';
        menu.style.top = `${top}px`;
      },
      _closeMenu() {
        this.$refs.menu.style.display = 'none';
        let filterIndex = this.filterIndex;
        if (filterIndex === 0) {
          this.typeIndex = EMPTY_NUMBER;
        } else if (filterIndex === 1) {
          this.yearIndex = EMPTY_NUMBER;
        } else {
          this.companyIndex = EMPTY_NUMBER;
        }
      },
      _getAlbumList() {
        let tag = this.tag;
        let typeIndex = this.typeIndex === EMPTY_NUMBER ? 0 : this.typeIndex;
        let companyIndex = this.companyIndex === EMPTY_NUMBER ? 0 : this.companyIndex;
        let yearIndex = this.yearIndex === EMPTY_NUMBER ? 0 : this.yearIndex;
        getAlbumList('get_album_info', this.page - 1, this.sort, tag.language[this.languageIndex].id, tag.genre[this.genreIndex].id, tag.year[yearIndex].id, tag.pay[this.payIndex].id, tag.type[typeIndex].id, tag.company[companyIndex].id)
          .then(result => {
            console.log(result.data);
            this.albumList = result.data.albumlist;
            this.totalPage = Math.floor(result.data.sum / result.data.pagesize);
          })
          .catch(error => {
            console.log('getAlbumList error-->', error);
          });
      },
      onPageChange(page) {
        this.page = page;
        this._getAlbumList();
      },
      changeSort(sort) {
        if (sort === this.sort)
          return;
        this.sort = sort;
        this.page = 1;
        this._getAlbumList();
      },
      onAlbumClick(albumMid) {
        this.$store.commit(mutationTypes.SET_ALBUM_MID, albumMid);
        this.$router.push({
          path: '/album'
        })
      }
    },
    beforeDestroy() {
      document.body.removeEventListener('click', this._closeMenu, false);
    },
    components: {
      Pagination
    }
  }
</script>
