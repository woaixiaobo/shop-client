<template>
  <div style="background: #ccc; height: 50px;">
    <h2>input包装组件</h2>
    <!-- 此时是原生的input事件 分发自定义事件input(同名),
    因为element当中的组件v-model当中绑定的自定义事件的名称就是input -->
      <!-- 数据是原生事件的event数据对象的对应值 -->
    <input type="text" :value="value" @input="$emit('input', $event.target.value)">
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'CustomInput',
    props: ['value']
  }
</script>
