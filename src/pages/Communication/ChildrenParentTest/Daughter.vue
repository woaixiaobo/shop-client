<template>
  <div style="background: #ccc; height: 50px;">
    <h3>女儿小红: 有存款: {{money}}</h3>
    <button @click="gaveMoney(100)">给BABA钱: 100</button>
  </div>
</template>

<script>
import {cpMixin} from './mixins' //引入mixins的js包
export default {
  name: 'Daughter',
  mixins: [cpMixin], // 配置mixin
  data () {
    return {
      money: 20000
    }
  },
  methods: {//如果这里边也有方法，会和mixins当中的合并
    
  }
}
</script>
