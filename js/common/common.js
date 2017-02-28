/**
 * Created by EP_ling on 2017/2/26.
 */
define(["jquery","jqueryCookie"], function ($) {
    $(".navs a").on("click", function () {
        //单击这个a标签的时候,让它下面的子元素(就是那一排li标签)下滑显示出来,切换,显示就隐藏,隐藏就显示
        $(this).next().slideToggle();
    });

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