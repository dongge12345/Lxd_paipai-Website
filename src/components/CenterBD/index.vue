<template>
  <div class="centerBD">
    <!-- 自我介绍video -->
    <section class="displayArea">
        <RotationChart />
        <OrderOC class="orderOC"/>
    </section>
    <!-- 左侧侧边栏 -->
    <AsideLeft class="asideLeft" />
    <!--  -->
  </div>
</template>

<script>
    import OrderOC from "@/components/OrderOC"
    import RotationChart from "@/components/RotationChart"
    import AsideLeft from "@/components/AsideLeft"
    export default {
        name:"CenterBD",
        components:{
            OrderOC,
            RotationChart,
            AsideLeft,
        },
        mounted(){
        }
    }
</script>

<style scoped lang="css">
    .centerBD{
        position: relative;
        width: 100vw;
        height: 80vh;
        background-color: #3e4720;
    }
    .displayArea{
        position: absolute;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
        width: 600px;
        max-width: 40%;
        height:100%;
        /* background-color: #aaa; */
        /* border: 1px solid #000; */
        text-align:center;
    }
    .displayArea .rotationChart{
        margin-top:10px;
    }
    .orderOC{
        margin-top:5px;
    }
    .asideLeft{
        position: absolute;
        left:50px;
        top:40px;
        width: 20vw;
        height: 80%;
        background:radial-gradient(circle at 70% 80%,white 10px,transparent 40px);
        border-right: 2px dotted rgba(255, 255, 255, 0.197);
        border-bottom: 2px dotted rgba(255, 255, 255, 0.182);
        box-shadow: inset -5px -5px 5px black;
    }
</style>