import {reqTradeInfo,reqPayInfo} from '@/api'

//数据管理
const state={
    tradeInfo:{},//交易信息
    payInfo:{}//支付信息
}
const actions={
    //获取交易信息的异步action
    async getTradeInfo({commit}){
        const reslut = await reqTradeInfo();
        if(reslut.code===200){
            const tradeInfo = reslut.data
            commit('RECEIVE_TRADE_INFO',{tradeInfo});
        }
    },
    //获取支付信息的异步action
    async getPayInfo({commit},orderId){
        const reslut = await reqPayInfo(orderId);
        if(reslut.code === 200){
            const payInfo = reslut.data;
            commit('RECEIVE_PAY_INFO',payInfo);
        }
    }
}

//更新数据
const mutations={
    RECEIVE_TRADE_INFO(state,{tradeInfo}){
        state.tradeInfo = tradeInfo;
    },
    RECEIVE_PAY_INFO(state,payInfo){
        state.payInfo = payInfo;
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