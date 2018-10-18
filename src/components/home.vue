<template>
<div class="indexContent">
  <div class="banner"><img src="../assets/banner.png"></div>
  <div class="typeList">
    
    <ul>
      <li v-for="(value, key, index) in typelists" @click="toTypeList(value)"><img :src="'./static/img/list-'+(index + 1)+'.png'" ><span>{{key}}</span></li>       
    </ul>
  </div>

  <div class="indexList">
    <h1>人气推荐</h1>
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
    <div class="allDetailList" @click="toTypeList('all')"><span>查看全部</span><i class="el-icon-arrow-right"></i></div>
  </div>
</div>
</template>

<script>

export default {
  props:{
    cityEn:String

  },
  data () {
    return {
      typelists:{ "音乐":"music", "戏剧":"drama", "展览":"exhibition","讲座":"salon","聚会":"party","运动":"sports","旅行":"travel","公益":"commonweal","电影":"film","全部":"all" },
      result:'',
      type:''
    }
  },

  created () {
    this.hotList();
    
  },

  methods:{
    hotList () {
      this.$http.jsonp('https://api.douban.com/v2/event/list',{
        params:{
            loc:this.cityEn,
            count:100
        },

      }).then((res) => {

        function sort(a,b){
            return b.wisher_count - a.wisher_count

        }
        res.data.events.sort(sort)
        let arr0 = [];
        for(let i=0; i<19; i++){
            arr0.push(res.data.events[i])

        }

        this.result = arr0;

      }, (err) => {
        console.log(err)
      })

    },

    toTypeList (value) {
      this.$emit('getType',value)
      this.$router.push({name:'TypeList',query:{type:value}});
    }
  },

  watch:{

    cityEn () {

      this.hotList()

    }

  }
}
</script>


<style scoped>

.typeList{width:100%;padding:15px 0;border-top:1px solid #d9d9d9;background:#fff;}
ul{overflow:auto;}
ul li{width:20%;padding:2% 2%;font-size:14px;list-style:none;box-sizing:border-box;float:left;text-align:center;cursor:pointer;}
ul li img{width:80%;}
ul li span{display:block;text-align:center;margin-top:6px;}

.indexList{margin:15px 0;background: #fff;}
.indexList h1{height:42px;line-height:42px;margin:0 10px;border-bottom: 1px solid #d9d9d9;font-size:16px;color:#454545;font-weight:normal;}
.list-wrap{padding:10px 0;margin:0 10px;border-bottom:1px solid #d9d9d9;overflow:auto;color:#454545;box-sizing:border-box;}

.list-left{width:100px;float:left;}
.list-left img{width:100%;}
.list-right{height:150px;min-width:180px;max-width:320px;margin-left:110px;position:relative;}
.list-right h2{font-size:15px;font-weight:normal;margin-bottom:5px;}
.list-right p{color:#666;font-size:13px;}
.list-right span{font-size:13px;}
.Interest{position:absolute;right:0;bottom:0;}
.price{width:160px; overflow: hidden;text-overflow: ellipsis;white-space: nowrap;position:absolute;left:0;bottom:0;}

.allDetailList{height:42px;line-height:42px;color:#06c1ae;padding:0 10px;border-bottom:1px solid #cdcdcd;cursor:pointer;}
.allDetailList span{float:left;}
.allDetailList i{color:#06c1ae;float:right;margin-top:13px;}

</style>

