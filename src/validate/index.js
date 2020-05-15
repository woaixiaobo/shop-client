import Vue from 'vue';
import VeeValidate, {
    Validator
} from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN'; //引入中文包，提示信息可以以中文形式显示
import VueI18n from 'vue-i18n';
Vue.use(VueI18n)
const i18n = new VueI18n({
    locale: 'zh_CN',
})
Vue.use(VeeValidate, {
    i18n,
    i18nRootKey: 'validation',
    dictionary: {
        zh_CN
    }
});
console.log(Validator);
Validator.extend('customReg', {
    validate: value => {
        // return /^[\s\S]*.*[^\s][\s\S]*$/.test(value)
        return value.trim();
    },
})
//验证码
Validator.extend('code', {
    validate: value => {
        // return /^[\s\S]*.*[^\s][\s\S]*$/.test(value)
        return value.trim();
    },
})
Validator.localize("zh_CN", {
    custom: {
        //numberBest需与组件的name属性值保持一致
        密码: {
            customReg: "密码不能为空",
            second:"密码于上次不符"
        },
        验证码: {
            code: "验证码不能为空",
        },
    },
})

