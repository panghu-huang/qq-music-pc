<template>
  <div class="play-list-wrapper">
    <div class="play-list-content">
      <!--歌曲种类选择导航-->
      <nav>
        <div class="tag-wrapper"
             v-for="(category,index) in categories"
             v-if="index!==0"
             @click="_stopPropagation">
          <span class="tag-title" v-text="category.categoryGroupName"></span>
          <ul class="tag-content clear-fix">
            <li class="tag-item" v-for="(item,subIndex) in category.items"
                v-if="isShow(category.items.length,subIndex)"
                :class="{'current-tag':item.categoryId===categoryId}">
              <span v-html="item.categoryName"
                    @click="onCategorySelect(item,subIndex,false)"></span>
            </li>
            <li class="tag-item"
                :class="{'current-tag':index==moreIndex}"
                v-if="category.items.length>9">
              <span @click="moreTag(index)" v-text="index===moreIndex?moreText:'更多'"></span>
            </li>
          </ul>
        </div>
        <div class="more-tag"
             v-show="moreTagOpen"
             @click="_stopPropagation">
          <li class="tag-item"
              v-for="(tag,index) in moreTags"
              :class="{'current-tag':tag.categoryId===categoryId}">
            <span v-html="tag.categoryName"
                  @click="onCategorySelect(tag,index,true)"></span>
          </li>
        </div>
      </nav>
      <!--已选择的标签-->
      <div class="select-tag">
        <div>
          <span class="select" v-show="selectTag">
            {{selectTag}}
               <i class="icon-close" @click="removeSelectTag"></i>
            </span>
        </div>
        <div class="sort-by">
          <span :class="{'current-tag':sortId===5}" @click="sortBy(5)">推荐</span>
          <span :class="{'current-tag':sortId===2}" @click="sortBy(2)">最新</span>
        </div>
      </div>
      <!--歌曲列表-->
      <div class="song-list clear-fix">
        <div class="song-item" v-for="song in songList">
          <div class="image-wrapper">
            <img v-lazy="song.imgurl">
          </div>
          <div class="song-info">
            <span class="song-title" v-text="song.dissname"></span>
            <span v-text="song.creator.name"></span>
            <span v-text="getListenNum(song.listennum)"></span>
          </div>
        </div>
      </div>
      <!--分页组件-->
      <pagination :totalPage="totalPage"
                  :currentPage="page"
                  @onPageChange="onPageChange"></pagination>
    </div>
  </div>
</template>
<style>
  .play-list-wrapper {
    width: 100%;
    background-color: #f5f5f5;
    padding-top: 40px;
  }

  .play-list-wrapper .play-list-content {
    width: 86%;
    margin-left: 7%;
    padding: 30px 0;
  }

  .play-list-wrapper .play-list-content nav {
    position: relative;
    width: 100%;
    display: flex;
    font-size: 15px;
  }

  .play-list-wrapper .play-list-content nav .tag-wrapper {
    width: 20%;
  }

  .play-list-wrapper .play-list-content nav .tag-wrapper:not(:last-child) {
    border-right: 1px solid #eaeaea;
  }

  .play-list-wrapper .select-tag {
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: 64px;
    align-items: center;
  }

  .play-list-wrapper .icon-close {
    font-size: 18px;
    margin-left: 8px;
  }

  .play-list-wrapper .icon-close:hover {
    background-color: rgba(52, 240, 163, 0.5);
    border-radius: 50%;
  }

  .play-list-wrapper .sort-by {
    display: flex;
  }

  .play-list-wrapper .sort-by span,
  .play-list-wrapper .select {
    padding: 8px 16px;
    border: 1px solid #ddd;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .play-list-wrapper .sort-by span:hover {
    color: #31C27C;
  }

  .play-list-wrapper .sort-by .current-tag,
  .play-list-wrapper .select:hover {
    background-color: #31C27C;
    color: #ffffff !important;
    border: 1px #31C27C solid;
  }

  .play-list-wrapper .tag-title {
    margin-left: 18px;
    color: #8f8f8f;
    margin-bottom: 12px;
  }

  .play-list-wrapper .tag-content {
    margin: 0 12px;
    width: calc(100% - 24px);
  }

  .play-list-wrapper .tag-item {
    display: inline-block;
    width: calc(100% / 3);
    height: 36px;
    line-height: 36px;
    color: #333;
    float: left;
    font-size: 14px;
    overflow: hidden;
  }

  .play-list-wrapper .tag-item span {
    padding: 2px 6px;
  }

  .play-list-wrapper .tag-item:hover {
    color: #31C27C;
    cursor: pointer;
  }

  .play-list-wrapper .more-tag {
    position: absolute;
    width: 100%;
    top: 100%;
    padding: 20px;
    background-color: #ffffff;
    box-shadow: 4px 4px 12px #adadad;
  }

  .play-list-wrapper .more-tag .tag-item {
    width: auto;
    padding: 2px 12px;
    margin: 0 4px;
  }

  .play-list-wrapper .current-tag span {
    background-color: #31C27C;
    color: #ffffff;
  }

  .play-list-wrapper .song-item {
    width: calc((100% - 4 * 32px) / 5);
    margin: 16px;
    float: left;
  }

  .play-list-wrapper .song-item:nth-child(5n+1) {
    margin-left: 0;
  }

  .play-list-wrapper .song-item:nth-child(5n+5) {
    margin-right: 0;
  }

  .play-list-wrapper .image-wrapper {
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    overflow: hidden;
    cursor: pointer;
  }

  .play-list-wrapper .image-wrapper img {
    width: 100%;
    transition: .4s;
  }

  .play-list-wrapper .image-wrapper:hover img {
    transform: scale(1.1);
  }

  .play-list-wrapper .song-info {
    display: flex;
    height: 90px;
    flex-direction: column;
    justify-content: center;
  }

  .play-list-wrapper .song-info span {
    font-size: 14px;
    color: #a7a7a7;
    display: inline-block;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 1px 0;
  }

  .play-list-wrapper .song-info .song-title {
    color: #333;
  }
