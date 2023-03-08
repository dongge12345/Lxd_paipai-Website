<template>
  <div class="centerBD">
    <!-- 自我介绍video -->
    <section class="displayArea">
        <!-- <video src="@/assets/video/大二广州聚会.mp4" class="dpVideo"></video> -->
        <img src="@/assets/images/教学楼二楼黄昏长椅.jpg" class="dpImg" alt="">
        <OrderOC class="orderOC"/>
    </section>
  </div>
</template>

<script>
    import OrderOC from "@/components/OrderOC"
    export default {
        name:"CenterBD",
        components:{
            OrderOC
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
        width: 40vw;
        height:100%;
        /* background-color: #aaa; */
        /* border: 1px solid #000; */
        text-align:center;
    }
    .displayArea .dpImg{
        height:80%;
        border-radius: 30px 100px 30px 100px;
        box-shadow: -5px 5px 10px black,4px -1px 4px rgba(183, 124, 5, 0.65);
    }
    
</style>