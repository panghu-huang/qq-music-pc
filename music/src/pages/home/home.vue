<template>
  <div class="home-page">
    <wrapper title="排行榜" :bgStyle="1">
      <div class="rank clear-fix">
        <rank-item v-for="(item,index) in topList"
                   :key="index"
                   :title="item.title"
                   :cls="item.cls"
                   :songList="item.songList"></rank-item>
      </div>
    </wrapper>
    <wrapper title="精彩推荐">
      <banner :images="images" @onBannerSelect="onBannerSelect"/>
    </wrapper>
    <wrapper title="热门歌单">
      <slider :items="hotdiss"></slider>
    </wrapper>
    <wrapper title="MV首播" :bgStyle="2">
      <shoubomv :mvs="mvs"></shoubomv>
    </wrapper>
  </div>
</template>
<style scoped>
  .rank {
    width: 86%;
    margin-left: 7%;
    margin-top: 50px;
  }
</style>
<script type="text/ecmascript-6">
  import Banner from '../../components/banner/banner.vue'
  import Wrapper from '../../components/wrapper/wrapper.vue'
  import RankItem from '../../components/rank-item/rank-item.vue'
  import Slider from '../../components/slider/slider.vue'
  import Shoubomv from '../../components/shoubomv/shoubomv.vue'
  import {getHomeData} from '../../api/home'

  export default{
    data() {
      return {
        topList: [],
        hotdiss: [],
        mvs: {},
        images: []
      }
    },
    mounted() {
      getHomeData()
        .then(result => {
          console.log(result.data);
          this._normalizeTop(result.data.toplist);
          this._initBanner(result.data.focus);
          this._normalizeHotdiss(result.data.hotdiss);
          this.mvs = result.data.shoubomv;
        })
        .catch(err => {
          console.log('err', err);
        });
    },
    methods: {
      _normalizeTop(items) {
        let topList = [];
        let classes = ['liuxing', 'rege', 'xinge', 'oumei'];
        items.forEach((item, index) => {
          let name = item.ListName.split('·');
          topList.push({
            title: name[name.length - 1],
            songList: item.songlist,
            cls: classes[index]
          })
        });
        this.topList = topList;
      },
      _normalizeHotdiss(hotdiss) {
        let list = hotdiss.list;
        let val = list.length % 4;
        if (val !== 0) {
          list.splice(list.length - val, val);
        }
        let items = [];
        for (let i = 0; i < list.length; i = i + 4) {
          let temp = [];
          temp.push(list[i]);
          temp.push(list[i + 1]);
          temp.push(list[i + 2]);
          temp.push(list[i + 3]);
          items.push(temp);
        }
        this.hotdiss = items;
      },
      _initBanner(focus) {
        let images = [];
        focus.forEach(item => {
          images.push(item.pic);
        });
        this.images = images;
        this.focus = focus;
      },
      onBannerSelect(index) {
        alert(JSON.stringify(this.focus[index]));
      }
    },
    components: {
      Banner,
      Wrapper,
      RankItem,
      Slider,
      Shoubomv
    }
  }
</script>