</style>
<script type="text/ecmascript-6">
  import {getDissCategory, getSongList} from '../../api/diss'
  import Pagination from '../../components/pagination/pagination.vue'
  const SORT_BY_NEW = 2;
  const SORT_BY_HOT = 3;
  const SORT_BY_DEFAULT = 5;

  export default{
    data() {
      return {
        categories: [],
        moreTags: [],
        categoryId: -1,
        moreIndex: -1,
        moreTagOpen: false,
        moreText: '',
        totalPage: 1,
        page: 1,
        songList: [],
        selectTag: '',
        sortId: SORT_BY_DEFAULT
      }
    },
    mounted() {
      document.body.addEventListener('click', this.closeMoreTag);
      getDissCategory()
        .then(result => {
          if (result.code === 0) {
            let categories = result.data.categories;
            this.categories = categories;
            this.categoryId = categories[0].items[0].categoryId;
            this._getSongList();
          }
        })
        .catch(error => {
          console.log('getDissCategory error-->', error);
        })
    },
    methods: {
      _getSongList() {
        getSongList(this.categoryId, this.sortId, this.page)
          .then(result => {
            if (result.code === 0) {
              this.songList = result.data.list;
              this.totalPage = Math.ceil(result.data.sum / result.data.list.length);
            }
          })
          .catch(error => {
            console.log('getSongList error-->', error);
          })
      },
      isShow(length, index) {
        return (length <= 9 || index < 8) || false
      },
      moreTag(index) {
        if (this.moreIndex === -1)
          this.moreText = '更多';
        this.moreIndex = index;
        let temp = this.categories[index].items;
        let moreTags = [];
        for (let i = 8; i < temp.length; i++) {
          moreTags.push(temp[i]);
        }
        this.moreTags = moreTags;
        this.moreTagOpen = true;
      },
      onCategorySelect(item, index, flag) {
        this.categoryId = item.categoryId;
        if (flag) {
          this.moreText = item.categoryName;
        } else {
          this.moreIndex = -1;
        }
        console.log(item);
        this.selectTag = item.categoryName;
        this.page = 1;
        this.closeMoreTag();
        this._getSongList();
      },
      closeMoreTag() {
        this.moreTagOpen = false;
      },
      _stopPropagation(e) {
        e.stopPropagation();
      },
      onPageChange(page) {
        this.page = page;
        this._getSongList();
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
        return '播放量：' + val;
      },
      sortBy(sortId) {
        this.sortId = sortId;
        this._getSongList();
      },
      removeSelectTag() {
        this.categoryId = this.categories[0].items[0].categoryId;
        this.page = 1;
        this.selectTag = '';
        this._getSongList();
      }
    },
    beforeDestroy() {
      document.body.addEventListener('click', this.closeMoreTag, false);
    },
    components: {
      Pagination
    }
  }
</script>
