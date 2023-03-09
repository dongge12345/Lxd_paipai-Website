<template>
  <div id="lxd_paipai">
    <Nav />
    <CenterBD class="centerBD" />
    <canvas class="canvas"></canvas>
  </div>
</template>

<script>
import Nav from "@/components/Nav"
import CenterBD from "@/components/CenterBD"
export default {
  name: 'Lxd_ΠΠ_Website',
  components: {
    Nav,
    CenterBD,
  },
  data(){
    return{
      openOrClose:1
    }
  },
  mounted(){
    let canvas = document.querySelector('.canvas')
    let ct = canvas.getContext('2d')
    let p = {
      x:0,
      y:0,
      r:50
    }

    function render(e){
      canvas.width = document.documentElement.clientWidth
      canvas.height = document.documentElement.clientHeight
      ct.beginPath()
      ct.clearRect(0,0,canvas.width,canvas.height)
      var radial = ct.createRadialGradient(p.x,p.y,p.r*0.7,p.x,p.y,p.r*2)
      radial.addColorStop(0,'rgba(255,255,255,0)')
      radial.addColorStop(1,'rgba(0,0,0,0.75)')
      ct.fillStyle = radial
      ct.fillRect(0,0,canvas.width,canvas.height)
    }
    let that = {}
    that.openOrClose = 0
    document.onmousemove = function(e){
      if(that.openOrClose){
        p.x = e.clientX
        p.y = e.clientY
        render(e)
      }else{
        canvas.width = document.documentElement.clientWidth
        canvas.height = document.documentElement.clientHeight
        ct.beginPath()
        ct.clearRect(0,0,canvas.width,canvas.height)
      }
    }
    this.$bus.$on("openOrClose",function(){
      that.openOrClose = that.openOrClose === 1 ? 0 : 1
    })
  },

}
</script>

<style scoped lang="css">
  #lxd_paipai{
    width: 100vw;
    height: 100vh;
    background-color: #000000;
  }
  .centerBD{
    margin-top:40px
  }
  .canvas{
    position: fixed;
    left:0;
    top:0;
    width: 100vw;
    height:100vh;
    background-color: #ffffff18;
    z-index:9999;
    pointer-events: none;
  }
</style>
