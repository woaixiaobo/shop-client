<template>

    <div>
        <TypeNav />
        <div class="main">
            <div class="py-container">
                <!--bread-->
                <div class="bread">
                    <ul class="fl sui-breadcrumb">
                        <li>
                            <a href="#">全部结果</a>
                        </li>
                    </ul>
                    <ul class="fl sui-tag">
                        <!-- query参数小标签显示 -->
                        <li class="with-x" v-if="options.categoryName">
                            {{options.categoryName}}
                            <i @click="removeCategory">×</i>
                        </li>
                        <!-- params参数小标签显示 -->
                        <li class="with-x" v-if="options.keyword">
                            {{options.keyword}}
                            <i @click="removeKeyName">×</i>
                        </li>
                        <!-- trademark参数小标签显示 -->
                        <li class="with-x" v-if="options.trademark">
                            {{options.trademark}}
                            <i @click="removeTrademark">×</i>
                        </li>
                        <!-- 属性参数小标签显示
                            1.不在使用v-if的方法,因为props是个数组直接遍历即可,数组为空时就是没有
                                因为显示的是数组的value值
                            2.如果使用v-if即使数组为空也会显示个 []的样式
                        -->
                        <li class="with-x" v-for="(prop,index) in options.props" :key="prop">
                            {{prop}}
                            <i @click="removeProp(index)">×</i>
                        </li>
                    </ul>
                </div>
                <!--selector-->
                <SearchSelector :setTrademark="setTrademark" :addProp="addProp"/>
                <!--details-->
                <div class="details clearfix">
                    <div class="sui-navbar">
                        <div class="navbar-inner filter">
                            <ul class="sui-nav">
                                <li class="active">
                                    <a href="#">综合</a>
                                </li>
                                <li>
                                    <a href="#">销量</a>
                                </li>
                                <li>
                                    <a href="#">新品</a>
                                </li>
                                <li>
                                    <a href="#">评价</a>
                                </li>
                                <li>
                                    <a href="#">价格⬆</a>
                                </li>
                                <li>
                                    <a href="#">价格⬇</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="goods-list">
                        <ul class="yui3-g">
                            <li class="yui3-u-1-5" v-for="good in productList.goodsList" :key="good.id">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <a href="javascript:">
                                            <img :src="good.defaultImg" />
                                        </a>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥</em>
                                            <i>{{good.price}}</i>
                                        </strong>
                                    </div>
                                    <div class="attr">
                                        <a target="_blank" href="item.html"
                                            title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{good.title}}</a>
                                    </div>
                                    <div class="commit">
                                        <i class="command">已有<span>2000</span>人评价</i>
                                    </div>
                                    <div class="operate">
                                        <a href="success-cart.html" target="_blank"
                                            class="sui-btn btn-bordered btn-danger">加入购物车</a>
                                        <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                                    </div>
                                </div>
                            </li>
                            
                        </ul>
                    </div>
                    <div class="fr page">
                        <div class="sui-pagination clearfix">
                            <ul>
                                <li class="prev disabled">
                                    <a href="#">«上一页</a>
                                </li>
                                <li class="active">
                                    <a href="#">1</a>
                                </li>
                                <li>
                                    <a href="#">2</a>
                                </li>
                                <li>
                                    <a href="#">3</a>
                                </li>
                                <li>
                                    <a href="#">4</a>
                                </li>
                                <li>
                                    <a href="#">5</a>
                                </li>
                                <li class="dotted"><span>...</span></li>
                                <li class="next">
                                    <a href="#">下一页»</a>
                                </li>
                            </ul>
                            <div><span>共10页&nbsp;</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SearchSelector from './SearchSelector/SearchSelector'
    import {mapState} from 'vuex'
    export default {
        name: 'Search',
        data() {
            return {
                //搜索所需要的所有参数
                options: {
                    category1Id: '', // 一级分类ID
                    category2Id: '', // 二级分类ID
                    category3Id: '', // 三级分类ID
                    categoryName: '', // 分类名称
                    keyword: '', // 关键字
                    trademark: '', // 品牌  "ID:品牌名称"
                    props: [], // 商品属性的数组: ["属性ID:属性值:属性名"] 示例: ["2:6.0～6.24英寸:屏幕尺寸"]
                    order: '1:desc', // 排序方式  1: 综合,2: 价格 asc: 升序,desc: 降序  示例: "1:desc"
                    pageNo: 1, // 当前页码
                    pageSize: 10, // 每页数量
                }
            }
        },
        computed: {
            //获取vuex当中state数据
            ...mapState({
                productList:state=>state.search.productList
            })
        },
        watch: {
            $route(to){
                console.log(to);
                //监视options数据，因为多次复用了，所以把options封装了
                this.updateOptions();
                // console.log(this.updateOptions);
                //因为请求参数变了，所以重新发送请求
                this.$store.dispatch('getProductList',this.options)
            }
        },
        beforeMount() {//初始化同步代码
            this.updateOptions();
        },
        mounted() { //初始化异步代码
             //创建组件过程中发送请求
            //但是此时存在问题，现在都是在search组件当中，在此时搜索的话，是不会重新发送请求的
            //因为发送请求在声明周期函数当中，而同组件跳转不会销会组件在重新创建组件，所以请求便不会在发送
            //因此我们监听$store来解决这个问题
            this.$store.dispatch('getProductList',this.options)
        },
        
        methods:{
            updateOptions(){
                //获取发送请求的参数  根据params和query跟新options
                //因为是路由传参，所以对$route进行数据解构获取所需的值
                const {categoryName, category1Id, category2Id, category3Id} = this.$route.query;
                const {keyName} = this.$route.params
                const keyword = keyName; //一定要按照文档的参数来，文档当中是keyword
                //我的是keyname所以此处必须给keyword赋值。否则响应体不会响应正确的搜索数据，
                //就没有搜索结果，只有全部的数据，搜啥都不会发生变化
                //改变this.options当中的值（讲获得的参数传给options）
                this.options={
                    ...this.options,
                    categoryName,
                    category1Id,
                    category2Id,
                    category3Id,
                    keyword
                }
            },
            //移除分类的搜索条件（小标签）并不是直接把这个dom删掉了，而是界面重新跳转了
            removeCategory(){
                //把分类的数据条件重置
                this.options.categoryName='';
                this.options.category1Id='';
                this.options.category2Id='';
                this.options.category3Id='';
                //重新获取数据   //这种方法不会把网址的query部分去掉，所以不可以用
                // this.$route.dispatch('getProductList',this.options);
                //重新跳转到当前路由，只携带params参数，用route的path属性即可
                //因为跳转路由时组件会重新创建，就会重新发送请求，没有query参数的请求，所以可用
                this.$router.replace(this.$route.path);//通过字符串方式进行传参
                // 不能用重新发送请求这种方式,因为query参数是在组件创建(跳转)时才会更新的,
                //直接请求并不能更新query参数和params参数
                // this.$store.dispatch('getProductList',this.options);
            },
            removeKeyName(){//同理query的重置，此处重置params
                this.options.keyword='';
                this.$router.replace({//通过对象的方式进行传参，方便去除params参数
                    name:'Search',
                    query:this.$route.query,
                });
                //触发全局事件总线，跟新数据，将搜索框的搜索词重置
                this.$bus.$emit('removeKeyName');
            },
            //移除trademark小标签,这里是重新获取请求,而不是组件的重新跳转(组件的重新创建导致页面更新)
            removeTrademark(){
                this.options.trademark='';
                // this.$router.replace(this.$route.path)
                 //或者重新发送请求也可以,因为点击商标时就是直接获取的请求
                 //没有任何的query和params参数
                this.$store.dispatch('getProductList',this.options);
            },
            //移除属性props的小标签,这里是重新获取请求,而不是组件的重新跳转(组件的重新创建导致页面更新)
            removeProp(index){
                //这里接受的参数为index下标,因为要删除的是数组当中的数据,所以用下标删除最合适
                this.options.props.splice(index,1);
                //重新发送请求
                this.$store.dispatch('getProductList',this.options);
            },
            //通过trademark商标搜索
            setTrademark(trademark){
                this.options.trademark=trademark;
                //根据点击的商标重新获取请求即可
                this.$store.dispatch('getProductList',this.options);
            },
            //更新(添加)options当中props数组的数据,通过属性搜索
            addProp(prop){
                //但是不能重复点击,否则会报错,在此用数组当中的indexOf方法来查找是不是已经存在这个prop
                //注意:字符串和数组当中都是有indexOf这个方法的
                if(this.options.props.indexOf(prop)!==-1) return;
                //更新props数组
                this.options.props.push(prop);
                //重新发送请求
                this.$store.dispatch('getProductList',this.options)
            }
        },

        props: {
            keyName: String,
            name: String,
        },
        components: {
            SearchSelector,
        }
    }
