<template>

    <div>
        <TypeNav/>
    <h2>params参数为{{$route.params.keyName}}</h2>
    <h2>query参数为{{$route.query.name}}</h2>

    <h2>Props参数为{{keyName}}</h2>
    <h2>Props参数为{{name}}</h2>
    </div>
</template>
    
<script>
import TypeNav from '@/Component/TypeNav'
export default {
    name:'Header',
    props:{
        keyName:String,
        name:String,
    },
    components:{
        TypeNav,
    }
}
</script>
<style scoped>
    
</style>