<template>
  <div id="profile">
    <nav-bar class="nav-bar"><div slot="center">商城</div></nav-bar>
    <div class="user-info">
      <div class="user-head"></div>
      <div class="user">
        <div class="login">登录/注册</div>
        <div class="phone">暂无绑定手机号</div>
      </div>
    </div>

    <section class="account">
      <div class="account-item">
        <div class="number">
          <span class="balance">0.00</span>元
        </div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>个
        </div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>分
        </div>
        <div class="account-info">我的积分</div>
      </div>
    </section>
    <list-view :list-data="orderList" class="order-list"></list-view>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import ListView from './ChildComps/ListView'

	export default {
		name: "Profile",
    components: {
      NavBar,
      ListView
    },
    data(){
      return{
        orderList: [
          {icon: '#order', iconColor: '#ff8198', info: '我的消息'},
          {icon: '#point', iconColor: '#fc7b53', info: '积分商城'},
          {icon: '#vip', iconColor: '#ffc636', info: '会员卡'},
        ],
      }
    }
	}
</script>

<style scoped>
  #profile {
    background-color: #f2f2f2;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }
  .user-info{
    background-color: var(--color-tint);
    padding: 15px;
    margin-top: -5px;
    height: 100px;
    display: flex;
  }
  .user{
    float:left;
  }

  .login{
    color:#fff;
    font-size: 16px;
    padding-left: 10px;;
  }
  .user-head{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #fff;
  }
  .phone{
    padding-left: 10px;;
    margin-top: 18px;
    color:#fff;
    font-size: 16px;
  }

  .account {
    display: flex;
  }

  .account-item {
    width: 100%;
    background-color: #fff;
    margin-right: 1px;
    text-align: center;
  }

  .account-item:last-of-type {
    margin-right: 0;
  }

  .account-item {
    color: #666;
    font-size: 13px;
    padding: 18px;
  }

  .account-item .balance {
    font-size: 24px;
    font-weight: 700;
    color: #ff5f3e;
  }

  .account-info {
    margin-top: 6px;
  }

</style>
