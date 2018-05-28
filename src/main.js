import Vue from 'vue';
import App from './app.vue';
import vueRouter from 'vue-router';
import login from './components/account/login.vue';
import regiest from './components/account/regiest.vue';
import home from './components/home.vue';
import shopcar from './components/shopcar/car.vue';
import newslist from './components/news/newslist.vue';
import newsinfo from './components/news/newsinfo.vue';
import photolist from './components/photo/photolist.vue';
import photoinfo from './components/photo/photoinfo.vue';
import goodslist from './components/goods/goodslist.vue';
import goodsinfo from './components/goods/goodsinfo.vue';
import goodsdesc from './components/goods/goodsdesc.vue';
import goodscomment from './components/goods/goodscomment.vue';
import 'mint-ui/lib/style.min.css';
import '../statics/mock/ajax.js';
import mint from 'mint-ui';
import '../statics/mui/css/mui.css';
import '../statics/css/site.css';
import vueResource from 'vue-resource';
// 9.0 使用图片预览组件
import VuePreview from 'vue-preview';
Vue.use(VuePreview);
Vue.use(vueRouter);
Vue.use(mint);
Vue.use(vueResource);

// 8.0 定义一个全局过滤器实现日期的格式化
import moment from 'moment';
Vue.filter('datefmt',function(input,fmtstring){
//	使用momentjs这个日期格式化类库实现日的格式化功能
	return moment(input).format(fmtstring);
});
var router1=new vueRouter({
	linkActiveClass:'mui-active',//改变路由激活时候的class
	routes:[
		{path:'/',redirect:'/home'},//重定向至首页
		{path:'/home',component:home},//首页
		{path:'/shopcar',component:shopcar},//购物车
		{path:'/news/newslist',component:newslist},//新闻列表
		{path:'/news/newsinfo/:id',component:newsinfo},//新闻详情
		{path:'/photo/photolist',component:photolist},//图片分享
		{path:'/photo/photoinfo/:id',component:photoinfo},//图片分享详情
		{path:'/goods/goodslist',component:goodslist},//商品购买
		{path:'/goods/goodsinfo/:id',component:goodsinfo},//商品购买详情
		{path:'/goods/goodsdesc/:id',component:goodsdesc},//商品购买详情1
		{path:'/goods/goodscomment/:id',component:goodscomment}//商品评论
	]
});
new Vue({
	el:'#app',
	router:router1,
	render:c=>c(App)
})
