<template>
    <!-- 头部 -->
    <header class="header">
        <!-- 头部的第一行 -->
        <div class="top">
            <div class="container">
                <div class="loginList">
                    <p>尚品汇欢迎您！</p>
                    <p v-if="userInfo.name">
                        <span>{{userInfo.nickName}}</span>
                        &nbsp;
                        <a href="javascript:" @click="LogOut">退出</a>
                    </p>
                    <p v-else>
                        <span>请</span>
                        <router-link to="/login">登录</router-link>
                        <router-link to="/register" class="register">免费注册</router-link>
                    </p>
                </div>
                <div class="typeList">
                    <a href="###">我的订单</a>
                    <router-link to="/shopcart">我的购物车</router-link>
                    <!-- <a href="###">我的购物车</a> -->
                    <a href="###">我的尚品汇</a>
                    <a href="###">尚品汇会员</a>
                    <a href="###">企业采购</a>
                    <a href="###">关注尚品汇</a>
                    <a href="###">合作招商</a>
                    <a href="###">商家后台</a>
                </div>
            </div>
        </div>
        <!--头部第二行 搜索区域-->
        <div class="bottom">
            <h1 class="logoArea">
                <!-- <router-link to="/login" class="logo" title="尚品汇" target="_blank">
                    <img src="./images/logo.png" alt="">
                </router-link> -->
                <router-link to="/" class="logo" title="尚品汇" >
                    <img src="./images/logo.png" alt="">
                </router-link>
                
            </h1>
            <div class="searchArea">
                <form action="###" class="searchForm">
                    <input type="text" id="autocomplete" class="input-error input-xxlarge" placeholder="关键字" v-model="keyName"/>
                    <button class="sui-btn btn-xlarge btn-danger" @click.prevent="search">搜索</button>
                </form>
            </div>
        </div>
    </header>
</template>

<script>
import {mapState} from "vuex"
    export default {
        name: 'Header',
        data() {
            return {
                keyName:'',
            }
        },
        computed: {
            ...mapState({
                userInfo : state=>state.user.userInfo
            })
        },
        mounted() {
            //绑定全局事件监听，来接受消息，接到消息后跟新数据，此处是将搜索栏关键字去掉
            this.$bus.$on('removeKeyName',()=>{
                this.keyName='';
            })
        },
        methods: {
            search(){
                // 编程式路由导航(跳转)
                // this.$router.push(`/search/${this.keyName}?name=${this.keyName}`)
                //对象的方式传递,此时如果有：keyName就不能用path了必须使用name
                // this.$router.push({
                //     name:'Search',
                //     params:{
                //         keyName:this.keyName
                //     },
                //     query:{
                //         name:this.keyName
                //     }
                // })

                //当params数据为空时,不能跳转,url会出现错误
                //解决:不传递params或者设为undefined

                //判断params是否为空,就是判断输入框的值keyName是否为空
                // if(this.keyName===''){ //为空时不传递pramas数据
                //     this.$router.push({ //重写后的push
                //     name:'Search',
                    
                // })
                // }else{
                //     this.$router.push({ //重写后的push
                //     name:'Search',
                //     params:{
                //         keyName:this.keyName
                //     },
                //     query:{
                //         name:this.keyName
                //     }
                // })
                // }
                const keyName=this.keyName;
                //此时可能已经有了query参数,所以要取出合二为一
                const location={
                    name:'Search',
                }
                //判断params当中的keyName是否为空
                if(keyName){
                    location.params={keyName}
                }
                //获取当前的query(这个参数可以为空,params不可以)
                const {query} = this.$route;
                location.query=query;
                //判断当前页面是否在search页面，是的话用replace不是就用push
                if(this.$route.path.indexOf('/search')===0){
                    // /search参数肯定是数组下标的第一位，所以下边为0时就是在search页面，用replace
                    this.$router.replace(location);
                }else{//不是在search时就是在home当中，此时用push，其他的用replace，
                //这样点击后退一次就可以回到home页面
                    this.$router.push(location);
                }
                
                //为空时传递undefined
                // this.$router.push({ //重写后的push
                //     name:'Search',
                //     params:{
                //         keyName:this.keyName===''?undefined:this.keyName
                //     },
                //     query:{
                //         name:this.keyName
                //     }
                // })

                //当参数不变时,如果点击第二次,则会报错,
                // this.$router.push({
                //     name:'Search',
                //     params:{
                //         keyName:this.keyName
                //     },
                //     query:{
                //         name:this.keyName
                //     }
                // },()=>{})

                

                // this.$router.push({ //重写后的push
                //     name:'Search',
                //     params:{
                //         keyName:this.keyName
                //     },
                //     query:{
                //         name:this.keyName
                //     }
                // })
            },
            //退出登录
            LogOut(){
                /**
                 * 1.首先退出登录,就会把userInfo的信息置为空,但是在此刷新时,又会读取本地缓存
                 *      所以一旦点击退出登录便把本地缓存的用户信息 userInfo清除掉
                 * 2.退出登录后左上角显示的便不再是用户的信息,而且登录注册等信息,所以要进行元素的切换
                 * 3.一旦用户信息为空那么用户的标识 token自然就会消失,从而转变为 临时Id
                 */
                //清除本地缓存
                localStorage.removeItem('USER_INFO_KEY');
                //重新请求页面
                this.$router.replace('/');
                //并且刷新页面,
                console.log(location.reload());
            }
        },
    }
</script>
<style lang="less" scoped>
    .header {
        &>.top {
            background-color: #eaeaea;
            height: 30px;
            line-height: 30px;

            .container {
                width: 1200px;
                margin: 0 auto;
                overflow: hidden;

                .loginList {
                    float: left;

                    p {
                        float: left;
                        margin-right: 10px;

                        .register {
                            border-left: 1px solid #b3aeae;
                            padding: 0 5px;
                            margin-left: 5px;
                        }
                    }
                }

                .typeList {
                    float: right;

                    a {
                        padding: 0 10px;

                        &+a {
                            border-left: 1px solid #b3aeae;
                        }
                    }

                }

            }
        }

        &>.bottom {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .logoArea {
                float: left;

                .logo {
                    img {
                        width: 175px;
                        margin: 25px 45px;
                    }
                }
            }

            .searchArea {
                float: right;
                margin-top: 35px;

                .searchForm {
                    overflow: hidden;

                    input {
                        box-sizing: border-box;
                        width: 490px;
                        height: 32px;
                        padding: 0px 4px;
                        border: 2px solid #ea4a36;
                        float: left;

                        &:focus {
                            outline: none;
                        }
                    }

                    button {
                        height: 32px;
                        width: 68px;
                        background-color: #ea4a36;
                        border: none;
                        color: #fff;
                        float: left;
                        cursor: pointer;

                        &:focus {
                            outline: none;
                        }
                    }
                }
            }
        }
    }
</style>