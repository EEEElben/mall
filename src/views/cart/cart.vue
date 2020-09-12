<template>
  <div class="cart">
    <nav-bar class="cart-nav"><div slot="center">购物车({{cartLength}})</div></nav-bar>
    <cart-list class="cart-list"></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import CartList from "./childComps/CartList"
import CartBottomBar from "./childComps/CartBottomBar"


export default {
  name:'cart',
  components:{
    NavBar,
    CartList,
    CartBottomBar
  },
  computed:{
    cartLength(){
      return this.$store.state.cartList.length
    }
    // 可以用  创建一个getters在store里  ...mapGetters(['cartList','cartLength'])  
  }
  }
</script>

<style scoped>
  .cart-nav{
    background: var(--color-tint);
    color:#fff;
  }
</style>