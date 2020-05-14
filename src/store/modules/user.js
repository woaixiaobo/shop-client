import {getUserTempId,saveUserInfo,getUserInfo} from '@/utils'
import {reqRegister,reqLogin} from "@/api"
//管理用户界面
export default{
    state:{
        userInfo:getUserInfo(), //读取本都缓存,没有的话就是{}
        userTempId:getUserTempId(), //用户临时ID,获取函数只执行一次
    },
    actions:{
        //注册的异步api
        async register({commit},userInfo){
            console.log(commit);
            //发生注册的异步actions
            const result  = await reqRegister(userInfo);
            if(result.code!==200){
                throw new Error(result.data||result.message||'注册失败');
            }
        },
        //登录的异步actions
        async login({commit},{mobile,password}){
            //发送登录请求
            const result = await reqLogin(mobile,password);
            if(result.code===200){
                const userInfo = result.data;
                // 将用户信息对象提交给mutation保存到state
                commit('LOGIN',userInfo);
                //讲登录信息保存到本地
                saveUserInfo(userInfo);
            }else{ //登录失败
                throw new Error(result.data||result.message || '登陆失败')
            }
        }
    },
    mutations:{
        LOGIN(state,userInfo){
            state.userInfo=userInfo;
        }
    },
    getters:{},
}