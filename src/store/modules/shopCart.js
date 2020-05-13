import {reqCartLit} from '@/api'

//数据管理
const state={
    cartList: [] ,//购物项的列表
}
const actions={
    //获取商品数据的异步actions
    async getCartLit({commit}){
        //获取请求结果
        const result = await reqCartLit();
        if(result.code === 200){
            //获取data数据
            const cartList = result.data;
            console.log(cartList);
            //更新数据
            commit('GETCARTLIT',{cartList}) // 提交给mutation是包含数据的对象
        }
    }
}

//更新数据
const mutations={
    GETCARTLIT(state,{cartList}){
        state.cartList=cartList;
    }
}

//计算属性
const getters={
    totalCount(state){
        //原始的方法
        // let total = 0; //总件数初始化
        // state.cartList.forEach(item=>{
        //     if(item.isChecked===1){
        //         total+=item.skuNum
        //     }
        // })
        // return total

        //简洁的方法  使用数组的reduce方法 进行累加
        return state.cartList.reduce((pre,item)=>{
            return item.isChecked===1?pre+item.skuNum:pre
        },0)

    },

    totalPrice(state){
        //原始的方法
        // let total = 0; //总件数初始化
        // state.cartList.forEach(item=>{
        //     if(item.isChecked===1){
        //         total+=item.skuNum*item.cartPrice
        //     }
        // })
        // return total

        //简洁的方法  使用数组的reduce方法 进行累加
        return state.cartList.reduce((pre,item)=>{
            return item.isChecked===1?pre+item.skuNum*item.cartPrice:pre
        },0)

    }
}

//暴露
export default{
    state,
    actions,
    mutations,
    getters
}