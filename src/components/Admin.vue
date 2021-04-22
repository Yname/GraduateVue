<template>
  <div id="Admin">
    <div class="container" style="width: 99.9%;">
<!--      <div class="row" style="margin-left: 28%;margin-bottom:30%;margin-top:5%;width:24%" >-->
<!--        <div class="col-md-12" style="margin-bottom: 12px;border: red 1px solid;height:200px;">-->
<!--        </div>-->
<!--      </div>-->
      <div class="col-md-2" style="margin-bottom: 12px;border: aliceblue 1px solid;height:400px;background: aliceblue">

<!--          <div class="col-md-8 " style="margin-top: 50px;border: white 1px solid;height: 40px">-->
<!--            <div v-on:click="clickUser" style="cursor: pointer"><button>用户信息</button></div></div>-->
        <div v-on:click="clickUser" class="col-md-10" style="background: antiquewhite;height: 45px;font-size: 18px;text-align: left;margin-top:35px;padding-top: 10px;padding-left:30px;border: aliceblue 1px solid;cursor:pointer" >用户信息</div>

<!--          <div class="col-md-8" style="margin-top: 50px;border: white 1px solid;height: 40px">-->
<!--            <div v-on:click="clickBook" style="cursor: pointer"><button>图书信息</button></div></div>-->

        <div v-on:click="clickBook" class="col-md-10 " style="background: antiquewhite;height: 45px;font-size: 18px;text-align: left;margin-top:35px;padding-top: 10px;padding-left:30px;border: aliceblue 1px solid;cursor:pointer" >图书信息</div>

        <div v-on:click="clickBook2User" class="col-md-10 " style="background: antiquewhite;height: 45px;font-size: 18px;text-align: left;margin-top:35px;padding-top: 10px;padding-left:30px;border: aliceblue 1px solid;cursor:pointer" >用户&图书</div>


      </div>

      <div class="col-md-6 col-lg-offset-2" style="margin-bottom: 12px;border: aliceblue 1px solid;height:800px;">
        <table id="userOrBook"></table>
