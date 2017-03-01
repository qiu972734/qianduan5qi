/**
 * Created by EP_ling on 2017/2/25.
 */
//该模块依赖于jquery,其实这里不写也可以,因为在main.js中,已经在(引用)加载了jquery,虽然重复引用,但不会重复加载的
define(['jquery', 'common', 'nprogress','template'], function($, undefined, nprogress,template) {

    // 该页所有的js加载完毕，进度条结束。
    nprogress.done();
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
//    渲染老师列表,因为不需要参数,所以不用ajax,直接$.get
//    看了template的源码,有返回值,太好了
    $.get('/v6/teacher', function (data) {
        if(data.code==200){
            //模板渲染的数据只能是对象,不能是数组,你懂的
            var html=template("teacher-list-tpl",{list:data.result})
            $("#teacher-list-tbody").html(html);
        }
    });

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//    渲染老师详细信息列表
//    注意,这里用的是事件委托的方式给a标签绑定事件
//    因为这个渲染老师详细信息列表依赖于上面的渲染老师列表,只有在渲染老师列表完成以后,我们才能再页面中看到能够点击到的这个a标签,同时因为渲染老师列表是ajax的方式,异步传输,还没等它加载出来,你这里的单击事件就找不到那个a,所以要用事件委托
    $("#teacher-list-tbody").on("click",".teacher-view", function () {
        $.get("/v6/teacher/view", {tc_id: $(this).parent().attr('data-id')}, function (data) {
            if(data.code==200) {
                var html = template("teacher-view-tpl", data.result);
                $("#teacherModal").html(html);
            }
        })
    })
});