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

//根据搜索条件参数对象获取商品列表数据
export const reqProductList=(searchParams)=>ajax({
    method:'POST',
    url:'/list',
    data:searchParams,
})
//函数的方式
// export const reqProductList=(searchParams)=>ajax.post('./list',searchParams);

//直接测试发送ajax请求
// reqProductList({
//     "category3Id": "61",
//     "categoryName": "手机",
//     "keyword": "小米",
//     "order": "1:desc",
//     "pageNo": 1,
//     "pageSize": 10,
//     "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
//     "trademark": "4:小米"
// }) 

//根据搜索条件参数对象获取商品详情列表数据
export const reqProduct=(skuId)=>ajax({
    method:'GET',
    url:`/item/${skuId}`,
})

//添加购物车数据
export const reqAddToCart=(skuId,skuNum)=>ajax.post(`/cart/addToCart/${skuId}/${skuNum}`)