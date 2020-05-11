import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes"
Vue.use(VueRouter); //使用插件


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
export default new VueRouter({
    mode:'history',
    routes,
    // scrollBehavior (to, from, savedPosition) {
    //     return { x: 0, y: 0 }  // 在跳转路由时, 滚动条自动滚动到x轴和y轴的起始位置
    // }
    scrollBehavior () {
        return { x: 0, y: 0 }  // 在跳转路由时, 滚动条自动滚动到x轴和y轴的起始位置
    }
})