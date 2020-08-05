<template>
  <div class="detail">
    <div class="nav">
      <van-nav-bar fixed :title="major" left-text="返回" class="nav-item" left-arrow @click-left="back"/>
    </div>
    <div class="tabs-box">
      <!-- <van-tabs
        line-height="0"
        title-active-color="#b83320"
        v-model="active"
        sticky
        offset-top="46px"
      >
        <van-tab :name="index" :title="item" v-for="(item,index) in classifyData" :key="index"> -->
          <div v-if="!isShow">
            <van-empty description="暂时没有书籍看看其它的吧" />
          </div>
          <div class="tabs-list" v-else>
            <ul>
              <li class="tabs-li" v-for="(item,index) in bookData" :key="index" @click="goBookDetail(item._id)">
                <div class="tabs-list-box clearfix">
                  <div class="fl tabs-box-img">
                    <img class="auto-img" :src="bookImg[index]" alt />
                  </div>
                  <div class="fl tabs-box-content">
                    <div class="tabs-content-top">
                      <div class="tabs-content-title">{{item.title}}</div>
                      <div class="tabs-content-item">
                        <span class="tabs-content-list author fl">{{item.author}}</span>
                        <span class="tabs-content-list line fl"></span>
                        <span class="tabs-content-list fl">{{item.majorCate}}</span>
                      </div>
                      <div class="tabs-content-desc">{{item.shortIntro}}</div>
                    </div>
                    <div class="tabs-content-btm clearfix">
                      <span class="tabs-btm-item hot fl">
                        <span class="tabs-col hot-count">{{changeNum(item.latelyFollower)}}</span> 人气
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

          
        <!-- </van-tab>
      </van-tabs> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      major: "",
      type: "",
      classifyData: [],
      minor: "",
      bookData: [],
      bookImg: [],
      isShow:true
    };
  },
  created() {
    this.major = this.$route.query.major;
    this.type = this.$route.query.type;
    console.log(this.type);
    console.log(this.major);
    this.getClassify();
    // this.getDetail();
    // this.dian(this.classifyData[0]);
  },
  methods: {
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
    getClassify() {
      this.$toast.loading({
        message: "加载中",
        forbidClick: true,
        duration: 0
      });
      this.axios({
        method: "GET",
        url: "http://novel.kele8.cn/sub-categories"
      })
        .then(result => {
          this.$toast.clear();
          // console.log(this.type,'222');
          // console.log(result);
          console.log(result.data[this.type], "2222");
          for (let i = 0; i < result.data[this.type].length; i++) {
            if (result.data[this.type][i].major == this.major) {
              this.classifyData = result.data[this.type][i].mins;
              break;
            }
          }
          console.log(this.classifyData, "1111");
          // this.dian(this.classifyData[0])
          // this.getDetail(this.classifyData[0]);
          this.getDetail();
        })
        .catch(err => {
          this.$toast.clear();
          console.log(err);
          // this.$toast.clear();
        });
    },
    getDetail() {
      // console.log(this.major,'1221')
      this.$toast.loading({
        message: "加载中",
        forbidClick: true,
        duration: 0
      });
      this.axios({
        method: "GET",
        url: "http://novel.kele8.cn/category-info",
        params: {
          gender: this.type,
          major: this.major,
          // minor: aa,
          start: 0,
          limit: 20
        }
      })
        .then(result => {
          this.$toast.clear();
          console.log(result,'???');
          if (result.status == 200) {
            // this.bookData.push(result.data.books);
            this.bookData = result.data.books;
            console.log(this.bookData.length);
            if(this.bookData.length == 0){
              // this.bookData = '没有数据';
              // console.log('aa');
              this.isShow = false;
            }
            // result.data.books.
            result.data.books.forEach(v => {
              this.bookImg.push(decodeURIComponent(v.cover).slice(7));
              // console.log(v)
            });
            // console.log(this.bookImg)
          }
        })
        .catch(err => {
          this.$toast.clear();
          console.log(err);
        });
    },
    back(){
      this.$router.go(-1)
    },
    goBookDetail(index){
      // console.log(index)
      this.$router.push({name:'BookDetail',query:{id:index}})
    }
  }
};
</script>

<style lang="less" scoped>
.nav-item {
  background-color: #b83320;
}
/deep/ .van-icon,
/deep/ .van-nav-bar__text,
/deep/ .van-nav-bar__title {
  color: #fff;
}
/deep/ .van-hairline--top-bottom {
  border: 0 solid transparent;
}
.tabs-box {
  margin-top: 46px;
}
.tabs-list {
  background-color: #f5f2ed;
  padding: 15px 20px;
  overflow-y: auto;
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