<template>
  <div class="slider" ref="slider">
    <div class="slider-container" ref="container">
      <div class="slider-item" v-for="(item,index) in items" :class="'slider-item'+index">
        <div class="song" v-for="subItem in item" @click="onSongClick(subItem)">
          <div class="image-wrapper">
            <img :src="subItem.imgurl">
          </div>
          <div class="song-info">
            <span class="title" v-html="subItem.dissname"></span>
            <span class="play-count" v-text="getListenNum(subItem.listennum)"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="lines">
      <ul class="clear-fix">
        <li v-for="(item,i) in items" class="line" :class="{'current-line':i===index}"></li>
      </ul>
    </div>
    <button class="prev" @click="prev">Prev</button>
    <button class="next" @click="next">Next</button>
  </div>
</template>
<style scoped>
  .slider {
    position: relative;
    width: 100%;
    margin-top: 50px;
  }

  .slider-container {
    width: 86%;
    margin-left: 7%;
    overflow: hidden;
    position: relative;
  }

  .slider-item {
    position: absolute;
    z-index: 1;
    top: 0;
    transition: all 1s;
  }

  .slider-item1 {
    z-index: 2;
  }

  .image-wrapper {
    overflow: hidden;
  }

  .image-wrapper img {
    width: 100%;
    transition: 1s;
  }

  .image-wrapper:hover img {
    transform: scale(1.1);
  }

  .song-info {
    width: 100%;
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: -4px;
    background-color: #333333;
    transition: background-color 1s;
  }

  .song:nth-child(2n+1) .song-info {
    background-color: #444444;
  }

  .song-info:hover {
    background-color: #31C27C;
  }

  .song:hover .song-info {
    background-color: #31C27C;
  }

  .song:hover .image-wrapper img {
    transform: scale(1.1);
    background-color: rgba(5, 5, 5, 0.41);
  }

  .title {
    display: inline-block;
    width: 80%;
    color: #ffffff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .play-count {
    color: #adadad;
    font-size: 15px;
    margin-top: 8px;
  }

  .song {
    width: 25%;
    float: left;
  }

  .prev,
  .next {
    position: absolute;
    width: 80px;
    height: 120px;
    top: calc(50% - 60px);
    background-color: rgba(170, 170, 170, 0.43);
    border: none;
    outline: none;
    transition: all .4s;
  }

  .prev:hover,
  .next:hover {
    background-color: #31C27C;
  }

  .prev {
    left: -80px;
  }

  .next {
    right: -80px;
  }

  .slider:hover .prev {
    left: 0;
  }

  .slider:hover .next {
    right: 0;
  }

  .lines {
    width: 100%;
    height: 40px;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .lines ul .line {
    list-style: none;
    float: left;
    width: 40px;
    height: 1px;
    background-color: #d6d6d6;
    margin: 0 4px;
  }

  .lines ul .current-line {
    background-color: #494949;
  }
</style>
<script type="text/ecmascript-6">
  export default{
    props: {
      items: {
        Type: Array,
        default: () => []
      }
    },
    data () {
      return {
        index: 1
      }
    },
    watch: {
      items() {
        this.__length = this.items.length;
        if (this.__length != 0) {
          this.__index = 1;
          let width = this.$refs.container.clientWidth;
          this.$refs.container.style.height = `${width / 4 + 120}px`;
          this._createCssCode(width);
        }
      }
    },
    methods: {
      next() {
        let index = this.__index;
        index = index === 0 ? this.__length - 1 : (index - 1);
        this._changeSlider(index);
        this.index++;
        if (this.index === this.__length)
          this.index = 0;
      },
      prev() {
        let index = this.__index;
        index = index === this.__length - 1 ? 0 : (index + 1);
        this._changeSlider(index);
        this.index--;
        if (this.index === -1)
          this.index = this.__index - 1;
      },
      _changeSlider(index){
        let items = document.querySelectorAll('.slider-item');
        let __length = this.__length;
        let first = index >= 1 ? index - 1 : (__length - 1 + index);
        for (let i = 0; i < __length; i++) {
          items[i].className = `slider-item slider-item${first}`;
          first = (first === __length - 1) ? 0 : (first + 1);
        }
        this.__index = index;
      },
      _createCssCode(width) {
        let styles = [];
        styles.push(`.slider-item {width: ${width}px;height:${width / 4 + 120}px;}`);
        for (let i = 0; i < this.__length; i++) {
          styles.push(`.slider-item${i} {left: ${(i - 1) * width}px;}`);
        }
        let style = document.createElement('style');
        style.type = 'text/css';
        style.rel = 'stylesheet';
        style.appendChild(document.createTextNode(styles.join(' ')));
        document.getElementsByTagName('head')[0].appendChild(style);
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
      },
      onSongClick(item) {
        alert(JSON.stringify(item));
      }
    }
  }
</script>
