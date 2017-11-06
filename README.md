# JS类库 v1.0.16
### 安装：npm install TopuNet-js-functions

文件结构：
-------------
        functions.js 放入项目文件夹jq（原生规范）或widget/lib（AMD规范）中

方法列表：
-------------

1. 自动对 ".li_click" 的DOM进行 click 监听，并根据target和url参数进行页面跳转。如：

		<li class="li_click" target="_blank" url="http://www.topu.net"></li>
		
		<div class="li_click" target="_self" url="http://www.51icb.com"></li>

2. 自动对 ".li_touchstart" 的DOM进行 touchstart mousedown 的监听，功能和示例同上。

高京

1. convers(str)

        过滤表单非法字符

        str: 需要过滤的字符串

1. dateFormat_wx(_date)

        日期格式化_仿微信
        
        _date: 日期

1. fix_ios_fixed_bottom_input(dom_selector)

        解决ios端fixed居底input被键盘遮挡的问题

        dom_selector: 监听focus和blur的Dom的选择器

1. calculate(kind, cal1, cal2)
        
        乘除法计算，解决小数计算误差
        
        kind：1-乘法（cal1×cal2） 2-除法（cal1÷cal2）

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
	 
苏成闯

1. toDecimalX( tar, x, math )

        小数保留 / 补齐 x 位小数点 
        tar(String | Number): 目标数
        x(Number): 保留几位小数点
        math(String): 可指定处理方式 默认四舍五入 round 
        #栗子: 
                toDecimalX(3.245); // 3.25
                toDecimalX(3); // 3.00
                toDecimalX(3, 3); // 3.000
                toDecimalX(3.245, 2, 'floor'); // 3.24
	 
2. YMIncreaseOrDecrease( date, type, step )

        返回 前 / 后 X 年 / 月
        date(String): 目标起始日期
        type(Number): 操作类型 'year|-'(前几年) 或 'month|+'(后几个月)
        step(Number): 步数 控制往前 / 后多少的值
        #栗子: 
                YMIncreaseOrDecrease('2017-10-31', 'month|-', 1); // 2017-9-30
                YMIncreaseOrDecrease('2017-10-31', 'month|+', 3); // 2018-1-31

        
更新日志：
-------------
v1.0.16

        1. 增加 toDecimalX 方法：小数保留 / 补齐 x 位小数点
        2. 增加 YMIncreaseOrDecrease 方法：返回目标日期 前 / 后 x 年 / 月 
	
v1.0.15

        增加convers方法：过滤表单非法字符

v1.0.14

        优化fix_ios_fixed_bottom_input方法，增加blur的监听。增加autocheck参数，当h5页面执行$("input").focus()获得焦点后，需要调用此方法并传autocheck参数为true，解决无法进入on("focus")监听的bug

v1.0.13

        1. 优化fix_ios_fixed_bottom_input方法，差异化解决ios11、ios非11和安卓。ipad暂未测试

v1.0.12

        1. 修改scrollTop的小问题

v1.0.11

        1. 调整fix_ios_fixed_bottom_input的监听，从100毫秒的interval改为1500毫秒的timeout。解决ios11抖动的问题 

v1.0.10

        1. 修改bug

v1.0.9

        1. 增加方法dateFormat_wx
        2. 去除jquery的依赖

v1.0.8

        1. 增加方法fix_ios_fixed_bottom_input

v1.0.7

        1. 修改scrollTop的小问题。

v1.0.6

        1. 增加方法calculate

v1.0.5

        1. 通过jshint
        2. scrollTop方法莫名其妙的和goto_top模块的scrollTop逻辑不一样，改了，没测试。

v1.0.4

        1. 修复bug

v1.0.3

        1. 增加监听 li_touchstart

v1.0.2

        1. 增加方法scrollTop
        2. 完善readme

v1.0.1

        1. 创建项目并发布到github
        2. 发布到npm：TopuNet/js-functions
