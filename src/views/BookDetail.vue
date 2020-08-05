<template>
  <div class="bookDetail">
    <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="back">
     
    </van-nav-bar>

    <div class="book-desc-box clearfix">
      <div class="book-desc-img fl">
        <img class="auto-img" :src="imgData" alt="">
      </div>
      <div class="book-desc-right fl">
        <div class="book-name">{{bookDetail.title}}</div>
        <div class="author">
          <span class="author-name fl">{{bookDetail.author}}</span>
          <span class="line"></span>
          <span class="author-type fl author-color">{{bookDetail.minorCate}}</span>
          <span class="line1"></span>
          <span class="author-count fl author-color">{{changeNum(bookDetail.wordCount)}}字</span>
        </div>
        <div class="update author-color">最近更新时间 {{updatedTime}}</div>
      </div>
    </div>

    <div class="btn">
      <van-button color="#b83320" block  @click="goRead">开始阅读</van-button>
    </div>

    <div class="render-action clearfix">
      <div class="render-action-box popular fl">
        <div class="render-pop">追人气</div>
        <div class="render-count">{{changeNum(bookDetail.totalFollower)}}</div>
      </div>
      <div class="render-action-box fl rate">
        <div class="render-pop">读者留存率</div>
        <div class="render-count">{{bookDetail.retentionRatio}}%</div>
      </div>
      <div class="render-action-box fl up-count">
        <div class="render-pop">日更字数/天</div>
        <div class="render-count">{{bookDetail.serializeWordCount == -1 ? 0:bookDetail.serializeWordCount}}</div>
      </div>
    </div>

    <div class="desc-box">
      <div class="desc-item" v-if="isShow">
        {{descData}}
        <div class="desc-icon">
          <i class="fa fa-angle-down" aria-hidden="true" @click="changeIcon(1)"></i>
        </div>
      </div>

      <div class="desc-item-show" v-else>
        {{descData}}
        <div class="desc-icon">
          <i class="fa fa-angle-up" aria-hidden="true" @click="changeIcon"></i>
        </div>
      </div>
    </div>

    <div class="advice">
      <!-- <h3></h3> -->
      <div class="advice-box clearfix">
        <div class="advice-line"></div>
        <div class="advice-title fl">你可能喜欢</div>
        <div class="advice-more fr" @click="goRecommend">更多</div>
      </div>
      <div class="advice-book">
        <ul class="clearfix advice-ul">
          <li class="advice-list fl" v-for="(item,index) in remData" :key="index">
            <div class="advice-list-item">
              <img
                class="auto-img"
                :src="decodeURIComponent(item.cover).slice(7)"
                alt
              />
              <span class="advice-desc">{{item.title}}</span>
            </div>
          </li>
          
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.id = this.$route.query.id;
    console.log(this.id);
    this.getBookDetail(this.id);
    this.getRecommed(this.id);
  },
  data() {
    return {
      isShow: true,
      id: "",
      bookDetail:{},
      updatedTime:'',
      imgData:'',
      descData:'',
      remData:[],
      remImgData:''
    };
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
    changeIcon(index) {
      if (index == 1) {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    },
    back() {
      this.$router.go(-1);
    },
    getBookDetail(id) {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0
      });
      this.axios({
        method: "GET",
        url: `http://novel.kele8.cn/book-info/${id}`
      })
        .then(result => {
          //关闭加载提示
          this.$toast.clear();
          console.log(result);
          this.bookDetail = result.data;
          this.updatedTime = result.data.updated.slice(0,10);
          this.imgData = decodeURIComponent(result.data.cover).slice(7)
          this.descData = result.data.longIntro.split(/\n\s\s/).join('');
          // console.log(this.descData)
        })
        .catch(err => {
          //关闭加载提示
          this.$toast.clear();
        });
    },
    getRecommed(id){
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
          // console.log(result);
          this.remData = result.data.books.slice(0,4);
          // this.remImgData = result

        })
        .catch(err => {
          //关闭加载提示
          this.$toast.clear();
        });
    },
    goRecommend(){
      // console.log('11111')
      this.$router.push({name:'Recommend',query:{id:this.id}});
    },
    goRead(){
      // console.log(this.bookDetail.title)
      this.$router.push({name:'Read',query:{id:this.id,title:this.bookDetail.title}});
    }
  }
};
</script>

