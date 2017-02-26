/**
 * Created by EP_ling on 2017/2/26.
 */
define(["jquery"], function ($) {
    $(".navs a").on("click", function () {
        //单击这个a标签的时候,让它下面的子元素(就是那一排li标签)下滑显示出来,切换,显示就隐藏,隐藏就显示
        $(this).next().slideToggle();
    });

    $.ajax({
        url:"/v6/login",
        type:"post",
        data:{
            tc_name:123456,
            tc_pass:123456
        },
        success: function () {
            console.log("好的");
        },
        error: function () {
            console.log("差一点");
        }
    })



});