<!--        {{this.bok}}-->
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'Admin',
  data(){
    return{
      msg:this.$cookie.get("user"),
      bok:'',
    }

  },
  created () {
    let _this = this
    window.adminClickUser = _this.adminClickUser
  },
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
  },
  methods:{
    clickUser(){
      let _this = this
      // this.$axios.post(
      //   '/api/selectUser',

        this.$axios({

          url: "/api/selectUser",
          method: "post",
          headers: {'Authorization': _this.$cookie.get("token")}

        }).then(function (resp) {
        if (resp.status === 200) {
          if (resp.data.rtnCode === '0') {
            console.log(resp.data)
            _this.records = resp.data.obj.records
            console.log(_this.records)
            $('#userOrBook').bootstrapTable('destroy');
            $('#userOrBook').bootstrapTable({
              data:_this.records ,  //表格数据
              columns: [
                {
                  field:'userId',
                  title:'用户编号'
                },
                {
                  field:'userName',
                  title:'用户姓名'
                },
                {
                  field:'userPhone',
                  title:'用户电话'
                },
                {
                  field:'userAuth',
                  title:'用户权限',
                  formatter:function(value, row, index){
                    if (value === null || value === ""){
                      return "无"
                    }else
                      return value
                  }
                },
                {
                  field:'userOperate',
                  title:'用户权限路径'
                },
                {
                  field:'',
                  title:'操作',
                  formatter:function(value, row, index){
                    // let rows = _this.$qs.stringify(row)
                    //'"+rows+"'
                    return  "<a onclick=\"adminClickUser('"+row.userName+"')\" style=\"padding-right: 10px;\" href=\"#\">查看详情</a>";
                  }
                },
              ] //表格列数据
            })
            $("#Admin .fixed-table-loading ").remove()
            // $('.bootstrap4 .loading-wrap').removeClass()
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

    },
    clickBook(){
      let _this = this
      // this.$axios.post(
      //   '/api/selectUser',


      this.$axios.get(
        '/api/searchBook',
        {
          params:{
            page:1,
            total:10,
            // num:0,
          }
        }
    ).then(function (resp) {
        if (resp.status === 200) {
          if (resp.data.rtnCode === '0') {
            console.log(resp.data)
            _this.records = resp.data.obj.records
            console.log(_this.records)
            $('#userOrBook').bootstrapTable('destroy');
            $('#userOrBook').bootstrapTable({
              data:_this.records ,  //表格数据
              columns: [
                {
                  field:'bookId',
                  title:'书籍编号'
                },
                {
                  field:'bookName',
                  title:'书籍名称'
                },

                {
                  field:'bookWriter',
                  title:'书籍作者'
                },
                {
                  field:'bookPublisher',
                  title:'出版商'
                },
                {
                  field:'classify',
                  title:'书籍归类'
                },
                {
                  field:'bookNum',
                  title:'是否借出',
                  formatter:function(value, row, index) {
                    if (value.toString() === "1"){
                      return "未借出"
                    }else
                      return "已借出"
                  }
                },
                // {
                //   field:'bookExpire',
                //   title:'借阅超时',
                // },
                {
                  field:'',
                  title:'操作',
                  formatter:function(value, row, index){
                    let rows = _this.$qs.stringify(row)
                    //'"+rows+"'
                    return  "<a onclick=\"clickDetails('"+rows+"')\" style=\"padding-right: 10px;\" href=\"#\">查看详情</a>";
                  }
                },
              ] //表格列数据

            })
            $("#Admin .fixed-table-loading ").remove()
            // $('.bootstrap4 .loading-wrap').removeClass()
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

    },
    clickBook2User(){
      let _this = this
      // this.$axios.post(
      //   '/api/selectUser',
      this.$axios({
          url: "/api/selectBook2User",
          method: "post",
          headers: {'Authorization': _this.$cookie.get("token")}
        }
      ).then(function (resp) {
        if (resp.status === 200) {
          if (resp.data.rtnCode === '0') {
            console.log(resp.data)

            _this.records = resp.data.obj.records
            console.log(_this.records)

            $('#userOrBook').bootstrapTable('destroy');
            $('#userOrBook').bootstrapTable({
              data:_this.records ,  //表格数据
              columns: [
                {
                  field:'userName',
                  title:'用户名'
                },
                {
                  field:'book.bookName',
                  title:'书籍名称'
                },

                {
                  field:'book.bookWriter',
                  title:'书籍作者'
                },
                {
                  field:'book.bookPublisher',
                  title:'书籍出版商'
                },
                {
                  field:'book.classify',
                  title:'书籍归类'
                },
                {
                  field:'book.bookNum',
                  title:'是否借出',
                  formatter:function(value, row, index) {
                    if (value.toString() === "1"){
                      return "未借出"
                    }else
                      return "已借出"
                  }
                },
                {
                  field:'book.bookExpire',
                  title:'借阅超时',
                  formatter:function(value, row, index) {
                    if (value.toString() === "0"){
                      return "未超时"
                    }else
                      return "已超时"
                  }
                },
                // {
                //   field:'',
                //   title:'操作',
                //   formatter:function(value, row, index){
                //     let rows = _this.$qs.stringify(row)
                //     //'"+rows+"'
                //     return  "<a onclick=\"clickDetails('"+rows+"')\" style=\"padding-right: 10px;\" href=\"#\">查看详情</a>";
                //   }
                // },
              ] //表格列数据

            })
            $("#Admin .fixed-table-loading ").remove()
            // $('.bootstrap4 .loading-wrap').removeClass()
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

    },
    adminClickUser(userName){
      let _this = this
      this.$axios({
        url:"/api/searchMybook",
        method:"post",
        data:{params:{
            userName:userName,
          }},
        headers:{'Authorization':_this.$cookie.get("token")}
      }).then(function (resp) {
        if (resp.status === 200) {
          if (resp.data.rtnCode !== '0') {
            console.log(resp)
          } else {
            let books = resp.data.obj
            console.log(books)
            // _this.$router.push({
            //   name: 'Mybook',
            //   params: {
            //     'records': books
            //   }
            // })
            $('#userOrBook').bootstrapTable('destroy');
            $('#userOrBook').bootstrapTable({
              data:books.records ,  //表格数据
              columns: [
                {
                  field:'bookId',
                  title:'书籍编号'
                },
                {
                  field:'bookName',
                  title:'书籍名称'
                },

                {
                  field:'bookWriter',
                  title:'书籍作者'
                },
                {
                  field:'bookPublisher',
                  title:'出版商'
                },
                {
                  field:'classify',
                  title:'书籍归类'
                },
                {
                  field:'bookExpire',
                  title:'是否逾期',
                  formatter:function(value, row, index){
                    if (value === "0")
                      return "未逾期"
                    else
                      return "已逾期"
                  }
                },

              ] //表格列数据
            })
            $("#Admin .fixed-table-loading ").remove()

          }
        } else {
          console.log('not  200 了')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
