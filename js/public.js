// 1 )传入元素id,返回指定id元素
function $id(id){
    return document.getElementById(id)
}

// 2 )获取页面所有的某类标签
function $qsall(a){
    return document.querySelectorAll(a)
}

// 3 )生成一个n到m之间的随机整数
function rand(n,m){
    return n+parseInt(Math.random()*(m-n+1));
}

// 4 )生成一个16进制的随机颜色
function getColor(){
    var result= "#";
    for(var i=0;i<6;i++){
        result += rand(0,15).toString(16)
        // 把十进制的数字变成十六进制的字符串:0 1 ...9 a b c d f
    }
    return result;
}

// 5 )传入一个数组和一个元素,判断数组中是否存在该元素,存在返回true,不存在返回false
function has(arr,data){
    for(var i=0;i<arr.length;i++){
        if(data===arr[i]){
            //continue和break;
            //在此处,循环在函数中,return终止了函数执行,就是终止了循环
            return true;
        }
    }
    //如果函数能运行到此处,说明没有终止函数
    return false;
}

// 6 )传入一个数组,返回数组去重以后的结果,不改变原数组
function norepeat(arr){
    var result = [];
    for(var i=0;i<arr.length;i++){
        if(!has(result,arr[i])){
            //如果进入此处,说明arr[i]在result里面不存在,可以放进去
            result.push(arr[i])
        }
    }
    return result;
}

// 7 )格式化时间:YYYY-MM-DD HH-mm-ss  //times是一个时间戳:指定时间距离格林威治时间的毫秒数,是可选参数
function formatDate(times){
    var time = new Date;
    if(times){
        //如果进入此处,说明time有实参赋值,因为如果没有实参赋值,他是undefined
        //如果传入参数,表示不是当前时间,是你指定的时间
        time.setTime(times)
    }
    //年
    var year = time.getFullYear();
    //月
    var month = time.getMonth()+1;//month取值0-11之间,显示要变成1-12之间,所以+1
    //如果月份是一位数,前面要补0;
    month = month<10?"0"+month:month;
    //日
    var date = time.getDate();
    //如果日是一位数,前面要补0;
    date = date<10?"0"+date:date;
    //小时
    var hour = time.getHours();
    hour = hour<10?"0"+hour:hour;
    //分
    var minute = time.getMinutes();
    minute = minute<10?"0"+minute:minute;
    //秒
    var second = time.getSeconds();
    second = second<10?"0"+second:second;
    return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
}

// 8 )获取滚动的距离{top:"",left:""}
function getScroll(){
    if(window.pageYOffset){
        return {
            top:window.pageYOffset,
            left:window.pageXOffset
        }
    }else if(document.documentElement.scrollLeft){
        return {
            top:document.documentElement.scrollTop,
            left:document.documentElement.scrollLeft
        }
    }else{
        return {
            top:document.body.scrollTop,
            left:document.body.scrollLeft
        }
    }
}

// 9 )获取指定dom的指定样式值
function getStyle(dom,attr){
    if(window.getComputedStyle){
        //如果window.getComputedStyle不是undefined,说明是非IE浏览器
        return window.getComputedStyle(dom,null)[attr];
    }else{
        //如果window.getComputedStyle是undefined,说明是IE浏览器
        return dom.currentStyle[attr]
    }
    
}

// 10 )随机产生一个包含n个字母或数字的字符串
function randChar(n){
    var str = "";//用来记录随机字符串集合
    for(var i=0;i<n;i++){	
        // 所以先随机产生一个48-122之间的随机整数
        var code = rand(48,122)
        if((code>57&&code<65)||(code>90&&code<97)){
            // 如果产生的编码不是数字或字符，本次作废
            i--; 
        }else{
            // 如果产生的编码是数字或字符，可以
            var char = String.fromCharCode(code);
            str+=char;
        }
    }
    return str;
}

// 11 )产生一个A-Z之间的字母
function showCode(){
    //随机产生一个A-Z之间的编码
    var code=rand(65,90)
    //然后转化成字母
    var char =String.fromCharCode(code)
    return char
}

// 12 )去除字符串两端的空格
function trim(str){
    //1
    // str=str.replace(/^\s+/,'')
    // str=str.replace(/\s+$/,'')
    // return str
    //2
    return str.replace(/^\s+/,'').replace(/\s+$/,'')
}
// 13 )测算元素距离页面的距离
function getDistance(dom){
	var totalLeft = 0;
	var totalTop = 0;
	do{
		totalLeft+= dom.offsetLeft;
		totalTop+=dom.offsetTop;
		//下一次的dom节点就是本次dom节点的最近的有定位的父元素
		dom = dom.offsetParent;
	}while(dom.nodeName!="BODY")			

	return {
		left:totalLeft,
		top:totalTop
	}
}

