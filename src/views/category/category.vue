<template>
 <div class="category">
   <nav-bar class="nav-bar"><div slot="center">分类</div></nav-bar>
   <div class="content1">
     <tab-menu :category="categories"
               @selectItem="selectItem" />
     <scroll id="tab-content" :data="[categoryData]" ref="scroll"
              :probe-type="3" >
       <tab-content-category :subcategories="showSubcategory"/>
       <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
       
     </scroll>
   </div>
 </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import scroll from 'components/common/scroll/scroll'

import tabMenu from './ChildComps/tabMenu'
import TabContentCategory from './ChildComps/TabContentCategory'
import TabContentDetail from './ChildComps/TabContentDetail'


import {getCategory, getSubcategory, getCategoryDetail} from "network/category"
export default {
  name:'category',
  components:{
    NavBar,
    tabMenu,
    scroll,
    TabContentCategory,TabContentDetail
  },
  data(){
    return{
      categories:[],
      categoryData: {},
      currentIndex: -1,
      isTabFixed: false,
      saveY: 0,
      tabOffsetTop: 0
    }
  },
  created(){
    //获取数据
   this._getCategory()
  },
  computed: {
      showSubcategory() {
        if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
      showCategoryDetail() {
        if (this.currentIndex === -1) return []
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
  methods:{
    _getCategory() {
        getCategory().then(res => {
          // 1)保存分类数据
          this.categories = res.data.category.list
          // 2)初始化每个类别的子数据
          for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          // 3.请求第一个分类的数据
          this._getSubcategories(0)
        })
      },

      //2、根据分类栏目的下标去请求相应的数据
      _getSubcategories(index) {
        this.currentIndex = index;
        const mailKey = this.categories[index].maitKey;
        getSubcategory(mailKey).then(res => {
          this.categoryData[index].subcategories = res.data
          this.categoryData = {...this.categoryData}
          this._getCategoryDetail('pop')
          this._getCategoryDetail('sell')
          this._getCategoryDetail('new')
        })
      },

      //3、根据类型请求相应的商品数据（pop，new，sell）
      _getCategoryDetail(type) {
        // 1)获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        // 2)发送请求,传入miniWallkey和type
        getCategoryDetail(miniWallkey, type).then(res => {
          // 3)将获取的数据保存下来
          this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },
      selectItem(index) {
        this._getSubcategories(index)
      },
  }
  }
</script>

<style scoped>
.category{
  height:100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.content1{
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 49px;
  overflow: hidden;
}
#tab-content {
    overflow: hidden;
    height: calc(100vh - 49px - 44px);
    flex: 1;
  }
</style>