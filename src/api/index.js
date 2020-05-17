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

//获取购物车列表
export const reqCartLit=()=>ajax('/cart/cartList');

/* 
切换商品选中状态
/api/cart/checkCart/{skuID}/{isChecked} GET
skuId: 商品id
isChecked: 新的选中状态值  0代表取消选中 / 1代表选中
*/

export const reqCheckCartItem=(skuId,isChecked)=>ajax(`/cart/checkCart/${skuId}/${isChecked}`)

//删除购物车数据
export const reqDeleteCartItem=(skuId)=>ajax.delete(`/cart/deleteCart/${skuId}`)
// export const reqDeleteCartItem=(skuId)=>ajax({
//     url:`/cart/checkCart/${skuId}`,
//     method:'DELETE'
// })


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

//请求注册
export const reqRegister=(userInfo)=>ajax.post('/user/passport/register', userInfo)

//退出登录
export const reqLogout = () => ajax('/user/passport/logout')

//获取订单数
//page 当前页码  limit每页的数量
export const reqMyOrders=(page, limit)=>ajax(`/order/auth/${page}/${limit}`)

//获取订单交易详情   注意:此时是后台
export const reqTradeInfo = ()=>ajax('/order/auth/trade')

//提交订单
export const reqSubmitOrder = (tradeNo,orderInfo)=>ajax({
    url: '/order/auth/submitOrder',
    method:'POST',
    params:{tradeNo}, //此处的params是ajax请求的query参数
    data:orderInfo, //请求体是数据,包含的当前的订单信息
})

//获取订单支付信息
export const reqPayInfo = (orderId)=> ajax(`/payment/weixin/createNative/${orderId}`)

//查询订单支付状态
export const reqOrderStatus = (orderId)=> ajax(`/payment/weixin/queryPayStatus/${orderId}`)