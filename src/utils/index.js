//包含工具函数的模块

import { v4 as uuidv4 } from 'uuid'
/* 
得到当前的用户临时ID
1. 从localStorage中获取
2. 如果没有则通过UUID库来生成
*/
export function getUserTempId(){
    //从 localStorage 当中读取用户的临时ID,如果有就直接返回
    let userTempId = window.localStorage.getItem('USER_TEMP_ID_KEY');
    if(!userTempId){
        //如果没有就创建
        userTempId = uuidv4();
        //并保存到本地缓存
        window.localStorage.setItem('USER_TEMP_ID_KEY',userTempId);
    }
    return userTempId;
}

//保存用户登录信息
export function saveUserInfo(userInfo){
    localStorage.setItem('USER_INFO_KEY',JSON.stringify(userInfo));
}

//保读取用户登录信息
export function getUserInfo(){
    //因为是读取,所以此处要返回这个值,并且转化为json对象
    return JSON.parse(localStorage.getItem('USER_INFO_KEY')) || {};
}