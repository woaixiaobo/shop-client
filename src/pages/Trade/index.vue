<template>
  <div class="trade-container">
    <h3 class="title">填写并核对订单信息</h3>
    <div class="content">
      <h5 class="receive">收件人信息</h5>
      <div class="address clearFix" v-for="(address) in tradeInfo.userAddressList" 
      :key="address.id" @click="selectedAddr=address">
        <span class="username" :class="{selected:address===selectedAddr}">{{address.consignee}}</span>
        <p>
          <span class="s1">{{address.userAddress}}</span>
          <span class="s2">{{address.phoneNum}}</span>
          <span class="s3" v-if="address.isDefault==='1'">默认地址</span>
        </p>
      </div>
      
      <div class="line"></div>
      <h5 class="pay">支付方式</h5>
      <div class="address clearFix">
        <span class="username selected">在线支付</span>
        <span class="username" style="margin-left:5px;">货到付款</span>

      </div>
      <div class="line"></div>
      <h5 class="pay">送货清单</h5>
      <div class="way">
        <h5>配送方式</h5>
        <div class="info clearFix">
          <span class="s1">天天快递</span>
          <p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
        </div>
      </div>
      <div class="detail">
        <h5>商品清单</h5>
        <ul class="list clearFix" v-for="(item) in tradeInfo.detailArrayList" :key="item.skuId">
          <li>
            <img :src="item.imgUrl" alt="" style="width:100px;heigth:100px">
          </li>
          <li>
            <p>
              {{item.skuName}}</p>
            <h4>7天无理由退货</h4>
          </li>
          <li>
            <h3>{{item.orderPrice}}</h3>
          </li>
          <li>X{{item.skuNum}}</li>
          <li>有货</li>
        </ul>
        
      </div>
      <div class="bbs">
        <h5>买家留言：</h5>
        <textarea placeholder="建议留言前先与商家沟通确认" class="remarks-cont"></textarea>

      </div>
      <div class="line"></div>
      <div class="bill">
        <h5>发票信息：</h5>
        <div>普通发票（电子） 个人 明细</div>
        <h5>使用优惠/抵用</h5>
      </div>
    </div>
    <div class="money clearFix">
      <ul>
        <li>
          <b><i>{{tradeInfo.totalNum}}</i>件商品，总商品金额</b>
          <span>{{tradeInfo.totalAmount}}</span>
        </li>
        <li>
          <b>返现：</b>
          <span>0.00</span>
        </li>
        <li>
          <b>运费：</b>
          <span>0.00</span>
        </li>
      </ul>
    </div>
    <div class="trade">
      <div class="price">应付金额:　<span>{{tradeInfo.totalAmount}}</span></div>
      <div class="receiveInfo">
        寄送至:
        <span>{{selectedAddr.userAddress}}</span>
        收货人：<span>{{selectedAddr.consignee}}</span>
        <span>{{selectedAddr.phoneNum}}</span>
      </div>
    </div>
    <div class="sub clearFix">
      <a href="javascript:" class="subBtn" @click="submitOrder">提交订单</a>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
  export default {
    name: 'Trade',
    data() {
      return {
        selectedAddr:{},//存放地址的对象,因为要对地址进行操作,所以要写在data当中,
                              //并且进行监视,因为初始肯定是undefined
        orderComment:'快发个小妞！'
      }
    },
    computed: {
      ...mapState({
        tradeInfo: state => state.order.tradeInfo
      })
    },
    mounted() {//先获取接口信息
      this.$store.dispatch('getTradeInfo');
    },
    watch: {
      //监视的是tradeInfo内部的地址列表数据
      //监视对象内部的某个属性
      'tradeInfo.userAddressList'(value){
        // 在tradeInfo中的userAddressList中找出isDefault为1的地址对象
        const selectedAddr = value.find(address=>address.isDefault==='1')
        //更新data数据
        this.selectedAddr = selectedAddr;
      }
    },
    methods: {
      async submitOrder(){
        //要提交的参数
        /*tradeNo订单编号和 orderDetailList（在tradeInfo当中为detailArrayList） 
          多个商品数据对象在tradeInfo当中*/
          const {tradeNo,detailArrayList} = this.tradeInfo;
          //用户的地址 姓名  电话 都在tradeInfo.userAddressList当中，
          //因为是操作这个数据的，所以贮存在了selectedAddr当中方便操作
          const{userAddress,consignee,phoneNum} = this.selectedAddr;
          //把所有的数据都封装到一个对象当中
          const orderInfo={
            // 地址相关的3个数据,要和接口的数据参数保持相同
            consignee,
            consigneeTel: phoneNum,
            deliveryAddress: userAddress,

            paymentWay: 'ONLINE', // 固定为在线支付
            orderComment: this.orderComment, // 留言内容
            orderDetailList: detailArrayList // 订单中的商品列表
          };
          //发送提交订单的请求,因为用到了请求结果，所以此处进行赋值
          const result = await this.$API.reqSubmitOrder(tradeNo,orderInfo)
          //如果支付成功跳转到支付页面
          if(result.code === 200){
            console.log(result);
            //获取订单ID
            const orderId = result.data
            //跳转支付页面
            this.$router.push({
              path:'/pay',
              query:{orderId}
            });
            //字符串形式
            // this.$router.push('/pay?orderId='+orderId);
          }else{
            alert('提交订单失败')
          }
      }
    },
  }
