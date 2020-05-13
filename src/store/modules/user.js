import {getUserTempId} from '@/utils'
//管理用户界面
export default{
    state:{
        userInfo:[],
        a:"",
        userTempId:getUserTempId(), //用户临时ID,获取函数只执行一次
    },
    actions:{},
    mutations:{},
    getters:{},
}