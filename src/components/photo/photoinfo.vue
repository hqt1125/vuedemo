<template>
	<div id="tmpl">
		<!--图片详情和缩略图-->
		<div id="desc">
			<div class="title">
				<h4>{{photoinfo.title}}</h4>
				<p>{{photoinfo.add_time}}  {{photoinfo.click}}次浏览</p>
				<p class="line"></p>
			</div>
			<!--九宫格-->
		<div class="mui-content">
			<ul class="mui-table-view mui-grid-view mui-grid-9">
				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<li  v-for="(item, index) in list" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
						<img class="preview-img"  :src="item.src" height="100" @click="$preview.open(index, list)"
								 >
					</li>
				</li>
			</ul>
		</div>
		<p v-html="photoinfo.content"></p>
		</div>
		
		<!--评论组件-->
		<div id="comment">
			<comment :id='id'></comment>
		</div>
	</div>
</template>
	
<script>
	import comment from '../subcom/comment.vue';//导入子组件
	import common from '../../kits/common.js'
	export default{
		components:{
			comment//注册子组件
		},
		data(){
			return {
				id:0,
				list:[/*{
						src: 'https://placekitten.com/600/400',
						w: 600,
						h: 400
					}, {
						src: 'https://placekitten.com/1200/900',
						w: 1200,
						h: 900
					}
				*/
				],
				photoinfo:{}//图片详情对象
			}
			
		},
		created(){
			this.id=this.$route.params.id;
			this.getinfo();
			this.getimgs();//图片方法操作方法
		},
		methods:{
			getinfo(){
				/*12为当前id，因为假数据暂时写死 this.id替换*/
				var urls = common.apidomain+'/api/getimageinfo/12';
				this.$http.get(urls).then(function(res) {
					var data = res.body;
					if(data.status != 0) {
						Toast(data.manage);
						return
					} else {
						this.photoinfo = data.info;
						return
					}

				})
			},
			getimgs(){
				var url = common.apidomain + '/api/getthumimages/12';
				this.$http.get(url).then(function(res){
					var body = res.body;
					if(body.status != 0 ){
						Toast(body.message);
						return;
					}

//					将正常的逻辑数据赋值给this.list数组
//					由于vue-preview组件要求的数据是 {src:,w:,h:}但是服务器响应回来的数据中是没有 w ,h 的，所以只能自己添加了
					body.message.forEach(function(item){
//						当前所有图片不管有多大都设置为宽高为400，就会导致图片失真了，所以应该按照图片的实际尺寸来设置
						var img = document.createElement('img');
						img.src = item.src;
						item.h = img.height;
						item.w = img.width;
					});
					this.list = body.message;
				});

			},
		}
	}
</script>

<style scoped>
	#desc{
		padding: 10px;
	}
	#desc .title h4{
		color: #0094ff;
	}
	#desc .title p{
		margin-top: 10px;
		color: rgba(0,0,0,0.4);
	}
	#desc .title .line{
		width: 100%;
		height: 1px;
		border-bottom: 1px solid rgba(0,0,0,0.4);
	}
	.mui-content ul{
		background-color: #fff;
	}
	.mui-grid-view.mui-grid-9 .mui-table-view-cell{
		border: 0;
	}
	.mui-grid-view.mui-grid-9{
		border: 0;
	}
	.mui-content img{
		width: 100px;
		height: 100px;
	}
</style>