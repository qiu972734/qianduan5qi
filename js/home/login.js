/**
 * Created by EP_ling on 2017/2/25.
 */
//该模块依赖于jquery,其实这里不写也可以,因为在main.js中,已经在(引用)加载了jquery,虽然重复引用,但不会重复加载的
define(["jquery",'jqueryCookie','nprogress'], function ($,undefined,nprogress) {
//展示用户的历史登录头像
//    1:获取到cookie值,同样的是用一个变量装起来
//    2:cookie默认是对象型的,要转为字符串
//    3:设置登录页的img-src为接收的那个值中的tc_avatar
//    4:用个三元表示式判断一下,要是没有的话,就默认一个对象好了,尴尬了,三元表达式不会写了,写错了
    var userInfo=null;
    //userInfo=JSON.parse($.cookie('userInfo'))?JSON.parse($.cookie('userInfo')):{};
    //$(".login .avatar img").attr("src",userInfo.tc_avatar);
    try {
        userInfo = JSON.parse($.cookie('userInfo'))
    }catch(e) {
        userInfo = {};
    }
    $('.login .avatar img').attr('src', userInfo.tc_avatar? userInfo.tc_avatar: '/img/default.png');


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//    1:先监听form 表单的提交事件
//    2:事件回调中的retrue false阻止默认行为
//    3:事件回调中用ajax的方式发送表单数据
//    4:如果返回结果是200,就是登陆成功,调到首页去
//    5:表单提交后的地址我们不能控制,所以才用ajax,但是这些值呢,还是通过表单的方式来获取,像$("#form-login"),懂吧
    $("#form-login").on("submit", function () {
        $.ajax({
            //记着这里是绝对路径,加/的
            url:"/v6/login",
            type:"post",
            //data:{
            //    tc_name:$("input").eq(0).val(),
            //    tc_pass:$("inout").last().val()
            //}
            //这是上面的简化版,serialize是把表单内容序列化为字符串,就是把表单的数据一个个的转换为字符串,排列好
            //另外this是原生的,要把它变成jq对象,调用serialize这个jq方法,就要用$包起来,还记得不
            data:$(this).serialize(),
            success: function (data) {
                if(data.code==200){
                    /*1:用cookie存储返回来的参数里的result参数*/
                    //2:用个变量名存储返回的cookie,但是回来的数据时候是对象,所以要转换为字符串
                    //3:别忘了设置路径为根啊,否则它就是相对于自己的位置了
                    $.cookie('userInfo',JSON.stringify(data.result),{path:"/"});
                    //打开主页,根
                    location.href="/";
                }
            }
        });
        return false;
    });
    nprogress.done();
});