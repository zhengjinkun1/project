<template>
  <div class="ranking">
    <van-nav-bar class="nav" title="排行榜" left-text="返回" left-arrow />
    <div class="clearfix ranking-box">
      <div class="sideBar fl">
        <van-sidebar
          v-model="activeKey"
          @change="getId(rankData[0][activeKey]._id)"
          @click="getRankDetail(id)"
        >
          <van-sidebar-item
            :title="item.shortTitle"
            v-for="(item,index) in rankData[0]"
            :key="index"
          />
        </van-sidebar>
      </div>
      <div class="content fl">
        <van-list
          v-model="loadOptions.isLoading"
          :finished="loadOptions.isFinished"
          :finished-text="loadOptions.finishedText"
          @load="loadBook"
        >
          <div class="content-box clearfix" v-for="(item,index) in someBookData" :key="index" @click="goBookDetail(item._id)">
            <div class="content-img fl">
              <img class="auto-img" :src="decodeURIComponent(item.cover).slice(7)" alt="">
            </div>
            <div class="content-fr fl">
              <div class="content-fr-title">{{item.title}}</div>
              <div class="content-fr-desc">{{item.shortIntro}}</div>
              <div class="content-fr-bt">
                <div class="fl content-author">{{item.author}}</div>
                <div class="fr content-fr-type">{{item.minorCate}}</div>
              </div>
            </div>
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeKey: 0,
      rankData: [],
      id: "",
      allBookData: [],
      someBookData: [],
      loadCount: 10,
      // bookImg:[],
      loadOptions: {
        //是否处于加载状态，加载过程中不触发load事件
        isLoading: true,
        //是否完成加载所有数据
        isFinished: false,
        finishedText: "没有数据可加载了"
      }
    };
  },
  created() {
    this.getRank();
    // this.getRankDetail(this.id);
  },
  methods: {
    getRank() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0
      });
      this.axios({
        method: "GET",
        url: "http://novel.kele8.cn/rank-category"
      })
        .then(result => {
          //关闭加载提示
          this.$toast.clear();
          // console.log(result);
          this.rankData.push(result.data.male);
          // console.log(this.rankData);
          this.getRankDetail(result.data.male[0]._id);
        })
        .catch(err => {
          //关闭加载提示
          this.$toast.clear();
        });
    },
    getRankDetail(a) {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0
      });
      this.axios({
        method: "GET",
        url: `http://novel.kele8.cn/rank/${a}`
      })
        .then(result => {
          //关闭加载提示
          this.$toast.clear();
          console.log(result, "1111");
          this.allBookData.push(result.data.ranking.books);
          // console.log(this.allBookData[0])
          this.someBookData = this.allBookData[0].splice(0, this.loadCount);
          // this.bookImg
          if (this.allBookData.length > 0) {
            this.loadOptions.isLoading = false;
          }
          console.log(this.someBookData,'0000');

         
        })
        .catch(err => {
          //关闭加载提示
          this.$toast.clear();
        });
    },

    getId(a) {
      console.log(a);
      this.id = a;
      this.getRankDetail(this.id);
    },

    loadBook() {
      setTimeout(() => {
        this.loadOptions.isLoading = false;
        this.someBookData.push(...this.allBookData[0].splice(0, this.loadCount));
        console.log(this.someBookData,'222222')
        if (this.allBookData[0].length == 0) {
          this.loadOptions.isLoading = true;
          this.loadOptions.isFinished = true;
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
.ranking {
  position: fixed;
  top: 0;
  bottom: 50px;
  left: 0;
  width: 100%;
}
.nav {
  background-color: #b83320;
}
/deep/ .van-icon,
/deep/ .van-nav-bar__text,
/deep/ .van-nav-bar__title {
  color: #fff;
}
.ranking-box {
  height: 100%;
}
.sideBar {
  width: 85px;
  height: 100%;
  overflow-y: auto;
}
.content {
  height: 100%;
  width: calc(100% - 85px);
  background-color: #fff;
  overflow-y: auto;
}
.content-box {
  padding: 10px 15px;
  height: 80px;
}
.content-img {
  width: 60px;
  height: 80px;
  background-color: #ddd;
}
.content-fr {
  width: calc(100% - 70px);
  margin-left: 10px;
}
.content-fr-title {
  height: 20px;
  line-height: 20px;
  font-size: 16px;
   display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.content-fr-desc {
  margin-top: 5px;
  height: 30px;
  font-size: 12px;
  color: #ccc;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.content-fr-bt {
  margin-top: 8px;
  height: 17px;
  line-height: 20px;
  // font-size: 12px;
  color: #c4c4c4;
}
.content-fr-type {
  height: 17px;
  background-color: #efeff4;
  border-radius: 5px;
  padding: 0 5px;
  font-size: 9px;
  color: #777;
}
.content-author {
  height: 14px;
  line-height: 14px;
}
</style>