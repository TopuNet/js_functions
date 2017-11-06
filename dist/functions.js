/*
    1.0.15
    高京
    2016-08-29
    JS类库
*/

var functions = {
    init: function() {

        $(function() {
            $(".li_touchstart").on("touchstart mousedown", function(e) {
                e.preventDefault();
                functions.li_click($(this));
            });

            $(".li_click").on("click", function() {
                functions.li_click($(this));
            });
        });
    },

    /*
        高京
        2017-10-25
        过滤表单非法字符
        @str: 需要过滤的字符串
    */
    convers: function(str) {

        var result = str;

        var regExp = new RegExp("\'", "ig");
        result = result.replace(regExp, "&acute;");

        regExp = new RegExp("\<", "ig");
        result = result.replace(regExp, "&lt;");

        regExp = new RegExp("\"", "ig");
        result = result.replace(regExp, "&quot;");

        return result;
    },

    /*
        高京
        2017-08-02
        日期格式化_仿微信
        @_date: 日期
    */
    dateFormat_wx: function(_date) {

        var date = new Date(_date);

        var year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            hour = date.getHours(),
            minute = date.getMinutes();

        var str = "";
        date = new Date();

        if (date.getFullYear() == year && date.getMonth() + 1 == month && date.getDate() == day)
            str = "";
        else {
            str = year + "年";
            // if (month < 10)
            //     str += "0";
            str += month + "月";
            // if (day < 10)
            //     str += "0";
            str += day + "日 ";
        }


        if (hour < 10)
            str += "0";
        str += hour + ":";
        if (minute < 10)
            str += "0";
        str += minute;
        // str += ":";
        // if (second < 10)
        //     str += "0";
        // str += second;

        return str;
    },
    /*
        高京
        2017-08-02
        解决ios端fixed居底input被键盘遮挡的问题
        @dom_selector: 监听focus和blur的Dom的选择器
        @autocheck: true|false。自动执行innerHeight的改变监听，解决h5页面input.focus()后不能进入.on("focus")的handler的问题。默认false
    */
    fix_ios_fixed_bottom_input: function(dom_selector, autocheck) {

        autocheck = autocheck || false;

        // IOS版本（安卓则直接退出）
        var regExp = new RegExp(/.+os (\w+?)_\w+_\w+ like mac os x.+ /ig),
            iosEdition = regExp.exec(navigator.userAgent);

        if (iosEdition) {
            iosEdition = parseInt(iosEdition[1]);
        } else {
            return;
        }

        var footer_input = $(dom_selector);
        var interval,
            window_innerHeight_px,
            _window_innerHeight_px;

        var exec = function() {

            _window_innerHeight_px = window.innerHeight;

            // var dt = new Date();
            // footer_input.val(dt.getTime() + ":" + window_innerHeight_px + " : " + _window_innerHeight_px);

            // 如果innerHeight变化，或者ios版本小于11（ios10 首先innerHeight不会有变化，其次在执行下面代码时，不会有屏闪，所以持续interval除了性能，没有问题）
            if (window_innerHeight_px != _window_innerHeight_px || iosEdition < 11) {
                document.body.scrollTop = document.body.scrollHeight; //获取焦点后将浏览器内所有内容高度赋给浏览器滚动部分高度
                window_innerHeight_px = _window_innerHeight_px;
            }
        };

        // 初始化window_innerHeight_px，开始interval
        var focus_handler = function() {
            window_innerHeight_px = 0;
            interval = setInterval(function() {
                exec();
            }, 1000);
        }

        footer_input.on("focus", focus_handler);

        footer_input.on("blur", function() {
            clearInterval(interval);
        });

        if (autocheck)
            focus_handler();
    },
    /*
        高京
        2017-06-07
        乘除法计算，解决小数计算误差
        * kind：1-乘法（cal1×cal2） 2-除法（cal1÷cal2）
    */
    calculate: function(kind, cal1, cal2) {
        cal1 = cal1 || 1;
        cal2 = cal2 || 1;
        var lastDealNum = 0,
            i,
            str1 = cal1.toString(),
            str2 = cal2.toString(),
            str_lastDealNum = "1";

        // 根据小数点位置，获取需要处理的倍数
        var get_lastDealNum = function(str) {
            i = str.indexOf(".");
            if (i == -1)
                return 0;
            else
                return str.length - i - 1;
        };

        // 累加str1和str2对应的倍数
        lastDealNum += get_lastDealNum(str1);
        lastDealNum += get_lastDealNum(str2);

        // 根据需要处理的倍数，生成最后处理的数
        for (i = 0; i < lastDealNum; i++) {
            str_lastDealNum += "0";
        }

        // 计算
        switch (kind) {
            case 1:
                return parseFloat(str1.replace(".", "")) * parseFloat(str2.replace(".", "")) / parseFloat(str_lastDealNum);
            case 2:
                return parseFloat(str1.replace(".", "")) / parseFloat(str2.replace(".", "")) / parseFloat(str_lastDealNum);
            default:
                return 0;

        }
    },

    /*
        高京
        2016-09-10

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
    */

    scrollTop: function(opt) {
        var opt_default = {
            obj_selector: window,
            toTop_px: 0,
            durTime_ms: 200
        };
        opt = $.extend(opt_default, opt);

        if (opt.obj_selector === "window")
            opt.obj_selector = window;

        var perTime = 20;

        var scrollTop_selector = opt.obj_selector == window ? "html,body" : opt.obj_selector;
        var obj = $(scrollTop_selector);
        var top_now_px = obj.scrollTop();
        var top_per_px = (opt.toTop_px - top_now_px) / opt.durTime_ms * perTime;

        var set_scrollTop = function() {
            obj.scrollTop(obj.scrollTop() + top_per_px);
            var stop_toTop_bool = top_per_px <= 0 && (obj.scrollTop() + top_per_px) <= opt.toTop_px;
            var stop_toDown_bool = top_per_px >= 0 && (obj.scrollTop() + top_per_px) >= opt.toTop_px;
            if (stop_toTop_bool || stop_toDown_bool) {
                obj.scrollTop(opt.toTop_px);

                if (opt.callback)
                    opt.callback();
                return;
            } else {
                var stop_toDown_bool = top_per_px >= 0 && (obj.scrollTop() + $(window).height() >= obj[0].scrollHeight);
                if (!stop_toDown_bool)
                    setTimeout(function() {
                        set_scrollTop();
                    }, perTime);
            }
        };

        set_scrollTop();
    },

    /*
        高京
        2016-02-24
        复制对象
            myOjb: 源对象
    */
    clone: function(myObj) {
        if (typeof(myObj) != 'object') return myObj;
        if (myObj === null) return myObj;

        var myNewObj = {};

        for (var i in myObj)
            myNewObj[i] = functions.clone(myObj[i]);

        return myNewObj;
    },
    /*
        高京
        2016-01-02
        插入css3的keyframes rule
            style：rule
    */
    insert_keyframe: function(style) {
        var _obj = document.styleSheets[0];
        if (_obj.insertRule)
            _obj.insertRule(style, 0);
        else
            _obj.appendRule(style, 0);
    },

    /*
        高京
        2016-01-02
        监听webkitAnimation
            selector：要监听的selector
            Callback_end：animation结束时的回调，可为null
            Callback_start：animation开始时的回调，可为null
            Callback_iteration：animation进行循环时的回调，可为null
    */
    webkitAnimationListen: function(selector, Callback_end, Callback_start, Callback_iteration) {
        var obj = document.querySelector(selector);
        if (Callback_end) {
            obj.addEventListener("webkitAnimationEnd", Callback_end);
        }
        if (Callback_start) {
            obj.addEventListener("webkitAnimationStart", Callback_start);
        }
        if (Callback_iteration) {
            obj.addEventListener("webkitAnimationIteration", Callback_iteration);
        }
    },

    /*
        高京
        2016-01-02
        移动端解决微信浏览器上下灰条并执行内部移动
            需要jquery或zepto支持
            selector: 固定高度的盒选择器。如.panel
            overflow_scrolling：是否执行盒内部移动。true-移动 else-不移动
    */
    mobile_stop_moved: function(selector, overflow_scrolling) {
        $(selector).css("overflow", "scroll");

        // 终止body应有的滚动事件
        $(document).on('touchmove', function(e) {
            e.preventDefault();
        });

        if (overflow_scrolling) {
            // $(selector).css("overflow", "scroll");
            $(selector).css("-webkit-overflow-scrolling", "touch");
            $("body").on('touchstart', selector, function(e) {
                var el = e.currentTarget;
                if (el.scrollTop === 0) {
                    el.scrollTop = 1;
                } else if (el.scrollHeight == el.scrollTop + el.offsetHeight) {
                    el.scrollTop = el.scrollTop - 1;
                }

            });
            $("body").on('touchmove', selector, function(e) {
                var el = e.currentTarget;
                if (el.scrollTop === 0)
                    return;
                e.stopPropagation();
            });
        }
    },

    /*
     *@高京
     *@20150909
     *li_click的点击事件转向方法
     */
    li_click: function(selector) {
        $("#link_new_window").remove();
        $("body").append("<a id=\"link_new_window\" href=\"" + $(selector).attr("url") + "\" target=\"" + $(selector).attr("target") + "\" style=\"cursor:pointer\"><span></span></a>");
        //safari
        try {
            var e = document.createEvent('MouseEvent');
            e.initEvent('click', false, false);
            var sub = document.getElementById("link_new_window");
            sub.dispatchEvent(e);
        }
        //!safari
        catch (ee) {
            $("#link_new_window span").click();
        }
    },

    /*
     *@高京
     *@20151006
     *在页面中引用其他js文件
     */
    includeJS: function(path) {
        var a = document.createElement("script");
        a.type = "text/javascript";
        a.src = path;
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(a);
    },

    /*
     *@高京
     *@20151010
     *在页面中引用css文件
     */
    includeCSS: function(path) {
        var a = document.createElement("link");
        a.type = "text/css";
        a.rel = "stylesheet";
        a.href = path;
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(a);
    },

    /*
     *@高京
     *@20151023
     *获得地址栏参数集，返回JSON对象
     */
    getQueryParas: function() {

        var Json_obj;

        var str = functions.getQueryParas_str(1, "");
        Json_obj = JSON.parse(str);

        return Json_obj;
    },

    /*
     *@高京
     *@20151023
     *自动获得地址栏参数集，并拼接为地址栏字符串：a=1&b=2&c=3
     *Para：过滤掉的参数名（键），多个用|分隔，区分大小写
     */
    transParameters: function(Para) {
        return functions.getQueryParas_str(2, Para);
    },

    /*
     *@高京
     *@20151023
     *获得地址栏参数集，返回JSON字符串或地址栏字符串
     *Kind：拼接种类。1-JSON字符串；2-地址栏字符串
     *Para：过滤掉的参数名（键），多个用|分隔
     */
    getQueryParas_str: function(Kind, Para) {
        var url = location.href;
        var s = url.indexOf("?");
        var str = "";

        //将|分隔的Para替换为<><><>格式
        try {
            Para = "<" + Para.replace(/\|/g, "><") + ">";
        } catch (e) {
            console.log("e:" + e);
        }


        if (s > -1) {
            url = url.substring(s + 1);
            var e = url.indexOf("=");
            var key;
            var value;
            while (e > -1) {
                key = url.substring(0, e).replace("&", "");

                //判断获得的键名是否过滤
                if (Para.indexOf("<" + key + ">") > -1) {
                    e = url.indexOf("&");
                    if (e == -1)
                        break;
                    url = url.substring(e + 1);
                    e = url.indexOf("=");
                    continue;
                }

                url = url.substring(e + 1);
                e = url.indexOf("&");
                if (e == -1)
                    value = url.substring(0);
                else
                    value = url.substring(0, e);
                url = url.substring(e + 1);
                e = url.indexOf("=");
                if (str !== "") {
                    if (Kind == 1)
                        str += ",";
                    else
                        str += "&";
                }

                if (Kind == 1)
                    str += "\"" + key + "\":\"" + value + "\"";
                else
                    str += key.replace("&", "") + "=" + value;
            }
        }

        if (Kind == 1) {
            str = "{" + str + "}";
        }

        return str;
    },

    /*
     *@高京
     *@20150909
     *判断是否为PC端访问，返回true/false
     */
    isPc: function() {
        var system = {
            win: false,
            mac: false,
            xll: false
        };

        //检测平台
        var p = navigator.platform;
        //alert(p);
        system.win = p.indexOf("Win") === 0;
        system.mac = p.indexOf("Mac") === 0;
        system.x11 = (p === "X11") || (p.indexOf("Linux") === 0);

        if (system.win || system.mac || system.xll) {
            return true;
        } else {
            return false;
        }
    },

    /*
     *@陈斌
     *@20160103
     * 传入字符串。返回字符串长度数值
     */

    StrLength: function(Str) {
        var _i = 0;
        var _n = Str.length;
        var _c; //遍历Str时的Char值
        var _l = 0; //记录字符串长度
        for (_i; _i < _n; _i++) {

            //根据字符ASCII判断占用字节数
            _c = Str.charCodeAt(_i);
            if (_c <= 126)
                _l += 1;
            else
                _l += 2;
        }

        return _l;
    },
    
    /*
        苏成闯
        2017-11-6
        小数保留 / 补齐 x 位小数点 
        @tar(String | Number): 目标数
        @x(Number): 保留几位小数点
        @math: 可指定处理方式 默认四舍五入 round 
        
        #栗子: 
              toDecimalX(3.245); // 3.25
              toDecimalX(3); // 3.00
              toDecimalX(3, 3); // 3.000
              toDecimalX(3.245, 2, 'floor'); // 3.24
    */
    
    toDecimalX: function ( tar, x, math ) {
        x = x || 2;
        math = math || 'round';

        tar = parseFloat( tar );

        if ( isNaN( tar ) ) {
            throw new Error( '只能接受 Number | String 类型参数哦~' );
        }

        var xx = Math.pow( 10, x ),
            i;

        tar = '' + Math[ math || 'round' ]( tar * xx ) / xx;

        i = tar.indexOf( '.' );

        if ( i === -1 ) {
            tar += '.';

            i = tar.length + x;
        } else if ( tar.length - i <= x ) {
            i = tar.length + ( x - ( tar.length - i ) ) + 1;
        } else {
            return tar;
        }

        while ( tar.length < i ) {
            tar += '0';
        }

        return tar;
    },
        
    /*
        苏成闯
        2017-11-6
        返回 前 / 后 X 年 / 月
        @date: 目标起始日期 传入能被 new Date() 转换为 Date 对象的合法参数就行
        @type(Number): 操作类型 'year|-'(前几年) 或 'month|+'(后几个月)
        @step(Number): 步数 控制往前 / 后多少的值
        
        #栗子: 
              YMIncreaseOrDecrease('2017-10-31', 'month|-', 1); // 2017-9-30
              YMIncreaseOrDecrease('2017-10-31', 'month|+', 3); // 2018-1-31
    */
        
    YMIncreaseOrDecrease: function ( date, type, step ) {
        date = new Date( date );
        type = type.split( '|' );

        var res,
            day = date.getDate();

        if ( type[ 0 ] === 'year' ) {
            res = new Date( type[ 1 ] === '+' ? date.getFullYear() + step : date.getFullYear() - step, date.getMonth() + 1, 0 );
        } else if ( type[ 0 ] === 'month' ) {
            if ( type[ 1 ] === '+' ) {
                var newMonth = date.getMonth() + step + 1;

                if ( newMonth > 12 ) {
                    res = new Date( date.getFullYear() + Math.floor( ( ( newMonth - 12 ) / 12 ) ) + 1, newMonth % 12, 0 );
                } else {
                    res = new Date( date.getFullYear(), newMonth, 0 );
                }
            } else {
                var newMonth = date.getMonth() - step + 1;

                if ( newMonth < 0 ) {
                    res = new Date( date.getFullYear() - Math.floor( ( ( 12 - newMonth ) / 12 ) ), 12 - Math.abs( newMonth ) % 12, 0 );
                } else {
                    res = new Date( date.getFullYear(), newMonth, 0 );
                }
            }
        }

        // 结果月天数小于起始月 重置天数
        if ( !( res.getDate() < day ) ) {
            res.setDate( day );
        }

        return res;
    }
};


if (typeof define === "function" && define.amd) {
    define(function() {
        functions.init();
        return functions;
    });
} else {
    functions.init();
}
