<template>
  <div class="gamesPage">
    <div class="gamesCardContianer">
      <div class="gamesSelectWall" ref="wall" :style="{'opacity':wallOpacity}">
        <img @click="renewGame" v-for="(game,index) in gamesRoute" :key="index" :data-routename="game" :src="require(`@/assets/images/gamesWall/${gamePictures[index]}`)" alt="">
      </div>
      <div class="gameCardLoading"></div>
    </div>
    <div class="playArea">
      <router-view name="playArea"></router-view>
    </div>
  </div>
</template>

<script>
export default {
    name:'Games',
    data(){
      return{
        wallOpacity:0,
        gamesRoute:['cardGame','game2','game3','game4','game5','game2','game3','game4','game5','otherGames'],
        gamePictures:['cardGame.png','game2.png','game3.png','game4.png','game5.png','game2.png','game3.png','game4.png','game5.png','others.png']
      }
    },
    methods:{
      renewGame(e){
        if(e.target.nodeName==="IMG"){
          let routeName = e.target.dataset.routename
          this.$router.push({name:routeName}).catch(this.duplicatedRouteCallbackFn)
        }
      },
      renewWall(){
        this.wallOpacity = 0
        document.querySelector('.gameCardLoading').style.display = "block"
        let imgs = [...document.querySelector('.gamesSelectWall').children]
        for(let i in imgs){
          if(!imgs[i].complete){
            let timer = setTimeout(()=>{
              this.renewWall()
              clearTimeout(timer)
            },100)
            return
          }
        }
        let wall = this.$refs['wall']
        if(wall){
          let wallW = wall.offsetWidth
          let picW  = 60
          let columnNum = Math.floor(wallW / picW)
          let crackW = wallW % picW / (columnNum + 1)
          let crackH = 10
          let columnH = Array(columnNum).fill(0)
          for(let i = 0;i < imgs.length;i++){
            imgs[i].style.width = picW + "px"
            
            let min = columnH.reduce((pre,now,index)=>{
              if(pre[0] > now){
                pre = [now,index]
              }
              return pre
            },[columnH[0],0])
            
            imgs[i].style.left = crackW * (min[1]+1) + picW * min[1] + "px"
            imgs[i].style.top = columnH[min[1]] + crackH + "px"
            columnH[min[1]] += crackH + imgs[i].offsetHeight
          }
          wall.style.height = columnH.reduce((pre,now,index)=>{
            if(pre[0] < now){
              pre = [now,index]
            }
            return pre
          },[columnH[0],0])[0] + crackH + "px"
        }
        this.wallOpacity = 1
        document.querySelector('.gameCardLoading').style.display = "none"
        
      }
    },
    mounted(){
      window.addEventListener('resize',()=>{
        this.renewWall()
      })
      this.renewWall()

      // 调用utils工具函数中的loading创建一个loading效果
      let containerDom = document.querySelector('.gameCardLoading')
      this.waitingLoading(containerDom,1,0.8)
    },
}
</script>

<style scoped lang="css">
  .gameCardLoading{
    display: none;
    position: absolute;
    width: 100%;
    height: 100%;
    top:0;
    left:0;
  }
  .gamesPage{
    padding:30px;
    background:linear-gradient(#134,#895,#fea);
    height: 100%;
    display: flex;
  }
  .gamesCardContianer{
    position: relative;
    width: 20%;
    min-width:200px;
  }
  .gamesSelectWall{
    background: linear-gradient(#790ce7,#0d021d);
    width: 100%;
    color:rgba(0, 255, 85, 0.769);
    font-family: 'Courier New', Courier, monospace;
    padding-top:10px;
    position: relative;
  }
  .gamesSelectWall img{
    position: absolute;
    /* width: 40px; */
  }
  /* .gamesSelectWall ul li:hover{
    color:rgba(237, 202, 1, 0.769);
  }
  .gamesSelectWall ul li:active{
    color:white
  } */

  .playArea{
    background-color: #aaaaaa6d;
    width: 70%;
    /* min-width: 1000px; */
    height: 90%;
    min-height: 250px;
    float:left;
    border-radius: 10px;
    margin-left:100px;
    box-shadow: 10px 10px 10px rgb(209, 9, 152);
    overflow: hidden;
  }
</style>