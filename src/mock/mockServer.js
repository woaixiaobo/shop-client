import Mock from 'mockjs'
import banners from './banners.json' // 得到的是一个js数组
import floors from './floors.json'  // 得到的是一个js数组

//模拟返回轮播图的数据接口
Mock.mock('/mock/banners',{code:200,data:banners});

//模拟返回楼层的接口数据 ,因为正常的数据当中是有code等信息的,所以此处也加上
// Mock.mock('./mock/floors',floors)
Mock.mock('/mock/floors',{code:200,data:floors})

//此模块不需要暴露只需要被加载一次就行, 引入main.js当中就可以被加载了
console.log('已加载mockServer.....')