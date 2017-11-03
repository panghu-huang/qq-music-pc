<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import AppHeader from './components/header/header.vue'
  import AppFooter from './components/footer/footer.vue'
  export default {
    components: {
      AppHeader,
      AppFooter
    }
  }
</script>

<style>
  body {
    overflow-x: hidden;
  }

  * {
    padding: 0;
    margin: 0;
  }

  li {
    list-style: none;
  }

  .clear-fix::after {
    clear: both;
    display: table;
    content: '';
  }

  ::-webkit-scrollbar {
    width: 10px;
    background-color: #ffffff;
  }

  ::-webkit-scrollbar-thumb {
    width: 100%;
    border-radius: 5px;
    background-color: #b8b8b8;
  }

  @font-face {
    font-family: 'icomoon';
    src: url('./assets/fonts/icomoon.eot?kzw39a');
    src: url('./assets/fonts/icomoon.eot?kzw39a#iefix') format('embedded-opentype'),
    url('./assets/fonts/icomoon.ttf?kzw39a') format('truetype'),
    url('./assets/fonts/icomoon.woff?kzw39a') format('woff'),
    url('./assets/fonts/icomoon.svg?kzw39a#icomoon') format('svg');
    font-weight: normal;
    font-style: normal;
  }

  [class^="icon-"], [class*=" icon-"] {
    font-family: 'icomoon', serif !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-jinzhi:before {
    content: "\e908";
    color: #d81e06;
  }

  .icon-album:before {
    content: "\e900";
  }

  .icon-close:before {
    content: "\e901";
  }

  .icon-mv:before {
    content: "\e902";
  }

  .icon-password:before {
    content: "\e903";
  }

  .icon-search:before {
    content: "\e904";
  }

  .icon-singer:before {
    content: "\e905";
  }

  .icon-song:before {
    content: "\e906";
  }

  .icon-username:before {
    content: "\e907";
  }


</style>
