<template>
  <div id="lxd_paipai">
    <Nav ref="nav"/>
    <!-- 中间展示部分 -->
    <router-view name="center" class="indexCenter"></router-view>  
    <MouseMoveAnimation class="mouseMoveAnimation" />
    <canvas class="canvasIndex"></canvas>
    <span class="profilePictureLine"></span>
    <ProfilePicture class="profilePicture" ref="profilePicture" title="回到主页" @click.native="$router.push({name:'center'}).catch(duplicatedRouteCallbackFn)"/>
  </div>
</template>

<script>
import Nav from "@/components/Nav"
import MouseMoveAnimation from '@/components/MouseMoveAnimation'
import ProfilePicture from "@/components/ProfilePicture"
export default {
  name: 'Lxd_ΠΠ_Website',
  components: {
    Nav,
    MouseMoveAnimation,
    ProfilePicture
  },
  data(){
    return{
      openOrClose:1
    }
  },
  mounted(){
    let canvas = document.querySelector('.canvasIndex')
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
      radial.addColorStop(0,'rgba(255,255,255,0.3)')
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
  watch:{
    $route:{
        handler(newValue){
            this.$nextTick(()=>{
              if(newValue.name === 'center'){
                document.querySelector('.mouseMoveAnimation').style.display = "block"
              }else{
                document.querySelector('.mouseMoveAnimation').style.display = "none"
              }
            })

        },
        immediate:true
    }
  }
}
</script>

<style>
  html{
    scroll-behavior: smooth;
  }
  *{
    padding:0;
    margin:0;
    box-sizing: border-box;
  }
  ul{
    list-style:none;
  }
  #lxd_paipai{
    width: 100vw;
    height: 100vh;
    background-color: #000000;
    display: flex;
    flex-direction:column;
  }
  .canvasIndex{
    position: fixed;
    left:0;
    top:0;
    width: 100vw;
    height:100vh;
    background-color: #ffffff18;
    z-index:9999;
    pointer-events: none;
  }
  .indexCenter{
    z-index:9998;
  }
  .mouseMoveAnimation{
    height: 100px;
    width: 100%;
    color:white;
    position: absolute;
    bottom:0;
    overflow: hidden;
    z-index:10000;
    /* background-color: pink; */
  }
  .profilePictureLine{
    position: fixed;
    display: block;
    right:129px;
    width: 2px;
    height: calc(60vh + 70px);
    background-color: rgb(242,192,86);
    z-index: 99999;
    transition:all 1s;
  }
  .profilePicture{
      position:fixed;
      right:100px;
      top:60vh;
      --w:40px;
      z-index:100000;
      animation:ppAct .5s 2 linear;
  }    
  @keyframes ppAct {
      0%{
          clip-path:ellipse(50% 40% at 50% 75%)
      }
      50%{
          clip-path:ellipse(50% 10% at 50% 75%)
      }
      100%{
          clip-path:ellipse(50% 40% at 50% 75%)
      }
      
  }
  .profilePicture:hover{
      transform:scale(1.2)
  }
</style>
