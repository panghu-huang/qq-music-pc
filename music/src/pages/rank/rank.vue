<template>
  <div class="rank-wrapper">
    <div class="rank clear-fix">
      <div class="category-wrapper">
        <ul class="category" v-for="(item,index) in category">
          <li class="category-title">
            <span v-text="item.GroupName"></span>
          </li>
          <li class="category-item"
              v-for="(subItem,subIndex) in item.List"
              :class="{'current-category':currentCategory===index+''+subIndex}"
              @click="onCategorySelect(index,subIndex)"
          >
            <span v-text="subItem.ListName"></span>
          </li>
        </ul>
      </div>
      <div class="content-wrapper">
        <song-list :songList="songList" :page="page"></song-list>
      </div>
    </div>
    <pagination
      @onPageChange="onPageChange"
      :currentPage="page"
      :totalPage="totalPage"
    ></pagination>
  </div>
</template>
<style scoped>
  .rank-wrapper {
    background-color: #f2f2f2;
    padding-top: 40px;
  }

  .rank {
    width: 86%;
    margin-left: 7%;
  }

  .category-wrapper {
    width: 180px;
    border: 1px solid #d5d5d5;
    float: left;
  }

  .content-wrapper {
    width: calc(100% - 180px - 40px - 2px);
    margin: 0 20px;
    float: left;
  }

  .category li {
    width: 100%;
    padding: 8px 0;
  }

  .category li span {
    display: inline-block;
    width: calc(100% - 32px);
    margin-left: 16px;
    font-size: 15px;
    color: #555555;
  }

  .category-item:hover {
    cursor: pointer;
  }

  .category-item:hover span {
    color: #31C27C;
  }

  .category-title {
    padding: 20px 0 !important;
  }

  .category-title span {
    font-size: 17px !important;
  }

  .current-category {
    background-color: #31C27C;
  }

  .current-category span {
    color: #ffffff !important;
  }
</style>
<script type="text/ecmascript-6">
  import {getTopCategory, getTopList} from '../../api/rank'
  import {createSong} from '../../common/js/song'
  import Pagination from '../../components/pagination/pagination.vue'
  import SongList from '../../components/song-list/song-list.vue'
  const TYPE_TOP = 'top';
  const TYPE_GLOBAL = 'global';

  export default{
    data() {
      return {
        category: [],
        page: 1,
        songList: [],
        totalPage: 0,
        currentCategory: '00'
      }
    },
    mounted() {
      getTopCategory()
        .then(category => {
          console.log(category);
          if (!category)
            return;
          this.currentType = TYPE_TOP;
          let list = category[0].List[0];
          this._getTopList(list.topID, list.update_key);
          this.category = category;
        })
        .catch(error => {
          console.log('getTopCategory error -->', error);
        })
    },
    methods: {
      _getTopList(topId, updateKey) {
        if (!topId) {
          topId = this.topId;
          updateKey = this.updateKey;
        }
        console.log(topId, updateKey);
        getTopList(topId, updateKey, this.page, this.currentType)
          .then(result => {
            if (this.topId !== topId) {
              this.topId = topId;
              this.updateKey = updateKey;
              this.totalPage = Math.ceil(result.total_song_num / result.cur_song_num);
            }
            console.log(result);
            this._normalizeList(result.songlist);
          })
          .catch(error => {
            console.log('getTopList error-->', error);
          });
      },
      _normalizeList(list) {
        if (!list)
          return;
        let songList = [];
        list.forEach(item => {
          songList.push(createSong(item.data));
        });
        this.songList = songList;
      },
      onPageChange(page) {
        this.page = page;
        this._getTopList();
      },
      onCategorySelect(index, subIndex){
        this.currentCategory = index + '' + subIndex;
        this.page = 1;
        this.currentType = index === 0 ? TYPE_TOP : TYPE_GLOBAL;
        let list = this.category[index].List[subIndex];
        this._getTopList(list.topID, list.update_key);
      }
    },
    components: {
      Pagination,
      SongList
    }
  }
</script>
