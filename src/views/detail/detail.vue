<template>
  <div id="detail">
    
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="scroll" :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @goodsLoad="goodsLoad"></detail-goods-info>
      <detail-params-info :item-params="itemParams" ref="params"></detail-params-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <toast :message="message" :show="show"></toast>
  </div>
</template>

<script>
import detailSwiper from "./childComps/detailSwiper"
import detailNavBar from "./childComps/detailNavBar"
import detailBaseInfo from "./childComps/detailBaseInfo"
import detailShopInfo from "./childComps/detailShopInfo"
import detailGoodsInfo from "./childComps/detailGoodsInfo"
import detailParamsInfo from "./childComps/detailParamsInfo"
import detailCommentInfo from "./childComps/detailCommentInfo"
import detailBottomBar from "./childComps/detailBottomBar"

import {getDetail,Goods,Shop,getRecommend} from "network/detail"
import {debounce} from "common/utils"

import BackTop from "components/content/BackTop/BackTop"
import scroll from "components/common/scroll/scroll"
import GoodsList from "components/content/goods/GoodsList"
import toast from "components/common/toast/toast"
export default {
  name:'detail' ,
  components:{
    detailNavBar,
    detailSwiper,
    detailBaseInfo,
    detailShopInfo,
    scroll,
    detailGoodsInfo,
    detailParamsInfo,
    detailCommentInfo,
    GoodsList,
    detailBottomBar,
    BackTop,
    toast
  },
  data(){
    return{
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      itemParams:{},
      commentInfo:{},
      recommends:[],
      themeTopYs:[],
      getThemeTopY:null,
      getNewRefresh:null,
      currentIndex:0,
      isShowBackTop:false,
      message:null,
      show:false

    }
  },
  created(){
    //保存传输过来的iid
    this.iid = this.$route.params.iid
    //根据iid请求详细数据
    getDetail(this.iid).then(res=>{
      // console.log(res);
      const data = res.result
      //1.获取顶部轮播数据
      this.topImages = data.itemInfo.topImages
      //2.获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      //3.创建店铺信息
      this.shop = new Shop(data.shopInfo)
      //4.保存商品详细数据
      this.detailInfo = data.detailInfo
      //5.保存商品信息
      this.itemParams = data.itemParams
      //6.取出评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }
      this.getThemeTopY = debounce(()=>{
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        console.log(this.themeTopYs)
      },400)
      

      // this.$nextTick(()=>{
      //   //DOM渲染出来 但图片没有加载出来可能导致错误
      //   this.themeTopYs = []
      //   this.themeTopYs.push(0)
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   console.log(this.themeTopYs)
      // })
      
    })
    // //请求推荐数据 
    getRecommend().then(res=>{
      // console.log(res)
      this.recommends = res.data.list
    })
  },
  mounted(){
    this.getNewRefresh=debounce(this.$refs.scroll.refresh,200)
   
  },
  methods:{
    titleClick(index){
      console.log(index)
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index]+44,200)
    },
    goodsLoad(){
      this.getNewRefresh()
      this.getThemeTopY()
    },
    scroll(position){
      //滚动自动切换导航条
      const positionY = -position.y
      for(let i =0;i<this.themeTopYs.length;i++){
        // if(positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]){}
        //也可以给themeTopY增加一个Number.MAX_VAlue这样可以减少后面的判断条件
        let length = this.themeTopYs.length
        if((this.currentIndex!=i &&(i < length-1 && positionY >= this.themeTopYs[i]-44 && positionY < this.themeTopYs[i+1]-44) || 
        (i === length-1 && positionY >= this.themeTopYs[i]-44))){
          this.currentIndex = i
          console.log(this.currentIndex)
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
       this.isShowBackTop = (-position.y) > 1000
    },
     backClick(){
      this.$refs.scroll.scrollTo(0,0,500)
    },
    addToCart(){
      //获取商品数据
       const product = {}
       product.image = this.topImages[0]
       product.title = this.goods.title
       product.desc = this.goods.desc
       product.price = this.goods.realPrice
       product.iid = this.iid

       //将商品添加到购物车
      //  this.$store.commit('addCart',product)  commit调用mutations
      this.$store.dispatch('addCart',product).then(res =>{
        this.show = true
        this.message = res
        setTimeout(() => {
          this.show = false
        }, 1500);
      })

      //添加成功
       
    }
  }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background: #fff;
  }
  .content{
    height: calc(100% - 44px - 49px);
    /* position: absolute;
    top: 44px;
    left:0;
    right: 0;
    bottom: 0; */
  }

  </style>