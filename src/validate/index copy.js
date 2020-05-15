import Vue from 'vue'
import {
    ValidationProvider,
    ValidationObserver,
    extend,
    localize,
    configure
} from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import zh_CN from 'vee-validate/dist/locale/zh_CN.json'
import merge from 'lodash/merge' // 用于合并多个对象

// 配置用于指定错误提示文本的样式类名
configure({
    classes: {
        valid: 'is-valid',
        invalid: 'is-invalid',
        // dirty: ['is-dirty', 'is-dirty'], // multiple classes per flag!
    }
})

// 将自定义的message与内置的中文message合并
const locale = merge(zh_CN, {
    messages: {
        is: '{_field_}必须与密码相同',
        oneOf: '{_field_}必须同意'
    }
})

// 指定提示的message用中文的
localize('zh_CN', locale)

// 安装所有规则(默认没有安装一个规则)
Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule])
})

// 注册全局组件
Vue.component('ValidationProvider', ValidationProvider) // 用于声明式校验某个表单项
Vue.component('ValidationObserver', ValidationObserver) // 用于统一编码校验