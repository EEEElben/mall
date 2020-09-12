<template>
    <scroll class="content">
      <div class="tabmenu">
        <div class="menu-item"
             v-for="(item,index) in category" 
             :key="item.id"
             :class="{active: index===currentIndex}"
             @click="itemClick(index)"
             >{{item.title}}
             </div>
      </div>
    </scroll>
</template>

<script>
import scroll from "components/common/scroll/scroll"

export default {
  name:"tabMenu",
  components: {
    scroll
  },
  data(){
    return{
      currentIndex:0
    }
  },
  props:{
    category:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{
    itemClick(index){
      this.$emit('selectItem',index)
      this.currentIndex =index
    }
  }
  
}
</script>

<style scoped>
  .content{
    width: 100px;
    height: 100%;
    background: #f6f6f6;
    box-sizing: border-box;
  }
  .menu-item{
    height:45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }
  .active{
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
  }
</style>