// 14 )事件监听
function addEvent(dom,type,fn){
	if(dom.addEventListener){
		//说明dom 上有addEventListener这个属性
		dom.addEventListener(type,fn)
	}else{
		//说明是IE678
		dom.attachEvent("on"+type,fn)
	}
}


// 15 )封装一个函数,返回鼠标按键,要求:左0  中1  右2
function getButton(e){
	//普通的函数
	if(e){
		//如果接到的e确实有值,说明e不是undefined,说明当前浏览器不是IE678
		return e.button;
	}else{
		//就是IE678
		switch(window.event.button){
			case 1:
				return 0;
			case 4:
				return 1;
			case 2:
				return 2;
		}
	}
}

// 16 )去除str前后空格
function trim(str){
	return str.replace(/(^\s+)|(\s+$)/g,"")
};


// 17 )获取页面的滚动距离
function getScroll(){
	return {
		left:document.documentElement.scrollLeft||document.body.scrollLeft,
		top:document.documentElement.scrollTop||document.body.scrollTop
	}
}


// 18 )浏览器可视区域的宽高
function getClient(){
	if(document.compatMode=="BackCompat"){
		return document.body.clientWidth;
	}else{
		return document.documentElement.clientWidth;
	}
}


// 19 )封装一个函数,可以让指定目标(dom)运动到指定位置(target),是匀速运动,每20毫秒运动30px;
function move(dom,target){			
	clearInterval(dom.timer)
	dom.timer = setInterval(function(){
		//1 获取元素原来的位置
		var current = dom.offsetLeft;
		//2 确定运动速度
		var speed = target>current?5:-5;
		//3 计算元素的当前位置
		current = current + speed;
		//4 判断是否到达目标:
		if(Math.abs(current-target)<=5){
			current = target;
			clearInterval(dom.timer)
		}
		//5 定义目标元素
		dom.style.left = current+"px";
	},30)
}

// 20 )封装一个函数,实现透明度匀速运动:target必须是0-100之间的整数
function move2(dom,target){
	clearInterval(dom.timer)
	//每隔一段时间(20毫秒),透明度变化3
	dom.timer = setInterval(function(){
		//1 获取元素原来位置
		var current = parseInt(getStyle(dom,"opacity")*100);
		//2 计算速度
		var speed = target>current?3:-3;
		//3 计算元素现在位置 
		current = current + speed
		//4 判断是否到达目标
		if(Math.abs(current-target)<=3){
			current = target;
			clearInterval(dom.timer)
		}
		//5 定位元素
		dom.style.filter = "alpha(opacity="+current+")";
		dom.style.opacity = current/100;
	},20)
}


// 21 )缓动函数封装:单属性缓动
function animate1(dom,attr,target,fn){
	//每隔一段时间(20毫秒),让dom元素的attr属性运动一段距离(剩余路程的10分之1)
	clearInterval(dom.timer);
	dom.timer = setInterval(function(){
		//1 获取元素原来的位置
		var current = parseInt(getStyle(dom,attr));
		//2 计算速度
		var speed = (target-current)/10;
		speed = speed>0?Math.ceil(speed):Math.floor(speed);
		//3 计算元素的的当前位置
		current = current + speed;
		//4 判断到达目标位置
		if(current==target){
			clearInterval(dom.timer)
			if(fn){fn()};
		}
		//5 定位元素
		dom.style[attr] = current+"px";
	},20)
}


/*  22 )
    封装一个animate函数，可以实现指定元素的指定属性运动到指定的目标
        ==>dom:传入要运动的dom节点
        ==>json:所有属性要运动到的目标的集合对象
        ==>fn:定时完成以后执行的函数(回调函数)
*/
function animate(dom,json,fn){
    clearInterval(dom.timer)
    // 每隔20毫秒，每隔属性都缓动一小段距离
    dom.timer = setInterval(function(){
        // flag是一个变量，记录本次运动完了一个后，是否能停止定时器
        var flag = true;
        // json里面有几个键值对，就要运动几次
        for(var attr in json){
            
            // 1 获取当前位置
            if(attr=="opacity"){
                var current = parseInt(getStyle(dom,attr)*100)
            }else{
                var current = parseInt(getStyle(dom,attr))
            }
            // 2 计算速度
            var speed = (json[attr]-current)/10
            speed = speed>0?Math.ceil(speed):Math.floor(speed);
            // 3 计算下一个位置
            var next = current+speed;
            if(attr=="zIndex"){
                next = json[attr];
            }
            // 4 有条件的定位元素
            if(next!=json[attr]){
                flag = false;
            }
            if(attr=="opacity"){
                dom.style.opacity = next/100;
                dom.style.filter = "alpha(opacity="+next+")";
            }else if(attr=="zIndex"){
                dom.style.zIndex = next;
            }else{
                dom.style[attr] = next+"px";
            }
            
        }

        if(flag==true){
            clearInterval(dom.timer);
            if(fn){
                fn()
            }
        }
    },20)
}