</script> 

<style lang="less" scoped>
  .trade-container {
    .title {
      width: 1200px;
      margin: 0 auto;
      font-size: 14px;
      line-height: 21px;
    }

    .content {
      width: 1200px;
      margin: 10px auto 0;
      border: 1px solid rgb(221, 221, 221);
      padding: 25px;
      box-sizing: border-box;

      .receive,
      .pay {
        line-height: 36px;
        margin: 18px 0;
      }

      .address {
        padding-left: 20px;
        margin-bottom: 15px;

        .username {
          float: left;
          width: 100px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border: 1px solid #ddd;
          position: relative;
        }

        .username::after {
          content: "";
          display: none;
          width: 13px;
          height: 13px;
          position: absolute;
          right: 0;
          bottom: 0;
          background: url(./images/choosed.png) no-repeat;
        }

        .username.selected {
          border-color: #e1251b;
        }

        .username.selected::after {
          display: block;
        }

        p {
          width: 610px;
          float: left;
          line-height: 30px;
          margin-left: 10px;
          padding-left: 5px;
          cursor: pointer;

          .s1 {
            float: left;

          }

          .s2 {
            float: left;
            margin: 0 5px;
          }

          .s3 {
            float: left;
            width: 56px;
            height: 24px;
            line-height: 24px;
            margin-left: 10px;
            background-color: #878787;
            color: #fff;
            margin-top: 3px;
            text-align: center;
          }
        }

        p:hover {
          background-color: #ddd;
        }
      }

      .line {
        height: 1px;
        background-color: #ddd;
      }

      .way {
        width: 1080px;
        height: 110px;
        background: #f4f4f4;
        padding: 15px;
        margin: 0 auto;

        h5 {
          line-height: 50px;
        }

        .info {
          margin-top: 20px;

          .s1 {
            float: left;
            border: 1px solid #ddd;
            width: 120px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            margin-right: 10px;
          }

          p {
            line-height: 30px;
          }
        }
      }

      .detail {
        width: 1080px;

        background: #feedef;
        padding: 15px;
        margin: 2px auto 0;

        h5 {
          line-height: 50px;
        }

        .list {
          display: flex;
          justify-content: space-between;

          li {
            line-height: 30px;

            p {

              margin-bottom: 20px;
            }

            h4 {
              color: #c81623;
              font-weight: 400;
            }

            h3 {

              color: #e12228;
            }
          }
        }
      }

      .bbs {
        margin-bottom: 15px;

        h5 {
          line-height: 50px;
        }

        textarea {
          width: 100%;
          border-color: #e4e2e2;
          line-height: 1.8;
          outline: none;
          resize: none;
        }
      }

      .bill {
        h5 {
          line-height: 50px;
        }

        div {
          padding-left: 15px;
        }
      }
    }

    .money {
      width: 1200px;
      margin: 20px auto;

      ul {
        width: 220px;
        float: right;

        li {
          line-height: 30px;
          display: flex;
          justify-content: space-between;

          i {
            color: red;
          }
        }
      }
    }

    .trade {
      box-sizing: border-box;
      width: 1200px;
      padding: 10px;
      margin: 10px auto;
      text-align: right;
      background-color: #f4f4f4;
      border: 1px solid #ddd;

      div {
        line-height: 30px;
      }

      .price span {
        color: #e12228;
        font-weight: 700;
        font-size: 14px;
      }

      .receiveInfo {
        color: #999;
      }
    }

    .sub {
      width: 1200px;
      margin: 0 auto 10px;

      .subBtn {
        float: right;
        width: 164px;
        height: 56px;
        font: 700 18px "微软雅黑";
        line-height: 56px;
        text-align: center;
        color: #fff;
        background-color: #e1251b;

      }
    }

  }
</style>