<template>
  <div class="user-center-wrap">
    <div class="user-profile">
      <div class="info">
        <img class="user-avatar" src="http://localhost:3000/users/getAvatar?username=logan" alt="">
        <span class="username">我可以</span>
        <div class="follow-and-fans">
          <div>
            <span class="count">0</span>
            <span class="name">关注</span>
          </div>
          <div>
            <span class="count">0</span>
            <span class="name">粉丝</span>
          </div>
        </div>
      </div>
      <div class="menu">
        <a href="#">我喜欢</a>
        <a href="#">我创建的歌单</a>
        <a href="#">关注</a>
        <a href="#">粉丝</a>
      </div>
    </div>
  </div>
</template>
<style>
  .user-profile {
    width: 100%;
    height: 380px;
    background: url("../../assets/bg_profile.jpg") no-repeat;
  }

  .user-profile .info {
    width: 100%;
    height: 320px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .user-profile .menu {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
  }

  .user-profile .menu a {
    color: #ffffff;
    margin: 0 12px;
  }

  .user-profile .menu a:first-child{
    margin-left: 7%;
  }

  .user-profile .menu a:hover {
    color: #31C27C;
  }

  .user-profile .user-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 3px solid #ffffff;
  }

  .user-profile .username {
    font-size: 32px;
    color: #ffffff;
    font-weight: bold;
    margin: 8px 0;
  }

  .user-profile .follow-and-fans {
    display: flex;
    color: #ffffff;
    font-weight: normal;
  }

  .user-profile .follow-and-fans div {
    display: flex;
    flex-direction: column;
    width: 60px;
    align-items: center;
  }

  .user-profile .count {
    font-size: 28px;
  }

  .user-profile .count:hover {
    color: #31C27C;
    cursor: pointer;
  }

  .user-profile .name {
    font-size: 14px;
  }
</style>
<script type="text/ecmascript-6">
  export default{}
</script>
