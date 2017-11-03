<template>
  <div class="singer-wrapper">
    <div class="singer">
      <div class="songs">
        <span class="title">热门歌曲</span>
        <song-list :songList="songList" :type="1" :page="page"></song-list>
        <pagination :currentPage="page"
                    :totalPage="totalPage"
                    @onPageChange="onPageChange"
        ></pagination>
      </div>
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
      <!--MV-->
      <div class="mvs">
        <span class="title">MV</span>
        <div class="mv-list">
          <div class="mv-item" v-for="item in mvList">
            <div class="image-wrapper">
              <img v-lazy="item.pic">
            </div>
            <div class="mv-info">
              <span class="mv-name" v-text="item.title"></span>
              <span class="time" v-text="getListenNum(item.listenCount)"></span>
            </div>
          </div>
        </div>
      </div>
      <!--相似歌手-->
      <div class="similar-singer">
        <span class="title">相似歌手</span>
        <div class="singer-list">
          <div class="singer-item" v-for="item in singers">
            <img v-lazy="item.pic" class="singer-avatar">
            <span class="singer-name" v-text="item.name"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .singer-wrapper {
    background-color: #f2f2f2;
    padding: 50px 0;
  }

  .singer {
    width: 86%;
    margin-left: 7%;
  }

  .title {
    font-size: 32px;
    margin: 8px 0;
  }

  .albums,
  .songs,
  .song-list,
  .album-list,
  .mvs,
  .mv-list,
  .similar-singer,
  .singer-list {
    margin: 20px 0;
  }

  .album-list,
  .mv-list,
  .singer-list {
    display: flex;
    justify-content: space-between;
  }

  .mv-item,
  .album-item,
  .singer-item {
    width: calc((100% - 4 * 32px) / 5);
  }

  .image-wrapper {
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    overflow: hidden;
  }

  .mv-item .image-wrapper {
    padding-bottom: calc(100% * 362 / 640);
  }

  .image-wrapper img {
    width: 100%;
    transition: .4s;
  }

  .image-wrapper:hover img {
    transform: scale(1.1);
    cursor: pointer;
  }

  .album-info,
  .mv-info {
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .album-info span,
  .mv-info span {
    display: inline-block;
    width: 100%;
    font-size: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .album-name,
  .mv-name {
    color: #5d5d5d;
  }

  .time {
    color: #a3a3a3;
  }

  .singer-item {
    background-color: #ececec;;
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
</style>
<script type="text/ecmascript-6">
  import {
    getSingerAlbums,
    getSingerSongs,
    getSingerMvs,
    getSingerDesc,
    getSimilarSinger
  } from '../../api/singer'
  import {createSong} from '../../common/js/song'
  import SongList from '../../components/song-list/song-list.vue'
  import Pagination from '../../components/pagination/pagination.vue'

  export default{
    data() {
      return {
        songList: [],
        page: 1,
        totalPage: 0,
        albumList: [],
        mvList: [],
        singers: []
      }
    },
    mounted() {
      let singerMid = this.$store.getters.singerId;
      if (singerMid === -1) {
        this.$router.back();
        return;
      }
      this.singerMid = singerMid;
      this._getSingerSongs();
      getSingerAlbums(singerMid)
        .then(result => {
          console.log('songs', result);
          if (result.code == 0) {
            this.albumList = result.data.list;
          }
        })
        .catch(error => {
          console.log('getSingerAlbums error-->', error);
        });
      getSingerMvs(singerMid)
        .then(result => {
          console.log('mv', result);
          if (result.code == 0) {
            this.mvList = result.data.list;
          }
        })
        .catch(error => {
          console.log('getSingerAlbums error-->', error);
        });
      getSimilarSinger(singerMid)
        .then(result => {
          console.log('similar singer', result);
          this.singers = result.singers.items;
        })
        .catch(error => {
          console.log('getSingerAlbums error-->', error);
        });

      getSingerDesc(singerMid)
        .then(result => {
          console.log(result.data);
//          let data = new DOMParser().parseFromString(result.data, 'text/xml');
//          console.log(data)
        })
        .catch(error => {
          console.log('getSingerDesc error-->', error);
        })
    },
    methods: {
      _getSingerSongs() {
        getSingerSongs(this.singerMid, this.page)
          .then(result => {
            console.log(result);
            if (result.code == 0) {
              this._normalizeList(result.data.list);
              this.totalPage = Math.ceil(result.data.total / 30);
            }
          })
          .catch(error => {
            console.log('getSingerSongs error-->', error);
          });
      },
      _normalizeList(list) {
        let songList = [];
        list.forEach(item => {
          songList.push(createSong(item.musicData));
        });
        this.songList = songList;
      },
      onPageChange(page) {
        this.page = page;
        this._getSingerSongs();
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
      }
    },
    components: {
      SongList,
      Pagination
    }
  }
</script>
