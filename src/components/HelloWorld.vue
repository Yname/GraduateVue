<template>
  <div class="hello">
    <div class="col-md-12" style="height: 150px;">

      <div class="col-md-8 col-md-offset-2" style="border-bottom: #61abaa 2px solid;height: 140px;padding-left: 0;padding-right: 0;">

        <div class="col-md-2" style="height: 139px;font-size: 30px;text-align: center;">
          <div style="margin-top:25%;">图书网</div>
        </div>
        <div  class="col-md-8  peg" style="border-bottom: #61abaa 2px solid;height: 139px;">
          <div class="col-md-6 " style="margin-top: 4%;padding-right: 0;margin-left: 15%">
              <input v-model="searchMsg" class=" form-control col-md-8" style="height: 40px;" placeholder="搜索海量图书" >
          </div>
          <button v-on:click="searchBookMsg" class=" col-md-1 form-control btn-success " style="width:10%;margin-top:4%;height:40px;margin-left:0;">搜索</button>
        </div>
        <div class="col-md-2" style="height: 139px;font-size: 30px;text-align: center;">
          <div style="margin-top:25%;font-size: 14px;border: #61abaa 1px solid;color: #61abaa;height: 30px;width: 120px;cursor: pointer;padding-top: 5px;margin-left: 30px;">
            我的图书
          </div>
        </div>
      </div>


    </div>
    <div class="col-md-1 col-lg-offset-2" style="width: 10%;padding: 0 0 0 8px;">
      <div v-on:click="cartoonClick('cat')" class="col-md-12 glyphicon-book" style="background: antiquewhite;height: 45px;font-size: 18px;text-align: left;padding-top: 10px;padding-left:30px;border: aliceblue 1px solid;cursor:pointer" >儿童读物</div>
      <div v-on:click="cartoonClick('ltt')" class="col-md-12 glyphicon-book" style="background: antiquewhite;height: 45px;font-size: 18px;text-align: left;padding-top: 10px;padding-left:30px;border: aliceblue 1px solid;cursor:pointer" >文学读物</div>
      <div v-on:click="cartoonClick('sci')" class="col-md-12 glyphicon-book" style="background: antiquewhite;height: 45px;font-size: 18px;text-align: left;padding-top: 10px;padding-left:30px;border: aliceblue 1px solid;cursor:pointer" >科学读物</div>
      <div v-on:click="cartoonClick('nat')" class="col-md-12 glyphicon-book" style="background: antiquewhite;height: 45px;font-size: 18px;text-align: left;padding-top: 10px;padding-left:30px;border: aliceblue 1px solid;cursor:pointer" >自然读物</div>
      <div v-on:click="cartoonClick('acg')" class="col-md-12 glyphicon-book" style="background: antiquewhite;height: 45px;font-size: 18px;text-align: left;padding-top: 10px;padding-left:30px;border: aliceblue 1px solid;cursor:pointer" >动漫读物</div>
      <div v-on:click="cartoonClick('mli')" class="col-md-12 glyphicon-book" style="background: antiquewhite;height: 45px;font-size: 18px;text-align: left;padding-top: 10px;padding-left:30px;border: aliceblue 1px solid;cursor:pointer" >军事读物</div>
      <div v-on:click="cartoonClick('mde')" class="col-md-12 glyphicon-book" style="background: antiquewhite;height: 45px;font-size: 18px;text-align: left;padding-top: 10px;padding-left:30px;border: aliceblue 1px solid;cursor:pointer" >医学读物</div>
      <div v-on:click="cartoonClick('com')" class="col-md-12 glyphicon-book" style="background: antiquewhite;height: 45px;font-size: 18px;text-align: left;padding-top: 10px;padding-left:30px;border: aliceblue 1px solid;cursor:pointer" >计算机读物</div>
      <div v-on:click="cartoonClick('oth')" class="col-md-12 glyphicon-book" style="background: antiquewhite;height: 45px;font-size: 18px;text-align: left;padding-top: 10px;padding-left:30px;border: aliceblue 1px solid;cursor:pointer" >其他读物</div>
    </div>
    <div class="col-md-7" style="border: black 1px solid;display: block;height: 720px;">
        <div class="col-md-12" style="border: black 1px solid;height: 100%">
          <div class="col-md-3" style="border: 1px solid black; height: 30%; width: 25%;"></div>
          <div class="col-md-3 col-md-offset-1" style="border: 1px solid black; height: 30%; width: 25%;"></div>
          <div class="col-md-3 col-md-offset-1" style="border: 1px solid black; height: 30%; width: 25%;"></div>

          <div class="col-md-3" style="border: 1px solid black; height: 30%; width: 25%;margin-top:2%"></div>
          <div class="col-md-3 col-md-offset-1" style="border: 1px solid black; height: 30%; width: 25%;margin-top:2%"></div>
          <div class="col-md-3 col-md-offset-1" style="border: 1px solid black; height: 30%; width: 25%;margin-top:2%"></div>

          <div class="col-md-3" style="border: 1px solid black; height: 30%; width: 25%;margin-top:2%"></div>
          <div class="col-md-3 col-md-offset-1" style="border: 1px solid black; height: 30%; width: 25%;margin-top:2%"></div>
          <div class="col-md-3 col-md-offset-1" style="border: 1px solid black; height: 30%; width: 25%;margin-top:2%"></div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      searchMsg:'',
    }
  },
  methods:{
    searchBookMsg(){
      if (this.searchMsg === ''){
        return
      }
      let msg = this.searchMsg
      let _this = this
      this.$axios.get(
        '/api/searchBook',
        {
          params:{
            bookName:_this.searchMsg,
            page:1,
            total:10
          }
        }
      ).then(function (resp) {
        if (resp.status === 200) {
          _this.$cookie.set('rtn', resp.data.RtnMsg)
          if (resp.data.rtnCode === '0') {
            let data = resp.data.obj.records
            console.log(data)
            _this.$router.push({
              name: 'Succ',
              params:{
                rtnMsg:data
              }
            })
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
    cartoonClick(clazz){
      this.$router.push({
        name:"ClassList",
        params:{
          clazz:clazz,
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .peg{
    background-image: url("../assets/7.png");
  }
  .air{
    background-image: url("../assets/air_1.jpg");
  }
</style>
