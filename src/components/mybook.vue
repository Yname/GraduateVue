<template>
  <div id="#Mybook">
    <div class="col-md-12" style="height: 650px">

      <div class="col-md-8 col-md-offset-2" style="border: #61abaa 1px solid;height: 100%;">
        <table id="myBook">{{this.records}}</table>

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
      $("#myBook").bootstrapTable('destroy');
      $("#myBook").bootstrapTable({
        data:this.records,
        contentType: "application/json",
        dataType: "json",
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

        ],

      });


    }
  },beforeMount () {
    this.records = this.$route.params.records
    console.log(this.records )
    this.start()
  }
}
</script>

<style scoped>

</style>
