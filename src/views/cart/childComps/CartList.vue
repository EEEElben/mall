<template>
  <div class="cart-list"> 
    <scroll class="content" ref="scroll">
        <cart-list-item v-for="item in this.$store.state.cartList" 
                        :key="item.id" 
                        :product='item'></cart-list-item>
    </scroll>  
  </div>
</template>

<script>
import CartListItem from "./CartListItem"
import Scroll from "components/common/scroll/scroll"
import { mapGetters } from "vuex"
export default {
  name:"CartList",
  components:{
    Scroll,
    CartListItem
  },
  activated(){
    console.log(111)
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
  .cart-list{
     /* height: calc(100% - 133px); */
     position: absolute;
    top: 44px;
    bottom: 89px;
    width: 100%;
  }
  .content{
     height:100%;
     overflow: hidden;
  }
</style>