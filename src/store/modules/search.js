import {reqProductList} from '@/api'

//数据管理
const state={
    productList: {}, //得到数据是对象,不是数组
}
const actions={
    //获取商品数据的异步actions
    async getProductList({commit},searchParams){
        //获取请求结果
        const result = await reqProductList(searchParams);
        if(result.code === 200){
            //获取data数据
            const productList = result.data;
            //更新数据
            commit('GETPRODUCTLIST',productList)
        }
    }
}

//更新数据
const mutations={
    GETPRODUCTLIST(state,productList){
        state.productList=productList;
    }
}

//计算属性
const getters={

}

//暴露
export default{
    state,
    actions,
    mutations,
    getters
}