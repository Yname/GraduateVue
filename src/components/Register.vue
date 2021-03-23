<template>
  <div id="#register">
    <div class="container" style="width: 99.9%;">
      <div class="row" style="margin-left:  28%;margin-bottom:30%;margin-top:5%;width:24%" >
        <div class="col-md-12 peg" style="margin-bottom: 12px;border: antiquewhite 1px solid;height:250px;">
          <div class="col-md-12" style="display: inline-block;margin-left: 1px;margin-bottom: 5px;margin-top: 5%" >
            <label class="col-md-2" for="Name" style="float:left;">
              姓名:
            </label>
            <div class="col-md-6" style="padding: 0;float:left">
              <input class="form-control" v-model="name" style="height: 30px;" id="Name" type="text" placeholder="请输入名字" >
            </div>
          </div>
          <div class="col-md-12" style="display: inline-block;margin-left: 1px;margin-bottom: 5px;" >
            <label class="col-md-2" for="Phone" style="float:left">
              Phone:
            </label>
            <div class="col-md-6" style="padding: 0;float:left">
              <input class="form-control" v-model="phone" style="height: 30px" id="Phone" type="text" placeholder="请输入Phone" >
            </div>
          </div>
          <div class="col-md-12" style="display: inline-block;margin-left: 1px;margin-bottom: 5px;" >
            <label class="col-md-2" for="Pwd" style="float:left">
              密码:
            </label>
            <div class="col-md-6" style="padding: 0;float:left">
              <input class="form-control" v-model="pwd" style="height: 30px" id="Pwd" type="password" placeholder="请输入Pwd" >
            </div>
          </div>
          <div class="col-md-12" style="display: inline-block;margin-left: 1px;margin-bottom: 5px;" >
            <label class="col-md-2" for="Code" style="float:left">
            </label>
            <div class="col-md-6 inline-block" style="padding: 0;float:left">
              <input class="form-control " v-model="code" style="height: 30px;" id="Code" type="text" placeholder="请输入验证码" >
            </div>
            <div style="color: red;margin-top: 5px;">{{titles}}</div>
          </div>

          <div class="col-md-12" style="display: inline-block;margin-left: 1px;margin-bottom: 5px;" >
            <div class="col-md-2 col-lg-offset-2" style="padding: 0;float:left">
              <input class="form-control" v-on:click="valid" v-model="validCode" style="height: 30px;width: 70px;background: aliceblue;" id="validCode" type="text"  readonly>
            </div>
            <label class="col-md-6" for="validCode" style="float:left;margin-top: 5px">
              点击刷新验证码
            </label>
          </div>
          <div class="col-md-4" style="display: inline-block;" >
            <button class="btn btn-primary btn-sm"  style="margin-bottom:10px;margin-left:160%" @click="submitClick" type="button" name="提交" >注册</button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Register',
  data(){
    return{
      name: '',
      pwd: '',
      phone: '',
      validCode:'',
      code:'',
      titles:'',
    }
  },
  methods:{
    valid(){
      this.titles = "";
      this.code = '';
      let codeValidateImg = "";
      let codeLength = 4;//验证码的长度
      let random = ["0","1","2","3","4","5","6","7","8","9","A",'B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',
        'S','T','U','V','W','X','Y','Z'];//随机数
      for(var i = 0; i < codeLength; i++) {//循环操作
        let num = (Math.random()*1000/10).toFixed(0)
        if (num < 0){
          num = 0
        }else if (num > 36){
          num = 35
        }
        codeValidateImg += random[num]
      }
      this.validCode = codeValidateImg
    },
    submitClick: function () {
      let _this = this
      if (this.code !== this.validCode){
        this.titles = "验证码不正确";
        return
      }
      this.$axios.post(
        '/api/register',
        {
          params: {
            userName: this.name,
            password: this.pwd,
            phone:this.phone,
          }
        }
      ).then(function (resp) {
        if (resp.status === 200) {
          if (resp.data.rtnCode !== '0') {
            _this.$router.push({
              name: 'Err',
              params: {
                'rtnmsg': resp.data.RtnMsg
              }
            })
          } else {
            let token = resp.data.obj.toString()
            _this.$cookie.set('token', token)
            _this.$cookie.set("user",_this.name)
            setTimeout(function (){_this.$router.go(0)},0)
            _this.$router.push({
              name: 'Succ',
              params: {
                'rtnMsg': _this.name
              }
            })
          }
        } else {
          console.log('not  200 了')
        }
      })
    },
  },
  created () {
    this.valid()
  }
}
</script>

<style scoped>

.peg{
  background-image: url("../assets/4.jpeg");
}

.container{
  background-image: url("../assets/6.jpg");
}

</style>
