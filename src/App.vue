<template>
	<div>
		<mt-header fixed title="第一个Vue商城系统"></mt-header>
		<div v-if="isshow" id="backs">
			<a href="javascript:;" @click="reback">返回</a>
		</div>
		<router-view></router-view>
		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item " to="/b">
				<span class="mui-icon mui-icon-email"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopcar">
				<span class="mui-icon mui-icon-contact"><span class="mui-badge" id="badge">0</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/d">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
	</div>
</template>

<script>
	import { Toast} from 'mint-ui';
	import {vm,COUNTSTR} from './kits/vm.js';
	vm.$on(COUNTSTR,function(count){
		var badge = document.getElementById('badge');
		badge.innerText=parseInt(badge.innerText)+parseInt(count);
		console.log(count);
	})
	export default{  // es6的导出对象的写法
		data(){
			return {
				isshow:false
			}
		},
		watch:{
			'$route':function(newl,lodl){
				console.log(newl,lodl)
				if(newl.path.toLowerCase()=='/home'){
					this.isshow=false
				}else{
					this.isshow=true
				}
			}
		},
		methods:{
			reback(){
				this.$router.go(-1)
			}
			
		},
		created(){

		}
	}
</script>

<style scoped>
	#backs a{
		color: white;
		font-size: 16px;
		font-weight: bold;
	}
	#backs{
		width: 40px;
		position: absolute;
		top:10px;
		left: 10px;
		z-index: 11;
	}
</style>