</script>
<style lang="less" scoped>
    .main {
        margin: 10px 0;

        .py-container {
            width: 1200px;
            margin: 0 auto;

            .bread {
                margin-bottom: 5px;
                overflow: hidden;

                .sui-breadcrumb {
                    padding: 3px 15px;
                    margin: 0;
                    font-weight: 400;
                    border-radius: 3px;
                    float: left;

                    li {
                        display: inline-block;
                        line-height: 18px;

                        a {
                            color: #666;
                            text-decoration: none;

                            &:hover {
                                color: #4cb9fc;
                            }
                        }
                    }
                }

                .sui-tag {
                    margin-top: -5px;
                    list-style: none;
                    font-size: 0;
                    line-height: 0;
                    padding: 5px 0 0;
                    margin-bottom: 18px;
                    float: left;

                    .with-x {
                        font-size: 12px;
                        margin: 0 5px 5px 0;
                        display: inline-block;
                        overflow: hidden;
                        color: #000;
                        background: #f7f7f7;
                        padding: 0 7px;
                        height: 20px;
                        line-height: 20px;
                        border: 1px solid #dedede;
                        white-space: nowrap;
                        transition: color 400ms;
                        cursor: pointer;

                        i {
                            margin-left: 10px;
                            cursor: pointer;
                            font: 400 14px tahoma;
                            display: inline-block;
                            height: 100%;
                            vertical-align: middle;
                        }

                        &:hover {
                            color: #28a3ef;
                        }
                    }
                }
            }

            .details {
                margin-bottom: 5px;

                .sui-navbar {
                    overflow: visible;
                    margin-bottom: 0;

                    .filter {
                        min-height: 40px;
                        padding-right: 20px;
                        background: #fbfbfb;
                        border: 1px solid #e2e2e2;
                        padding-left: 0;
                        border-radius: 0;
                        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

                        .sui-nav {
                            position: relative;
                            left: 0;
                            display: block;
                            float: left;
                            margin: 0 10px 0 0;

                            li {
                                float: left;
                                line-height: 18px;

                                a {
                                    display: block;
                                    cursor: pointer;
                                    padding: 11px 15px;
                                    color: #777;
                                    text-decoration: none;
                                }

                                &.active {
                                    a {
                                        background: #e1251b;
                                        color: #fff;
                                    }
                                }
                            }
                        }
                    }
                }

                .goods-list {
                    margin: 20px 0;

                    ul {
                        display: flex;
                        flex-wrap: wrap;

                        li {
                            height: 100%;
                            width: 20%;
                            margin-top: 10px;
                            line-height: 28px;

                            .list-wrap {
                                .p-img {
                                    padding-left: 15px;
                                    width: 215px;
                                    height: 255px;

                                    a {
                                        color: #666;

                                        img {
                                            max-width: 100%;
                                            height: auto;
                                            vertical-align: middle;
                                        }
                                    }
                                }

                                .price {
                                    padding-left: 15px;
                                    font-size: 18px;
                                    color: #c81623;

                                    strong {
                                        font-weight: 700;

                                        i {
                                            margin-left: -5px;
                                        }
                                    }
                                }

                                .attr {
                                    padding-left: 15px;
                                    width: 85%;
                                    overflow: hidden;
                                    margin-bottom: 8px;
                                    min-height: 38px;
                                    cursor: pointer;
                                    line-height: 1.8;
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    -webkit-line-clamp: 2;

                                    a {
                                        color: #333;
                                        text-decoration: none;
                                    }
                                }

                                .commit {
                                    padding-left: 15px;
                                    height: 22px;
                                    font-size: 13px;
                                    color: #a7a7a7;

                                    span {
                                        font-weight: 700;
                                        color: #646fb0;
                                    }
                                }

                                .operate {
                                    padding: 12px 15px;

                                    .sui-btn {
                                        display: inline-block;
                                        padding: 2px 14px;
                                        box-sizing: border-box;
                                        margin-bottom: 0;
                                        font-size: 12px;
                                        line-height: 18px;
                                        text-align: center;
                                        vertical-align: middle;
                                        cursor: pointer;
                                        border-radius: 0;
                                        background-color: transparent;
                                        margin-right: 15px;
                                    }

                                    .btn-bordered {
                                        min-width: 85px;
                                        background-color: transparent;
                                        border: 1px solid #8c8c8c;
                                        color: #8c8c8c;

                                        &:hover {
                                            border: 1px solid #666;
                                            color: #fff !important;
                                            background-color: #666;
                                            text-decoration: none;
                                        }
                                    }

                                    .btn-danger {
                                        border: 1px solid #e1251b;
                                        color: #e1251b;

                                        &:hover {
                                            border: 1px solid #e1251b;
                                            background-color: #e1251b;
                                            color: white !important;
                                            text-decoration: none;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                .page {
                    width: 733px;
                    height: 66px;
                    overflow: hidden;
                    float: right;

                    .sui-pagination {
                        margin: 18px 0;

                        ul {
                            margin-left: 0;
                            margin-bottom: 0;
                            vertical-align: middle;
                            width: 490px;
                            float: left;

                            li {
                                line-height: 18px;
                                display: inline-block;

                                a {
                                    position: relative;
                                    float: left;
                                    line-height: 18px;
                                    text-decoration: none;
                                    background-color: #fff;
                                    border: 1px solid #e0e9ee;
                                    margin-left: -1px;
                                    font-size: 14px;
                                    padding: 9px 18px;
                                    color: #333;
                                }

                                &.active {
                                    a {
                                        background-color: #fff;
                                        color: #e1251b;
                                        border-color: #fff;
                                        cursor: default;
                                    }
                                }

                                &.prev {
                                    a {
                                        background-color: #fafafa;
                                    }
                                }

                                &.disabled {
                                    a {
                                        color: #999;
                                        cursor: default;
                                    }
                                }

                                &.dotted {
                                    span {
                                        margin-left: -1px;
                                        position: relative;
                                        float: left;
                                        line-height: 18px;
                                        text-decoration: none;
                                        background-color: #fff;
                                        font-size: 14px;
                                        border: 0;
                                        padding: 9px 18px;
                                        color: #333;
                                    }
                                }

                                &.next {
                                    a {
                                        background-color: #fafafa;
                                    }
                                }
                            }
                        }

                        div {
                            color: #333;
                            font-size: 14px;
                            float: right;
                            width: 241px;
                        }
                    }
                }
            }

            .hot-sale {
                margin-bottom: 5px;
                border: 1px solid #ddd;

                .title {
                    font-weight: 700;
                    font-size: 14px;
                    line-height: 21px;
                    border-bottom: 1px solid #ddd;
                    background: #f1f1f1;
                    color: #333;
                    margin: 0;
                    padding: 5px 0 5px 15px;
                }

                .hot-list {
                    padding: 15px;

                    ul {
                        display: flex;

                        li {
                            width: 25%;
                            height: 100%;

                            .list-wrap {

                                .p-img,
                                .price,
                                .attr,
                                .commit {
                                    padding-left: 15px;
                                }

                                .p-img {
                                    img {
                                        max-width: 100%;
                                        vertical-align: middle;
                                        border: 0;
                                    }
                                }

                                .attr {
                                    width: 85%;
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    -webkit-line-clamp: 2;
                                    overflow: hidden;
                                    margin-bottom: 8px;
                                    min-height: 38px;
                                    cursor: pointer;
                                    line-height: 1.8;
                                }

                                .price {
                                    font-size: 18px;
                                    color: #c81623;

                                    strong {
                                        font-weight: 700;

                                        i {
                                            margin-left: -5px;
                                        }
                                    }
                                }

                                .commit {
                                    height: 22px;
                                    font-size: 13px;
                                    color: #a7a7a7;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>