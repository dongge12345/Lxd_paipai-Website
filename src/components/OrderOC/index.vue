<template>
  <div class="order">
    <input type="checkbox" class="checkbox" />
    <div class="lineContainer">
      <div class="line line1"></div>
      <div class="line line2"></div>
    </div>
    <div class="fiveMsg">
      <a>点赞</a>
      <a>关注</a>
      <a>收藏</a>
      <a>转发</a>
      <a>投币</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderOC"
};
</script>

<style scoped lang="css">
* {
  padding: 0;
  margin: 0;
}

.order {
    display: inline-block;
  position: relative;
  /* width: 30px; */
  height: 30px;
  border-radius: 15px;
  background-color: #ffffff1a;
  overflow: hidden;
  transition: width 3s linear;
  /*  */
  /* width: 300px; */
}
.lineContainer {
  width: 30px;
  height: 30px;
  background-color: #ffffff15;
  border-radius: 50%;
  position: relative;
  /*  */
  float: left;
}
.fiveMsg {
  width: 0px;
  height: 100%;
  padding: 3px 3px 6px 3px;
  transition: all 3s;
  color:rgba(255, 255, 255, 0.45);
}
.fiveMsg a {
  display: inline-block;
  margin: 0 20px 20px 0;
}

.line {
  border-top: 1px solid #b0b0b044;
  width: 40%;
  position: absolute;
  left: 30%;
  --h: 30px;
  transition: top 0.5s ease-in-out 0.5s, bottom 0.5s ease-in-out 0.5s,
    border-color 0.5s ease-in-out 0.5s, transform 0.5s ease-in-out;
}
.line:first-child {
  top: 40%;
}
.line:last-child {
  top: 60%;
}

.checkbox {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 30px;
  opacity: 0;
  z-index: 999;
  cursor: pointer;
}
.checkbox:checked ~ .lineContainer .line {
  border-color: rgb(44, 0, 94);
  top: 50%;
  transition: top 0.5s ease-in-out, bottom 0.5s ease-in-out,
    border-color 0.5s ease-in-out, transform 0.5s ease-in-out 0.5s;
}
.checkbox:checked ~ .lineContainer .line:first-child {
  transform: rotate(45deg);
}
.checkbox:checked ~ .lineContainer .line:last-child {
  transform: rotate(-45deg);
}
.checkbox:checked ~ .fiveMsg {
  margin-left: 50px;
  width: 270px;
}
.checkbox:indeterminate ~ .fiveMsg {
  width: 0px;
  margin-left: 100px;
}
@keyframes line1Act {
  0% {
    transform: translate(-50%, calc(var(--h) * (-0.1)));
  }
  30% {
    transform: translate(-50%, 0);
  }
  100% {
    transform: translate(-50%, 0) rotate(45deg);
    border-color: pink;
  }
}
@keyframes line2Act {
  0% {
    transform: translate(-50%, calc(var(--h) * (0.1)));
  }
  30% {
    transform: translate(-50%, 0);
  }
  100% {
    transform: translate(-50%, 0) rotate(-45deg);
    border-color: pink;
  }
}
</style>