<template>
    <div>
    <TypeNav/>
    <ListContainer/>
    <TodayRecommend/>
    <Rank/>
    <Like/>
    <!-- 有几个楼层也是数据决定的,所以遍历 -->
    <Floor v-for="floor in floors" :key="floor.id" :floor="floor" />
    <Brand/>
    </div>
</template>
    
<script>
//自己的组件自己用
import ListContainer from "./ListContainer/ListContainer";
import TodayRecommend from "./TodayRecommend/TodayRecommend"
import Rank from "./Rank/Rank"
import Like from "./Like/Like"
import Floor from "./Floor/Floor"
import Brand from "./Brand/Brand"
import {mapState} from 'vuex'
export default {
    name:'Home',
    mounted() {
        this.$store.dispatch('getBanners');
        this.$store.dispatch('getFloors');
    },
    computed: {
        ...mapState({
            floors:state=>state.home.floors
        })
    },
    components:{
        ListContainer,
        TodayRecommend,
        Rank,
        Like,
        Floor,
        Brand,
    },
}
</script>
<style scoped>
    
</style>