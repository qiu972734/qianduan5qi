/**
 * Created by EP_ling on 2017/2/25.
 */
requirejs.config({
    baseUrl:"/",
    paths:{
        //这是第三方库的路径配置
        jquery:"lib/jquery/jquery.min",
        bootstrap:"lib/bootstrap/js/bootstrap.min",
        jqueryCookie:"lib/jquery_cookie/jquery_cookie",

        //这是我自己的路径配置
        userList:"/js/user/List",
        userProfile:"/js/user/Profile",
        common:"/js/common/common",
        homeLogin:"/js/home/login"
    },
    shim:{
        bootstrap:{
            deps:["jquery"]
        }
        //jquery_cookie:{
        //    exports:"$.cookie"
        //}  这种方法也也可以让jquery_cookie拥有cookie这个返回值
    }
});
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//所有的页面加载都需要先加载这两个
require(["jquery","bootstrap","common"]);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//判断登录状态,有没有登录上
//1:登录页,没有sessid(就是那个cookie标记),表示没有登录,正需要登录呢,就不用管,有sessid,要登录
//2:其他页,有sessid,表示已经登录了,就留在原页就好,不用管,没有sessid,表示没有登录或是标记已经过期了,要返回到登录页面去重新登录
//因为要用到sessid,所以需要用到jquery-cookie插件,但是在看了整个jquery_cookie插件后,发现里面依赖于jquery,还没有返回值,所以在这里也只能加载一个jquery了,完了以后再加载jquery_cookie,谁让它依赖别人呢

(function (window) {
    //拿到当前文件在浏览器中的路径
    var pathname=window.location.pathname;
    require(["jquery","jqueryCookie"], function ($,undefined) {
        var sessID= $.cookie("PHPSESSID");/*PHPSESSID是cookie里面自带的*/
        if(pathname==="/html/home/login.html" && sessID){
            location.href="/";
        }else if(pathname!=="/html/home/login.html" && !sessID){
            location.href="/html/home/login.html";
        }
    });
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//    如果页面没有发生对应的跳转,就加载对应的模块
        switch (pathname) {
            case
            "/html/user.list.html":
                require(["userList"]);
                break;
            case
            "/html/user/profile.html":
                require(["userProfile"]);
                break;
            case
            "/html/home/login.html":
                require(["homeLogin"]);
                break;
        }
})(window);
//再判断一下,获取到页面的url中的pathname,加载对应的js,因为在html==>user中,那两个页面不完全一样,他们都有各自需要加载的js,我们要做的是,让他们自己加载自己的,避免浪费
//pathname是浏览器地址栏的路径


