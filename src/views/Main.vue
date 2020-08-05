<template>
  <div class="main">
    <van-tabbar v-model="active" active-color="#b83320" @change="toggleBar">
      <van-tabbar-item
        v-for="(item,index) in tabbarData"
        :key="index"
        :icon="item.icon"
      >{{item.title}}</van-tabbar-item>
    </van-tabbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      tabbarData: [
        {
          title: "首页",
          icon: "home-o",
          url:'Home',
          skip:'/main/home'
        },
        {
          title: "分类",
          icon: "apps-o",
          url:'Classify',
          skip:'/main/classify'
        },
        {
          title: "排行",
          icon: "bar-chart-o",
          url:'Ranking',
          skip:'/main/ranking'
        },
        {
          title: "搜索",
          icon: "search",
          url:'Search',
          skip:'/main/search'
        }
      ]
    };
  },
  created(){
    let hash = location.hash.slice(1);  
    console.log(hash);
    for(let i=0;i<this.tabbarData.length;i++){

      console.log(this.tabbarData[i].skip)
      if(this.tabbarData[i].skip == hash){
        this.active = i;
        break;
      }
    }
  },
  methods:{
    toggleBar(index){
      this.$router.push({name:this.tabbarData[index].url})
    }
  }
};
</script>

<style lang="less" scoped>

</style>