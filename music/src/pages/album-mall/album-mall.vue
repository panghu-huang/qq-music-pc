<template>
  <div class="album-mall-wrapper">
    <banner :images="images" @onBannerSelect="onBannerSelect"></banner>
    <div class="album-list-wrapper">
      <!--最新上架-->
      <span class="title">最新上架</span>
      <div class="album-list clear-fix">
        <div class="album-item" v-for="album in newUpload">
          <div class="image-wrapper">
            <img v-lazy="'http://y.gtimg.cn/music/photo_new/T002R300x300M000'+album.album_mid+'.jpg?max_age=2592000'">
          </div>
          <div class="album-info">
            <span class="album-name" v-text="album.album_name"></span>
            <span class="singer" v-text="album.singer_name"></span>
            <span class="price" v-text="'¥'+album.price"></span>
          </div>
        </div>
      </div>

      <!--本周热销-->
      <span class="title">本周热销</span>
      <div class="album-list clear-fix">
        <div class="album-item" v-for="album in weekSalelWell">
          <div class="image-wrapper">
            <img v-lazy="'http://y.gtimg.cn/music/photo_new/T002R300x300M000'+album.album_mid+'.jpg?max_age=2592000'">
          </div>
          <div class="album-info">
            <span class="album-name" v-text="album.album_name"></span>
            <span class="singer" v-text="album.singer_name"></span>
            <span class="price" v-text="'¥'+album.price"></span>
          </div>
        </div>
      </div>

      <!--音乐人专区-->
      <span class="title">音乐人专区</span>
      <div class="album-list clear-fix">
        <div class="album-item" v-for="album in musicMan">
          <div class="image-wrapper">
            <img v-lazy="'http://y.gtimg.cn/music/photo_new/T002R300x300M000'+album.album_mid+'.jpg?max_age=2592000'">
          </div>
          <div class="album-info">
            <span class="album-name" v-text="album.album_name"></span>
            <span class="singer" v-text="album.singer_name"></span>
            <span class="price" v-text="'¥'+album.price"></span>
          </div>
        </div>
      </div>

      <!--其他专辑-->
      <template v-for="item in otherAlbums">
        <span class="title" v-text="item.title"></span>
        <div class="album-list clear-fix">
          <div class="album-item" v-for="album in item.albumList">
            <div class="image-wrapper">
              <img v-lazy="'http://y.gtimg.cn/music/photo_new/T002R300x300M000'+album.album_mid+'.jpg?max_age=2592000'">
            </div>
            <div class="album-info">
              <span class="album-name" v-text="album.album_name"></span>
              <span class="singer" v-text="album.singer_name"></span>
              <span class="price" v-text="'¥'+album.price"></span>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<style scoped>
  .album-mall-wrapper {
    width: 100%;
    background-color: #f3f3f3;
    padding: 20px 0;
  }

  .album-list-wrapper {
    width: 86%;
    margin-left: 7%;
  }

  .title {
    font-size: 30px;
    color: #000;
  }

  .album-item {
    width: calc((100% - 4 * 32px) / 5);
    display: flex;
    flex-direction: column;
    float: left;
    margin: 16px;
  }

  .album-item:nth-child(5n+1) {
    margin-left: 0;
  }

  .album-item:nth-child(5n+5) {
    margin-right: 0;
  }

  .image-wrapper {
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    overflow: hidden;
  }

  .image-wrapper img {
    width: 100%;
    transition: .4s;
  }

  .image-wrapper:hover img {
    transform: scale(1.1);
  }

  .album-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 90px;
  }

  .album-info span {
    display: inline-block;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    color: #a3a3a3;
    margin: 1px 0;
  }

  .album-name {
    color: #7a7a7a;
  }

  .album-name:hover,
  .singer:hover {
    color: #31C27C;
    cursor: pointer;
  }
</style>
<script type="text/ecmascript-6">
  import {getDigitalAlbum} from '../../api/album'
  import Banner from '../../components/banner/banner.vue'

  export default{
    data() {
      return {
        images: [],
        newUpload: [],
        weekSalelWell: [],
        musicMan: [],
        otherAlbums: []
      }
    },
    mounted() {
      getDigitalAlbum()
        .then(result => {
          console.log(result);
          this._initBanner(result.data.banner);
          let content = result.data.content;
          this.newUpload = content[0].albumlist.splice(0, 5);
          this.weekSalelWell = content[1].albumlist.splice(0, 5);
          this.musicMan = content[2].albumlist.splice(0, 5);
          let otherAlbums = [];
          for (let i = 3; i < content.length; i++) {
            otherAlbums.push({
              title: content[i].title,
              albumList: content[i].albumlist.splice(0, 5)
            })
          }
          this.otherAlbums = otherAlbums;
        })
        .catch(error => {
          console.log('getDigitalAlbum error-->', error);
        })
    },
    methods: {
      _initBanner(banner) {
        let images = [];
        banner.forEach(item => {
          images.push(item.picurl);
        });
        this.images = images;
        this.banner = banner;
      },
      onBannerSelect(index) {
        alert(JSON.stringify(this.banner[index]));
      }
    },
    components: {
      Banner
    }
  }
</script>
