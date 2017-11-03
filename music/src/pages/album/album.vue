<template>
  <div class="album-wrapper">
    <div class="album-content" v-if="albumInfo!=={}">
      <div class="album-info">
        <img v-if="albumInfo.mid!==undefined"
             :src="'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+albumInfo.mid+'.jpg?max_age=2592000'">
        <div class="album-detail">
          <span class="title" v-text="albumInfo.name"></span>
          <span class="singer-name" v-text="albumInfo.singername"></span>
          <div class="info">
            <div class="left">
              <span>流派：{{albumInfo.genre}}</span>
              <span>发行时间：{{albumInfo.aDate}}</span>
            </div>
            <div class="right">
              <span>语种：{{albumInfo.lan}}</span>
              <span>发行公司：{{albumInfo.company}}</span>
            </div>
          </div>
        </div>
      </div>

      <!--专辑歌曲列表-->
      <song-list :songList="songList" :page="1" :type="2"></song-list>

      <span class="title" v-show="albumInfo.desc">简介</span>
      <span class="desc" v-text="albumInfo.desc"></span>

      <!--专辑-->
      <div class="albums">
        <span class="title">专辑</span>
        <div class="album-list">
          <div class="album-item" v-for="item in albumList">
            <div class="image-wrapper">
              <img v-lazy="'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+item.albumMID+'.jpg?max_age=2592000'">
            </div>
            <div class="album-info">
              <span class="album-name" v-text="item.albumName"></span>
              <span class="time" v-text="item.pubTime"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .album-wrapper {
    background-color: #f2f2f2;
    padding: 50px 0;
  }

  .album-content {
    width: 86%;
    margin-left: 7%;
  }

  .album-info {
    display: flex;
  }

  .album-info img {
    width: 250px;
    height: 250px;
  }

  .album-detail {
    display: flex;
    flex-direction: column;
    margin-left: 50px;
  }

  .title {
    font-size: 28px;
  }

  .singer-name {
    font-size: 20px;
    margin: 8px 0;
  }

  .info {
    display: flex;
  }

  .info .left,
  .info .right {
    display: flex;
    flex-direction: column;
  }

  .info .left {
    width: 200px;
  }

  .info span {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 15px;
    color: #a8a8a8;
    margin: 4px 0;
  }

  .song-list {
    margin: 30px 0;
  }

  .desc {
    line-height: 180%;
  }

  .album-list {
    display: flex;
    justify-content: space-between;
  }

  .album-item {
    width: calc((100% - 4 * 32px) / 5);
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
    cursor: pointer;
  }

  .album-list .album-info {
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .album-list .album-info span {
    display: inline-block;
    width: 100%;
    font-size: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .album-name {
    color: #5d5d5d;
  }

  .time {
    color: #a3a3a3;
  }

  .albums {
    margin: 20px 0;
  }

  .album-list {
    margin: 12px;
  }
</style>
<script type="text/ecmascript-6">
  import {getAlbumInfo} from '../../api/album'
  import {getSingerAlbums} from '../../api/singer'
  import SongList from '../../components/song-list/song-list.vue'
  import {createSong} from '../../common/js/song'

  export default{
    data() {
      return {
        albumInfo: {},
        songList: [],
        albumList: []
      }
    },
    mounted() {
      let albumMid = this.$store.getters.albumMid;
      if (albumMid === -1) {
        this.$router.back();
        return;
      }
      getAlbumInfo(albumMid)
        .then(result => {
          console.log(result);
          if (result.code == 0) {
            this.albumInfo = result.data;
            this._normalizeList(result.data.list);
            getSingerAlbums(result.data.singermid)
              .then(result => {
                console.log('songs', result);
                if (result.code == 0) {
                  this.albumList = result.data.list;
                }
              })
          }
        })
        .catch(error => {
          console.log('getAlbumInfo error-->', error);
        })
    },
    methods: {
      _normalizeList(list) {
        let songList = [];
        list.forEach(item => {
          songList.push(createSong(item))
        });
        this.songList = songList;
      }
    },
    components: {
      SongList
    }
  }
</script>
