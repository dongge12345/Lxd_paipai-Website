<template>
  <div>
    <div class="square" @click="enterGamePage">
      <div class="former surface">games</div>
      <div class="back surface">games</div>
      <div class="left surface">games</div>
      <div class="right surface">games</div>
      <div class="top surface">games</div>
      <div class="bottom surface">games</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Rotating",
  methods:{
    enterGamePage(){
      this.$store.dispatch('games/changeGamesShow')
      if(this.$store.state.games.gamesShow){
        this.$router.push({name:'games'})
      }else{
        this.$router.push({name:'center'})
      }
    }
  }
};
</script>

<style scoped lang="css">
* {
  margin: 0;
  padding: 0;
  color: white;
}

.square {
  width: 200px;
  height: 200px;
  position: relative;
  transition: all 10s;
  transform-style: preserve-3d;
  animation: squareRotate 2s 0s infinite linear;
}
@keyframes squareRotate {
  0% {
    transform: rotate3d(1, -1, -1, 0deg);
  }
  100% {
    transform: rotate3d(1, -1, -1, 360deg);
  }
}
.surface{
  width: 100px;
  height: 100px;
  position: absolute;
  color:transparent;
  opacity:0.5;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.former {
  color:rgba(139, 0, 0, 0.7);
  background-color: red;
  transform: translateZ(50px);
}
.back {
  color:rgba(107, 70, 0, 0.7);
  background-color: orange;
  transform: translateZ(-50px) rotateY(180deg);
}
.left {
  color:rgba(108, 108, 0, 0.7);
  background-color: yellow;
  transform: translateX(-50px) rotateY(-90deg);
}
.right {
  color:rgba(0, 45, 0, 0.7);
  background-color: green;
  transform: translateX(50px) rotateY(90deg);
}
.top {
  color:rgba(32, 0, 55, 0.7);
  background-color: indigo;
  transform: translateY(-50px) rotateX(90deg);
}
.bottom {
  color:rgba(46, 0, 46, 0.7);
  background-color: purple;
  transform: translateY(50px) rotateX(-90deg);
}
</style>