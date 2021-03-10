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
  beforeMount () {
    this.Msg = this.$route.params.rtnMsg
  }

}
</script>
