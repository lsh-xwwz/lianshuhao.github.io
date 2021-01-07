<script>
    // 需求分析
    // 根据li数量自动生成圆点
    // 点击对应圆点会跳转到对应图片
    // 点击的圆点高亮
    // 图片自动轮播
    // 鼠标划入slider停止自动轮播
    // 鼠标划出slider继续自动轮播


    //1-获取相关元素
    var slider=$id('slider')  //总容器
    var liArr=slider.children[0].children[0].children  //所有li标签
    var sliderCtrl=slider.children[1] //左右箭头和小圆点所在的容器
    var prev=$id('prev')  //左箭头
    var next=$id('next')  //右箭头
    var width=slider.offsetWidth  //一个li的宽度，用来记录图片位置
    var index=0  //创建一个变量，记录当前是第几幅图


    //2-根据图片数量动态生成小点
    for(var i=0;i<liArr.length;i++){
        var newSpan=document.createElement('span') //在页面上创建一个节点
        newSpan.className='slider-ctrl-con'  //节点的class名为slider.ctrl.con
        newSpan.index=i  //后期小圆点会被点击，需要知道被点击的是第几个
        sliderCtrl.appendChild(newSpan)  //将newSpan插入到sliderCtrl里面
    }

    //3-点亮第一个圆点，显示第一张图片
    for(var i=0;i<liArr.length;i++){
        liArr[i].style.left=width+'px'  
    }
    liArr[index].style.left=0
    light()

    //4-点亮当前小圆点
    function light(){
        var spanArr=sliderCtrl.children  //所有小圆点和左右箭头
        for(var i=2;i<spanArr.length;i++){
            spanArr[i].className='slider-ctrl-con'
        }
        spanArr[index+2].className='slider-ctrl-con current'
    }


    //5-点击小圆点，点亮该小圆点，图片运动到指定图片(箭头和小圆点的事件都委托给sliderCtrl)
    sliderCtrl.onclick=function(e){
        var event=e||window.event
        var target=event.target||evevt.srcElement
        if(target.className.indexOf('slider-ctrl-con')>-1){
            //indexOf如果没有找到，返回值是-1，如果返回值不是-1，说明找到了，这就是小圆点
            //图片要变成响应的图片
            if(target.index>index){
                //原来的索引是index,要看的图片的索引是target.index
                //瞬间把要看的图放到右边
                liArr[target.index].style.left = width+"px"
                //原来的index,去左边,要看的target.index进入中心
                animate(liArr[index],{left:-width})
                animate(liArr[target.index],{left:0})
            }
            if(target.index<index){
                //原来的索引是index,要看的图片的索引是target.index
                //瞬间把要看的图放到左边
                liArr[target.index].style.left = -width+"px";
                animate(liArr[index],{left:width});
                animate(liArr[target.index],{left:0})
            }
            //获取被点击的小圆点的索引
            index = target.index;
            light()
        }
        if (target.className=="prev") {
            //上一张
            prevFn();
        }

        if (target.className=="next") {
            //下一张
            nextFn();
        }
    }
    //自动轮播
    slider.timer = setInterval(nextFn,2000)


    //鼠标移入slider,停止轮播
    slider.onmouseenter = function(){
        clearInterval(slider.timer)
    }

    //鼠标移出slider,开始轮播
    slider.onmouseleave = function(){
        clearInterval(slider.timer);
        slider.timer = setInterval(nextFn,2000);
    }

    //light:点亮当前小圆点
    function light(){
        var spanArr = sliderCtrl.children;//所有的小圆点和左右箭头
        //干掉所有人
        for(var i=2;i<spanArr.length;i++){
            spanArr[i].className = "slider-ctrl-con";
        }
        //留下我一个
        spanArr[index+2].className = "slider-ctrl-con current";
    }

    //看上一张
    function prevFn(){
        var current = index - 1;
        if(current<0){
            //如果你在最前面一张还要看前一张,就是想看最后一张
            current = liArr.length-1
        }
        //把要看的图先放到左边
        liArr[current].style.left = -width+"px";
        animate(liArr[index],{left:width})
        animate(liArr[current],{left:0});

        //更新总的索引
        index = current;
        //点亮小圆点
        light()
    }

    //看下一张
    function nextFn(){
        var current = index +1;
        if(current>liArr.length-1){
            current = 0;
        }
        //把要看的图先放到右边
        liArr[current].style.left = width+"px";
        animate(liArr[index],{left:-width})
        animate(liArr[current],{left:0})

        //更新总的索引
        index = current;
        //点亮小圆点
        light()

    }
</script>