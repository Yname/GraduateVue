<template>
  <div id="Mybook">
    <div class="col-md-12" style="height: 650px">

      <div class="col-md-8 col-md-offset-2" style="border: #61abaa 1px solid;height: 100%;">
        <table id="table"></table>
<!--        {{this.records}}-->
<!--        <table class="table table-striped">-->
<!--          <thead>-->
<!--          <tr>-->
<!--            <th>书籍编号</th>-->
<!--            <th>书籍名称</th>-->
<!--            <th>书籍作者</th>-->
<!--            <th>出版商社</th>-->
<!--            <th>书籍类型</th>-->
<!--            <th>创建时间</th>-->
<!--            <th>借阅时间</th>-->
<!--            <th>是否超时</th>-->
<!--            <th>操作</th>-->
<!--          </tr>-->
<!--          </thead>-->
<!--        </table>-->

<!--          <div v-for="(infos) in this.records">-->
<!--            <div v-for="(info,index) in infos" style="display: inline-block;border: #61abaa 1px solid;height: 27px">-->
<!--               <div v-if="info !== ''" style="width: 135px;height: 27px"> {{info}}</div>-->
<!--            </div>-->
<!--          </div>-->

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mybook.vue',
  data(){
    return{
      records:'',
      // html:'<tr> <td>Tanmay</td> <td>Bangalore</td> </tr> <tr> <td>Sachin</td> <td>Mumbai</td> </tr>'
    }
  },
  methods:{
    start(){
      // let user = this.$cookie.get("user");
      // console.log(this.records.records)
      let _this = this


      this.$axios({
        url:"/api/searchMybook",
        method:"post",
        data:{params:{
            userName:_this.$cookie.get("user"),
          }},
        headers:{'Authorization':_this.$cookie.get("token")}

      }).then(function (resp) {

        if (resp.status === 200) {
          if (resp.data.rtnCode !== '0') {
            console.log(resp)
          } else {
            console.log(resp)
            let books = resp.data.obj.records
            console.log(books)

            // if (books.records === null || books.records === undefined || books.records === ""){
            //   alert("该用户暂未借阅图书")
            //   return
            // }

            $("#table").bootstrapTable('destroy');
            $("#table").bootstrapTable({
              data:books,
              columns: [
                {
                  field:'bookId',
                  title:'书籍编号'
                },
                {
                  field:'bookName',
                  title:'书籍名字'
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
                // {
                //   field:'borrowTime',
                //   title:'开始时间'
                // },
                {
                  field:'bookExpire',
                  title:'是否逾期',
                  formatter:function(value, row, index){
                    if (value === "1"){
                      return "已逾期"
                    }else
                      return "未逾期"
                  }
                },

                {
                  field:'',
                  title:'操作',
                  formatter:function(value, row, index){
                    let rows = _this.$qs.stringify(row)
                    //'"+rows+"'
                    return  "<a onclick=\"clickRemand( '"+rows+"' )\" href=\"#\">归还</a> ";
                  }
                },
              ],

            });
            $('#Mybook .fixed-table-loading').remove()
          }
        } else {
          console.log('not  200 了')
        }
      })


    },
    clickRemand(){

    },
  },
  beforeMount () {
    // this.records = this.$route.params.records
    // console.log(this.records )
    let _this = this
    window.clickRemand = _this.clickRemand
    _this.start()
  }
}
</script>

<style scoped>

</style>
