<template>
  <div class="wrapper" ref="wrapper">
    <div class="title">
      <div class="line"></div>
      <span class="title-text">{{title}}</span>
      <div class="line"></div>
    </div>
    <div class="wrapper-content">
      <slot></slot>
    </div>
  </div>
</template>
<style scoped>
  .wrapper {
    padding-top: 50px;
  }

  .title {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .line {
    width: 100px;
    height: 1px;
    background-color: #ababab;
  }

  .title-text {
    font-size: 46px;
    margin: 0 40px;
    color: #515151;
  }

  .wrapper-content {
    height: auto;
  }

  /*排行榜style*/
  .wrapper-style-rnak {
    background-size: 150%;
    background-position: center;
  }

  .wrapper-style-mv {
    background-color: #e6e6e6;
    height: auto;
  }

  .wrapper-style-rank .line {
    color: #e2e2e2;
  }

  .wrapper-style-rank .title-text {
    color: #c8c8c8;
  }
</style>
<script type="text/ecmascript-6">
  export default{
    props: {
      title: {
        Type: String,
        default: '新歌首发'
      },
      bgStyle: {
        Type: Number,
        default: 0
      }
    },
    mounted() {
      if (this.bgStyle === 0) {
        return;
      } else if (this.bgStyle === 1) {
        let wrapper = this.$refs.wrapper;
        wrapper.className = 'wrapper wrapper-style-rank';
        wrapper.style.backgroundImage = 'url("https://y.gtimg.cn/mediastyle/yqq/img/bg_index_top2.jpg")';
        wrapper.style.height = `${screen.width * 386 / 892 * 1.3}px`;
      }
      else if (this.bgStyle === 2) {
        let wrapper = this.$refs.wrapper;
        wrapper.className = 'wrapper wrapper-style-mv';
      }
    }
  }
</script>
