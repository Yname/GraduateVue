<template>
  <div id="#classList">

   <div class="col-md-12" style="height: 650px">
<!--     <div class="col-md-2" style="border: #61abaa 1px solid;height: 100%">-->

<!--     </div>-->
     <div class="col-md-8 col-md-offset-2" style="border: #61abaa 1px solid;height: 100%;">

        <table id="table"></table>

<!--         <tr style="background: cadetblue;height: 30px;">-->
<!--            <th style="width: 210px;margin-top: 20px" v-for="(item,index) in table">{{item}}</th>-->
<!--         </tr>-->

<!--       <table class="table">-->
<!--         <tr class="success" style="margin-bottom: 10px;font-size: 14px"  v-for="(item,index) in records">-->
<!--           <td style="width: 210px" v-text="item.bookName"></td>-->
<!--           <td style="width: 210px" v-text="item.bookWriter"></td>-->
<!--           <td style="width: 210px" v-text="item.bookPublisher"></td>-->
<!--           <td style="width: 210px" v-text="item.classify"></td>-->
<!--           <td style="width: 210px" v-text="item.bookPublisher"></td>-->
<!--           <td style="width: 210px" >操作</td>-->
<!--         </tr>-->
<!--       </table>-->



<!--    <childName></childName>-->


     </div>
   </div>
<!--    {{this.records}}-->
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
            // console.log(resp.data)
            _this.records = resp.data.obj.records
            $('#table').bootstrapTable({
              data:_this.records ,  //表格数据
              columns: [
                {
                  field:'bookName',
                  title:'书名'
                },
                {
                  field:'bookWriter',
                  title:'作者'
                },
                {
                  field:'bookWriter',
                  title:'作者'
                },
                {
                  field:'bookPublisher',
                  title:'出版商'
                },
                {
                  field:'classify',
                  title:'归类'
                },
                {
                  field:'bookWriter',
                  title:'剩余数量'
                },
                {
                  field:'',
                  title:'操作',
                  formatter:function(value, row, index){
                    let rows = _this.$qs.stringify(row)
                    //'"+rows+"'
                    return  "<a onclick=\"clickBorrow( '"+rows+"' )\" href=\"#\">借阅</a> <a onclick=\"clickDetails('"+rows+"')\" style=\"padding-right: 10px;\" href=\"#\">查看详情</a>";
                  }
                },
              ] //表格列数据

            })
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
    clickBorrow:function (val){
      let token = this.$cookie.get("token")
      if (token === null || token === undefined )
        alert("请登录！");
        return;

      let row = this.$qs.parse(val)

    },
    clickDetails(){

    }
  },
  beforeMount () {
    this.clazz = this.$route.params.clazz
    console.log(this.clazz)
    if (this.clazz !== ''){
      this.selectClazz(this.clazz)
    }

  },
  created () {
    let _this = this
    window.clickBorrow = _this.clickBorrow
    window.clickDetails = _this.clickDetails
  },
  comments:{
    childName: {
      template: '<a v-on:click="clickOne">查看</a>',
      data () {
        return {
          classObject: {
            active: true
          },
          myTab: {

          }

        }
      }
    },
  }
}
</script>

<style scoped>

</style>
