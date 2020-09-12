<template>
    <div class="tabbar-item" @click='itemclick'>
      <div v-if="!isActive" ><slot name="item-icon"></slot></div>
      <div  v-else><slot name="item-icon-active"></slot></div>
      <div :style='activeStyle'><slot name="item-text"></slot></div>
    </div>
</template>

<script>
export default {
  name:"TabBarItem",
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'red'
    }
  },
  // data:{
  //   return(){
  //     isActive:false;
  //   }
  // },
  computed:{
    isActive(){
      //比如在home时 -> item1(/home)  true
      //比如在home时 -> item1(/category)  false
      //比如在home时 -> item1(/cart)  false
      //比如在home时 -> item1(/profile)  false
      return this.$route.path.indexOf(this.path) !== -1   //不等于-1表示
    },
    activeStyle(){
      return this.isActive ? {color:this.activeColor} : {}
    }
  },  
  //  isActive 当前页面高亮
  methods:{
    itemclick(){
      this.$router.replace(this.path)
      //页面跳转
    }
  }
  }
</script>

<style scoped>
  .tabbar-item{
    flex:1;
    text-align:center;
    height:49px;
    font-size: 14px;
  }
  .tabbar-item img{
    width:24px;
    height:24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
  
</style>