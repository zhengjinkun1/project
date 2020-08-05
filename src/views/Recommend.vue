<template>
  <div class="recommend">
    <van-nav-bar title="你可能感兴趣的" left-text="返回" left-arrow @click-left="back"></van-nav-bar>

    <div>
      <div class="tabs-list">
        <ul>
          <li class="tabs-li" v-for="(item,index) in bookData" :key="index">
            <div class="tabs-list-box clearfix">
              <div class="fl tabs-box-img">
                <img class="auto-img" :src="decodeURIComponent(item.cover).slice(7)" alt="">
              </div>
              <div class="fl tabs-box-content">
                <div class="tabs-content-top">
                  <div class="tabs-content-title">{{item.title}}</div>
                  <div class="tabs-content-item">
                    <span class="tabs-content-list author fl">{{item.author}}</span>
                    <span class="tabs-content-list line fl"></span>
                    <span class="tabs-content-list fl">{{item.majorCate}}</span>
                  </div>
                  <div class="tabs-content-desc">
                   {{item.shortIntro}}
                  </div>
                </div>
                <div class="tabs-content-btm clearfix">
                  <span class="tabs-btm-item hot fl">
                    <span class="tabs-col hot-count">{{changeNum(item.latelyFollower)}}</span> 万人气
                  </span>
                  <span class="tabs-btm-item tabs-content-line fl"></span>
                  <span class="tabs-btm-item advice fl">
                    <span class="tabs-col advice-count">{{item.retentionRatio}}%</span>读者留存
                  </span>
                </div>
              </div>
            </div>
          </li>

          
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      id:'',
      bookData:[]
    }
  },
  created(){
    this.id = this.$route.query.id;
    console.log(this.id);
    this.getBook(this.id);
  },
  methods:{
     changeNum(count) {
      if(count < 10000) {
        return count;
      }
      let num = count / 10000;
      if (num < 1) {
        return num;
      } else if (num >= 1 && num < 10000) {
        return Math.floor(num * 10) / 10 + "万";
      } else {
        return Math.floor(num / 1000) / 10 + "亿";
      }
    },
    getBook(id){
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0
      });
      this.axios({
        method: "GET",
        url: `http://novel.kele8.cn/recommend/${id}`
      })
        .then(result => {
          //关闭加载提示
          this.$toast.clear();
          console.log(result);
          this.bookData = result.data.books;
         
        })
        .catch(err => {
          //关闭加载提示
          this.$toast.clear();
        });
    },
    back(){
      this.$router.go(-1)
    }
  }

};
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: #b83320;
}
/deep/ .van-nav-bar__text,
/deep/ .van-nav-bar .van-icon,
/deep/ .van-nav-bar__title {
  color: #fff;
}

.tabs-list {
 
  background-color: #f5f2ed;
  padding: 20px;
}
.tabs-li:not(:last-child) {
  margin-bottom: 20px;
}
.tabs-list-box {
  height: 80px;
  width: calc(100%-40px);
}
.tabs-box-img {
  height: 80px;
  width: 58px;
  background-color: #ddd;
}
.tabs-box-content {
  // margin-left: 20px;
  padding-left: 20px;
  width: calc(100% - 78px);
  height: 80px;
}
.tabs-content-top {
  height: 60px;
}
.tabs-content-btm {
  height: 20px;
  color: #999;
  line-height: 20px;
}
.tabs-content-title {
  height: 20px;
  font-weight: bold;
  line-height: 20px;
}
.tabs-content-item {
  height: 20px;
  color: #999;
  line-height: 20px;
  position: relative;
}
.tabs-content-list {
  height: 20px;
  line-height: 20px;
  margin-right: 10px;
}
.line {
  display: block;
  height: 12px;
  // line-height: 15px;
  margin-top: 4px;
  width: 1px;
  background-color: #999;
}
.tabs-content-desc {
  // width: 280px;
  height: 20px;
  color: #999;
  line-height: 20px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.tabs-btm-item {
  margin-right: 10px;
}
.tabs-content-line {
  display: block;
  height: 12px;
  margin-top: 4px;
  width: 2px;
  background-color: #999;
}
.tabs-col {
  height: 20px;
  line-height: 20px;
  color: #b83320;
}
</style>