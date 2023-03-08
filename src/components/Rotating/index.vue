<template>
  <div>
    <div class="square">
      <div class="former surface">former</div>
      <div class="back surface">back</div>
      <div class="left surface">left</div>
      <div class="right surface">right</div>
      <div class="top surface">top</div>
      <div class="bottom surface">bottom</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Rotating"
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
}
.former {
  background-color: red;
  transform: translateZ(50px);
}
.back {
  background-color: orange;
  transform: translateZ(-50px) rotateY(180deg);
}
.left {
  background-color: yellow;
  transform: translateX(-50px) rotateY(-90deg);
}
.right {
  background-color: green;
  transform: translateX(50px) rotateY(90deg);
}
.top {
  background-color: indigo;
  transform: translateY(-50px) rotateX(90deg);
}
.bottom {
  background-color: purple;
  transform: translateY(50px) rotateX(-90deg);
}
</style>