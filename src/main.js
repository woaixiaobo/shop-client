import Vue from 'vue'
import App from './App.vue'
import router from './router/index';
Vue.config.productionTip = false  //开发者模式下关闭不必要的提示
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