<style lang="less" scoped>
.bookDetail {
  background-color: #f4f4f4;
}
.van-nav-bar {
  background-color: #b83320;
}
/deep/ .van-nav-bar__text,
/deep/ .van-nav-bar .van-icon,
/deep/ .van-nav-bar__title {
  color: #fff;
}
.book-desc-box {
  padding: 20px;
  background-color: #fff;
}
.book-desc-img {
  height: 100px;
  width: 80px;
  background-color: #ddd;
}
.book-desc-right {
  margin-left: 10px;
  width: calc(100% - 90px);
  height: 100px;
  // overflow: hidden;
}
.book-name {
  height: 30px;
  line-height: 30px;
  font-weight: bold;
  font-size: 16px;
}
.author {
  height: 30px;
  line-height: 30px;
  position: relative;
  font-size: 14px;
}
.line {
  position: absolute;
  width: 2px;
  height: 13px;
  background-color: #c4a699;
  margin-top: 8px;
  margin-left: 10px;
}
.line1 {
  position: absolute;
  width: 2px;
  height: 13px;
  background-color: #c4a699;
  margin-top: 8px;
  margin-left: 10px;
}
.author-color {
  color: #ccc;
}
.author-name {
 
  color: #b83320;
  text-align: left;
}
.author-type {
  margin-left: 20px;
  text-align: left;
}
.author-count {
  margin-left: 20px;
}
.update {
  height: 30px;
  line-height: 30px;
  font-size: 14px;
}
.btn {
  padding: 0 20px 10px 20px;
  background-color: #fff;
}
.render-action {
  margin-top: 10px;
  height: 80px;
  border-bottom: 1px solid #e8e8e8;
  border-top: 1px solid #e8e8e8;
  background-color: #fff;
}
.render-action-box {
  width: 33.3%;
  // border: 1px solid #000;
  // box-sizing: border-box;
  height: 80px;
  text-align: center;
}
.render-pop {
  height: 20px;
  line-height: 20px;
  margin-top: 20px;
  color: #ccc;
  font-size: 12px;
}
.render-count {
  margin-top: 3px;
  height: 20px;
  line-height: 20px;
  // font-weight: bold;
  font-size: 16px;
}
.desc-box {
  padding: 20px;
  border-bottom: 1px solid #e8e8e8;
  position: relative;
  background-color: #fff;
}
.desc-item {
  line-height: 25px;
  font-size: 14px;
  height: 70px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.desc-icon {
  font-size: 20px;
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.desc-item-show {
  line-height: 25px;
  font-size: 14px;
}
.advice {
  margin-top: 10px;
  background-color: #fff;
  padding:20px;
  position: relative;
}
.advice-title {
  font-size: 16px;
}
.advice-line {
  position: absolute;
  top: 20px;
  left: 0;
  width: 2px;
  height: 20px;
  background-color: #b83320;
}
.advice-more {
  color: #b83320;
  font-size: 12px;
  height: 30px;
  width: 30px;
  line-height: 20px;
  text-align: right;
}
.advice-box {
  height: 40px;
  
  // line-height: 40px;
}

.advice-ul {
  display: flex;
}
.advice-list {
  text-align: left;
  flex: auto;
}
.advice-list:not(:last-child) {
  margin-right: 10px;
  box-sizing: border-box;
}
.advice-desc {
  margin-top: 10px;
  font-size: 14px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.advice-list-item {
  width: 75px;
  height: 80px;
}
</style>