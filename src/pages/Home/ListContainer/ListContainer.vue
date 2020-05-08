<template>
    <!--列表-->
    <div class="list-container">
        <div class="sortList clearfix">
            <div class="center">
                <!--banner轮播-->
                <div class="swiper-container" ref="swiper">
                    <div class="swiper-wrapper" >
                        <!-- 此时是动态数据,需要在列表更新之后再进行轮播状态,否则就是先轮播才显示数据,
                        但是先轮播是没有数据的,所以导致轮播失败,因此要用watch + $nextTick()的方法来解决这个问题
                        -->
                        <div class="swiper-slide" v-for="banner in banners" :key="banner.id">
                            <img :src="banner.imgUrl" />
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
            </div>
            <div class="right">
                <div class="news">
                    <h4>
                        <em class="fl">尚品汇快报</em>
                        <span class="fr tip">更多 ></span>
                    </h4>
                    <div class="clearix"></div>
                    <ul class="news-list unstyled">
                        <li>
                            <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                        </li>
                        <li>
                            <span class="bold">[公告]</span>备战开学季 全民半价购数码
                        </li>
                        <li>
                            <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                        </li>
                        <li>
                            <span class="bold">[公告]</span>备战开学季 全民半价购数码
                        </li>
                        <li>
                            <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                        </li>
                    </ul>
                </div>
                <ul class="lifeservices">
                    <li class=" life-item ">
                        <i class="list-item"></i>
                        <span class="service-intro">话费</span>
                    </li>
                    <li class=" life-item ">
                        <i class="list-item"></i>
                        <span class="service-intro">机票</span>
                    </li>
                    <li class=" life-item ">
                        <i class="list-item"></i>
                        <span class="service-intro">电影票</span>
                    </li>
                    <li class=" life-item ">
                        <i class="list-item"></i>
                        <span class="service-intro">游戏</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">彩票</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">加油站</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">酒店</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">火车票</span>
                    </li>
                    <li class=" life-item ">
                        <i class="list-item"></i>
                        <span class="service-intro">众筹</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">理财</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">礼品卡</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">白条</span>
                    </li>
                </ul>
                <div class="ads">
                    <img src="../images/ad1.png" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import Swiper from 'swiper'
    import 'swiper/css/swiper.min.css'
    export default {
        name:'ListContainer',
        computed: {
            ...mapState({
                banners: state => state.home.banners
            })
        },
        watch: {
            banners(val){
                //列表更新后的数据(就是获取的接口数据)
                console.log(val);
                //nextTick方法在列表数据更新后再次获取列表的数据,然后此时在创建swiper对象
                //就可以正常显示轮播效果了,否则是没有数据的
                //因为vue更新界面是异步的,我们更新了数据,监听回调会立马更新数据,
                //但是页面更新是异步的,此时列表当中还没有数据(console.log(this.$refs.msg.innerHTML)),
                //所以在这时创建swiper是没有轮播效果的
                this.$nextTick(()=>{
                    this.initSwiper();
                })
            }
        },
        mounted() {
            //列表数据显示之后再创建Swiper才有正常的轮播效果,但是这种方法并不妥当,所以改为下边的方法
            // setTimeout(()=>{
            //     initSwiper();
            // })
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
<style lang="less" scoped>
    .list-container {
        width: 1200px;
        margin: 0 auto;

        .sortList {
            height: 464px;
            padding-left: 210px;

            .center {
                box-sizing: border-box;
                width: 740px;
                height: 100%;
                padding: 5px;
                float: left;
            }

            .right {
                float: left;
                width: 250px;

                .news {
                    border: 1px solid #e4e4e4;
                    margin-top: 5px;

                    h4 {
                        border-bottom: 1px solid #e4e4e4;
                        padding: 5px 10px;
                        margin: 5px 5px 0;
                        line-height: 22px;
                        overflow: hidden;
                        font-size: 14px;

                        .fl {
                            float: left;
                        }

                        .fr {
                            float: right;
                            font-size: 12px;
                            font-weight: 400;
                        }
                    }

                    .news-list {
                        padding: 5px 15px;
                        line-height: 26px;

                        .bold {
                            font-weight: 700;
                        }
                    }
                }

                .lifeservices {
                    border-right: 1px solid #e4e4e4;
                    overflow: hidden;
                    display: flex;
                    flex-wrap: wrap;

                    .life-item {
                        border-left: 1px solid #e4e4e4;
                        border-bottom: 1px solid #e4e4e4;
                        margin-right: -1px;
                        height: 64px;
                        text-align: center;
                        position: relative;
                        cursor: pointer;
                        width: 25%;

                        .list-item {
                            background-image: url(../images/icons.png);
                            width: 61px;
                            height: 40px;
                            display: block;
                        }

                        .service-intro {
                            line-height: 22px;
                            width: 60px;
                            display: block;
                        }

                        &:nth-child(1) {
                            .list-item {
                                background-position: 0px -5px;
                            }
                        }

                        &:nth-child(2) {
                            .list-item {
                                background-position: -62px -5px;
                            }
                        }

                        &:nth-child(3) {
                            .list-item {
                                background-position: -126px -5px;
                            }
                        }

                        &:nth-child(4) {
                            .list-item {
                                background-position: -190px -5px;
                            }
                        }

                        &:nth-child(5) {
                            .list-item {
                                background-position: 0px -76px;
                            }
                        }

                        &:nth-child(6) {
                            .list-item {
                                background-position: -62px -76px;
                            }
                        }

                        &:nth-child(7) {
                            .list-item {
                                background-position: -126px -76px;
                            }
                        }

                        &:nth-child(8) {
                            .list-item {
                                background-position: -190px -76px;
                            }
                        }

                        &:nth-child(9) {
                            .list-item {
                                background-position: 0px -146px;
                            }
                        }

                        &:nth-child(10) {
                            .list-item {
                                background-position: -62px -146px;
                            }
                        }

                        &:nth-child(11) {
                            .list-item {
                                background-position: -126px -146px;
                            }
                        }

                        &:nth-child(12) {
                            .list-item {
                                background-position: -190px -146px;
                            }
                        }
                    }
                }

                .ads {
                    margin-top: 5px;

                    img {
                        opacity: 0.8;
                        transition: all 400ms;

                        &:hover {
                            opacity: 1;
                        }
                    }
                }
            }
        }
    }
</style>