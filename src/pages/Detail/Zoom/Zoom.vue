<template>
  <div class="spec-preview">
    <!-- 左边 -->
    <img :src="imgUrl" />
    <div class="event" @mousemove="move" ref="event"></div>

    <!-- 遮罩层 -->
    <div class="mask" ref="mask"></div>  

    <!-- 右边 -->
    <div class="big">
      <img :src="bigUrl" ref="big"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:{
      bigUrl: String,
      imgUrl: String
    },
    mounted() {//这样宽度只取一次
      //因为mask初始是隐藏的,所以获取不到,但是event div的大小和mask是一样的 而且是显示的
      // this.maskWidth = this.$refs.mask.clientWidth;
      this.maskWidth = this.$refs.event.clientWidth/2;  //mask的宽度是event的一半
    },
    methods: {
      move(event){
        //初始化 left 和 top 
        let left=0;
        let top=0;
        //取出相关数据
        const {offsetX,offsetY} = event;
        // console.log(offsetX,offsetY);
        //获取mask宽度(高度也一样)
        // const maskWidth = this.$refs.mask.clientWidth;
        const maskWidth = this.maskWidth;
        //但是mask和event的宽度是一样的  
        // const maskWidth = this.

        //计算left = offsetX - maskWidth/2
        left = offsetX - maskWidth/2
        //left 必须在大于0小于 div  maskWidth的宽度
        if(left<0){
          left=0;
        }else if(left>maskWidth){
          left = maskWidth;
        }
        //计算top = offsetY - maskWidth/2
        top = offsetY - maskWidth/2
        if(top<0){
          top=0;
        }else if(top>maskWidth){
          top = maskWidth;
        }

        //指定遮罩层的样式坐标
        const maskDiv = this.$refs.mask
        maskDiv.style.left = left + 'px'
        maskDiv.style.top = top + 'px'

        //指定右侧大图的样式坐标
        const bigImg = this.$refs.big;
        bigImg.style.left = -2*left + 'px'
        bigImg.style.top = -2*top + 'px'
      }
    },
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;

    img {
      width: 100%;
      height: 100%
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 999;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #ccc;
      overflow: hidden;
      z-index: 998;
      display: none;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>