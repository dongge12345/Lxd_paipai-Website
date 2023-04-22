<template>
  <div class="container">
    <img class="mouseMoveImg" src="@/assets/images/mouseMoveAnimation/cartoon character.png" alt="">
    <img class="mouseMoveImg" src="@/assets/images/mouseMoveAnimation/草堆.png" style="margin-left:-100px" alt="">
    <img class="mouseMoveImg" src="@/assets/images/mouseMoveAnimation/草地.png" style="margin-left:100px" alt="">
    <img class="mouseMoveImg" src="@/assets/images/mouseMoveAnimation/花朵小人.png" style="filter:blur(2px)" alt="">
    <img class="mouseMoveImg" src="@/assets/images/mouseMoveAnimation/花丛.png" style="filter:blur(0px)" alt="">
  </div>
</template>

<script>
export default {
    name:'MouseMoveAnimation',
    mounted(){
      let imgs = [...document.querySelectorAll('.mouseMoveImg')]
      let container = document.querySelector('.container')
      let oriX = undefined
      container.addEventListener('mouseenter',function(e){
        oriX = e.clientX
      })
      container.addEventListener('mousemove',function(e){
        let moveX = e.clientX - oriX
        for(let i in imgs){
          imgs[i].style.left = 0.002 * (i + 1) * moveX + 'px'
          if(i === '3'){
            imgs[i].style.filter = `blur(${2 - 0.009 * moveX}px)`
          }else if(i === '4'){
            imgs[i].style.filter = `blur(${0.009 * moveX}px)`
          }
        }
        
      })
      container.addEventListener('mouseleave',function(e){
        for(let i in imgs){
          imgs[i].style.transition = 'all 1s linear'
          imgs[i].style.left = '0px'
          imgs['3'].style.filter = 'blur(2px)'
          imgs['4'].style.filter = 'blur(0px)'
        }
        setTimeout(()=>{
          for(let i in imgs){
            imgs[i].style.transition = 'none'
          }
        },1000)
      })
    }
}
</script>

<style scoped lang="css">
  .container{
    position: absolute;
    background-image: url(@/assets/images/mouseMoveAnimation/bgi.png);
    /* background-size: cover; */
    mask-image:linear-gradient(transparent,black);
  }
  .container img{
    position: absolute;
    height: 100%;
  }
</style>