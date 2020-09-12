import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //修改state的东西需要通过mutations
    cartList:[]
  },
  mutations: {
    // addCart(state,payload){
      //payload是新添加的商品
      //方法一
      // let oldProduct = null
      // for(let item in state.cartList){
      //   if(item.iid == payload.iid){
      //     oldProduct = item
      //   }
      // }
      // //判断oldProduct
      // if(oldProduct){
      //   oldProduct.count += 1
      // }else{
      //   state.cartList.push(payload)
      // }
    //  addCount(state,payload){
    //   payload.count +=1
    //  },
    //  addToCart(state,payload){
    //   state.cartList.push(payload)
    //  }
  },
  actions: {
    addCart(context,payload){
      return new Promise((resolve,reject)=>{
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
        if (oldProduct){
          oldProduct.count += 1
      // context.commit('addCount',oldProduct)
        resolve('当前商品数量+1')
        }else{
        payload.count = 1
        payload.checked = false
        context.state.cartList.push(payload)
        resolve('添加新商品成功')

        // context.commit('addToCart',payload)
      }
    })
   }
  },
  modules: {
  }
})
