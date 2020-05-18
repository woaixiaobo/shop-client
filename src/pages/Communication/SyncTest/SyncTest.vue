<template>
  <div>
    小明的爸爸现在有{{total}}元
    <br>
    <br>
    <h2>不使用sync修改符</h2>
    <!-- 
      1.先传递数据(名字是money值为total)给子组件(props接收数据)
      2.绑定自定义事件,吧子组件处理完的数据赋给total,
      否则只是子组件当中的数据发生了变化,父组件还是未变的
    -->
    <Child :money="total" @update:money="total=$event"/>
    <br>
    <br>
    <h2>使用sync修改符</h2>
    <!-- sync 相当于:money="total" @update:money="total=$event"的语法糖
        注意:  自定义事件的名字必须是 update:xxx的格式
              而且子组件当中肯定分发了对应的自定义事件
    -->
    <Child :money.sync="total"/>

    <br>
    <br>
    <h2>使用v-model修改符</h2>
    <!-- 此时组件当中需要分发定义input事件监听 -->
    <!-- 注意: v-model 就是 :Value和自定义事件inpit的结合
              所以子组件当中要props接受value 然后触发自定义事件 input
              而且并不是 只有input标签才能用自定义事件input的
              正因为它是自定义的,所以任何标签都可以使用
    -->
    <Child2 v-model="total"/>
    <hr>
  </div>
</template>

<script type="text/ecmascript-6">
  import Child from './Child.vue'
  import Child2 from './Child2.vue'
  export default {
    name: 'SyncTest',

    data () {
      return {
        total: 1000
      }
    },
    components: {
      Child,
      Child2
    }
  }
</script>
