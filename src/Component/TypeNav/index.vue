<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="hideCategorys" @mouseenter="showCategorys">
                <h2 class="all">全部商品分类</h2>
                <transition name="move">
                    <div class="sort" v-show="isShowFirst">
                    <!-- 事件委托 -->
                <div class="all-sort-list2" @click="toSearch">
                    <div class="item bo" v-for="(c1,index) in baseCategoryList"
                    :key="c1.categoryId"
                    :class="{item_on:index===currentIndex}"
                    @mouseenter="showSubCategorys(index)">
                        <h3>
                            <!-- <a href="">{{c1.categoryName}}</a> -->
                            <!-- 编程式路由渲染的roter太多了,会卡,所以用编程式路由替换,这样只需渲染一次 -->
                            <!-- <router-link :to="`/search?categoryName=${c1.categoryName}&category1Id=${c1.categoryId}`">{{c1.categoryName}}</router-link> -->
                            <!-- 编程式  但是这样会添加好多的事件回调,所以改用事件委托-->
                            <!-- <a href="javascript:" @click="$router.push(`/search?categoryName=${c1.categoryName}&category1Id=${c1.categoryId}`)" >{{c1.categoryName}}</a> -->
                            <!-- 委托: 但是此方法不能直接传参,所以要用自定义属性的方式进行传参 -->
                            <a href="javascript:" :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                        </h3>
                        <div class="item-list clearfix">
                            <div class="subitem">
                                <dl class="fore" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                    <dt>
                                        <!-- <a href="">{{c2.categoryName}}</a> -->
                                        <!-- <router-link :to="`/search?categoryName=${c2.categoryName}&category2Id=${c2.categoryId}`">{{c2.categoryName}}</router-link> -->
                                        <a href="javascript:" :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId" >{{c2.categoryName}}</a>
                                    </dt>
                                    <dd>
                                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                            <!-- <a href="">{{c3.categoryName}}</a> -->
                                            <!-- <router-link :to="`/search?categoryName=${c3.categoryName}&category3Id=${c3.categoryId}`">{{c3.categoryName}}</router-link> -->
                                            <a href="javascript:" :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId" >{{c3.categoryName}}</a>
                                        </em>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div> 
                </transition>
            </div>
            
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
            
        </div>
    </div>
</template>

<script>
//import _ from 'lodash'  // 引入整体lodash
//按需引入 减少打包文件
import throttle from 'lodash/throttle'  
//使用快捷方式引入state
import{ mapState } from 'vuex'
    export default {
        name:'TypeNav',
        data() {
            return {
                currentIndex:-2,
                isShowFirst:false,
            }
        },
        computed: {
            //展开mapState ,因为数据是存在state.home当中的,所以要使用对象的方式展开
            ...mapState({
                baseCategoryList:state=>state.home.baseCategoryList,      
            })
            //正常方法(...mapState(['baseCategoryList']))展开的话
            //取出的数据相当于 this.$store.state.baseCategoryList 并不是home上边的数据
        },
        //在初始化之前调用,判断是否是首页,决定是否显示列表
        beforeMount() {
            this.isShowFirst=this.$route.path==='/';
        },
        mounted() {
            //调用vue的异步actions  但是每次切换组件都会重新请求,所以写在vue当中
            // this.$store.dispatch('getBaseCategoryList');
        },
        methods: {
            // showSubCategorys:_.throttle(function(index){
            //     if(this.currentIndex===-2) return;
            //     this.currentIndex=index;

            // },300)
            showSubCategorys:throttle(function(index){
                //必须用函数方式不能用箭头函数,否则this会指向Windows
                //判断currentIndex是否-2,此时就代表以及移除了,
                //取消页面更新(不然节流(有个延迟)会进行页面更新)
                if(this.currentIndex===-2) return;
                this.currentIndex=index;

            },300),
            //事件委托  点击搜索项并跳转到搜索页面
            toSearch(event){
                //用数据解构的方式来吧自定义属性当中是数据取出来 ,不知道点击的哪级标签,所以都要取出来,
                //然后判断点击的几级标签
                //注意:自定义数据当中的属性名,会自动转化为小写
                const {categoryname,category1id,category2id,category3id} = event.target.dataset;
                //只有点击搜索目标时(a标签)才开始准备query参数,
                //因为每个搜索目标(a标签)都有name,所以判断点击的目标是否有name即可
                if(categoryname){
                    //保存categoryname
                    const query={categoryName:categoryname};
                    //判断是几级标签
                    if(category1id){
                        query.category1Id=category1id;
                    }else if(category2id){
                        query.category2Id=category2id;
                    }else{
                        query.category3Id=category3id;
                    }
                    //点击三级菜单时可能已经有了params参数,所以此处要获取并且合二为一
                    const {keyName} = this.$route.params;
                    //路由跳转的对象,这样方便操作,只需将这个对象传递给路由即可
                    const location={
                        name:'Search',
                        query
                    }
                    //params参数不能为空串,所以此处进行判断
                    if(keyName){
                        //params是对象
                        location.params={keyName};
                    }
                    console.log(keyName);
                    //切换路由(对象方式)
                    this.$router.push(location)
                }
                
            },

            //移入显示三级分类列表
            showCategorys(){
                this.currentIndex=-1;
                this.isShowFirst=true;
            },
            //隐藏三级分类列表
            hideCategorys(){
                this.currentIndex=-2
                //如果不是当中首页的话才隐藏,是的话不隐藏
                if(this.$route.path!=='/'){
                    this.isShowFirst=false;
                }
            }
        },
    }
</script>
<style lang="less" scoped>
    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;
                /* 显示的过渡样式 */ 
                &.move-enter-active{
                    transition: all 1s;
                }
                //隐藏的过渡样式
                &.move-enter{
                    opacity: 0;
                    height: 0;
                }
                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            _height: 200px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        // &:hover {
                        //     background: #ccc;
                        //     .item-list {
                        //         display: block;
                        //     }
                        // }
                        &.item_on{
                            background: #ccc;
                            .item-list {
                                display: block;
                            }
                        }
                    }
                }
            }
        }
    }
</style>