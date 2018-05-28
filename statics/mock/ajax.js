//引入mockjs
const Mock = require('mockjs')
//使用mockjs模拟数据
/*首页轮播图*/
Mock.mock('localhost:5008/api/gitlunbo', (req, res) => {
    return {
    	status:0,
        list: [
					{
						"url":'http://www.baodu.com',
						"img":'/statics/imgs/cbd.jpg'
					},
					{
						"url":'http://www.baodu.com',
						"img":'/statics/imgs/muwu.jpg'
					},
					{
						"url":'http://www.baodu.com',
						"img":'/statics/imgs/yuantiao.jpg'
					}
				]
    }
});
/*新闻列表*/
Mock.mock('localhost:5008/api/getnewslist',{

    	status:0,
         'list|1-10': [
					{	'id|+1': 1,
						"title":'@csentence(5,10)',
						"add_time":'@datetime("y-M-d H:m:s")',
						"zhaiyao":'@cparagraph()',
						"click|1": [1,2],
						"img_url|1":['/statics/imgs/cbd.jpg','/statics/imgs/muwu.jpg','/statics/imgs/yuantiao.jpg']
					}
				
				]
    
});
/*新闻详情请求*/
Mock.mock('localhost:5008/api/getnew/12',{

    	status:0,
         'message': 
					{	'id': 13,
						"title":'@csentence(5,10)',
						"add_time":'@datetime("y-M-d")',
						"content":'@cparagraph',
						"click|1": [1,2]
					}
				
				
    
});
/*评论数据请求*/
Mock.mock('localhost:5008/api/postcomment/12',{

    	status:0,
        'message': "评论提交成功"
});
/*获取评论数据请求*/
Mock.mock('localhost:5008/api/postcomment/12?pageindex=1',{

    	status:0,
         'list|5': 
					[
					{'user_name': '匿名用户',
						"add_time":'@datetime("y-M-d")',
						"content":'@csentence(5,10)'
					}
					]
});
/*图片类型请求*/
Mock.mock('localhost:5008/api/getimggray',{
    	status:0,
        'list': [
        	{
        		"title":'家居生活',
        		"id":14
        	},
        	{
        		"title":'摄影设计',
        		"id":15
        	},
        	{
        		"title":'明星美女',
        		"id":16
        	},
        	{
        		"title":'空间设计',
        		"id":17
        	},
        	{
        		"title":'户型装饰',
        		"id":18
        	},
        	{
        		"title":'广告设计',
        		"id":19
        	},
        	{
        		"title":'摄影学习',
        		"id":20
        	},
        	{
        		"title":'摄影器材',
        		"id":21
        	},
        	{
        		"title":'明星写真',
        		"id":22
        	},
        	{
        		"title":'清纯美女',
        		"id":23
        	},
        	{
        		"title":'古典美女',
        		"id":24
        	}
        ]
});
/*获取对应id下所有图片信息数据请求*/
Mock.mock('localhost:5008/api/getimages/12',{

    	status:0,
         'list|1-10': 
					[
					{	'id|+1': 1,
						"title":'@csentence(5,10)',
						"zhaiyao":'@cparagraph()',
						"img_url|1":['/statics/imgs/cbd.jpg','/statics/imgs/muwu.jpg','/statics/imgs/yuantiao.jpg']
					}
					]
});
/*单机图片详情展示*/
Mock.mock('localhost:5008/api/getimageinfo/12',{

    	status:0,
         'info': 
					{	'id|+1': 1,
						"title":'@csentence(5,10)',
						"add_time":'@datetime("y-M-d H:m:s")',
						"content":'@cparagraph()',
						"click|1": [1,2]
					}
				
				
    
});
/*单机图片详情展示*/
Mock.mock('localhost:5008/api/getthumimages/12',{

    	status:0,
         'message': 
					[{
						src: 'https://placekitten.com/600/400',
						img:'https://placekitten.com/600/400',
						w: 600,
						h: 400
					}, {
						src: 'https://placekitten.com/1200/900',
						img:'https://placekitten.com/1200/900',
						w: 1200,
						h: 900
					}
				
				]
				
				
    
});
/*商品购买列表展示*/
Mock.mock('localhost:5008/api/getgoods/getindex=1',{

    	status:0,
         'message|1-10': 
				[
					{
						'id|+1': 1,
						"title":'@csentence(5,10)',
						"add_time":'@datetime("y-M-d H:m:s")',
						"zhaiyao":'@cparagraph()',
						"click|1": [1,2],
						"img_url|1":['/statics/imgs/cbd.jpg','/statics/imgs/muwu.jpg','/statics/imgs/yuantiao.jpg','/statics/imgs/shuijiao.jpg'],
						"sell_price":'@increment(1000)',
						"market_price":'@increment(1000)',
						"ctock_quer":'@increment(100)'
					}
				]
				
				
    
});

/*商品购买数据展示*/
Mock.mock('localhost:5008/api/goods/getinfo/12',{

    	status:0,
         'message': 
				[
					{
						'id|+1': 1,
						"title":'@csentence(5,10)',
						"add_time":'@datetime("y-M-d H:m:s")',
						"zhaiyao":'@cparagraph()',
						"goods_no": '@id()',
						"sell_price":'@increment(1000)',
						"market_price":'@increment(1000)',
						"stock_quer":'@increment(100)'
					}
				]
				
				
    
});
/*商品购买详情展示展示*/
Mock.mock('localhost:5008/api/goods/getdesc/12',{

    	status:0,
         'message': 
				[
					{
						"title":'@csentence(5,10)',
						"content":'@cparagraph(100)'
					}
				]
				
				
    
});
/*购物车展示*/
Mock.mock('localhost:5008/api/goods/getshopcarlist/12',{

    	status:0,
         'message': 
				[
					{
						"cou": 1,
						'id|': 1,
						"title":'@csentence(5,10)',
						"sell_price": '@increment(1000)',
						"thumb_path|1": '/statics/imgs/cbd.jpg'
					},
					{
						"cou": 1,
						'id|': 4,
						"title":'@csentence(5,10)',
						"sell_price": '@increment(1000)',
						"thumb_path|1": '/statics/imgs/muwu.jpg'
					}
				]
				
				
    
});