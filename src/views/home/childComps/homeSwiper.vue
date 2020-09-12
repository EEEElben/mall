<template>
  <swiper>
      <swiper-item v-for="item in banner" :key="item.id">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from "components/common/swiper"

export default {
  name:'homeSwiper',
  props:{
    banner:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      isload:false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods:{
    imageLoad(){
      if(!this.isload){
        this.$emit('swiperImageLoad')
        this.isload = true
      }
      
    }
  }
}
</script>

<style scoped>
  
</style>