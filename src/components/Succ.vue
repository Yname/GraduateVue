<template>
    <div class="#succ">
        <div >
<!--            <span class="text-danger">欢迎{{this.$cookie.get("user")}}登录！</span>-->
          <span class="text-danger">{{Msg}}</span>
        </div>
    </div>
</template>

<script>
export default{
    name:'Succ',
    data(){
        return{
            // Msg:this.$cookie.get("rtn")
            Msg:''
        }
    },
  methods:{
      selectUser(){
        let _this = this
        this.$axios({
          url:"/api/selectUserByName",
          method:"post",
          data:{params:{
              userName:_this.$cookie.get("user"),
            }},
          headers:{'Authorization':_this.$cookie.get("token")}
        }).then(function (resp) {
          if (resp.status === 200) {
            if (resp.data.rtnCode !== '0') {

            } else {
              let data = resp.data.obj
              console.log(data)

            }
          } else {
            console.log('not  200 了')
          }
        });
      }
  },
  beforeMount () {
    this.selectUser()
  }

}
</script>
