<template>
    <div>
    <h2>params参数为{{$route.params.keyName}}</h2>
    <h2>query参数为{{$route.query.name}}</h2>

    <h2>Props参数为{{keyName}}</h2>
    <h2>Props参数为{{name}}</h2>
    </div>
</template>
    
<script>
export default {
    name:'Header',
    props:{
        keyName:String,
        name:String,
    }
}
</script>
<style scoped>
    
</style>