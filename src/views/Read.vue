<template>
  <!-- <div class=""> -->
  <div class="read" ref="red">
    <div class="read-box" ref="reb">
      <div class="title">{{title}}</div>
      <div class="bookContent" v-html="book" @click="cgPopup" ref="bookC" :style="{lineHeight:'25px'}"></div>
      <div class="top-box" v-if="isPopup">
        <div class="icon-box fl" @click="back">
          <div class="icon-item fl">
            <van-icon class="icon" name="arrow-left" size="22px" />
          </div>
          <div class="back fl">返回</div>
        </div>
        <div class="top-title fl">{{bookTitle}}</div>
      </div>
      <div class="btm-box" v-if="isPopup">
        <div class="change-bg-box">
          <span class="change-item" :class="{active:item.active}" @click="toggle(index)" v-for="(item,index) in changeBgData" :key="index">{{item.title}}</span>
          <!-- <span class="change-item">夜间</span>
          <span class="change-item">护眼</span> -->
        </div>
        <div class="change-chapter-box">
          <div class="chapter-item" @click="preChapter">上一章</div>
          <div class="chapter-item"><van-cell @click="showPopup">目录</van-cell></div>
          <div class="chapter-item" @click="nextChapter">下一章</div>
        </div>
      </div>
      <div class="left-popup">
        <van-popup v-model="show" position="left" :style="{ width: '70%',height:'100%'}" :overlay="false">
          <div class="popup-title-box">
            <div class="popup-item">
              <div class="popup-title">{{bookTitle}}</div>
              <div class="catalog">目录</div>
            </div>
          </div>
          <div class="popup-content">
            <ul>
              <li class="content-text" :class="{checkC:item.active}" v-for="(item,index) in chaptersData" :key="index" @click="goAssignChapter(index)">{{item.title}}</li>
              <!-- <li class="content-text">你的认识我</li> -->
            </ul>
          </div>
        </van-popup>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  data() {
    return {
      id: "",
      book: "",
      bookTitle:'',
      title: "",
      // 顶端和底端是否显示
      isPopup: false,
      // 侧边栏
      show: false,
      changeBgData:[
        {
          title:'默认',
          active:true,
          bgColor:'#EEE6DD',
          color:'#5c5d58'
        },
        {
          title:'夜间',
          active:false,
          bgColor:'#0c0c0c',
          color:'#666'
        },
        {
          title:'护眼',
          active:false,
          bgColor:'#b8cd8d',
          color:'#2E4E29'
        },
      ],
      chaptersData:[
        // {title:[]}
      ],
      nIndex:0
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getRead(this.id);
    this.bookTitle = this.$route.query.title;
    console.log(this.bookTitle);
  },
  methods: {
    // 切换模式
    toggle(index){
      if(this.changeBgData[index].active){
        return ;
      }
      for(let i=0;i<this.changeBgData.length;i++){
        if(this.changeBgData[i].active){
          this.changeBgData[i].active = false;
          break;
        }
      }
      this.changeBgData[index].active = true;
      this.$refs.red.style.backgroundColor = this.changeBgData[index].bgColor;
      this.$refs.reb.style.color = this.changeBgData[index].color;
      this.isPopup = !this.isPopup;
    },
    showPopup(){
      this.show = true;
      this.isPopup = !this.isPopup;
    },
    cgPopup(){
      console.log(Math.ceil(this.$refs.bookC.offsetHeight / this.$refs.bookC.style.lineHeight.split('px')[0]),Math.floor(document.documentElement.clientHeight / this.$refs.bookC.style.lineHeight.split('px')[0]),'-------------');
      console.log(Math.floor(this.$refs.bookC.offsetWidth / 16),'==========')
      if(this.show){
        this.isPopup = false; 
      }else {
        this.isPopup = !this.isPopup;
      }
      this.show = false;
    },
    //   获取书源
    getRead(id) {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0
      });
      this.axios({
        method: "GET",
        url: "http://novel.kele8.cn/book-sources",
        params: {
          view: "summary",
          book: id
        }
      })
        .then(result => {
          //关闭加载提示
          this.$toast.clear();
          console.log(result);
          let sourceId = result.data[0]._id;
          this.getChapter(sourceId);
        })
        .catch(err => {
          //关闭加载提示
          this.$toast.clear();
        });
    },
    // 获取章节列表
    getChapter(id) {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0
      });
      this.axios({
        method: "GET",
        url: `http://novel.kele8.cn/book-chapters/${id}`
      })
        .then(result => {
          //关闭加载提示
          this.$toast.clear();
          console.log(result, "00000");
          this.chaptersData = result.data.chapters;
          // this.chaptersData.active = false;
          this.chaptersData.forEach(v => {
            v.active = false;
          })
          this.chaptersData[0].active = true;
          // console.log(this.chaptersData);
          let link = encodeURIComponent(result.data.chapters[0].link);
          console.log(link);
          this.getChapterDetail(link);
        })
        .catch(err => {
          //关闭加载提示
          this.$toast.clear();
        });
    },
    // 获取章节详细内容
    getChapterDetail(link) {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0
      });
      this.axios({
        method: "GET",
        url: `http://novel.kele8.cn/chapters/${link}`
      })
        .then(result => {
          //关闭加载提示
          this.$toast.clear();
          console.log(result, "1111");
          // this.book = result.data.chapter.cpContent.split(/\n/);
          // this.book = this.book.slice(0,20);
          // console.log(this.book);
          // console.log(result.data.chapter.cpContent.split(/\n/));
          this.book = result.data.chapter.cpContent.replace(
            /\s\s\s/g,
            "<br>&nbsp&nbsp&nbsp&nbsp"
          );
          this.title = result.data.chapter.title;
        })
        .catch(err => {
          //关闭加载提示
          this.$toast.clear();
        });
    },

    // 下一章
    nextChapter(){
      // let nIndex = 0;
      this.nIndex ++;
      if(this.nIndex > this.chaptersData.length){
        this.nIndex = this.chaptersData.length;
        return;
      }
      let nLink = encodeURIComponent(this.chaptersData[this.nIndex].link)
      
      this.getChapterDetail(nLink);
      this.isPopup = !this.isPopup;
    },
    // 上一章
    preChapter(){
      this.nIndex--;
      if(this.nIndex < 0){
        this.nIndex = 0;
        return;
      }
      let pLink = encodeURIComponent(this.chaptersData[this.nIndex].link)
      this.getChapterDetail(pLink);
      this.isPopup = !this.isPopup;

    },
    // 跳转到指定章节
    goAssignChapter(index){
      // console.log(this.chaptersData);
      this.nIndex = index;
      let assignLink = encodeURIComponent(this.chaptersData[index].link);
      this.getChapterDetail(assignLink);
      this.$refs.reb.scrollTo(0,0);
      // console.log(this.$refs.bookC.scrollTop,'11111')
      this.show = false;
      this.isPopup = false;
      // 指定章节高亮切换
      if(this.chaptersData[index].active){
        return ;
      }
      for(let i=0;i<this.chaptersData.length;i++){
        if(this.chaptersData[i].active){
          this.chaptersData[i].active = false;
          break;
        }
      }
      this.chaptersData[index].active = true;
    },
    back(){
      this.$router.go(-1)
    }
  }
};
</script>

