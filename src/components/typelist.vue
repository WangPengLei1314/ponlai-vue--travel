<template>
	<div class="detaillist">
		<div class="detaillistnav" :style="'position:'+scrollStyle.position">
			<el-tabs v-model="category" @tab-click="onFilter">

				<el-tab-pane v-for="(category,index) in categoryLable" :label="categoryLable[index].categoryOption.default" :key="categoryLable[index].categoryOption.default" :name="categoryLable[index].name" >
					
					<div class="categoryOption" @click="changeOption(index,value,key,num)" v-for="(value,key,num) in categoryLable[index].categoryOption" :key="value" v-if="num> 0" :class="{select:num == categoryLable[index].selectNum}">{{value}}</div>

				</el-tab-pane>

			</el-tabs>
		</div>
		<div :class="shade" @click="unShade()"></div>

		<div :style="'margin:'+scrollStyle.margin" class="typeList" >
			<ol>
		      <li v-for="(item,index) in result">
		        <router-link :to="{path:'/detail/'+result[index].id,params:{id:result[index].id}}">
		        <div class="list-wrap">
		          <div class="list-left"><img :src="result[index].image"></div>
		          <div class="list-right">
		            <h2>{{result[index].title}}</h2>
		            <p>时间：{{result[index].time_str}}</p>
		            <p>地点：{{result[index].address}}</p>
		            <span class="price">费用：{{result[index].fee_str}}</span><span class="Interest">{{result[index].wisher_count}} 人参加</span>
		          </div>
		        </div>
		        </router-link>
		      </li>
		    </ol>
		</div>
	</div>

</template>

<script>

import Vue from 'vue'

export default {
	props:{
	    cityEn:String,
	    getType:String
	},
	data () {
		return {
			result:[],
			category: '',
			categoryLable:[
				{name:'categoryFirst',categoryOption:{'default':'吃喝玩乐','all':'全部','music':'音乐','drama':'戏剧','exhibition':'展览','salon':'讲座','party':'聚会','sports':'运动','travel':'旅行','commonweal':'公益','film':'电影'},selectNum:0},
				{name:'categorySecond',categoryOption:{'default':'智能排序','today':'今天','tomorrow':'明天','weekend':'周末','week':'最近一周'},selectNum:0},
				{name:'categoryThird',categoryOption:{'default':'其他筛选','ongoing':'正在进行','expired':'已过期'},selectNum:0}
			],
			filter:{
				type:this.getType,
				day:'default',
				status:'default'
				
			},
			scrollStyle:{
				position:'relative',
				margin:'0'

			},
			shade:'',
			num:0,
			
		}

	},

	mounted () {
		window.addEventListener('scroll', this.scrollFunc)

  	},
	created () {
		this.getData(this.filter.type, this.filter.day, this.filter.status)

	},
	
	methods : {

		getData (type, day, status) {

        	this.$http.jsonp('https://api.douban.com/v2/event/list',{
		      params:{
		      	loc:this.cityEn,
		        type:type,
		        day_type:day,
		        status:status
		    	},

		    }).then((res) => {

			    this.result = res.data.events

		    }, (err) => {
		      console.log(err)
		    })

        },
		onFilter () {
        	this.shade = 'shade';
      	},
      	unShade () {
      		this.category = '';
      		this.shade = ''

      	},      	

        changeOption (index,value,key,num) {

        	this.categoryLable[index].selectNum = num
        	this.categoryLable[index].categoryOption.default =  value
        	this.unShade()

        	switch (index) {
        		case 0:
	        		this.filter.type = key
	        		
        		break;
        		case 1:
        			this.filter.day = key
        			
        		break;
        		case 2:
	        		this.filter.status = key
	        		
        		break;

        	}
        	this.num = 0
        	this.changeFilter()

        },

        scrollData (type, day, status, num) {
        	this.$http.jsonp('https://api.douban.com/v2/event/list',{
		      params:{
		      	loc:this.cityEn,
		        type:type,
		        day_type:day,
		        status:status,
		        start:num 
		    	},

		    }).then((res) => {

			    for(let i in res.data.events){
		    		this.result.push(res.data.events[i])

		    	}

		    }, (err) => {
		      console.log(err)
		    })

        },
        scrollFunc () {
	       
		      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
		      let innerHeight = document.documentElement.clientHeight || document.body.clientHeight;
		      let offestHeight = document.body.offsetHeight
		      //导航定位
		      
		      if(scrollTop > 50){
		        this.scrollStyle.position = 'fixed'
		        this.scrollStyle.margin = '50px 0 0 0'

		      }else{
		        this.scrollStyle.position = 'relative'
		        this.scrollStyle.margin = '0'

		      }

		     // 滚动底部加载
		      if(scrollTop + innerHeight == offestHeight){

	      		this.num++
		      	setTimeout(() => {
					this.scrollData(this.filter.type, this.filter.day, this.filter.status, this.num);

		      	},0)

		      }


        },
        

        changeFilter () {
        	
        	this.$router.push({name:'TypeList',query:{type:this.filter.type, day:this.filter.day,status:this.filter.status }})
        	this.getData(this.filter.type, this.filter.day, this.filter.status, this.num)

        },

	},

    destroyed () {
	  window.removeEventListener('scroll', this.scrollFunc)

	},
	watch : {
		getType () {
			this.filter.type = this.getType

			this.getData(this.filter.type, this.filter.day, this.filter.status)

		},
		cityEn () {
			this.filter.type = this.getType
			this.getData(this.filter.type, this.filter.day, this.filter.status)

		}

	}

}

