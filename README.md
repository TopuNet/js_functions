# JS类库 v1.1.1
### 安装：npm install TopuNet-js-functions

文件结构：
-------------
        functions.js 放入项目文件夹jq（原生规范）或widget/lib（AMD规范）中

方法列表：
-------------

高京

1. convers(str)

        过滤表单非法字符

        str: 需要过滤的字符串

1. dateFormat_wx(_date)

        日期格式化_仿微信
        
        _date: 日期

1. judge_mobile_os()

        判断mobile系统，返回 ios | android | others

1. iphoneX_bottom_space_px

        iphoneX底部需要空出来的高度(px)

1. judge_iphoneX_MicroMessenger_changeStyle(opt)

        给iphoneX+微信浏览器：修改底部fixed盒的bottom；增加占位遮罩层；修改文档流内的占位盒高度
        建议默认将底部fixed盒隐藏，回调中显示

        opt = {
            bottom_fixed_selector: "", // 底部fixed盒的选择器，此盒将被修改bottom，无默认值
            document_fixed_space_selector: "", // 文档流内的占位盒选择器，此盒将被增加高度，无默认值
            fixed_space_div_bgColor: "#fff", // 底部新建占位遮罩盒的背景色，默认"#fff"，建议和页面背景色一致，以免穿帮
            callback: function(fixed_space_div) { // 回调(新建的底部占位遮罩层||undefined)，无论是否为iphoneX+微信浏览器都会执行
                fixed_space_div && fixed_space_div.css({
                    "background": "#000"
                });
            } 
        }

1. judge_iphoneX()

        判断设备是不是iphoneX，返回true/false

1. judge_MicroMessenger()
        
        判断是不是微信浏览器 (true/false)

1. fix_fixed_bottom_input(opt)

        解决 h5页面 fixed居底input被键盘遮挡的问题
        
        2018-01-14：
        iphoneX(测试版本11.2.2)+微信浏览器：fixed居底的input移动到顶部
        其他环境不处理

        @opt = {
            dom_selector, // 监听focus和blur的Dom的选择器
            autocheck: false, // 自动执行innerHeight的改变监听，解决h5页面input.focus()后不能进入.on("focus")的handler的问题。默认false
            callback // 执行完focus_handler和blur_handler的回调
        }

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

1. li_click_Listener()

        li_click的点击事件转向方法

        @2018-01-18 高京
        在需要监听li_click或li_touchstart盒的页面，需要自行执行li_click_Listener方法进行监听
        
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
	 
1. YMIncreaseOrDecrease( date, type, step )

        返回 前 / 后 X 年 / 月
        date(String): 目标起始日期
        type(Number): 操作类型 'year|-'(前几年) 或 'month|+'(后几个月)
        step(Number): 步数 控制往前 / 后多少的值
        #栗子: 
                YMIncreaseOrDecrease('2017-10-31', 'month|-', 1); // 2017-9-30
                YMIncreaseOrDecrease('2017-10-31', 'month|+', 3); // 2018-1-31

胡天培

1. 【需要完善】fix_h5_input_focus_position(opt)

        解决移动端h5页面文档流中input和textarea获得焦点后被键盘遮挡的bug
        目前的思路是将焦点滚动到一个安全的可视位置
        ios 10/11.2 可测。11.1实在找不到
        android 尽量多机型和系统

        2018-01-08 胡天培
        ios问题不大，只处理安卓

        @opt = {
            Listener_selector: "",   //监听focus的dom选择器，默认"input,textarea"
            OutBox_selector:"",      //包裹被监听元素的最外层选择器，高度为屏幕高度的元素 无默认
            scroll_selector:"",      //向上滚动的核选择器 默认为：body
        }

        
更新日志：
-------------
v1.1.1

        1. 规范版本号，升级至1.1.1。有bug再更改bug版本，新功能升级子版本
        2. fix_ios_fixed_bottom_input更改为fix_fixed_bottom_input，目前仅针对iphoneX+微信浏览器处理
        3. 增加judge_mobile_os()，判断移动端设备
        4. 增加judge_MicroMessenger()，判断是否为微信浏览器

v1.0.16

        增加 judge_iphoneX 方法：判断设备是不是iphoneX，返回true/false

v1.0.15 by 苏成闯

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
