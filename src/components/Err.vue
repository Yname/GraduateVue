<template>
    <div class="#err">
        <div >
            <span class="text-danger">{{Msg}}</span>
        </div>
    </div>
</template>

<script>
export default{
    name:'Err',
    data(){
        return{
            Msg:this.$cookie.get("rtn")
        }
    }
}
</script>