</script>

<style>

.detaillistnav{width:100%;max-width:450px;background:#fff;top:0;z-index:999;}
.el-tabs__nav{width:100%;}
.el-tabs__header{margin:0;}
.el-tabs__item{width:33.3%;height:42px;text-align:center;padding:0;text-indent:-15px;}
#tab-categoryFirst:before,#tab-categorySecond:before{content:"";width:1px;height:18px;position:absolute;right:0;top:12px;background:#d9d9d9;}

.el-tabs__item:after{content:"";width:0;height:0;border-top: 6px solid #969696;border-left: 6px solid transparent;border-right: 6px solid transparent;-webkit-transform: translate(0,0);transform: translate(0,0);position:absolute;right:20%;top:18px;}
.el-tabs__item:hover{color:#06c1ae;}
.is-active:after{content:"";width:0;height:0;border-top: 6px solid #06c1ae;border-left: 6px solid transparent;border-right: 6px solid transparent;-webkit-transform: rotate(180deg);;transform: rotate(180deg);position:absolute;right:20%;top:17px;}
.el-tabs__active-bar{height:0;}
.el-tabs__item.is-active{color:#06c1ae;}

.el-tabs{position:relative;z-index:999;}

.el-tabs__content{width:100%;position: absolute;top:42px;left:0;background:#fff;z-index:999;}
.categoryOption{height:40px;line-height:40px;font-size:14px;padding-left:6%;cursor:pointer;border-bottom:1px solid #f9f9f9;color:#454545;}
.select{color:#06c1ae;background:#f6f6f6;}

.shade{width:450px;max-width:450px;position:fixed;top:0;bottom:0;z-index:99;background:rgba(0,0,0,0.3);}


.typeList{background: #fff;}
.typeList h1{height:42px;line-height:42px;margin:0 10px;border-bottom: 1px solid #d9d9d9;font-size:16px;color:#454545;font-weight:normal;}
.list-wrap{padding:10px 0;margin:0 10px;border-bottom:1px solid #d9d9d9;overflow:auto;color:#454545;box-sizing:border-box;}

.list-left{width:100px;float:left;}
.list-left img{width:100%;}
.list-right{height:150px;min-width:180px;max-width:320px;margin-left:110px;position:relative;}
.list-right h2{font-size:15px;font-weight:normal;margin-bottom:5px;}
.list-right p{color:#666;font-size:13px;}
.list-right span{font-size:13px;}
.Interest{position:absolute;right:0;bottom:0;}
.price{width:160px; overflow: hidden;text-overflow: ellipsis;white-space: nowrap;position:absolute;left:0;bottom:0;}



</style>
