<template>
  <div class="home">
    <van-nav-bar title="首页" class="nav" />

    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in bannerData" :key="index">
          <img class="auto-img" :src="item.url" alt />
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="home-box">
      <div class="home-box-item">
        <div class="line"></div>
        <h3>游戏</h3>
        <div class="home-content-box clearfix" v-for="(item,index) in successBookData" :key="index" @click="goBookDetail(item._id)">
          <div class="home-content-img fl">
            <img class="auto-img" :src="bookImg[index]" alt />
          </div>
          <div class="home-content-item fl">
            <div class="home-content-title">{{item.title}}</div>
            <div class="home-content-desc">{{item.shortIntro}}</div>
            <div class="home-content-type">
              <div class="fl clearfix home-type-box">
                <div class="fl home-content-t">{{item.minorCate}}</div>

                <div class="fl home-content-hot">
                  <span class="home-count">{{item.latelyFollower}}</span> 人气
                </div>
                <div class="home-content-line"></div>
              </div>
              <div class="fr home-ty">{{item.majorCate}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="home-btn" @click="goDetaill()">查看更多</div>
    </div>

    <div class="home-box">
      <div class="home-box-item">
        <div class="line"></div>
        <h3>好评榜</h3>
        <div class="home-content-box clearfix" v-for="(item,index) in goodData[0]" :key="index" @click="goBookDetail(item._id)">
          <div class="home-content-img fl">
            <img class="auto-img" :src="goodImg[index]" alt />
          </div>
          <div class="home-content-item fl">
            <div class="home-content-title">{{item.title}}</div>
            <div class="home-content-desc">{{item.shortIntro}}</div>
            <div class="home-content-type">
              <div class="fl clearfix home-type-box">
                <div class="fl home-content-t">{{item.minorCate}}</div>

                <div class="fl home-content-hot">
                  <span class="home-count">{{changeNum(item.latelyFollower)}}</span> 人气
                </div>
                <div class="home-content-line"></div>
              </div>
              <div class="fr home-ty">{{item.majorCate}}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="home-btn">查看更多</div> -->
    </div>
  </div>
</template>

<script>
import BookDetailVue from '../BookDetail.vue';
export default {
  created() {
    this.getBook();
    this.getId();
  },
  data() {
    return {
      bannerData: [
        {
          url:
            "https://plf-new.zhuishushenqi.com/management/images/20200703/3211dec77cad4f0b8a610e49aa4c429b.jpg"
        },
        {
          url:
            "https://plf-new.zhuishushenqi.com/management/images/20200710/92ded56021924a53a0c3edb73a3e6ea9.jpg"
        },
        {
          url:
            "https://plf-new.zhuishushenqi.com/management/images/20200710/68002d4b4b334227a4fda1f4cd9990a7.jpg"
        },
        {
          url:
            "https://plf-new.zhuishushenqi.com/management/images/20200710/19ccd241fee0446a82b328ed13fd8a90.jpg"
        }
      ],
      // 游戏
      successBookData: [],
      bookImg: [],
      id:'',
      goodData:[],
      goodImg:[],
      // _id:''
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
    getBook(major) {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0
      });
      this.axios({
        method: "GET",
        url: "http://novel.kele8.cn/category-info",
        params: {
          gender:'male',
          major:'游戏',
          start: 0,
          limit: 4
        }
      })
        .then(result => {
          //关闭加载提示
          this.$toast.clear();
          console.log(result);
          this.successBookData = result.data.books;
          console.log(this.successBookData,'0000');
          result.data.books.forEach(v => {
            this.bookImg.push(decodeURIComponent(v.cover).slice(7));
          });
          // this._id = result.data.books
          // console.log(this.bookImg);
        })
        .catch(err => {
          //关闭加载提示
          this.$toast.clear();
        });
    },
    getId(){
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0
      });
      this.axios({
        method: "GET",
        url: "http://novel.kele8.cn/rank-category",
       
      })
        .then(result => {
          //关闭加载提示
          this.$toast.clear();
          // console.log(result);
          this.id = result.data.male[1]._id;
          // console.log(this.id);
          this.getGood(this.id);
          
        })
        .catch(err => {
          //关闭加载提示
          this.$toast.clear();
        });
    },
    getGood(a){
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0
      });
      this.axios({
        method: "GET",
        url: `http://novel.kele8.cn/rank/${a}`,
       
      })
        .then(result => {
          //关闭加载提示
          this.$toast.clear();
          // console.log(result,'111');
          // console.log(result.data.ranking.books.slice(0,5),'2222');
          this.goodData.push(result.data.ranking.books.slice(0,7));
          // console.log(this.goodData,'222')
          // 将图片进行解码
          this.goodData[0].forEach(v=>{
            this.goodImg.push(decodeURIComponent(v.cover).slice(7))
          })
          // console.log(this.goodImg,'000')
          
        })
        .catch(err => {
          //关闭加载提示
          this.$toast.clear();
        });
    },
    goBookDetail(index){
      // console.log(index)
      this.$router.push({name:'BookDetail',query:{id:index}})
    },
    goDetail(){
      this.$router.push({name:'Detail',query:{major:'游戏',type:'male'}})
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  background-color: #f4f4f4;
  padding-bottom: 60px;
}
/deep/ .van-nav-bar__title {
  color: #fff;
}
.nav {
  background-color: #b83320;
}
.banner {
  height: 153px;
}
.home-box {
  margin-top: 10px;
  background-color: #fff;
  padding: 10px 15px;
  position: relative;
}
h3 {
  margin: 0;
}
.line {
  position: absolute;
  height: 20px;
  width: 2px;
  top: 10px;
  left: 0;
  background-color: #b83320;
}
.home-content-box {
  // margin-top:15px;
  padding: 10px 0;
}
.home-content-img {
  width: 60px;
  height: 80px;
  // background-color: #ddd;
}
.home-content-item {
  margin-left: 10px;
  width: calc(100% - 70px);
  height: 80px;
}
.home-content-title {
  height: 20px;
  line-height: 20px;
  font-size: 16px;
}
.home-content-desc {
  height: 35px;
  font-size: 12px;
  color: #a2a2a2;
  margin-top: 5px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.home-content-type {
  height: 20px;
  line-height: 20px;
}
.home-ty {
  height: 20px;
  padding: 0 5px;
  color: #ffa647;
  font-size: 10px;
  border: 1px solid #ffa647;
  box-sizing: border-box;
  border-radius: 2px;
}
.home-type-box {
  position: relative;
}
.home-content-t {
  width: 60px;
}
.home-content-line {
  position: absolute;
  top: 0;
  left: 60px;
  width: 2px;
  height: 12px;
  margin-top: 4px;
  background-color: #ddd;
}
.home-content-hot {
  margin-left: 15px;
}
.home-count {
  color: #b83320;
}
.home-btn {
  padding: 10px;
  color: #b83320;
  border-top: 1px solid #e8e8e8;
  text-align: center;
  font-size: 14px;
}
</style>