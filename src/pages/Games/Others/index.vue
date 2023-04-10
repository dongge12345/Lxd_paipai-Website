<template>
  <div class="waitingTip">
    <h1>游戏库待补充...</h1>
    <canvas id="ew" ref="ew"></canvas>
  </div>
</template>

<script>
import QRCode from 'qrcode'
export default {
    name:'Others',
    mounted(){
      let ew = this.$refs['ew']
      QRCode.toCanvas(ew,"https://www.4399.com",function(err){
        if(err){
          alert('二维码生成失败')
        }
      })
    }
}
</script>

<style scoped lang="css">
    .waitingTip{
      width: 100%;
      height: 100%;
    }
    .waitingTip h1{
      margin-top:20px;
      text-align: center;
    }
    #ew{
      --w:200px;
      --h:200px;
      width:var(--w)!important;
      height: var(--h)!important;
      margin-top:40px;
      margin-left:calc(50% - var(--w) / 2)
    }
</style>