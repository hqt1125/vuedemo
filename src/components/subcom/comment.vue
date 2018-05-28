<template>
	<div id="tmpl"><!--评论组件-->
		<!--提交评论的静态结构-->
		<div id="postcomment">
			<h4>提交评论</h4>
			<p class="p"></p>
			<textarea placeholder="请输入您要评论的内容..." v-model="postconent"></textarea>
			<mt-button type="primary" size="large" @click="postment">发表</mt-button>
		</div>
		<!--获取评论数据-->
		<div id="list">
			<h4>评论列表</h4>
			<p class="p"></p>
			<div v-for="(item,index) in list">
				<div class="title">
					<span>第{{index+1}}楼：</span>
					<span>用户：{{item.user_name}}</span>
					<span>发表时间：{{item.add_time}}</span>
				</div>
				<ul class="mui-table-view">
				 	<li class="mui-table-view-cell">{{item.content}}</li>
				</ul>
			</div>
		</div>
		<!--加载更多方法-->
		<mt-button type="primary" size="large" plain @click="getmore">发表</mt-button>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import common from '../../kits/common.js'
	export default{
		data(){
			return {
				postconent:'',//自动获取评论内容
				list:[],
				pageindex:1
			}
		},
		props:['id'],/*用来接收父组件传递过来的值*/
		created(){
			this.postlist(this.pageindex);
		},
		methods:{
			/*评论数据的提交*/
			postment(){
				if(this.postconent==''){
					Toast('您输入的评论不能为空');
					return
				}else{
					var urls=common.apidomain+'/api/postcomment/12';//12是id目前假数据写死，可以用this.id获取
					this.$http.post(urls,{content:this.postconent},{emulateJSON:true}).then(function(res){
						var data = res.body;
						if(data.status != 0) {
							Toast(data.message);
							this.postconent='';
							return
						} else {
							Toast(data.message);
							
							//经最新的评论数据添加到最顶部
						this.list=[
								{
									'user_name': '匿名用户',
									"add_time":new Date(),
									"content":this.postconent
								}
							].concat(this.list);
							this.postconent='';
							return
						}
					})
				}
			},
			postlist(pageindex){
				pageindex=1;//为了实现效果暂时写死
				var urls = common.apidomain+'/api/postcomment/12?pageindex='+pageindex;
				this.$http.get(urls).then(function(res) {
					var data = res.body;
					console.log(data);
					if(data.status != 0) {
						Toast(data.message);
						return
					} else {
						this.list =this.list.concat(data.list);
						return
					}

				})
			},
			getmore(){
				this.pageindex++;
				
				this.postlist(this.pageindex);
			}
		}
	}
</script>

<style scoped>
	#postcomment,#list{
		padding: 5px;
	}
	.p{
		height: 1px;
		width: 100%;
		border-bottom: 1px solid rgba(0,0,0,0.3);
	}
	
	.title{
		color: #6d6d72;
		font-size: 15px;
		background-color: rgba(0,0,0,0.1);
		padding: 5px;
	}
			
		
</style>