<style lang="less" scoped>
.read {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #eee6dd;
}
.read-box {
  padding: 20px 20px 0px;
  text-align: justify;
  height: 100%;
  overflow-y: auto;
  color: #5c5d58;
}
.bookContent {
  // height: 100%;
  margin-top: 20px;
  line-height: 25px;
  font-size: 16px;
}
.title {
  font-size: 16px;
}
/deep/ .van-nav-bar {
  background-color: transparent;
}
/deep/ .van-cell {
  padding: 0;
  background-color:transparent;
  // color: #888;
}
/deep/ .van-cell__value--alone {
  color: #888;
  // background-color: ;
}

.top-box {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 50px;
  background-color: rgba(50, 51, 52, 0.9);
  color: #fff;
}
.icon-box {
  height: 50px;
  line-height: 50px;
}
.icon-item {
  height: 50px;
}
.icon {
  height: 50px;
  line-height: 50px;
}
.top-title {
  margin-left: 100px;
  line-height: 50px;
}

.btm-box {
  width: calc(100% - 40px);
  height: 80px;
  position: absolute;
  padding: 20px;
  left: 0;
  bottom: 0;
  background-color: rgba(50, 51, 52, 0.9);
}
.change-bg-box {
  display: flex;
  justify-content: space-between;
}
.change-chapter-box {
  display: flex;
  justify-content: space-between;
}
.change-item {
  width: 80px;
  color: #fff;
  border: 1px solid #535353;
  box-sizing: border-box;
  border-radius: 10px;
  height: 30px;
  line-height: 30px;
  text-align: center;
}
.chapter-item {
  margin-top: 20px;
  color: #888;
  height: 30px;
  line-height: 30px;
}
.active {
  border: 1px solid #b93221;
  color:#b93221;
}
.popup-title-box {
  height: 80px;
  border-bottom: 1px solid #e8e8e8;
}
.popup-item {
  margin-left: 20px;
  font-size: 18px;
}
.popup-title {
  // padding: 15px 0 20px;
  margin-top: 20px;
  height: 25px;
  width: 240px;
  font-size: 18px;
   display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  // height: 30px;
  // line-height: 30px;
}
.catalog {
  margin-top: 15px;
  height: 20px;
  line-height: 20px;
  color: #999;
}
.popup-content {
  margin-left: 20px;
}
.content-text {
  height: 50px;
  line-height: 50px;
  padding-right: 35px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  border-bottom: 1px solid #e8e8e8;
  font-size: 12px;
  color: #999;
}
.checkC {
  color: #b93221;
}
</style>