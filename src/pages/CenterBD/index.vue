<template>
  <div class="centerBD">
    <!-- 自我介绍video -->
    <section class="displayArea">
        <RotationChart style="z-index:100"/>
        <OrderOC class="orderOC"/>
    </section>
    <!-- 左侧侧边栏 -->
    <AsideLeft class="asideLeft" />
  </div>
</template>

<script>
    import OrderOC from "./OrderOC"
    import RotationChart from "./RotationChart"
    import AsideLeft from "./AsideLeft"
    import ProfilePicture from "@/components/ProfilePicture"
    export default {
        name:"CenterBD",
        components:{
            OrderOC,
            RotationChart,
            AsideLeft,
            ProfilePicture
        },
        mounted(){
        }
    }
</script>

<style scoped lang="css">
    .centerBD{
        position: relative;
        width: 100vw;
        height:100vh;
        /* max-height:75vh; */
        background-color: white;
        display: flex;
        margin-top:0px;
        /* mask-image:linear-gradient(transparent 0px, black 5px); */
    }
    .displayArea{
        position: absolute;
        left:50%;
        margin-top:10px;
        transform:translateX(-50%);
        width: 400px;
        height:400px;
        /* background-color: #aaa; */
        /* border: 1px solid #000; */
        text-align:center;
    }
    .displayArea .rotationChart{
        margin-top:20px;
    }
    .orderOC{
        margin-top:15px;
    }
    .asideLeft{
        position: absolute;
        left:50px;
        top:40px;
        width: 20vw;
        height: 350px;
        overflow: hidden;
        background:radial-gradient(circle at 70% 80%,white 10px,transparent 40px);
        box-shadow: inset -5px -5px 5px black;
        padding-top:15px;
        font-size:16px;
    }

    .profilePicture{
        position: absolute;
        right:50px;
        top:50px;
    }
    
</style>