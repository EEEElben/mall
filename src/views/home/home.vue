<template>
  <div id='home'>
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
     <tabbar-control @tabClick="tabClick"
                      :titles="['流行','新款','精选']"
                      ref="tabControl1"
                      class="tabcontrol"
                      v-show="isTabFixed"
                      ></tabbar-control>
    <scroll class="content" ref="scroll" 
           :probe-type="3" 
           @scroll="contentScroll" 
           :pull-up-load="true" 
           @pullingUp="loadMore"
           >
      <home-swiper :banner="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommend="recommends"></recommend-view>
      <feature-view></feature-view>
      <tabbar-control @tabClick="tabClick"
                      :titles="['流行','新款','精选']"
                      ref="tabControl2"
                      ></tabbar-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>


  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import TabbarControl from "components/content/tabbarcontrol/TabbarControl"
import GoodsList from "components/content/goods/GoodsList"
import scroll from "components/common/scroll/scroll"
import BackTop from "components/content/BackTop/BackTop"

import  {getHomeMultidata,getHomeGoods} from "network/home"
import {debounce} from "common/utils"

import homeSwiper from "./childComps/homeSwiper"
import RecommendView from "./childComps/RecommendView"
import FeatureView from "./childComps/FeatureView"

export default {
  name:'home' ,
  components:{
    NavBar,
    homeSwiper,
    RecommendView,
    FeatureView,
    TabbarControl,
    GoodsList,
    scroll,
    BackTop
  },
  data(){
    return{
      // result: null,
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType:'pop',
      isShowBackTop:false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0
    }
  },
  created(){
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted(){
    //图片加载完成事件监听
    const refresh = debounce(this.$refs.scroll.refresh,200)
    this.$bus.$on('HomeitemImageLoad',() =>{
      // this.$refs.scroll.refresh()
      refresh();
    })
    //获取tabcontrol的offsetTop
    //每个组件都有一个属性$el，用于获取组件中的对象
    // console.log(this.$refs.tabControl.$el.offsetTop)
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  activated(){
    // console.log("activeated")
    this.$refs.scroll.scrollTo(0,this.saveY)
    this.$refs.scroll.refresh()
  },
  deactivated(){
    this.saveY = this.$refs.scroll.scroll.y
    // console.log(this.saveY)
  },
  methods:{
    // 事件监听相关方法
    tabClick(index){
      switch(index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index
    },
    backClick(){
      this.$refs.scroll.scrollTo(0,0,500)
    },
    contentScroll(position){
      //判断backtop是否显示
      this.isShowBackTop = (-position.y) > 1000
      //决定是否tabcontrol吸顶
      this.isTabFixed = (-position.y) >this.tabOffsetTop
    },
    loadMore(){
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.scroll.refresh();
    },
    swiperImageLoad(){
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      //获取tabbarcontrol的offsettop
    },
    // 网络请求相关方法
    getHomeMultidata(){
      getHomeMultidata().then(res =>{
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        this.$refs.scroll.finishPullUp()
      }) 
    }
  }
  }
</script>

<style scoped>
  #home{
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background:var(--color-tint);
    color:#fff;
    /* position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9; */
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tabcontrol{
    position: relative;
    z-index: 9;
  }
  /* .content{
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>