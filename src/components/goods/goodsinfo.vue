<template>
	<div id="tmpl">
		<div class="silder">
			<silder :imgs='list'></silder>
		</div>
		<!--购买区-->
		<div id="buy">
			<h4>{{info.title}}</h4>
			<p class="line"></p>
			<p>
			<ul>
				<li class="price">
					市场价：<s>￥{{info.market_price}}</s>&nbsp;&nbsp;&nbsp;&nbsp;销售价：<span>￥{{info.sell_price}}</span>
				</li>
				<li class="boxss">
					购买数量：<inputnumber @dataobj='getcont'></inputnumber>
					<transition name="fly" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
						<div class="ball" v-if="isshow"></div>
					</transition>
				</li>
				<li>
					<mt-button type="primary" size="small">立即购买</mt-button>
					<mt-button type="danger" size="small" @click="addcar">加入购物车</mt-button>
				</li>
			</ul>
			</p>
		</div>
		<!--参数详情-->
		<div id="params">
			<h5>商品参数</h5>
			<p class="line"></p>
			<ul>
				<li>商品货号：{{info.goods_no}}</li>
				<li>库存情况：{{info.stock_quer}}</li>
				<li>上架时间：{{info.add_time}}</li>
			</ul>
		</div>
		<!--其他区域-->
		<div id="other">
			<router-link v-bind="{'to':'/goods/goodsdesc/'+id}">
				<mt-button class="imgdesc" type="primary" size="large">图文详情</mt-button>
			</router-link>
			<router-link v-bind="{'to':'/goods/goodscomment/'+id}">
			<mt-button type="danger" size="large">商品评论</mt-button>
			</router-link>
		</div>
	</div>
</template>

<script>
	import silder from '../subcom/silder.vue';
	import inputnumber from '../subcom/inputnumber.vue';
	import { Toast } from 'mint-ui';
	import common from '../../kits/common.js';
	import {vm,COUNTSTR} from '../../kits/vm.js';
	import {setItem,valueObj} from '../../kits/localStr.js';
	export default{
		components:{
			silder,
			inputnumber
		},
		data(){
			return {
				id:0,
				list:[],
				info:{},
				conts:1,
				isshow:false
			}
		},
		methods:{
			beforeEnter(el){
				/*设定小球的初始位置*/
				el.style.transform="translate(0px,0px)";
			},
			enter(el,done){
				el.offsetWidth;
				el.style.transform="translate(100px,380px)";
				done();
			},
			afterEnter(el){
				/*重置小球初始状态*/
				this.isshow=!this.isshow;
			},
			addcar(){
				vm.$emit(COUNTSTR,this.conts);
				valueObj.goodsid=this.id;
				valueObj.count=this.conts;
				setItem(valueObj);
				/*实现小球加入购物车动画*/
				this.isshow=!this.isshow;
			},
			getimgs(){
				/*12为当前id，因为假数据暂时写死 this.id替换*/
				var urls = common.apidomain+'/api/getthumimages/12';
				this.$http.get(urls).then(function(res) {
					var data = res.body;
					if(data.status != 0) {
						Toast(data.manage);
						return
					} else {
						this.list = data.message;
						return
					}

				})
			},
			goodsinfo(){
				/*12为当前id，因为假数据暂时写死 this.id替换*/
				var urls = common.apidomain+'/api/goods/getinfo/12';
				this.$http.get(urls).then(function(res) {
					var data = res.body;
					if(data.status != 0) {
						Toast(data.manage);
						return
					} else {
						this.info = data.message[0];
						return
					}

				})
			},
			getcont(cont){
				this.conts=cont
			}
		},
		created(){
			this.id=this.$route.params.id;
			this.getimgs();
			this.goodsinfo();
		}
	}
</script>

<style scoped>
	.silder{
		border: 1px solid rgba(0,0,0,0.4);
		border-radius: 5px;
		margin: 5px;
	}
	#buy{
		margin: 5px;
		padding: 5px;
		border: 1px solid rgba(0,0,0,0.4);
		border-radius: 5px;
	}
	.line{
		height: 1px;
		border: 1px solid rgba(0,0,0,0.2);
	}
	#buy h4{
		color: #0094ff;
		padding: 5px;
	}
	#buy ul,#params ul{
		padding-left: 0;
	}
	#buy li,#params li{
		list-style: none;
		padding: 8px;
	}
	#buy .price span{
		color: red;
	}
	#params,#other{
		margin: 5px;
		padding: 5px;
		border: 1px solid rgba(0,0,0,0.4);
		border-radius: 5px;
	}
	#other .imgdesc{
		margin-bottom: 20px;
	}
	.boxss{
		position: relative;
	}
	.ball{
		background-color: red;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		position: absolute;
		left: 142px;
		top:14px;
		transition: all 0.4s ease;
		z-index: 10;
	}
</style>