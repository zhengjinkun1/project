<template>
  <div id="box">
    <!-- /* page有前后两面 */ -->
    <div class="page" @click="togoleRegister(true)">
      <div class="front"></div>
      <div class="back"></div>
    </div>
    <!-- /* page2为翻页之后显示的*/ -->
    <div class="page2" @click="togoleRegister(false)"></div>
  </div>
</template>

<script>
export default {
  // data() {
  //   return {
  //     list: "",
  //     res: ""
  //   };
  // },
  // created(){
  //   var b = '5a6844aafc84c2b8efaa6b6e'
  //   this.getA(b)
  // },
  methods: {
    // getA(a){
    //   this.axios({
    //     method:'GET',
    //     // url:`http://novel.kele8.cn/rank/${a}`,
    //     url:'http://api.zhuishushenqi.com/cats/lv2/statistics',
    //     // params:{
    //     //   gender:'male',
    //     //   major:'玄幻',
    //     // //   book:'51060c88bb1c67cf28000035'
    //     //   minor:'远古神话',
    //     //   // minor:'远古神话',
    //     // // //   // start:0,
    //     // // //   // limit:20
    //     // }
    //   }).then(result => {
    //       console.log(result)
    //       // this.list = result.data.docs[0].book.cover.slice(7);
    //       // console.log(this.list);
    //       // this.res =this.aa(this.list);
    //       // console.log(this.res);

    //     })
    //     .catch(err => {
    //       console.log(err)
    //       // this.$toast.clear();

    //     });
    // },

    togoleRegister(val) {
      var oBox = document.getElementById("box");
      var oPage = document.querySelector(".page");
      console.log("oPage.style", oPage.style);
      if (val == true) {
        oPage.style.WebkitTransform = "perspective(1600px) rotateY(-180deg)";
        // oPage.style.opacity = '0'
      } else {
        oPage.style.WebkitTransform = "perspective(1600px) rotateY(0)";
        // oPage.style.opacity = '1'
      }
    }
  }
};
</script>
<style scoped>
#box {
  /* background: url("../assets/0.png") no-repeat; */
  width: 700px;
  height: 400px;
  /* 此处是为了让Box在中间显示 */
  margin: 100px auto;
  position: relative;
}

/* 设定page的位置 */
#box .page {
  /* 因为其在展示区右侧，所以宽度为整个box的一般，并定在右侧 */
  width: 50%;
  height: 100%;
  top: 0;
  right: 0;
  position: absolute;
  /* 将开启3d空间，方便翻页后front和back的3d变换 */
  transform-style: preserve-3d;
  /* 奇点设为左边 */
  transform-origin: left center;
  /* 设置翻书（旋转）的运动时间，运动形式 */
  transition: 1s all ease;
  /* 提升层级否则会被盖住 */
  z-index: 2;
  /* 设置景深来更好的展示3D效果，并给旋转角度一个初始值，防止抖动发生 */
  transform: perspective(800px) rotateY(0deg);
}

/* 配置旋转页的前页 */
.page .front {
  /* 宽高与父级page一样 */
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  /* 将背景设成为与前一页相同的背景,并且只要右面的那部分，与页面左部分拼接 */
  /* background: url("../assets/0.png") right top no-repeat; */
  /* backface-visibility属性和3D transform效果相关，它决定当一个元素的背面面是否可见 */
  backface-visibility: hidden;
  /* 提升层级否则会被盖住 */
  z-index: 2;
}

/* 配置旋转页的后页 */
.page .back {
  /* 宽高与父级page一样 */
  width: 100%;
  height: 100%;
  /* 将背景设成为与下一页相同的背景,并且只要左面的那部分，与右部分的page2拼接 */
  /* background: url("../assets/1.png") left top no-repeat; */
  position: absolute;
  left: 0;
  top: 0;
  /* 这里设置将back进行水平方向上的镜像变化，因为当page旋转180°后， back显示的效果不对*/
  transform: scale(-1, 1);
  /* 改变层级避免盖住其他页面 */
  z-index: 1;
}

/* 配置pages展示区 */
#box .page2 {
  /* 因为其只在页面右侧展示所以宽为Box的一半 */
  width: 50%;
  height: 100%;
  top: 0;
  right: 0;
  position: absolute;
  /* 将背景设成为与下一页相同的背景,并且只要右面的那部分，与左部分（.page .back）拼接 */
  /* background: url("../assets/1.png") right top no-repeat; */
  /* 改变层级避免盖住其他页面 */
  z-index: 1;
}
#box:before {
  content: "";
  position: absolute;
  top: 0%;
  right: 0%;
  width: 0px;
  height: 0px;
  background-color: #fff;
  background: linear-gradient(
    225deg,
    #ffffffd1 45%,
    #d2d2d2 50%,
    #cacaca 56%,
    #ffffffd9 80%
  );
  -webkit-box-shadow: -1px 1px 1px #f0f0f0;
  box-shadow: 3px 7px 15px #d8d8d8;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: width, height;
  transition-property: width, height;
  z-index: 20;
}
#box:hover:before {
  width: 100px;
  height: 100px;
}
</style>
