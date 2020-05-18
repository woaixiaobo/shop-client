<template>
  <div style="background: #ccc; height: 50px;">
    <span>小明每次花100元</span>
    <!-- 点击按钮是分发自定义事件 -->
    <button @click="$emit('update:money',money-100)" >花钱</button>
    爸爸还剩 {{money}} 元
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Child',
    props: ['money']
  }
</script>
