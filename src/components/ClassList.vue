<template>
  <div id="#classList">
    {{this.records}}
  </div>
</template>

<script>
export default {
  name: 'ClassList',
  data(){
    return{
      clazz:'',
      records:'',
    }
  },
  methods:{
    selectClazz(clazz){
      let _this = this
      this.$axios.get(
        '/api/searchBook',
        {
          params:{
            classify:clazz,
            page:1,
            total:10
          }
        }
      ).then(function (resp) {
        if (resp.status === 200) {
          if (resp.data.rtnCode === '0') {
            console.log(resp.data)
            _this.records = resp.data.obj.records
          } else {
            _this.$router.push({
              name: 'Err',
              params: {
                rtnmsg: resp.data.RtnMsg
              }
            })
          }
        } else {
          console.log('not  200 了')
        }
      })
    }
  },
  beforeMount () {
    this.clazz = this.$route.params.clazz
    console.log(this.clazz)
    this.selectClazz(this.clazz)
  }
}
</script>

<style scoped>

</style>
