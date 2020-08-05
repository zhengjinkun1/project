<template>
  <div class="search">
    <van-nav-bar class="nav" title="搜索" left-text="返回" left-arrow />
    <div class="search-inp">
      <van-search
        v-model="keyword"
        shape="round"
        background="#fff"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch(keyword)"
        @input="suggest(keyword)"
        @clear="toggle"
      >
        <template #action>
          <div @click="onSearch(keyword)">搜索</div>
        </template>
      </van-search>
    </div>

    <div v-if="isShow">
      <!-- 热门推荐 -->
      <div class="hotAdvice">
        <div class="advice-title-box clearfix">
          <div class="advice-title fl">
            <h1>热门推荐</h1>
          </div>
          <div class="fr advice-fr" @click="changeList">
            <div class="fl">换一批</div>
            <div class="advice-icon fl">
              <van-icon name="replay" size="12px" />
            </div>
          </div>
        </div>
        <div class="advice-box">
          <ul class="advice-box-item clearfix">
            <li
              class="advice-list fl"
              @click="goResult(item.word)"
              v-for="(item,index) in someHotWordData"
              :key="index"
            >{{item.word}}</li>
          </ul>
        </div>
      </div>

      <div class="search-history clearfix">
        <div class="history-title-box clearfix">
          <div class="history-title fl">
            <h1>搜索历史</h1>
          </div>
          <div class="fr history-fr clearfix" @click="removeHistory">
            <div class="fl">删除历史</div>
            <div class="advice-icon fl">
              <van-icon name="delete" size="14px" />
            </div>
          </div>
        </div>
        <div class="history-list">
          <ul>
            <li class="list-item" v-for="(item,index) in historyData" :key="index" @click="goResult(item)">{{item}}</li>
            <!-- <li class="list-item">你是</li> -->
          </ul>
        </div>
      </div>
    </div>

    <div class="searchAdvice" v-else>
      <ul>
        <li class="s-box" v-for="(item,index) in suggestData" :key="index" @click="goResult(item.title)">
          <span class="s-icon">
            <van-icon name="orders-o" />
          </span>
          <span class="s-content">{{item.title}}</span>
        </li>
       
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: "",
      allHotWordData: [],
      someHotWordData: [],
      start: 0,
      end: 6,
      isShow: true,
      historyData: [],
      suggestData: []
    };
  },
  created() {
    console.log(this.$store.state.word, "store");
    this.historyData = this.$store.state.word;
    // console.log('this.historyData=>',this.historyData)
    this.getHotWord(0, 6);
  },
  methods: {
    getHotWord(a, b) {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0
      });
      this.axios({
        method: "GET",
        url: "http://novel.kele8.cn/search-hotwords"
      })
        .then(result => {
          //关闭加载提示
          this.$toast.clear();
          console.log(result, "1111");
          this.allHotWordData = result.data.searchHotWords;
          //   console.log(this.allHotWordData);
          this.someHotWordData = this.allHotWordData.slice(a, b);
          console.log(this.someHotWordData);
        })
        .catch(err => {
          //关闭加载提示
          this.$toast.clear();
        });
    },
    // 换一批
    changeList() {
      this.someHotWordData = [];
      if (this.end >= this.allHotWordData.length) {
        this.start = 0;
        this.end = 6;
      } else {
        this.start += 6;
        this.end += 6;
        console.log(this.start, this.end);
      }
      this.someHotWordData = this.allHotWordData.slice(this.start, this.end);
      // console.log(this.start)
    },
    // 搜索
    onSearch(keyword) {
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
          // console.log(result, "1111");
          this.changeWord(this.keyword);
          this.$router.push({ name: "Result", query: { keyword } });
        })
        .catch(err => {
          //关闭加载提示
          this.$toast.clear();
        });
    },
    // 移除历史
    removeHistory() {
      this.$store.commit("remove");
      this.historyData.splice(0, this.historyData.length);
    },
    // 搜索建议
    suggest(keyword) {
      // console.log(this.isShow);
      // 如果为假则直接返回
      if (!this.isShow) {
        return;
      }
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
          console.log(result, "1111");
          this.suggestData = result.data.books.slice(0, 20);
          console.log(this.suggestData);
          this.isShow = false;
        })
        .catch(err => {
          //关闭加载提示
          this.$toast.clear();
        });
    },
    toggle() {
      this.isShow = true;
    },
    changeWord(keyword) {
      this.$store.commit("change", keyword);
    },
    goResult(keyword){
      this.$router.push({name:'Result',query:{keyword}})
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  padding-bottom: 50px;
}
.nav {
  background-color: #b83320;
}
/deep/ .van-icon,
/deep/ .van-nav-bar__text,
/deep/ .van-nav-bar__title {
  color: #fff;
}
.van-search {
  border-bottom: 1px solid #f5f6f7;
}
.van-search__content {
  background: #ebecec;
}
/deep/ .van-icon {
  color: #d4d4d5;
}
/deep/ .van-search[data-v-c5fdd562] {
  border-bottom: 0;
}
.hotAdvice {
  padding: 10px 20px 0;
}
h1 {
  margin: 0;
  color: #6b6b6b;
}
.advice-title-box {
  height: 30px;
  line-height: 30px;
}
.advice-fr,
.history-fr {
  text-align: right;
  color: #8a8a8f;
}
.advice-icon {
  margin-left: 5px;
  margin-top: 2px;
}
.advice-box {
  // margin-top: 10px;
  padding: 10px 0;
}
.advice-list {
  background-color: #efeff4;
  border-radius: 10px;
  color: #9b9ba3;
  padding: 8px 10px;
  margin: 0 8px 8px 0;
}
.search-history {
  padding: 15px 20px;
}
.history-title-box {
  height: 30px;
  line-height: 30px;
}
.history-list {
  margin-top: 20px;
}
.list-item {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #e8e8e8;
  color: #9b9ba3;
  font-size: 16px;
}
.searchAdvice {
  padding: 0px 20px;
}
.s-box {
  height: 40px;
  line-height: 40px;
  font-size: 16px;
}
.s-icon {
  // margin-top: 20px;
  // line-height: 10px;
  font-size: 12px;
}
.s-content {
  margin-left: 10px;
}
</style>