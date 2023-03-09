<template>
  <div class="rotationChart" ref="rotationChart">
    <div class="imgs" ref="imgs">
      <img src="@/assets/images/深大信工楼傍晚美图_竞霖背影.jpg" class="dpImg" alt />
      <img src="@/assets/images/教学楼二楼黄昏长椅.jpg" class="dpImg" alt />
      <img src="@/assets/images/大一海岸城.jpg" class="dpImg" alt />
      <img src="@/assets/images/斋区星巴克店前拍文科楼草坪方向.jpg" class="dpImg" alt />
      <img src="@/assets/images/深大信工楼傍晚美图_竞霖背影.jpg" class="dpImg" alt />
      <img src="@/assets/images/教学楼二楼黄昏长椅.jpg" class="dpImg" alt />
    </div>
  </div>
</template>

<script>
    export default {
        name: "RotationChart",
        mounted(){
            console.log("执行")
            let width = this.$refs.rotationChart.offsetWidth
            let x = 0
            let imgIndex = 0
            let timer = undefined
            timer = setInterval(()=>{
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
                width = this.$refs.rotationChart.offsetWidth
            })
        }
    };
</script>

<style scoped lang="css">
    .rotationChart{
        position: relative;
        width:100%;
        height:80%;
        border-radius: 30px 100px 30px 100px;
        box-shadow: -5px 5px 10px black,4px -1px 4px rgba(183, 124, 5, 0.65);
        overflow:hidden;
    }
    .rotationChart .imgs{
        position: absolute;
        width:100%;
        height: 100%;
        display: flex;
        transition:all 1s linear;
    }
    .imgs .dpImg{
        width: 100%;
    }
</style>