<template>
    <div class="pagination">
        <!-- 当前页码为1时不能点击 -->
        <button :disabled='myCurrentPage===1' @click="setCurrentPage(myCurrentPage-1)">上一页</button>
        <!-- 起始页 start 大于1时才显示 -->
        <button v-if="startEnd.start>1" @click="setCurrentPage(1)">1</button>
        <!-- 起始页 start 大于2时才显示 -->
        <button v-if="startEnd.start>2">···</button>

        <!-- 连续页码  v-for 的优先级比v-if的优先级高，会先遍历v-for然后在v-if进行判断 -->
        <div style="display:inline" v-for="num in startEnd.end" :key="num">
            <button 
                v-if="num>=startEnd.start"
                :class="{active:num===myCurrentPage}"
                @click="setCurrentPage(num)"
                :key="num" >
            {{num}}</button>
        </div>
        
        <!-- 结束页 end 小于 总页数 totalPages -1 的时候才显示 -->
        <button v-if="startEnd.end<totalPages-1">···</button>
        <!-- 结束页的显示只有在end小于结束页（即总页数totalPages）的时候才会显示 -->
        <button v-if="startEnd.end<totalPages" @click="setCurrentPage(totalPages)">{{totalPages}}</button>
        <!-- 当当前页为 总数页 totalpages时不可操作 -->
        <button :disabled="startEnd.end===totalPages" @click="setCurrentPage(myCurrentPage+1)">下一页</button>

        <button style="margin-left: 30px" disabled>共 {{total}} 条</button>
    </div>
</template>

<script>
    export default {
        name: "Pagination",
        props:{
            //当前页码
            currentPage:{
                type:Number,
                default:1,
            },
            //pageSize每页的数量
            pageSize:{
                type:Number,
                default:5,
            },
            //total总数量
            total:{
                type:Number,
                default:0,
            },
            //showPageNo连续显示页码数
            showPageNo:{
                type:Number,
                default:5,//最好指定位奇数
            },
        },
        data() {
            return {
                //将外部传入的当前页码作为次组件的页码初始值
                myCurrentPage:this.currentPage,
            }
        },
        watch: {
            currentPage(val){//监视父组件传来的currentPage值(当前页码)
                //一旦父组件的当前页码发生改变,自己的当前页码也要改变
                this.myCurrentPage=val;
                console.log(val);
            }
        },
        computed: {
            //总页数totalPages = total总数量 / pageSize每页的数量 向上取整
            totalPages(){
                const { total, pageSize } = this
                return Math.ceil(total/pageSize);
            },
            //计算出连续页码的起始页数 start（不小于1） 和结束页码 end（不大于总页数totalPages）
            startEnd(){
                let start,end;
                //所依赖的数据  自己的页数myCurrentPage 连续页码数showPageNo 总页数totalPages
                const {myCurrentPage,showPageNo,totalPages}=this;
                //计算start
                /* 
                myCurrentPage,  showPageNo,  totalPages
                    4               5             8            23[4]56
                */
                start = myCurrentPage - Math.floor(showPageNo/2)  //start= 4-2 = 2
                //意外情况
                /* 
                myCurrentPage,  showPageNo,  totalPages
                    2               5             8            1[2]345
                但上面计算出的start为0
                */
                //为0时，就直接等于1即可
                if(start<1){
                    start=1;
                }


                 // 计算end
                /* 
                myCurrentPage,  showPageNo,  totalPages
                    4               5             8            23[4]56
                */
                end = start + showPageNo -1;  //2 + 5 -1 =6  此时起始为2 结束为6 正好五个
                //意外情况
                /* 
                myCurrentPage,  showPageNo,  totalPages
                    7               5             8            456[7]8
                上面算出的end为9  start为5   56789 ==> 5678 ==> 45678
                */
                //所以当超出时。直接将end设为 总页数totalPages
                if(end>totalPages){
                    end=totalPages;
                    //此时起始页数也已经不对了，要进行修改
                    start = end - showPageNo +1 //8-5+1 = 4
                    //但是此时start也可能出现问题
                    /* 
                    myCurrentPage,  showPageNo,  totalPages
                        3               5            4           
                    上面算出的 start = 0  end = 4      01234不对
                    */
                    if(start<1){
                        start=1;
                    }
                }
                return {start,end}
            }
        },
        methods: {
            setCurrentPage(num){
                //点击页面切换时，改变自己的页码，
                //而不是继续接受父组件传来的currentPage（只是用来初始页面的和父组件改变时用来跟新自己页码的）
                this.myCurrentPage=num;
                //分发Vue自定义事件：通知父组件，当前页码变化了。然后让父组件进行数据跟新
                this.$emit('currentChange',num);
            }
        },
    }
</script>

<style lang="less" scoped>
    .pagination {
        button {
            margin: 0 5px;
            background-color: #f4f4f5;
            color: #606266;
            outline: none;
            border-radius: 2px;
            padding: 0 4px;
            vertical-align: top;
            display: inline-block;
            font-size: 13px;
            min-width: 35.5px;
            height: 28px;
            line-height: 28px;
            cursor: pointer;
            box-sizing: border-box;
            text-align: center;
            border: 0;

            &[disabled] {
                color: #c0c4cc;
                cursor: not-allowed;
            }

            &.active {
                cursor: not-allowed;
                background-color: #409eff;
                color: #fff;
            }
        }
    }
</style>