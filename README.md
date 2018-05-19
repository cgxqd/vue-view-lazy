# vue-view-lazy


基于vue的懒加载插件

> 目的：图片或者其他资源进入可视区域后加载

## 安装使用

1. 直接下载`dist`目录下的[vue-view-lazy.min.js](https://gitee.com/cncgx/vue-view-lazy/blob/master/dist/vue-view-lazy.min.js)使用
2. 使用npm安装

### 直接使用
``` html
<div id="app">
    <span v-view-lazy @model="handleModel"></span>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js"></script>
<script src="./dist/vue-view-lazy.min.js"></script>
<script>
    Vue.use(vViewLazy.default,{});
    new Vue({
        el:'#app',
        data:{
            msg:'数据'
        },
        methods:{
            handleModel(){
                console.log('出现了');
            },
        },
    })
</script>
```
### npm:
``` bash
$ npm install --save-dev vue-view-lazy
```
### 引入vue-view-lazy
.main文件
``` html
import vView from 'vue-view-lazy'
Vue.use(vView,{
    error:'../../static/images/loading.png',
    loading:'../../static/images/loading.gif',
});
```
### 懒加载图片
.vue文件
``` html
<template>
    <ul id='img'>
        <li class="in" v-for="(item,i) in imgs" :key="i">
            <img src="#" alt="图片" v-view-lazy="item.src">
        </li>
    </ul>
</template>

<script>
    export default {
        data () {
            return {
                msg: 'Welcome to Your Vue.js App',
                imgs:[
                    {src:'../../static/images/img1.jpg'},
                    {src:'../../static/images/img2.png'},
                    {src:'../../static/images/img2.jpg'},
                    {src:'../../static/images/img3.jpg'},
                    {src:'../../static/images/img4.jpg'},
                    {src:'../../static/images/img5.jpeg'},  
                ]
            }
        },
        mounted(){
        },
    }
</script>
<style scoped>
    ...
</style>
```
### 懒加载数据
.vue文件
``` html
<template>
    <div>
        <!--@model自定义事件是在该dom在第一次出现在视口内时触发的方法-->
        <!--v-view-lazy='method' 或 v-view-lazy='(e)=>method(e,...arg)'-->
        <div  class="cnt" v-for="(v,i) in msg" :key="i" v-view-lazy @model="(e)=>getAjaxContent(e,v.msg)">
            loading...
        </div>
        <div  class="cnt" v-for="(v,i) in msg" :key="i" v-view-lazy @model="getAjaxContent()">
            loading...
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                msg:[]
            }
        },
        mounted(){
            fetch('http://localhost:3000/test').then(res=>res.json()).then(res=>{
                this.msg = res;
            })
        },
        methods:{
            getAjaxContent(event,msg){
                event.innerText = msg
            },
        }
    }
</script>

<style scoped>
    .cnt {
        /*background: #ececec;*/
        height: 500px;
        margin-bottom: 50px;
    }
</style>
```
