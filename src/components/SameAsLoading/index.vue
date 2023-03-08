<template>
  <div>
    <ul>
      <li style="--i:1">L</li>
      <li style="--i:2">X</li>
      <li style="--i:3">D</li>
      <li style="--i:4">_</li>
      <li style="--i:5">P</li>
      <li style="--i:6">A</li>
      <li style="--i:7">I</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SameAsLoading"
};
</script>

<style scoped lang="css">
*{
  margin:0;
  padding:0;
}
ul {
  list-style: none;
  display: block;
  text-align:center;
  width: 100px;
  height:40px;
  padding-top:10px;
  /* background: linear-gradient(90deg,red 15%,orange 30%, yellow 45%, green 60%, blue 75%, purple 100%); */
  
  /* -webkit-background-clip:text;
  -webkit-text-fill-color:transparent; */
  /* color:transparent; */
}
li {
  display: inline-block;
  animation: move 2s calc(var(--i) / 10 * 1s - 1s) infinite linear;
  font-weight: 700;
  background:transparent;
  background: linear-gradient(90deg,red calc(100% - var(--i) * 100%),orange calc(200% - var(--i) * 100%), yellow calc(300% - var(--i) * 100%), green calc(400% - var(--i) * 100%), blue calc(500% - var(--i) * 100%), purple calc(600% - var(--i) * 100%)) no-repeat;
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}

@keyframes move {
  0% {
    transform: translateY(-50%);
    background-position:-100px;
  }
  50% {
    transform: translateY(50%);
    background-position-x: 0;
  }
  100% {
    transform: translateY(-50%);
    background-position-x:100px
  }
}
</style>