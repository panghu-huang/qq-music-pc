<template>
  <div class="banner">
    <div class="banner-container" ref="container">
      <div v-for="(image,index) in images"
           class="item"
           :class="'banner-item'+index"
           @click="onBannerSelect(index)"
      >
        <img :src="image">
      </div>
    </div>
    <div class="lines">
      <ul class="clear-fix">
        <li v-for="(images,index) in images" class="line" :class="{'current-line':index===showIndex}"></li>
      </ul>
    </div>
    <button class="prev" @click="prev">Prev</button>
    <button class="next" @click="next">Next</button>
  </div>
</template>
<style scoped>
  .banner {
    position: relative;
    width: 100%;
    height: auto;
    margin-top: 50px;
  }

  .banner-container {
    position: relative;
    width: 86%;
    margin-left: 7%;
    overflow: hidden;
  }

  .item {
    position: absolute;
    width: 50%;
    top: 15%;
    transition: all 1s;
  }

  .item:hover {
    cursor: pointer;
  }

  .item img {
    width: 100%;
  }

  .banner-item2 {
    width: 70%;
    top: 0;
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

  .banner:hover .prev {
    left: 0;
  }

  .banner:hover .next {
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
      images: {
        Type: Array,
        default: () => []
      }
    },
    data () {
      return {
        showIndex: 2
      }
    },
    watch: {
      images(images) {
        this.index = 2;
        let imageHeight = this.$refs.container.clientWidth * 432 / 1080;
        this.$refs.container.style.height = `${imageHeight * .7}px`;
        this.__length = images.length;
        this._createCssCode(imageHeight);
      }
    },
    methods: {
      next() {
        let index = this.index;
        index = index === 0 ? this.__length - 1 : (index - 1);
        this._changeBanner(index);
        this.showIndex++;
        if (this.showIndex === this.__length) {
          this.showIndex = 0;
        }
      },
      prev() {
        let index = this.index;
        index = index === this.__length + 1 ? 2 : (index + 1);
        this._changeBanner(index);
        this.showIndex--;
        if (this.showIndex === -1) {
          this.showIndex = this.__length - 1;
        }
      },
      _changeBanner(index) {
        let items = document.querySelectorAll('.item');
        let __length = this.__length;
        let first = index >= 2 ? index - 2 : (__length - 2 + index);
        for (let i = 0; i < __length; i++) {
          items[i].className = `item banner-item${first}`;
          first = (first === __length - 1) ? 0 : (first + 1);
        }
        this.index = index;
      },
      _createCssCode(imageHeight) {
        let styles = [];
        for (let i = 0; i < this.__length; i++) {
          let left = i === 2 ? 15 : i < 2 ? ((i - 1) * 50) : ((i - 2) * 50);
          let zIndex = 3;
          if (i === 1 || i === 3) {
            zIndex = 2;
          } else if (i !== 2) {
            zIndex = 1;
          }
          styles.push(`.banner-item${i}{left: ${left}%;z-index: ${zIndex};}`);
        }
        styles.push(`.item {height: ${imageHeight * .5}px;}`);
        styles.push(`.banner-item2 {height: ${imageHeight * .7}px;}`);
        let style = document.createElement('style');
        style.type = 'text/css';
        style.rel = 'stylesheet';
        style.appendChild(document.createTextNode(styles.join(' ')));
        document.getElementsByTagName('head')[0].appendChild(style);
      },
      onBannerSelect(index) {
        this.$emit('onBannerSelect', index);
      }
    }
  }
</script>
