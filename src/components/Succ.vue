<template>
    <div class="#succ">
        <div >
<!--            <span class="text-danger">欢迎{{this.$cookie.get("user")}}登录！</span>-->

          <div>姓名：<input v-model="user.userName"></div>
          <div>密码：<input v-model="user.userPwd"></div>
          <div>电话：<input v-model="user.userPhone"></div>
          <div><input type="submit" v-on:click="updateUser"></div>

        </div>
    </div>
</template>

<script>
export default{
  name: 'Succ',
  data () {
    return {
      // Msg:this.$cookie.get("rtn")
      Msg: '',
      user: ''

    }
  },
  methods: {
    selectUser () {
      let _this = this
      this.$axios({
        url: '/api/selectUserByName',
        method: 'post',
        data: {params: {
          userName: _this.$cookie.get('user')
        }},
        headers: {'Authorization': _this.$cookie.get('token')}
      }).then(function (resp) {
        if (resp.status === 200) {
          if (resp.data.rtnCode !== '0') {

          } else {
            // let data = resp.data.obj
            // console.log(data)
            _this.user = resp.data.obj
            console.log(_this.user)
          }
        } else {
          console.log('not  200 了')
        }
      })
    },
    updateUser () {
      let _this = this
      this.$axios({
        url: '/api/updateUserByName',
        method: 'post',
        data: {params: {
          user: _this.user
        }},
        headers: {'Authorization': _this.$cookie.get('token')}
      }).then(function () {
        alert('修改成功')
        this.selectUser()
      })
    }
  },
  beforeMount () {
    this.selectUser()
  }

}
</script>
