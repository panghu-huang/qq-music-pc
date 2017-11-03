<template>
  <div class="song-list">
    <div class="titles">
      <span class="index-title"></span>
      <span class="song-title">歌曲</span>
      <span class="singer-title">歌手</span>
      <span class="duration-title">时长</span>
    </div>

    <div class="song-item" v-for="(item,index) in songList" :class="{'no-image':type===2}">
      <div class="song">
        <span class="index" v-text="index+1+(page-1)*30"></span>
        <img class="song-image" v-if="type!==2"
             v-lazy="item.image">
        <span class="song-name" v-text="item.songName"></span>
      </div>
      <span class="singer" v-text="type===1?item.albumName:item.singer"></span>
      <span class="duration" v-text="_getDuration(item.duration)"></span>
    </div>
  </div>
</template>
<style scoped>
  .titles {
    width: 100%;
    display: flex;
    height: 36px;
    border-bottom: 2px solid #dddddd;
    background-color: #dff0d8;
  }

  .song-list span {
    display: inline-block;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    color: #858585;
  }

  .song-title {
    flex: 1;
  }

  .duration-title,
  .duration {
    width: 100px;
  }

  .singer-title,
  .singer {
    width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .singer {
    color: #333 !important;
  }

  .index-title,
  .index {
    font-size: 17px;
    width: 90px;
    text-align: center;
  }

  .song-item {
    display: flex;
    align-items: center;
    height: 90px;
  }

  .no-image {
    height: 48px;
  }

  .song-item:nth-child(odd) {
    background-color: #dff0d8;
  }

  .song {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .song-image {
    width: 70px;
    height: 70px;
  }

  .song-name {
    font-size: 15px;
    margin-left: 12px;
  }

  .no-image .song-name {
    margin-left: 0;
  }
</style>
<script type="text/ecmascript-6">
  export default{
    props: {
      songList: {
        Type: Array,
        default: () => []
      },
      page: {
        Type: Number,
        default: 1
      },
      // type: 1-->歌手详情页   2-->专辑页
      type: {
        Type: Number,
        default: 0
      }
    },
    methods: {
      _getDuration(duration) {
        let minute = Math.floor(duration / 60);
        let second = duration - minute * 60;
        return `${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`;
      }
    }
  }
</script>
