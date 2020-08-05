<template>
  <!-- 搜索结果页面 -->
  <div class="result">
    <van-nav-bar class="nav" :title="'跟'+keyword+'有关的书籍'" left-text="返回" left-arrow @click-left="back" />
    <van-list
          v-model="loadOptions.isLoading"
          :finished="loadOptions.isFinished"
          :finished-text="loadOptions.finishedText"
          @load="loadBook"
        >
    <div class="tabs-list">
      <ul>
        
          <li class="tabs-li" v-for="(item,index) in someBookData" :key="index" @click="goBookDetail(item._id)">
            <div class="tabs-list-box clearfix">
              <div class="fl tabs-box-img">
                <img class="auto-img" :src="decodeURIComponent(item.cover).slice(7)" alt />
              </div>
              <div class="fl tabs-box-content">
                <div class="tabs-content-top">
                  <div class="tabs-content-title">{{item.title}}</div>
                  <div class="tabs-content-item">
                    <span class="tabs-content-list author fl">{{item.author}}</span>
                    <span class="tabs-content-list line fl"></span>
                    <span class="tabs-content-list fl">{{item.cat}}</span>
                  </div>
                  <div class="tabs-content-desc">{{item.shortIntro}}</div>
                </div>
                <div class="tabs-content-btm clearfix">
                  <span class="tabs-btm-item hot fl">
                    <span class="tabs-col hot-count">{{changeNum(item.wordCount)}}</span> 人气
                  </span>
                  <span class="tabs-btm-item tabs-content-line fl"></span>
                  <span class="tabs-btm-item advice fl">
                    <span class="tabs-col advice-count">{{item.latelyFollower}}</span> 位读者留存
                  </span>
                </div>
              </div>
            </div>
          </li>
        
      </ul>
    </div>
    </van-list>
  </div>
</template>

<script>
export default {
  created(){
    this.keyword = this.$route.query.keyword;
    // console.log(this.keyword);
    this.getBook(this.keyword);
  },
  data(){
    return {
      // res:'你的',
      keyword:'',
      allBookData: [],
      someBookData: [],
      loadCount:10,
      loadOptions: {
        isLoading: true,
        isFinished: false,
        finishedText: "没有数据可加载了"
      }
    }
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
    back(){
      this.$router.go(-1);
    },
    getBook(keyword){
       this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0
      });
      this.axios({
        method: "GET",
        url: "http://novel.kele8.cn/search",
        params: {
          keyword
        }
      })
        .then(result => {
          //关闭加载提示
          this.$toast.clear();
          console.log(result, "222");
          this.allBookData = result.data.books;
          if(this.allBookData.length > this.loadCount){
            this.someBookData =this.allBookData.splice(0,this.loadCount);
          }
            
          
          console.log(this.someBookData);
          if (this.allBookData.length > 0) {
            this.loadOptions.isLoading = false;
          }
        })
        .catch(err => {
          //关闭加载提示
          this.$toast.clear();
        });
    },

    loadBook() {
      setTimeout(() => {
        this.loadOptions.isLoading = false;
        this.someBookData.push(...this.allBookData.splice(0, this.loadCount));
        console.log(this.someBookData,'222222')
        if (this.allBookData.length == 0) {
          this.loadOptions.isLoading = true;
          this.loadOptions.isFinished = true;
          // return;
        }
      }, 1000);
    },
    goBookDetail(index){
      // console.log(index)
      this.$router.push({name:'BookDetail',query:{id:index}})
    }
  }
};
</script>

<style lang="less" scoped>
.nav {
  background-color: #b83320;
}
/deep/ .van-icon,
/deep/ .van-nav-bar__text,
/deep/ .van-nav-bar__title {
  color: #fff;
}
.tabs-list {
  background-color: #f5f2ed;
  padding: 0 0 0 20px;
  overflow-y: auto;

}

.tabs-li {
  padding: 15px 0px;
}
.tabs-li:not(:last-child) {
  // border-bottom: 0;
  border-bottom: 1px solid #e8e8e8;

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
  padding-left: 10px;
  width: calc(100% - 68px);
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