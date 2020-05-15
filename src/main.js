import Vue from 'vue'
import App from './App.vue'
import router from './router/index';
Vue.config.productionTip = false  //开发者模式下关闭不必要的提示
//引入store
import store from '@/store'
//全局注册TypeNav组件,因为这个组件多个组件用到了,所以全局注册
import TypeNav from "@/Component/TypeNav";
import Carousel from "@/Component/Carousel"
import Pagination from "@/Component/Pagination"
// 注册全局组件
Vue.component('TypeNav', TypeNav)
Vue.component('Carousel',Carousel)
Vue.component('Pagination',Pagination)
//加载mock
import './mock/mockServer'
//全局引入swiper的样式
import 'swiper/css/swiper.min.css'
//引入表单验证
import './validate'
new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {//给当前vue原型对象指定全局事件总线对象
    Vue.prototype.$bus=this;
  },
}).$mount('#app')
