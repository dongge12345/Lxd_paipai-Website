<template>
  <div class="nav">
    <Rotating class="rotating" />
    <SameAsLoading /> 
    <ActiveNavBox class="activeNavBox" />
  </div>
</template>

<script>
    import Rotating from '@/components/Rotating'
    import SameAsLoading from '@/components/SameAsLoading'
    import OrderOC from "@/components/OrderOC"
    import ActiveNavBox from "@/components/ActiveNavBox"
    export default {
        name:"Nav",
        components:{
            Rotating,
            SameAsLoading,
            OrderOC,
            ActiveNavBox
        }
    }
</script>

<style scoped lang="css">
    .nav{
        position: relative;
        width: 100vw;
        height: 50px;
        background-color: rgba(74, 173, 162, 0.256);
        box-shadow: 2px 2px 4px white;
        border: 1px solid #000;
    }
    .rotating{
        position: absolute;
        right:0px;
        top:-50px;
        transform:scale(0.4)
    }
    .orderOC{
        position: absolute;
        right:500px;
        bottom:0;
        transform:translateY(50%)
    }
    .activeNavBox{
        position: absolute;
        left:50%;
        top:0px;
        transform:translateX(-50%) scale(0.6) ;
    }
</style>