<template>
  <div id="app">
    <nav class="navbar navbar-default" role="navigation" style="margin-bottom:0;">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="http://localhost:8080/#/">
            <button class="btn-danger btn-sm" style="width:80px;">首页</button>
          </a>
          <a v-bind:class="{'hidden':glActive}" class="navbar-brand" href="http://localhost:8080/#/Admin">
            <button class="btn-danger btn-sm" style="width:80px;">管理员</button>
          </a>
<!--          <a class="navbar-brand" href="http://localhost:8080/#/">-->
<!--            <button class="btn-default btn-sm" style="width:80px;">每日推荐</button>-->
<!--          </a>-->
<!--          <a class="navbar-brand" href="http://localhost:8080/#/">-->
<!--            <button class="btn-default btn-sm" style="width:80px;">其他</button>-->
<!--          </a>-->
        </div>
        <ul class="nav navbar-nav navbar-right">
          <li v-bind:class="{ 'hidden' : noActive}"><a href="http://localhost:8080/#/Succ">
            <button v-on:click="" class="btn-sm btn-success"><span class=""></span>我的信息</button>
          </a></li>
          <li v-bind:class="{ 'hidden' : noActive}"><a href="http://localhost:8080/#/">
            <button v-on:click="loginOut" class="btn-sm btn-success"><span class="glyphicon glyphicon-log-in"></span>注销</button>
          </a></li>
          <li v-bind:class="{ 'hidden' : isActive}"><a href="http://localhost:8080/#/register">
            <button class="btn-sm" > <span class="glyphicon glyphicon-user"></span> 注册</button>
          </a></li>
          <li v-bind:class="{ 'hidden' : isActive}"><a href="http://localhost:8080/#/login">
            <button class="btn-sm btn-success"><span class="glyphicon glyphicon-log-in"></span>登录</button>
          </a></li>

        </ul>
      </div>
    </nav>

    <router-view/>
  </div>
</template>
<script>

export default {
  name: 'App',
  data () {
    return {
      isActive: true,
      noActive: false,
      glActive: true,
      token: ''
    }
  },
  methods: {
    loginOut () {
      this.$cookie.set('token', '')
      this.$cookie.set('user', '')
      this.isActive = false
      this.noActive = true
      this.glActive = true
      // let _this = this
      // let userName = this.$qs.stringify({
      //   userName:this.$cookie.get("user")
      // })
      // this.$axios(
      //   {
      //     method:"POST",
      //     url:'/api/loginOut',
      //     headers:{
      //       "Authorization":_this.$cookie.get("token"),
      //     },
      //     data:{
      //         userName,
      //     },
      //   }
      // ).then(function (resp) {
      //   console.log(resp)
      //   if (resp.status === 200) {
      //     if (resp.data.rtnCode !== '0') {
      //     } else {
      //       _this.$cookie.set("token",'');
      //       _this.$cookie.set("user",'');
      //       _this.isActive = false;
      //       _this.noActive = true;
      //     }
      //   } else {
      //     console.log('not  200 了')
      //   }
      // })

      // this.isActive = false;
      // this.noActive = true;
    },
    listerToken (any) {
      let token
      if (any === undefined || any === null) {
        token = this.$cookie.get('token')
        let roles = this.$cookie.get('role')
        if (roles !== null && roles !== '') {
          if (roles.toString().indexOf('admin') !== -1) {
            this.glActive = false
          }
        }
        // let role = roles.substring(roles.indexOf("."),roles.lastIndexOf("."));
        // console.log(role)
      } else {
        token = any
        console.log('asdf===' + token)
      }

      if (token === undefined || token === '' || token === null) {
        console.log('asdf')
        this.isActive = false
        this.noActive = true
      }
    }

  },
  created () {
    this.listerToken()
  }
  // watch:{
  //   token(newN,oldN){
  //     this.isActive = true
  //     this.noActive = false
  //     console.log(newN+oldN)
  //   }
  // }
}
</script>

<style>

</style>
