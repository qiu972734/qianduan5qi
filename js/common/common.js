/**
 * Created by EP_ling on 2017/2/26.
 */
define(["jquery","jqueryCookie"], function ($) {
//ajax请求loading图片,分别在ajsx开始事件前和后显示出这图片和隐藏图片
    $(document).ajaxStart(function () {
        $(".overlay").show();
    }).ajaxStop(function () {
        $(".overlay").hide();
    });
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
//左侧导航下拉列表
    $(".navs a").on("click", function () {
        //单击这个a标签的时候,让它下面的子元素(就是那一排li标签)下滑显示出来,切换,显示就隐藏,隐藏就显示
        $(this).next().slideToggle();
    });
//根据浏览器页面中的路径来定位左侧导航栏
//    1:获取到当前页面的pathname
//    2:获取到所有的a标签,去掉它们的active属性,removeClass("active")
//    3:根据pathname获取到对应的被选中的a标签,让这个a标签有active属性
//    4:获取这个a标签的所有父标签,让他们显示出来
//    5:filter是在原有的条件基础上增加的筛选的条件
    var pathname=window.location.pathname;
    $(".navs a").removeClass("active").filter('[href="'+pathname+'"]').addClass("active").parents("ul").show();

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//    做退出按钮的事件,因为退出按钮每个页面都有,所以就写在这个公共的common.js里
    $("#logout").on("click", function () {
    //    因为退出按钮不需要发送什么数据,所以不用ajax了
    //    来个发送成功后的回调,返回的数据用个data接收下
        $.post("/v6/logout", function (data) {
            if(data.code==200){
                //如果成功退出,就跳到登录界面
                location.href="/html/home/login.html";
            }
        })
    });
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    /*1:接收cookie存储的数据,我需要里面的用户名和图片*/
    //2:那边把对象改成了字符串,这里要改回来
    //3:名字当然还是自己取得那个名字
    //4:这里做个容错判断,因为可能userInfo是没有数据的,
   var userInof=null;
    try {
        userInof=JSON.parse($.cookie("userInfo"));
    } catch(e){
        userInof={};
    }
    //把转换好的用户名数据和图片数据追到到用户名标签和图片标签上去
    //追加图片路径是attr,不是追加数据html
    $(".aside.profile h4").html(userInof.tc_name?userInof.tc_name:"没有名字");
    $(".aside.profile img").attr("src",userInof.tc_avatar?userInof.tc_avatar:"img/default.png")
});