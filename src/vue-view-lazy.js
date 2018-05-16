export default {
    install(Vue,options={}){
        Vue.directive('view-lazy', {
            bind(el,bind,vnode){
                el.setAttribute('data-view','false');//设置标志
            },
            inserted(el,bind,vnode){
                const observer = new IntersectionObserver(function(change){//该方法是异步自动监听,消耗性能较小
                    const loadingImg = options.loading || '';
                    if(change[0].intersectionRatio>0&&el.dataset.view==='false'){
                        el.dataset.view = 'true';
                        if(el.tagName.toLowerCase()==='img'){
                            bind.def.aftLoadImg(el,bind.value,observer)  //处理图片下载函数  use: v-view-lazy='imgage_src'
                        }else{
                            bind.value.call(el,vnode)//处理函数(建议处理异步请求的函数) use: v-view-lazy='e=>fu(e)'
                        }
                    }else if(change[0].intersectionRatio<=0&&el.dataset.view==='false'){
                        el.src = loadingImg;
                    }
                });
                observer.observe(el);//开始监听该元素
            },
            aftLoadImg(el, url,observer){
                var oImg = new Image();
                const errorImg = options.error || '';
                oImg.onload = function() {
                    el.src = oImg.src; //下载成功后将成功图片赋给目标obj目标对象
                };
                oImg.onerror = function(){
                    el.src = errorImg; //下载失败后将失败图片赋给目标obj目标对象
                };
                oImg.src = url; //oImg对象先下载该图像
                observer.unobserve(el);//移除该元素的监听
            },
        })
    }
}