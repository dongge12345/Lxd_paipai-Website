<template>
  <div>
    <ul>
      <li style="--h:40px;--y:0px;--color:rgba(255, 80, 80)"></li>
      <li style="--h:90px;--y:-30px;--color:rgba(255, 60, 60)"></li>
      <li style="--h:120px;--y:-40px;--color:rgba(255, 40, 40)"></li>
      <li style="--h:120px;--y:-30px;--color:rgba(255, 20, 20)"></li>
      <li style="--h:120px;--y:-20px;--color:rgba(255, 0, 0)"></li>
      <li style="--h:120px;--y:-30px;--color:rgba(255, 20, 20)"></li>
      <li style="--h:120px;--y:-40px;--color:rgba(255, 40, 40)"></li>
      <li style="--h:90px;--y:-30px;--color:rgba(255, 60, 60)"></li>
      <li style="--h:40px;--y:0px;--color:rgba(255, 80, 80)"></li>
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
  color:rgb(255, 68, 68)
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
ul::before{
  position: absolute;
  width: 130%;
  height: 260%;
  top:-170%;
  content:'';
  display: block;
  /* background-color: red; */
  border-top:30px solid black;
  border-right:30px solid black;
  border-radius: 50% 50% 50% 0;
  transform:rotate(-45deg);
}
ul::after{
  content:'';
  width: 115%;
  height: 100%;
  top:-20%;
  /* background-color: red; */
  position: absolute;
  border-left: 40px solid black;
  border-right: 40px solid black;
}
ul > li {
  width: 14px;
  height: 60px;
  border-radius: 7px;
  animation: act 1s infinite cubic-bezier(0.175, 0.885, 0.32, 1.275);
  background-color: var(--color);
}
@keyframes act {
  0% {
    height: 14px;
    transform: translateY(0);
    /* background-color: #d1d0d0; */
  }
  50% {
    height: var(--h);
    transform: translateY(var(--y));
    /* background-color: var(--color); */
  }
  100% {
    height: var(14px);
    transform: translateY(0);
    /* background-color: #d1d0d0; */
  }
}
</style>