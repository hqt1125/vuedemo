<template>
	<div id="tmpl">
		<div class="row" v-for="(item,index) in datalist">
			<mt-switch class="switch" v-model="values[index]"></mt-switch>
			<img class="img" :src="item.thumb_path">
			<div class="inforight">
				<h4 v-text="item.title"></h4>
				<div class="bottom">
					<ul>
						<li>￥{{item.sell_price}}</li>
						<li><carinputnumber :initCount="item.cou" :goodsid="item.id" v-on:cardataobj="getInputNumber"></carinputnumber></li>
						<li><a href="javascript:;" @click="delrow(item.id,index)">删除</a></li>
					</ul>

				</div>
			</div>
		</div>
		<div id="total">
			<div class="desc">
				<ul>
					<li>总计（不含运费）</li>
					<li>已经勾选商品{{totalcount}}件，总价￥{{totalprice}}元</li>
				</ul>
			</div>
			<div id="button">
				<mt-button type="danger" size="small">去结算</mt-button>
			</div>
		</div>
	</div>
</template>

<script>
	import {getgoodsObject,updateData,remoteItem} from '../../kits/localStr.js'
	import { Toast } from 'mint-ui';
	import common from '../../kits/common.js'
	import carinputnumber from '../subcom/carinputnumber.vue';
	export default{
		components:{
			carinputnumber
		},
		computed:{
			totalcount(){
				var amout=0;
				var newcont=this.values.filter(function(item){
					return item;
				});
				this.values.forEach((item,index)=>{
					if(item){
						var conts=this.datalist[index].cou;
						var prices=this.datalist[index].sell_price;
						var itempri=conts*prices;
						amout+=itempri;
					}
					
				})
				this.totalprice=amout;
				return newcont.length;
			}
		},
		data(){
			return {
				values:[],
				totalprice:0,
				datalist:[
					/*{
						"cou": 1,
						"id": 87,
						"title": "华为（HUAWEI）荣耀6Plus 16G双4G版",
						"sell_price": 2195,
						"thumb_path": '/statics/imgs/cbd.jpg'
					},
					{
						"cou": 1,
						"id": 88,
						"title": "苹果Apple iPhone 6 Plus 16G 4G手机（联通三网版）",
						"sell_price": 5780,
						"thumb_path": '/statics/imgs/muwu.jpg'
					}*/
				]
			}
		},
		created(){
			this.getdatalist();
			
		},
		methods:{
			delrow(goodsid,index){
				this.values.splice(index,1);
				this.datalist.splice(index,1);
				remoteItem(goodsid)
			},
			getInputNumber(resobj){
				updateData(resobj);
				for(var i=0;i<this.datalist.length;i++){
						if(this.datalist[i].id==resobj.goodsid){
							if(resobj.type=='add'){
								this.datalist[i].cou=this.datalist[i].cou+1
							}else{
								this.datalist[i].cou=this.datalist[i].cou-1
							}
							break
						}
					}
				
			},
			getdatalist(){
//				1.0 从localstorage中获取到所有的商品id值
//				obj的格式：{
//					87:4,
//					 88:1
//					 }
				var obj = getgoodsObject();
//				2.0 将id值按照 api的参数格式提交给api
				var idstring = '';
				for(var key in obj){
					idstring+= key + ',';
				}

				idstring = idstring.substring(0,idstring.length-1);

//				3.0 ajax请求这个api获取到完整的商品数据信息赋值给this.datalist
				var url  = common.apidomain + '/api/goods/getshopcarlist/12';
				this.$http.get(url).then(function(res){
					//状态值的判断
					if(res.body.status != 0 ){
						Toast(res.body.message);
						return;
					}
					res.body.message.forEach((item)=>{
						item.cou=obj[item.id];
						this.values.push(false)
					})
					this.datalist = res.body.message;
				});

			}
		}
	}
</script>

<style scoped>
	.row{
		border-bottom: 1px solid rgba(0,0,0,0.3);
		height: 102px;
		display: flex;
		padding-top: 15px;
	}

	.switch{
		flex:0 0 52px;
	}

	.img{
		margin-left: 5px;
		height: 75px;
		width: 75px;
		flex: 0 0 85px;
	}

	.inforight{
		margin-left: 5px;
		flex:1;
	}
	.inforight ul{
		padding-left: 0px;
	}
	.inforight li{
		list-style: none;
		display: inline-block;
	}

	.inforight h4{
		color: #0094ff;
		font-size: 14px;
	}

	.bottom li:first-child{
		color:red;
		margin-right: 10px;
	}

	.bottom li:last-child{
		margin-left: 10px;
		padding: 5px;
	}
#total{
	height: 100px;
	background-color: rgb(0,0,0,0.1);
	display: flex;
	padding: 5px;
}
#total ul{
	padding: 0;
}
#total li{
	list-style: none;
	font-size: 14px;
}
#button{
	flex: 0 0 60px;
	margin: 30px 0 0 0;
}
.desc{
	flex: 1;
}
</style>