<template>
  <div class="recommend">
    <div v-for="item in recommend" :key="item.id" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name:'RecommendView',
  props:{
    recommend:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components: {

  }
  }
</script>

<style scoped>
  .recommend{
    margin:0;
    display: flex;
    width:100%;
    text-align: center;
    font-size: 12px;
    border-bottom: 8px solid #eee;
    padding: 10px 0 20px;
  }
  .recommend-item{
    flex:1;
  }
  .recommend-item img{
    width: 80%;
    margin-bottom: 8px;
  }
</style>