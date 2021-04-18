<template>
  <div id="Admin">

  </div>
</template>

<script>
export default {
  name: 'Admin',
  beforeMount () {
    let role = this.$cookie.get("role")
    if (role === null || role === '' || role === undefined || role.toString().indexOf("admin") === -1){
      this.$router.push({
        name: 'Err',
        params: {
          'Msg': "404未知错误"
        }
      })
      return;
    }


  }
}
</script>

<style scoped>

</style>
