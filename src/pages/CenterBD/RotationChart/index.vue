<template>
  <div class="rotationChart" ref="rotationChart">
    <div class="imgs" ref="imgs">
      <img src="@/assets/images/shendaxingongloubangwanmeitu_jinglinbeiying.jpg" class="dpImg" alt />
      <img src="@/assets/images/jiaoxuelouerlouhuanghunchangyi.jpg" class="dpImg" alt />
      <img src="@/assets/images/dayihaiancheng.jpg" class="dpImg" alt />
      <img src="@/assets/images/zhaiquxingbakedianqianpaiwenkeloucaopingfangxiang.jpg" class="dpImg" alt />
      <img src="@/assets/images/shendaxingongloubangwanmeitu_jinglinbeiying.jpg" class="dpImg" alt />
      <img src="@/assets/images/jiaoxuelouerlouhuanghunchangyi.jpg" class="dpImg" alt />
    </div>
  </div>
</template>

<script>
    export default {
        name: "RotationChart",
        data(){
            return {
                timer:undefined
            }
        },
        mounted(){
            let width = this.$refs.rotationChart.offsetWidth
            let x = 0
            let imgIndex = 0
            this.timer = setInterval(()=>{
                imgIndex += 1
                x = width * imgIndex 
                // console.log('this.$refs',this.$refs.imgs)
                this.$refs.imgs.style.transform = `translateX(-${x}px)`

                if(x === 5 * width){
                    setTimeout(()=>{
                        imgIndex = 1
                        x = width
                        this.$refs.imgs.style.transition = "none"
                        this.$refs.imgs.style.transform = `translateX(-${x}px)`
                        setTimeout(()=>{
                            this.$refs.imgs.style.transition = "all .6s linear"
                        },100)
                    },700)
                }
            },3000)
            window.addEventListener('resize',()=>{
                if(this.$refs.rotationChart){
                    width = this.$refs.rotationChart.offsetWidth
                }
            })
        },
        beforeDestroy(){
            clearInterval(this.timer)
        }
    };
</script>

<style scoped lang="css">
    .rotationChart{
        position: relative;
        width:100%;
        height:80%;
        border-radius: 30px 100px 30px 100px;
        box-shadow: -5px 5px 10px black,4px -1px 4px rgba(255, 255, 255, 0.65);
        overflow:hidden;
    }
    .rotationChart .imgs{
        /* position: absolute; */
        width:100%;
        height: 100%;
        display: flex;
        transition:all 1s linear;
        z-index:2;
    }
    .imgs .dpImg{
        width: 100%;
        height: 100%;
        z-index:2;
    }
</style>