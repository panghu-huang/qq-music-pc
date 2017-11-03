<template>
  <div class="radio-wrapper">
    <div class="radio clear-fix">
      <div class="category-wrapper" ref="categoryWrapper">
        <ul>
          <li v-for="(item,index) in category"
              :class="{'current-category':categoryIndex===index}"
              @click="onCategorySelect(index)"
          >
            <span v-text="item"></span>
          </li>
        </ul>
      </div>
      <div class="content-wrapper" ref="contentWrapper">
        <div class="radios">
          <template v-for="group in groupList">
            <span class="radio-title" v-text="group.name"></span>
            <div class="radio-list clear-fix">
              <div class="radio-item" v-for="item in group.radioList">
                <div class="image-wrapper">
                  <img class="radio-image"
                       v-lazy="item.radioImg">
                </div>
                <div class="radio-info">
                  <span class="radio-name" v-text="item.radioName"></span>
                  <span class="listen-num" v-text="getListenNum(item.listenNum)"></span>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .radio-wrapper {
    width: 100%;
    background-color: #f4f4f4;
    padding: 50px 0;
  }

  .radio {
    width: 86%;
    margin-left: 7%;
  }

  .category-wrapper {
    width: 120px;
    background-color: #f4f4f4;
    float: left;
  }

  .category-wrapper li {
    width: 100%;
    height: 40px;
    line-height: 40px;
    color: #333;
  }

  .category-wrapper li:hover span {
    color: #31C27C;
    cursor: pointer;
  }

  .category-wrapper span {
    display: inline-block;
    margin: 0 16px;
    width: calc(100% - 32px);
  }

  .current-category {
    background-color: #31C27C;
  }

  .current-category span {
    color: #ffffff !important;
  }

  .content-wrapper {
    width: calc(100% - 120px - 50px - 4px);
    margin-left: 50px;
    float: left;
  }

  .radio-title {
    display: inline-block;
    height: 36px;
    line-height: 36px;
  }

  .radio-list {
    width: 100%;
  }

  .radio-item {
    width: calc((100% - 4 * 32px) / 4);
    margin: 0 16px;
    float: left;
  }

  .radio-item:nth-child(4n+1) {
    margin-left: 0;
  }

  .radio-item:nth-child(4n+4) {
    margin-right: 0;
  }

  .image-wrapper {
    width: 100%;
    overflow: hidden;
    height: 0;
    padding-bottom: 100%;
  }

  .radio-image {
    width: 100%;
    transition: all 1s;
  }

  .image-wrapper:hover .radio-image {
    transform: scale(1.1);
  }

  .radio-info {
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .radio-info span {
    width: calc(100% - 12px);
    margin-left: 12px;
    font-size: 15px;
  }

  .radio-name {
    color: #333;
  }

  .listen-num {
    color: #a5a5a5;
  }
</style>
<script type="text/ecmascript-6">
  import {getRadio} from '../../api/radio'

  export default{
    data() {
      return {
        groupList: [],
        category: [],
        categoryIndex: 0
      }
    },
    mounted() {
      getRadio()
        .then(result => {
          let groupList = result.data.data.groupList;
          let category = [];
          let itemsLength = [];
          groupList.forEach(item => {
            category.push(item.name);
            itemsLength.push(Math.ceil(item.radioList.length / 4));
          });
          console.log(groupList);
          this.category = category;
          this.groupList = groupList;
          this.itemsLength = itemsLength;
          window.addEventListener('scroll', this._onScroll);
        })
        .catch(error => {
          console.log('getRadio error-->', error)
        })
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
      onCategorySelect(index) {
        this.categoryIndex = index;
        let itemHeight = document.querySelector('.radio-item').clientHeight;
        let itemsLength = this.itemsLength;
        // 143：AppHeader的高度 50：radioWrapper的paddingTop
        let scrollTop = index * 36 + 143 + 50;
        for (let i = 0; i < index; i++) {
          scrollTop += itemsLength[i] * itemHeight;
        }
        document.body.scrollTop = scrollTop;
        if (!this.itemHeight)
          this.itemHeight = itemHeight;
      },
      _onScroll() {
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        if (scrollTop >= 193) {
          this.$refs.categoryWrapper.style.position = 'fixed';
          this.$refs.categoryWrapper.style.top = '50px';
          this.$refs.contentWrapper.style.marginLeft = '170px';
        } else {
          this.$refs.categoryWrapper.style.position = 'static';
          this.$refs.contentWrapper.style.marginLeft = '50px';
        }
        let index = 0;
        let itemHeight = 0;
        if (this.itemHeight) {
          itemHeight = this.itemHeight;
        } else {
          itemHeight = document.querySelector('.radio-item').clientHeight;
        }
        let itemsLength = this.itemsLength;
        // 143：AppHeader的高度 50：radioWrapper的paddingTop
        let top = 143 + 50;
        for (let i = 0; i < itemsLength.length; i++) {
          let temp = itemsLength[i] * itemHeight + 36;
          if (scrollTop > top && scrollTop < top + temp) {
            index = i;
            break;
          }
          top += temp;
        }
        if (this.categoryIndex !== index) {
          this.categoryIndex = index;
        }
      }
    },
    destroyed() {
      window.removeEventListener('scroll', this._onScroll, false);
    }
  }
</script>
