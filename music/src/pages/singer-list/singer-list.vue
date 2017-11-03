<template>
  <div class="singer-page">
    <div class="singer-bg" :style="singerBgStyle">
      <span>万千歌手尽在眼前</span>
    </div>
    <div class="singer-list-wrapper">
      <div class="singer-category">
        <ul class="clear-fix">
          <li v-for="(category,index) in singerCategory"
              v-text="category"
              :class="{'current-singer-category':index===categoryIndex}"
              @click="onCategorySelect(index)"
          ></li>
        </ul>
        <ul class="clear-fix">
          <li v-for="(letter,index) in singerLetter"
              v-text="letter"
              :class="{'current-singer-letter':index===letterIndex}"
              @click="onLetterSelect(index)"
          ></li>
        </ul>
      </div>
      <div class="singer-list clear-fix">
        <div class="singer"
             v-for="singer in singerListImage"
             @click="onSingerClick(singer.Fsinger_mid)"
        >
          <img class="singer-avatar"
               :src="'https://y.gtimg.cn/music/photo_new/T001R150x150M000'+singer.Fsinger_mid+'.jpg?max_age=2592000'"
               :alt="singer.Fsinger_name">
          <span class="singer-name">{{singer.Fsinger_name}}</span>
        </div>

        <div class="singer singer-no-image"
             v-for="singer in singerListText"
             @click="onSingerClick(singer.Fsinger_mid)"
        >
          <span class="singer-name">{{singer.Fsinger_name}}</span>
        </div>
      </div>
      <pagination @onPageChange="pageChange"
                  :totalPage="totalPage"
                  :currentPage="page"
      ></pagination>
    </div>
  </div>
</template>
<style scoped>
  .singer-bg {
    width: 100%;
    background-image: url("../../assets/bg_singer.jpg");
    background-size: cover;
    font-size: 54px;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .singer-list-wrapper {
    width: 86%;
    margin-left: 7%;
  }

  .singer-category {
    padding: 20px;
    background-color: #fbfbfb;
    margin: 20px;
  }

  .singer-category ul {
    margin: 12px 0;
  }

  .singer-category ul li {
    float: left;
    font-size: 14px;
    color: #333;
    user-select: none;
    padding: 2px 6px;
    margin: 4px 6px;
  }

  .current-singer-category,
  .current-singer-letter {
    color: #ffffff !important;
    background: #31C27C;
  }

  .singer-category ul li:hover {
    color: #31C27C;
    cursor: pointer;
  }

  .singer {
    float: left;
    width: calc((100% - 4 * 32px) / 5);
    background-color: #fbfbfb;
    display: flex;
    flex-direction: column;
    margin: 16px;
    align-items: center;
  }

  .singer:nth-child(5n+1) {
    margin-left: 0;
  }

  .singer:nth-child(5n+5) {
    margin-right: 0;
  }

  .singer-avatar {
    width: 80%;
    margin: 10%;
    border-radius: 50%;
  }

  .singer-avatar:hover {
    cursor: pointer;
  }

  .singer-name {
    display: inline-block;
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 16px;
    margin-bottom: 16px;
    color: #333;
    text-align: center;
  }

  .singer-no-image {
    background-color: transparent;
    margin-top: 6px;
    margin-bottom: 6px;
  }

  .singer-no-image .singer-name {
    text-align: left;
    font-size: 15px;
  }

  .singer-name:hover {
    color: #31C27C;
    cursor: pointer;
  }
</style>
<script type="text/ecmascript-6">
  import Pagination from '../../components/pagination/pagination.vue'
  import {getSingerList} from '../../api/singer'
  import mutationTypes from '../../store/mutation-types'

  export default{
    data() {
      return {
        page: 1,
        totalPage: 12,
        letterIndex: 0,
        categoryIndex: 0,
        singerLetter: [],
        singerCategory: [],
        singerBgStyle: '',
        singerListImage: [],
        singerListText: []
      }
    },
    mounted() {
      let singerLetter = [];
      singerLetter.push('热门');
      for (let i = 0; i < 26; i++) {
        singerLetter.push(String.fromCharCode(65 + i));
      }
      singerLetter.push('#');
      this.singerCategory = ['全部', '华语男', '华语女', '华语组合', '韩国男', '韩国女', '韩国组合', '日本男', '日本女', '日本组合', '欧美男', '欧美女', '欧美组合', '乐团', '演奏家', '作曲家', '指挥家', '其他'];
      this.singerLetter = singerLetter;
      let height = screen.width * 376 / 1920 * 1.3;
      this.singerBgStyle = `height: ${height}px;`;
      this.scrollHeight = height + 143;
      this._getSingerList();
    },
    methods: {
      _getSingerList(type) {
        getSingerList(this.page, type)
          .then(result => {
            console.log(result.data);
            this.totalPage = result.data.total_page;
            let singerList = result.data.list;
            if (this.page === 1)
              this.singerListImage = singerList.splice(0, 10);
            else
              this.singerListImage = [];
            this.singerListText = singerList;
          })
          .catch(error => {
            console.log('getSingerList error=>', error);
          });
      },
      pageChange(index) {
        this.page = index;
        this._getSingerList(this._getTypeWidthIndex(this.categoryIndex, this.letterIndex));
        document.body.scrollTop = this.scrollHeight;
      },
      onLetterSelect(index) {
        this.letterIndex = index;
        this.page = 1;
        this._getSingerList(this._getTypeWidthIndex(this.categoryIndex, index))
      },
      onCategorySelect(index) {
        this.categoryIndex = index;
        this.page = 1;
        this._getSingerList(this._getTypeWidthIndex(index, this.letterIndex))
      },
      _getTypeWidthIndex(categoryIndex, letterIndex) {
        let country = 'all';
        let sex = 'all';
        let letter = 'all';
        let category = this.singerCategory[categoryIndex];
        if (category != '全部') {
          switch (category) {
            case '乐团':
              country = 'c';
              sex = 'orchestra';
              break;
            case '演奏家':
              country = 'c';
              sex = 'performer';
              break;
            case '作曲家':
              country = 'c';
              sex = 'composer';
              break;
            case '指挥家':
              country = 'c';
              sex = 'cantor';
              break;
            case '其他':
              country = 'other';
              sex = 'other';
              break;
            default:
              if (category.indexOf('华语') !== -1)
                country = 'cn';
              else if (category.indexOf('韩国') !== -1)
                country = 'k';
              else if (category.indexOf('日本') !== -1)
                country = 'j';
              else
                country = 'eu';

              if (category.indexOf('男') !== -1)
                sex = 'man';
              else if (category.indexOf('女') !== -1)
                sex = 'woman';
              else
                sex = 'team';
          }
        }
        let singerLetter = this.singerLetter;
        if (letterIndex !== 0) {
          if (letterIndex === singerLetter.length - 1) {
            letter = '9';
          } else {
            letter = singerLetter[letterIndex];
          }
        }
        return `${country}_${sex}_${letter}`;
      },
      onSingerClick(singerMid) {
        this.$store.commit(mutationTypes.SET_SINGER_ID, singerMid);
        this.$router.push({
          path: '/singer'
        })
      }
    },
    components: {
      Pagination
    }
  }
</script>
