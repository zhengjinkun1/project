<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<style lang="less">
  body {
    margin: 0;
  }
  .fl{
    float: left;
  }
  .fr {
    float: right;
  }
  .clearfix::after{
    content: "";
    display: block;
    clear: both;
  }
  .auto-img {
    width: 100%;
    display: block;
  }
</style>
