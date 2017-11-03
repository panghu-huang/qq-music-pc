<template>
  <div class="shoubomv">
    <div class="mv-list clear-fix">
      <div class="mv-item" v-for="(mv,index) in mvList">
        <div class="image-wrapper" @click="onItemClick(index)">
          <img v-lazy="mv.picurl">
        </div>
        <div class="mv-info">
          <span class="mv-title">{{mv.mvtitle}}</span>
          <span class="singer-name">{{mv.singer_name}}</span>
          <span class="listen-num">{{getListenNum(mv.listennum)}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .shoubomv {
    width: 86%;
    margin-left: 7%;
    margin-top: 50px;
  }

  .image-wrapper {
    width: 100%;
    height: 0;
    padding-bottom: calc(100% * 362 / 640);
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

  .mv-item {
    width: 25%;
    float: left;
  }

  .mv-info {
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: transparent;
  }

  .mv-info span {
    text-align: center;
    display: inline-block;
    width: 80%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 3px 0;
  }

  .mv-title {
    font-size: 16px;
    color: #333;
  }

  .singer-name,
  .listen-num {
    font-size: 15px;
    color: #999999;
  }

  .mv-title:hover,
  .singer-name:hover {
    color: #31C27C;
    cursor: pointer;
  }
</style>
<script type="text/ecmascript-6">
  export default{
    props: {
      mvs: {
        Type: Object,
        default: () => {
          return {}
        }
      }
    },
    data () {
      return {
        mvList: []
      }
    },
    watch: {
      mvs() {
        if (this.mvs === {})
          return;
        this.mvList = this.mvs.all;
      }
    },
    methods: {
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
      onItemClick(index) {
        alert(JSON.stringify(this.mvList[index]));
      }
    }
  }
</script>
