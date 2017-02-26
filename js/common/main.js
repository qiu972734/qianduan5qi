/**
 * Created by EP_ling on 2017/2/25.
 */
requirejs.config({
    baseUrl:"/",
    paths:{
        //这是第三方库的路径配置
        jquery:"lib/jquery/jquery.min",
        bootstrap:"lib/bootstrap/js/bootstrap.min",

        //这是我自己的路径配置
        userList:"/js/user/List",
        userProfile:"/js/user/Profile",
        common:"/js/common/common"

    },
    shim:{
        bootstrap:{
            deps:["jquery"]
        }
    }
});
//所有的页面加载都需要先加载这两个
require(["jquery","bootstrap","common"]);

//再判断一下,获取到页面的url中的pathname,加载对应的js,因为在html==>user中,那两个页面不完全一样,他们都有各自需要加载的js,我们要做的是,让他们自己加载自己的,避免浪费
//pathname是浏览器地址栏的路径
(function(){
    //拿到当前文件在浏览器中的路径
    var pathname=window.location.pathname;
    switch (pathname) {
    case
        ".html/user.list.html":
        require(["userList"]);
        break;
    case
        ".html/user/profile.html":
        require(["userProfile"])
        break;
    }
})(window);

