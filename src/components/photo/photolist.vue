<template>
	<div id="tmpl">
		<!--图片分类功能-->
		<div id="cate">
			<ul v-bind="{style:'width:'+totw+'px'}">
				<li @click="getimglist(0)">全部</li>
				<li v-for="item in cates" @click="getimglist(item.id)">{{item.title}}</li>
			</ul>
		</div>
		<!--图片列表功能-->
		<div id="imglist">
			<ul>
  				<li v-for="item in list">
  					<router-link v-bind="{to:'/photo/photoinfo/'+item.id}">
  						<img v-lazy="item.img_url">
  					</router-link>
    				<div class="desc">
    					<h5 v-text="item.title"></h5>
    					<p v-text="item.zhaiyao"></p>
    				</div>
  				</li>
			</ul>
		</div>
	</div>
	
</template>

<script>
	import { Toast } from 'mint-ui';
	import common from '../../kits/common.js'
	export default{
		data(){
			return {
				totw:'320',//ul总宽度
				cates:[],
				list:[]
			}
			
		},
		methods:{
			getlist(){
				var urls = common.apidomain+'/api/getimggray';
				this.$http.get(urls).then(function(res) {
					var data = res.body;
					if(data.status != 0) {
						Toast(data.message);
						return
					} else {
						this.cates = data.list;
						/*ul总宽度设置*/
						var w=62;
						var len=data.list.length+1;
						this.totw=w*len;
						return
					}
					

				})
			},
			getimglist(catedid){
				console.log(catedid)
				/*catedid暂时写死为12*/
				catedid=catedid || 0;/*根据id获取不同类型图片信息*/
				var urls = common.apidomain+'/api/getimages/12';
				this.$http.get(urls).then(function(res) {
					var data = res.body;
					if(data.status != 0) {
						Toast(data.message);
						return
					} else {
						this.list = data.list;
						console.log(data.list)
						return
					}
					

				})
			}
		},
		created(){
			this.getlist();
			this.getimglist();
		}
	}
</script>

<style scoped>
	#cate{
		width: 375px;
		max-width: 375px;
		overflow-x: auto;
		
	}
	#cate ul{
		margin: 0;
		padding-left: 10px;
	}
	#cate li{
		cursor: pointer;
		list-style: none;
		display: inline-block;
		color: #0094ff;
		font-size: 14px;
		padding-left: 6px;
	}
	image[lazy=loading] {
  		width: 40px;
  		height: 300px;
  		margin: auto;
	}
	#imglist ul{
		padding-left: 0px;
		
	}
	#imglist li{
		list-style: none;
		position: relative;
	}
	#imglist img{
		width: 100%;
		height: 300px;
	}
	.desc{
		position: absolute;
		bottom: 2px;
		left: 0px;
		width: 100%;
		background-color: rgba(0,0,0,0.2);
	}
	.desc h5{
		color: #fff;
		font-weight: bold;
	}
	.desc p{
		color: #fff;
	}
</style>