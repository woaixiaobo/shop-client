<template>
    <!--banner轮播-->
<div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper" >
        <!-- 此时是动态数据,需要在列表更新之后再进行轮播状态,否则就是先轮播才显示数据,
        但是先轮播是没有数据的,所以导致轮播失败,因此要用watch + $nextTick()的方法来解决这个问题
        -->
        <div class="swiper-slide" v-for="item in carouselList" :key="item.id">
            <img :src="item.imgUrl" />
        </div>
        <!-- <div class="swiper-slide">
            <img src="../images/banner2.jpg" />
        </div>
        <div class="swiper-slide">
            <img src="../images/banner3.jpg" />
        </div>
        <div class="swiper-slide">
            <img src="../images/banner4.jpg" />
        </div> -->
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
</div>
</template>
    
<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
export default {
    props:{//接受ListContainer或者Floor组件传递过来的数据
        carouselList: Array
    },
    watch: {
            carouselList:{
                handler(val){
                    //列表更新后的数据(就是获取的接口数据)
                    console.log(val);
                    //nextTick方法在列表数据更新后再次获取列表的数据,然后此时在创建swiper对象
                    //就可以正常显示轮播效果了,否则是没有数据的
                    //因为vue更新界面是异步的,我们更新了数据,监听回调会立马更新数据,
                    //但是页面更新是异步的,此时列表当中还没有数据(console.log(this.$refs.msg.innerHTML)),
                    //所以在这时创建swiper是没有轮播效果的
                    if(val.length>0){//如果有数据发生变化在创建延迟swiper
                        this.$nextTick(()=>{
                        this.initSwiper();
                        })
                    }
                },
                immediate:true,//创建时就调用一次
            }
        },
    methods: {
        initSwiper(){               
            //这样写会把所有的swiper都起作用
            // new Swiper ('.swiper-container', {

            //所以用ref标识目标元素
            // setTimeout(()=>{
                new Swiper (this.$refs.swiper, {
                    direction: 'horizontal', // 水平切换选项
                    loop: true, // 循环模式选项
                    
                    // 如果需要分页器
                    pagination: {
                    el: '.swiper-pagination',
                    },
                    
                    // 如果需要前进后退按钮
                    navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    },
                    
            }) 
            // },1000)
        }
    },
}
</script>
<style scoped>
    
</style>    