<template>
  <div>
    <ul>
      <li style="--h:40px;--y:0px;--color:rgba(255, 0, 0, 0.739)"></li>
      <li style="--h:90px;--y:-30px;--color:rgba(0, 255, 255, 0.417)"></li>
      <li style="--h:120px;--y:-40px;--color:rgba(255, 127, 80, 0.571)"></li>
      <li style="--h:120px;--y:-30px;--color:rgba(255, 217, 0, 0.553)"></li>
      <li style="--h:120px;--y:-20px;--color:rgba(255, 105, 180, 0.509)"></li>
      <li style="--h:120px;--y:-30px;--color:rgba(255, 217, 0, 0.553)"></li>
      <li style="--h:120px;--y:-40px;--color:rgba(255, 127, 80, 0.571)"></li>
      <li style="--h:90px;--y:-30px;--color:rgba(0, 255, 255, 0.417)"></li>
      <li style="--h:40px;--y:0px;--color:rgba(255, 0, 0, 0.739)"></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MusicRelax"
};
</script>

<style scoped lang="css">
* {
  margin: 0;
  padding: 0;
}
body {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: repeating-radial-gradient(
    #777777bd 0px,
    #777777bd 130px,
    #4444448a 160px,
    rgba(112, 126, 155, 0.674) 190px,
    rgba(71, 126, 129, 0.628) 220px
  );
}
ul {
  width: 200px;
  height: 100px;
  list-style: none;
  display: flex;
  justify-content: space-evenly;
}
ul > li {
  width: 14px;
  height: 60px;
  background-color: #d1d0d0;
  /* margin:5px; */
  border-radius: 7px;
  /* transition:all 1s linear; */
  animation: act 1s infinite linear;
}
@keyframes act {
  0% {
    height: 14px;
    transform: translateY(0);
    background-color: #d1d0d0;
  }
  50% {
    height: var(--h);
    transform: translateY(var(--y));
    background-color: var(--color);
  }
  100% {
    height: var(14px);
    transform: translateY(0);
    background-color: #d1d0d0;
  }
}
</style>