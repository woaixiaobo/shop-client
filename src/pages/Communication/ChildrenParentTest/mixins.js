// 多个组件相同的代码定义在这个模块

export const cpMixin = {
    methods: {
        //从当前组件取钱的方法,由父组件调用
        pullMoney(money) {
            this.money -= money;
        },
        //当前组件调用
        gaveMoney(money) {
            //自身的数据进行操作
            this.money -= money;
            //对父组件进行操作
            this.$parent.money += money;
        }
    },
}