import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes"
Vue.use(VueRouter); //使用插件
import store from '@/store'

//修正Vue原型上边的push和replace

//首先要保存原型上边的方法
const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;
//重写原型上的方法
VueRouter.prototype.push=function(location, onComplete, onAbort){
    // console.log('push()',location, onComplete, onAbort);
    if(onComplete||onAbort){
        //如果传递了回调函数,则让原来的push方法进行处理, 
        //用call方法改变this的指向,让router可以调用原来的方法
        //this就是路由器对象 $router
        originPush.call(this,location, onComplete, onAbort);
    }else{
        //如果第二次传递了相同的参数,那么会抛出失败的promise,所以要用catch处理错误
        return originPush.call(this,location).catch(()=>{
            //这样后边的链式就会中断
            return new Promise(()=>{})
            // console.log('catch error');
        })
    }
}


VueRouter.prototype.replace=function(location, onComplete, onAbort){
    console.log('push()',location, onComplete, onAbort);
    if(onComplete||onAbort){
        //如果传递了回调函数,则让原来的push方法进行处理, 
        //用call方法改变this的指向,让router可以调用原来的方法
        //this就是路由器对象 $router
        originReplace.call(this,location, onComplete, onAbort);
    }else{
        //如果第二次传递了相同的参数,那么会抛出失败的promise,所以要用catch处理错误
        return originReplace.call(this,location).catch(()=>{
            return new Promise(()=>{})
            // console.log('catch error');
        })
    }
}
const router= new VueRouter({
    mode:'history',
    routes,
    // scrollBehavior (to, from, savedPosition) {
    //     return { x: 0, y: 0 }  // 在跳转路由时, 滚动条自动滚动到x轴和y轴的起始位置
    // }
    scrollBehavior () {
        return { x: 0, y: 0 }  // 在跳转路由时, 滚动条自动滚动到x轴和y轴的起始位置
    }
})

//跳转前需要验证是否登录的路由的数组
const checkPaths = ['/trade', '/pay', '/center']  // 所有以它开头的路径都需要检查

//只有登录了才能查看 交易/支付/个人中心界面   对应了多个路由,所以用全局前置守卫
router.beforeEach((to,from,next)=>{//在页面跳转前回调
    const targetPath = to.path;  //有可能是二级目录 例如 /center/myorder
    //检测目标路由是否需要进行登录检查
    const isCheckPath = checkPaths.find(path=>targetPath.indexOf(path)===0);
    if(isCheckPath){
        //查看vuex的用户登录信息是否存在,如果存在则是已经登录,便放行
        if(store.state.user.userInfo.name){
            next();
        }else{//如果没有登录,则跳转到登录页面
            next('/login?redirect=' + targetPath);
            // console.log('/login?redirect=' + targetPath);
        }
    }else{//如果不是路由目标,则直接放行
        next();
    }
})

export default router;