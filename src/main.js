import Vue from 'vue'
import App from './App.vue'
import router from './router/index';
Vue.config.productionTip = false  //开发者模式下关闭不必要的提示
//引入store
import store from '@/store'
//全局注册TypeNav组件,因为这个组件多个组件用到了,所以全局注册
import TypeNav from "@/Component/TypeNav";
// 注册全局组件
Vue.component('TypeNav', TypeNav)

//加载mock
import './mock/mockServer'

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
