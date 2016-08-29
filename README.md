# JS类库 v1.0.3
###安装：npm install TopuNet-js-functions

文件结构：
-------------
        functions.js 放入项目文件夹jq（原生规范）或widget/lib（AMD规范）中

方法列表：
-------------

1. 自动对 ".li_click" 的DOM进行 click 监听，并根据target和url参数进行页面跳转。如：

		<li class="li_click" target="_blank" url="http://www.topu.net"></li>
		
		<div class="li_click" target="_self" url="http://www.51icb.com"></li>

2. 自动对 ".li_touchstart" 的DOM进行 touchstart mousedown 的监听，功能和实例同上。

高京

1. scrollTop(opt)

        改变容器的scrollTop属性动画方法——解决zepto不支持animate改变scrollTop的动画问题
        
        opt = {
            obj_selector: "div.box", // 滚动元素。默认：window
            toTop_px: 0, // 滚至位置，像素。默认：0
            durTime_ms: 200, // 滚动至toTop_px所用时间，毫秒。默认：200
            callback: function(){} // 回调方法
        };

        使用时可以先用animate尝试改变，成功后再次调用此方法。如：
            $("html,body").animate({ scrollTop: "0px" }, 200, function() {
                functions.scrollTop({
                    callback: function() {
                        console.log("success");
                    }
                });
            });

1. clone(myObj)

        复制对象（网上抄的）
        myObj：源对象
        
1. insert_keyframe(style)

        插入css3的keyframes rule
        style：rule
        
1. webkitAnimationListen(selector, Callback_end, Callback_start, Callback_iteration)
        
        监听webkitAnimation
        selector：要监听的selector
        Callback_end：animation结束时的回调，可为null
        Callback_start：animation开始时的回调，可为null
        Callback_iteration：animation进行循环时的回调，可为null
        
1. mobile_stop_moved(selector, overflow_scrolling)

        移动端解决微信浏览器上下灰条并执行内部移动
        selector: 固定高度的盒选择器。如.panel
        overflow_scrolling：是否执行盒内部移动。true-移动 else-不移动
        
1. getQueryParas() 

        获得地址栏参数集，返回JSON对象
        
1. transParameters(Para)

        自动获得地址栏参数集，并拼接返回为地址栏字符串：a=1&b=2&c=3
        Para：过滤掉的参数名（键），多个用|分隔，区分大小写
        
1. includeJS(path)

        在页面中引用其他js文件
        path：引用文件路径
        
1. includeCSS(path)

        在页面中引用其他CSS文件
        path：引用文件路径
        
1. isPc()

        判断是否为PC端访问，返回true/false
        
陈斌

1. StrLength(Str)

         传入字符串。返回字符串长度数值
         Str 字符串
        
更新日志：
-------------
v1.0.3

        1. 增加监听 li_touchstart

v1.0.2

        1. 增加方法scrollTop
        2. 完善readme

v1.0.1

        1. 创建项目并发布到github
        2. 发布到npm：TopuNet/js-functions