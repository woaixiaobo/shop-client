/* 
对axios进行二次封装(axios本身就是对原生ajax(xHR)的封装)   面试必说
    1. 配置通用的基础路径和超时
    2. 显示请求进度条
    3. 成功返回的数据不再是response, 而直接是响应体数据response.data
    4. 统一处理请求错误, 具体请求也可以选择处理或不处理
    5.  每次请求都携带一个userTempId请求头, 数据值在state中 
*/
import axios from "axios"
//引入加载进度条包
import NProgress from "nprogress"  //默认引入的是js文件
import 'nprogress/nprogress.css'  //引入css文件时要声明是css文件
import store from "@/store"
//第一步配置通用的基础路径和超时
const instance = axios.create({
    baseURL:'/api',//基础路径
    timeout:5000, //请求超时的时间
})

//axios拦截器,并在拦截器当中实现进度条的功能
instance.interceptors.request.use(config=>{
    // console.log('请求拦截器');
    //开启进度条
    NProgress.start();
    //判断如果用户登录了,就用用户的token标识
    if(store.state.user.userInfo.name){
        console.log('11');
        /* 每次请求都携带一个token请求头, 数据值在state中 */
        config.headers.token=store.state.user.userInfo.token;
    }else{//未登录就用临时ID
         /* 每次请求都携带一个userTempId请求头, 数据值在state中 */
        config.headers.userTempId=store.state.user.userTempId;
        //返回请求的内容
    }
    return config;
})

//响应拦截器
instance.interceptors.response.use(
    response=>{
        // console.log('响应拦截器成功回调');
        //响应成功便把进度条取消
        NProgress.done();
        //返回响应的数据
        // console.log(response);
        return response.data;
    },
    error=>{
        console.log('响应拦截器失败回调');
        //即使是失败了也要取消进度条
        NProgress.done();
        //弹出错误信息
        alert(`请求出错${error.message||'未知错误'}`)
        //返回错误状态的promise
        // return error  // 不可以这么写,这么写返回的是正确的promise
        // throw error  //可以直接抛错
        return Promise.reject(error) 
    }
)

export default instance
