<template>
  <div class="goods-item" @click="itemClick">
    <img :src="getImg" alt="" @load='imageLoad'>
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:"GoodsListItem",
  props:{
    goodsItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods:{
    imageLoad(){
      if(this.$route.path.indexOf('/home')!==0){
        this.$bus.$emit('HomeitemImageLoad')
      }else if(this.$route.path.indexOf('/detail')){
        this.$bus.$emit('DetailitemImageLoad')
      }
    },
    itemClick(){
      this.$router.push('/detail/'+this.goodsItem.iid)
    }
  },
  computed: {
      getImg() {
        return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
      }
    }
}
</script>

<style scoped>
  .goods-item{
    padding-bottom: 44px;
    position: relative;
    flex: 45%;
  }
  .goods-item img{
    width: 100%;
    border-radius: 5px;
  }
  .goods-info{
    font-size: 12px;
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 5px;
    overflow: hidden;
  }
  .goods-info p{
    text-overflow: ellipsis;
    overflow: hidden;
    margin-bottom: 3px;
    white-space:nowrap;
  }
  .goods-info .price{
    color:var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collect{
    position: relative;
  }
  .goods-info .collect::before{
    content:'';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background:url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>