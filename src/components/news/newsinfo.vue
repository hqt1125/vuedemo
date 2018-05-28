<template>
	<div id="tmpl">
		<!--实现新闻详情-->
		<div class="title">
			<h4 v-text="info.title"></h4>
			<p>{{info.add_time}} {{info.click}}次浏览量</p>
		</div>
		<div class="content" v-html="info.content">
			
		</div>
		<!--实现评论组件-->
		<comment :id='id'></comment>
	</div>
</template>

<script>
	import common from '../../kits/common.js';
	import comment from '../subcom/comment.vue';//导入子组件
	export default{
		data(){
			return {
				id:-1,
				info:{}
			}
		},
		components:{
			comment//注册子组件
		},
		created(){
			//获取URL中的ID
			this.id=this.$route.params.id;
			this.getinfo();
		},
		methods:{
			getinfo(){
				var urls=common.apidomain+'/api/getnew/12';//ID部分因为没有后台先写死
				this.$http.get(urls).then(function(res){
					var data = res.body;
					if(data.status != 0) {
						Toast(data.manage);
						return
					}else{
						this.info = data.message;
						return
					}
				})
			}
		}
	}
</script>

<style scoped>
	.title h4{
		color: #0094ff;
		
	}
	.title p{
		color:rgba(0,0,0,0.5);
	}
	.title,.content{
		padding: 5px;
	}
</style>