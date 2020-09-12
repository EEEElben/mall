<template>
  <div class="bottom-bar">
    <check-button class="select-all" @click.native="checkAll" :checked="selectAll"></check-button>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPice}}</span>
    <span class="buy-product">去计算({{checkLength}})</span>
  </div>
</template>

<script>

import CheckButton from './CheckButton'
export default {
  name:"CartBottomBar",
  components: {
    CheckButton
  },
  computed:{
    totalPice(){
      return  this.$store.state.cartList.filter(item => {
        //filter item.checked为true的过滤
        return item.checked
      }).reduce((preValue,item) =>{
        return preValue + item.price * item.count
      },0)
    },
    checkLength(){
      return this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue,item) =>{
        return preValue + 1 * item.count
      },0)
    },
    selectAll(){
      if(this.$store.state.cartList.length === 0) return false
      // // return !this.$store.state.cartList.filter(item => !item.checked).length
      // // 0 取反为true  全部选中时，未选中数量为0  取反后为true
       return !this.$store.state.cartList.find(item => !item.checked)
      // 查找不选中的，找到就返回 性能更高

      // return this.$store.state.cartList.every(item => item.checked)
    }
  },
  methods:{
    checkAll(){
      if(this.selectAll){
        this.$store.state.cartList.forEach(item => item.checked = false)
      }else{
        this.$store.state.cartList.forEach(item => item.checked = true)
        //改变了vuex中state的值 最好在store里修改
      }
    }
  }
}
</script>

<style scoped>
 .bottom-bar{
    width: 100%;
    height: 40px;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    padding-left: 10px;
    box-sizing: border-box;
    display: flex;
  }
  .bottom-bar span{
    line-height: 40px;
    margin-left: 5px;
  }
  .select-all{
    display: flex;
    justify-content:center;
    align-items:center;
  }
  .total-price{
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }
  .buy-product{
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    position:absolute;
    right: 0;
  }
</style>