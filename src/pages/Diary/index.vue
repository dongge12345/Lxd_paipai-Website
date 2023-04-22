<template>
  <div class="diary">
  </div>
</template>

<script>
    export default {
        name:'Diary'
    }
</script>

<style scoped lang="css">
  .diary{
    width: 100%;
    height: 100%;
    background-image: url(@/assets/images/diary/bgi1.png);
    background-repeat: no-repeat;
    background-size:100%;
    background-position: 0 57%;
    animation:diaryEnterAct 1s linear;
    animation-fill-mode:forwards;
  }
  @keyframes diaryEnterAct {
    0%{
      clip-path:polygon(-110% 0,-10% 0,0% 50%,-10% 100%,-110% 100%)
    }
    100%{
      clip-path:polygon(0% 0,100% 0,110% 50%,100% 100%,0% 100%)
    }
    
  }
</style>