<template>
  <div class="centerBD">
    <!-- 自我介绍video -->
    <section class="displayArea">
        <RotationChart />
        <OrderOC class="orderOC"/>
    </section>
    <!-- 左侧侧边栏 -->
    <AsideLeft class="asideLeft" />
    <!-- 头像  -->
    <!-- <ProfilePicture class="profilePicture" /> -->
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
        height: 560px;
        max-height:70vh;
        background-color: #3e4720;
        display: flex;
        margin-top:30px;
    }
    .displayArea{
        position: absolute;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
        width: 34%;
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
    
    /* .asideLeft::before{
        content:"";
        background:repeating-linear-gradient(transparent 0px, transparent 3px, rgba(255, 255, 255, 0.197) 3px, rgba(255, 255, 255, 0.197) 10px );
        position: absolute;
        right:0px;
        top:3%;
        width: 2px;
        height: 97.4%;
    }
    .asideLeft::after{
        content:"";
        background: repeating-linear-gradient(90deg,transparent 0px, transparent 3px, rgba(255, 255, 255, 0.197) 3px, rgba(255, 255, 255, 0.197) 10px );
        position: absolute;
        bottom:0px;
        width: 100%;
        height: 2px;
    } */
</style>