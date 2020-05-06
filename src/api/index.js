import ajax from './axjs'
//引入mock
import mockAjax from './mockAjax'
//请求获取3级分类列表
export function reqBaseCategoryList(){
    return ajax({
        method:'GET',
        url:'/product/getBaseCategoryList'
    })
    /// return ajax.get('/product/getBaseCategoryList')
}

//请求登录
export function reqLogin(mobile, password){
    //默认的响应体数据是json格式
    return ajax({
        method:'POST',
        url:'/user/passport/login',
        data:{mobile, password}
    })
    // return ajax.post('/user/passport/login', {mobile, password})
}

//暴露mock接口的ajax
export const reqBanners =() =>mockAjax('/banners')
export const reqFloors =() =>mockAjax('/floors')