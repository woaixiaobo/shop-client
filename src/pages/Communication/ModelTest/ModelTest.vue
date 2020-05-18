<template>
  <div>
    <h2>深入v-model</h2>
    <input type="text" v-model="name1">
    <span>{{name1}}</span>
    <br>
    <br>
    <!-- 
      原生 input 的v-model的本质就是 动态的 value属性,与原生 input事件监听的共同使用
        如下,输入框的值是动态的name2的值,然后绑定原生的input事件,并把输入框的value值赋给name2,这样就实现了数据同步
    -->
    <input type="text" :value="name2" @input="name2=$event.target.value">
    <span>{{name2}}</span>
    <br><br>

    <!-- 组件标签上的 v-model的本质: 动态的value与自定义事件 input -->

    <!-- 此时确保了子组件上边分发了自定义属性inout -->
    <CustomInput v-model="name3"/>
    <span>{{name3}}</span>
    
    <!-- 此时确保了子组件上边props接收了name3数据,并且分发了自定义属性inout -->

    <CustomInput :value="name4" @input="name4=$event"/> 
    <!-- $event 就是  $emit('input,'数据') 当中的数据-->
    <span>{{name4}}</span>
    
    
  </div>
</template>

<script type="text/ecmascript-6">
  import CustomInput from './CustomInput.vue'
  export default {
    name: 'ModelTest',

    data () {
      return {
        name1: 'atguigu',
        name2: 'xiaoxiao',
        name3: 'mingming',
        name4: 'huahua'
      }
    },

    components: {
      CustomInput
    }
  }
</script>
