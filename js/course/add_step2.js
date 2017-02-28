/**
 * Created by EP_ling on 2017/2/25.
 */
//该模块依赖于jquery,其实这里不写也可以,因为在main.js中,已经在(引用)加载了jquery,虽然重复引用,但不会重复加载的
define(['jquery', 'common', 'nprogress'], function($, undefined, nprogress) {

    // 该页所有的js加载完毕，进度条结束。
    nprogress.done();
});