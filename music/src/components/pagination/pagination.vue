<template>
  <div class="pagination-wrapper">
    <ul class="clear-fix" v-if="totalPage>1">
      <li ref="prev" @click="prev">上一页</li>
      <li v-for="page in pages"
          v-text="page.text"
          :class="{'current-page':page.text==index,'empty-page':page.empty}"
          @click="onPageSelect(page.text)"
      ></li>
      <li ref="next" @click="next">下一页</li>
    </ul>
  </div>
</template>
<style scoped>
  .pagination-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 12px 0;
  }

  li {
    list-style: none;
    float: left;
    color: #767676;
    padding: 12px 20px;
    margin: 4px;
    font-size: 15px;
    user-select: none;
  }

  li:hover,
  .current-page {
    cursor: pointer;
    background-color: #31C27C;
    color: #ffffff;
  }

  .empty-page:hover {
    cursor: auto;
    background-color: transparent;
    color: #767676;
  }
</style>
<script type="text/ecmascript-6">
  export default{
    props: {
      totalPage: {
        Type: Number,
        default: 0
      },
      currentPage: {
        Type: Number,
        default: 0
      }
    },
    data() {
      return {
        index: 1,
        pages: []
      }
    },
    watch: {
      totalPage(totalPage) {
        if (totalPage === 0)
          return;
        this.pages = this._initOrChange(this.index, totalPage);
      },
      index(index){
        this.pages = this._initOrChange(index, this.totalPage);
      },
      currentPage(page) {
        this.index = page;
      }
    },
    methods: {
      hidden(...elements) {
        elements.forEach(element => {
          element.style.display = 'none';
        })
      },
      _initOrChange(currentPage = 1, totalPage = 0) {
        let pages = [];
        if (totalPage === 1) {
          this.hidden(this.$refs.prev, this.$refs.next);
          pages.push({
            isCurrent: true,
            empty: false,
            text: 1
          })
        } else if (totalPage <= 9) {
          for (let i = 0; i < totalPage; i++) {
            pages.push({
              isCurrent: i === currentPage,
              empty: false,
              text: i + 1
            })
          }
        } else {
          let length = 7;
          let start = 1;
          if (currentPage - 1 > 3) {
            pages.push({
              isCurrent: false,
              empty: false,
              text: 1
            });
            pages.push({
              isCurrent: false,
              empty: true,
              text: '...'
            });
            length = 6;
            start = currentPage - 2;
            if (totalPage - currentPage <= 3) {
              length = 7;
              start = totalPage - 5;
            }
          }

          for (let i = 0; i < length - 1; i++) {
            let val = start + i;
            pages.push({
              isCurrent: val === currentPage,
              empty: false,
              text: val
            })
          }

          if (totalPage - currentPage > 3) {
            pages.push({
              isCurrent: false,
              empty: true,
              text: '...'
            });
            pages.push({
              isCurrent: false,
              empty: false,
              text: totalPage
            });
          }
        }
        return pages;
      },
      pageChange(index) {
        this.index = index;
        this.$emit('onPageChange', index);
      },
      onPageSelect(text) {
        if (text === '...' || this.index == text)
          return;
        this.pageChange(parseInt(text));
      },
      prev() {
        if (this.index === 1)
          return;
        this.pageChange(this.index - 1);
      },
      next() {
        if (this.index === this.totalPage)
          return;
        this.pageChange(this.index + 1);
      }
    }
  }
</script>
