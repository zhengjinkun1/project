<template>
  <div class="classify">
    <div class="nav">
      <van-nav-bar title="分类" left-text="返回" left-arrow class="nav-item" />
    </div>
    <div class="male">
      <h4 class="male-title">男生</h4>
      <ul class="clearfix" >
        <li class="male-list fl" v-for="(item,index) in maleData" :key="index" @click="toggle(item.name,'male')">
          <div class="classify-name">{{item.name}}</div>
          <div class="classify-count">{{item.bookCount}}</div>
        </li>
      </ul>
    </div>

    <div class="female">
      <h4 class="female-title">女生</h4>
      <ul class="clearfix">
        <li class="female-list fl" v-for="(item,index) in femaleData" :key="index" @click="toggle(item.name,'female')">
          <div class="classify-name">{{item.name}}</div>
          <div class="classify-count">{{item.bookCount}}</div>
        </li>
      </ul>
    </div>

    <!-- <div class="publish">
      <h4 class="publish-title">其它</h4>
      <ul class="clearfix">
        <li class="publish-list fl" v-for="(item,index) in publishData" :key="index" @click="toggle(item.name,'picture')">
          <div class="classify-name">{{item.name}}</div>
          <div class="classify-count">{{item.bookCount}}</div>
        </li>
      </ul> -->
    <!-- </div> -->


    

  </div>
</template>

<script>
export default {
  data() {
    return {
        maleData:[],
        femaleData:[],
        publishData:[],
       
    };
  },
  created(){
      this.getClassify();
  },

  methods: {
    getClassify() {
      this.$toast.loading({
        message: "加载中",
        forbidClick: true,
        // 延迟自动关闭加载提示，为0不会关闭
        duration: 0
      });
      this.axios({
        method: "GET",
        url: "http://novel.kele8.cn/categories"
      })
        .then(result => {
          this.$toast.clear();
          console.log(result);
          console.log(result.data.male);
          if(result.status == 200){
           this.maleData = result.data.male;
           this.femaleData = result.data.female;
          //  this.publishData = result.data.picture;
          }
          // console.log(this.publishData)
        })
        .catch(err => {
          this.$toast.clear();
          console.log(err);
          // this.$toast.clear();
        });
    },
    toggle(major,type){
      // console.log(this.maleData[index].name)
      // this.$router.push({name:'Detail',query:{major:this.maleData[index].name,type}})
      this.$router.push({name:'Detail',query:{major,type}})
    },
    // back(){
    //   this.$router.push({name:'Home'})
    // }

  }
};
</script>

<style lang="less" scoped>
.classify {
    padding-bottom: 50px;
}
.nav-item {
  background-color: #b83320;
}
/deep/ .van-icon,
/deep/ .van-nav-bar__text,
/deep/ .van-nav-bar__title {
  color: #fff;
}
h4 {
  // padding: 10px;
  padding-left: 10px;
  margin: 0;
}
.male-title {
  height: 60px;
  text-align: left;
  line-height: 60px;
  color: #ccc;
}
.male-list {
  width: 33.3%;
  height: 60px;
  text-align: center;
  font-weight: bold;
  //   line-height: 60px;
  border: 1px solid #e8e8e8;
  box-sizing: border-box;
}
.classify-name {
  height: 20px;
  line-height: 20px;
  margin-top: 10px;
  font-size: 14px;
  font-weight: bold;
}
.classify-count {
  height: 20px;
  line-height: 20px;
  color: #ccc;
}
.female-title {
  height: 60px;
  text-align: left;
  line-height: 60px;
  color: #ccc;
}
.female-list {
  width: 33.3%;
  height: 60px;
  text-align: center;
  font-weight: bold;
  //   line-height: 60px;
  border: 1px solid #e8e8e8;
  box-sizing: border-box;
}
// .publish {
//     margin-bottom: 50px;
// }
.publish-title {
  height: 60px;
  text-align: left;
  line-height: 60px;
  color: #ccc;
}
.publish-list {
  width: 33.3%;
  height: 60px;
  text-align: center;
  font-weight: bold;
  //   line-height: 60px;
  border: 1px solid #e8e8e8;
  box-sizing: border-box;
//   margin-bottom: 100px;
}
</style>