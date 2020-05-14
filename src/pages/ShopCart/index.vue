<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(item) in cartList" :key="item.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="item.isChecked===1"
            @change="checkCartItem(item)"
            >
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl">
            <div class="item-msg">{{item.skuName}}</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{item.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeItemNum(item,-1)">-</a>
            <input autocomplete="off" type="text" 
            :value="item.skuNum" minnum="1" class="itxt"
            @change="changeItemNum(item,$event.target.value - item.skuNum,$event)"
            >
            <a href="javascript:void(0)" class="plus" @click="changeItemNum(item,1)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{item.skuNum * item.cartPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="delCart(item.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="isAllChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="delAllCart(cartList)">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{totalCount}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState,mapGetters} from "vuex"
  export default {
    name: 'ShopCart',
    computed: {
      ...mapState({
        cartList:state=>state.shopCart.cartList,
      }),
      ...mapGetters(['totalCount','totalPrice']),
      //全选属性的计算,因为全选是根据item的isChecked是否为1判断出来的,所以计算即可
      isAllChecked:{
        get(){
          //1.判断isChecked为1的数组的长度是否等于,carlist的长度,相等的话就是全选,此时全选框选中
          //return this.cartList.filter(item=>item.isChecked===1).length===this.cartList.length;
          //2.判断isChecked为0的数组的长度是否为0,如果长度为0,则代表全部选中
          //return this.cartList.filter(item=>item.isChecked!==1).length===0
          //3.用find方法查找数组当中是否有isChecked不为1(就是等于0)的数值,如果一个没有就是undefined
          //return this.cartList.find(item=>item.isChecked!==1)===undefined;
          //4.同三方法,如果一个0也没有find的值就是undefined,所以此时就代表全选,
            //然后对undefined取反就是true,全选框就会选中
          //return !this.cartList.find(item=>item.isChecked!==1);
          //5.用some方法,如果数组当中有一个元素符合条件就是true
          // return this.cartList.some(item=>item.isChecked===1);
           //全选时,所有的值都为1,some就会返回undefined
          // return !this.cartList.some(item=>item.isChecked!==1);
          //6.用every方法,全部的值都符合时为true
          return this.cartList.every(item=>item.isChecked===1)&&this.cartList.length!==0

        },
        async set(val){//当勾选状态发生改变时,就发生请求
          try {
            //调用异步的actions,并判断是否正确
            await this.$store.dispatch('checkAllCartItems',val);
            //成功的话,重新获取列表数据
            this.$store.dispatch('getCartLit')
          } catch (error) {
            alert(error.message);
          }


        },
      }
  },
  mounted() {
    this.$store.dispatch('getCartLit');
  },
  methods: {
    //状态切换时,重新发送请求
    async checkCartItem(item){
      //获取发送请求所需要的的参数  skuId, isChecked  
      const skuId = item.skuId;
      //改变时先判断之前的状态是选中还是不选中 然后取反
      const isChecked = item.isChecked===1?0:1;
      try {
        //发送修改状态的请求\
        await this.$store.dispatch('checkCartItem',{skuId,isChecked});
        //发送成功重新获取列表数据,数据一变化,页面也会随之更新
        this.$store.dispatch('getCartLit');
      } catch (error) {
        console.log(error);
      }
    },
    //改变购物项数量
    async changeItemNum(item,numChange,event){
       //如果修改后的数量大于0才更新
      if(item.skuNum + numChange>0){
          try {
          //调用异步的actions
          await this.$store.dispatch('addToCart3',{skuId:item.skuId,skuNum:numChange});
          //重新请求列表数据,来更新数据和页面
          this.$store.dispatch('getCartLit');
        } catch (error) {
          alert(error);
        }
      }else{//当输入的不是数字时,不需要更新,且值为原本的值
        event.target.value = item.skuNum;
      }
      
    },
    //删除当前商品信息
    async delCart(skuId){
      try {
        //发送删除的actions异步
        await this.$store.dispatch('deleteCart',skuId);
        //成功时,重新获取列表
        this.$store.dispatch('getCartLit');
      } catch (error) {
        alert(error.message);
      }
    },
     //删除选中商品信息
    async delAllCart(cartList){
      cartList.forEach(async ()=>{
          try {
          //发送删除的actions异步,
          //因为deleteAllCart当中又调用了删除单个商品的dispatch所以此处不带参数
          await this.$store.dispatch('deleteAllCart');
          //成功时,重新获取列表
          this.$store.dispatch('getCartLit');
        } catch (error) {
          alert(error.message);
        }
      })
      
    }
  },
  }
  
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 4.1667%;
          }

          .cart-list-con2 {
            width: 25%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con3 {
            width: 20.8333%;

            .item-txt {
              text-align: center;
            }
          }

          .cart-list-con4 {
            width: 12.5%;

          }

          .cart-list-con5 {
            width: 12.5%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 12.5%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 12.5%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>