<template>
  <div class="mv-wrapper">
    <div class="mv">
      <div class="mv-tag">
        <ul class="clear-fix">
          <li>地区</li>
          <li v-for="(area,index) in tagList.area"
              :class="{'current-tag':index===areaIndex}"
              @click="onAreaSelect(index)"
              v-text="area.title"></li>
        </ul>
        <ul class="clear-fix">
          <li>类型</li>
          <li v-for="(tag,index) in tagList.tag"
              :class="{'current-tag':index===tagIndex}"
              @click="onTagSelect(index)"
              v-text="tag.title"></li>
        </ul>
        <ul class="clear-fix">
          <li>年代</li>
          <li v-for="(year,index) in tagList.year"
              :class="{'current-tag':index===yearIndex}"
              @click="onYearSelect(index)"
              v-text="year.title"></li>
        </ul>
      </div>

      <div class="mv-list clear-fix">
        <div class="mv-item" v-for="mv in mvList">
          <div class="image-wrapper">
            <img v-lazy="mv.picurl">
          </div>
          <div class="mv-info">
            <span class="mv-name" v-text="mv.mvtitle"></span>
            <span class="singer" v-text="mv.singername"></span>
            <span class="listen-num-and-date" v-text="getListenNum(mv.listennum,mv.publictime)"></span>
          </div>
        </div>
      </div>

      <pagination
        :currentPage="page"
        :totalPage="totalPage"
        @onPageChange="onPageChange"
      ></pagination>
    </div>
  </div>
</template>
<style scoped>
  .mv-wrapper {
    width: 100%;
    background-color: #f3f3f3;
    padding: 50px 0;
  }

  .mv {
    width: 86%;
    margin-left: 7%;
  }

  .mv-tag ul {
    margin: 12px 0;
  }

  .mv-tag ul li {
    float: left;
    font-size: 15px;
    color: #333;
    user-select: none;
    padding: 2px 6px;
    margin: 5px 8px;
  }

  .mv-tag ul li:hover {
    color: #31C27C;
    cursor: pointer;
  }

  .current-tag {
    color: #ffffff !important;
    background: #31C27C !important;
  }

  .mv-item {
    width: calc((100% - 3 * 32px) / 4);
    display: flex;
    flex-direction: column;
    float: left;
    margin: 16px;
  }

  .mv-item:nth-child(4n+1) {
    margin-left: 0;
  }

  .mv-item:nth-child(4n+4) {
    margin-right: 0;
  }

  .image-wrapper {
    width: 100%;
    height: 0;
    padding-bottom: calc(100% * 280 / 496);
    overflow: hidden;
  }

  .image-wrapper img {
    width: 100%;
    transition: .4s;
  }

  .image-wrapper:hover img {
    transform: scale(1.1);
  }

  .mv-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 90px;
  }

  .mv-info span {
    display: inline-block;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    color: #a3a3a3;
    margin: 1px 0;
  }

  .mv-name {
    color: #7a7a7a;
  }

  .mv-name:hover,
  .singer:hover {
    color: #31C27C;
    cursor: pointer;
  }
</style>
<script type="text/ecmascript-6">
  import {getMvList} from '../../api/mv'
  import Pagination from '../../components/pagination/pagination.vue'

  export default{
    data() {
      return {
        tagList: [],
        mvList: [],
        areaIndex: 0,
        tagIndex: 0,
        yearIndex: 0,
        page: 1,
        totalPage: 0
      }
    },
    mounted() {
      getMvList()
        .then(result => {
          console.log(result);
          this.tagList = result.data.taglist;
          this.mvList = result.data.mvlist;
          this.totalPage = Math.ceil(result.data.sum / 20);
        })
        .catch(error => {
          console.log('getMvList error-->', error);
        })
    },
    methods: {
      getListenNum(number, time) {
        let val = number;
        if (number >= 10000) {
          val = (number / 10000).toString();
          let vals = val.split('.');
          if (vals.length !== 1) {
            val = vals[0] + '.' + vals[1].substr(0, 1) + '万';
          }
        }
        return `播放量：${val}\t${time}`;
      },
      _getMvList() {
        let tagList = this.tagList;
        getMvList(tagList.year[this.yearIndex].id, tagList.area[this.areaIndex].id, tagList.tag[this.tagIndex].id, this.page - 1, 0)
          .then(result => {
            console.log(result);
            this.mvList = result.data.mvlist;
            this.totalPage = Math.ceil(result.data.sum / 20);
          })
          .catch(error => {
            console.log('getMvList error-->', error);
          })
      },
      onPageChange(page) {
        this.page = page;
        this._getMvList();
      },
      onYearSelect(index) {
        this.yearIndex = index;
        this.page = 1;
        this._getMvList();
      },
      onAreaSelect(index) {
        this.areaIndex = index;
        this.page = 1;
        this._getMvList();
      },
      onTagSelect(index) {
        this.tagIndex = index;
        this.page = 1;
        this._getMvList();
      }
    },
    components: {
      Pagination
    }
  }
</script>
