<template>
  <div class="rank-item" ref="rankItem">
    <div class="bg" :class="cls">
    </div>
    <div class="top">
      <span style="font-size: 24px;font-weight: 100;">巅峰榜</span>
      <span class="rank-title">{{title}}</span>
      <div class="player-button" style="height: 100px;"></div>
      <div class="top-list">
        <div class="top-item" v-for="(song,index) in songList">
          <span class="song-name" @click="onSongClick(song)">{{index + 1 + ' ' + song.songname}}</span>
          <span class="singer" @click="onSingerClick(song.singerid)">{{song.singername}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .rank-item {
    position: relative;
    float: left;
    width: 25%;
    overflow: hidden;
  }

  .bg,
  .top {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    bottom: 0;
  }

  .bg {
    z-index: 2;
    transition: .4s;
  }

  .top {
    z-index: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: .4s;
  }

  .rank-item:hover .top {
    background-color: rgba(12, 12, 12, 0.33);
  }

  .rank-item:hover .bg {
    transform: scale(1.1);
  }

  .bg-image {
    width: 100%;
  }

  .liuxing {
    background: url("../../assets/bg_index_top.jpg") 0 567px;
  }

  .rege {
    background: url("../../assets/bg_index_top.jpg") 900px 567px;
  }

  .xinge {
    background: url("../../assets/bg_index_top.jpg") 600px 567px;
  }

  .oumei {
    background: url("../../assets/bg_index_top.jpg") 300px 567px;
  }

  span {
    color: #ffffff;
    display: inline-block;
    width: 60%;
    text-align: center;
  }

  .rank-title {
    font-size: 38px;
    font-weight: bold;
  }

  .top-list {
    width: 60%;
  }

  .top-item {
    width: 100%;
    margin: 12px 0;
  }

  .song-name,
  .singer {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
  }

  .singer {
    color: #bfbfbf;
    font-size: 14px;
    padding-left: 12px;
  }

  .song-name:hover,
  .singer:hover {
    cursor: pointer;
  }
</style>
<script type="text/ecmascript-6">
  export default{
    props: {
      title: {
        Type: String,
        default: '流行榜'
      },
      cls: {
        Type: String,
        default: 'liuxing'
      },
      songList: {
        Type: Array,
        default: () => []
      }
    },
    mounted() {
      let rankItem = this.$refs.rankItem;
      rankItem.style.height = `${rankItem.clientWidth * 567 / 300}px`;
    },
    methods: {
      onSongClick (song) {
        console.log(song);
      },
      onSingerClick(singerId) {
        alert(singerId);
      }
    }
  }
</script>
