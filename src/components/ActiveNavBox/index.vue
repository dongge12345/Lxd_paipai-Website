<template>
  <div>
    <ul>
      <li style="--i:1">
        <input type="text" class="input1" />
        <a href="#">相册</a>
      </li>
      <li>
        <input type="text" class="input2" />
        <a href="#">日志</a>
      </li>
      <li>
        <input type="text" class="input3" />
        <a href="#">作品链接</a>
      </li>
      <li>
        <input type="text" class="input4" />
        <a href="#">收藏</a>
      </li>
      <li>
        <input type="text" class="input5" />
        <a href="#">未来</a>
      </li>
      <li class="bgc"></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name:'ActiveNavBox'
  };
</script>

<style scoped lang="css">
        *{
            padding:0;
            margin:0;
            box-sizing: content-box;
        }
        body{
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        ul{
            position: relative;
            width: 1400px;
            height:60px;
            box-shadow:inset -4px -4px 4px rgb(103, 103, 103);
            border-radius:30px;
            list-style: none;
            font-size: 0;
            overflow: hidden;
        }
        li{
            position: relative;
            height: 100%;
            width: 20%;
            display: inline-block;
            font-size: 15px;
            border-radius: 30px;
            text-align: center;
        }

        li:has(.input1:focus)~.bgc{
            left:0;
        }
        li:has(.input2:focus)~.bgc{
            left:20%;
        }
        li:has(.input3:focus)~.bgc{
            left:40%;
        }
        li:has(.input4:focus)~.bgc{
            left:60%;
        }
        li:has(.input5:focus)~.bgc{
            left:80%;
        }
        
        li input{
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 30px;
            border: none;
            outline:none;
            left:0;
            background-color: transparent;
            z-index: 2;
            color:transparent;
            cursor:pointer;
        }
        li input:focus{
            z-index:1;
        }
        li input:focus~a{
            z-index:99;
            color:rgba(255, 254, 254, 0.603);
            transition:color .2s .2s linear,z-index .2s linear;
        }
        li a{
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            left:0;
            z-index:1;
            color:rgb(150, 150, 150);
            font-size: 30px;
            text-decoration: none;
            transition:color .2s .2s linear,z-index .2s .1s linear;
            /* mix-blend-mode: difference; */
        }
        .bgc{
            width: 20%;
            position: absolute;
            background:linear-gradient(70deg,rgb(10, 64, 57) 50%,rgb(173, 182, 119) 50%);
            mix-blend-mode: difference;
            z-index:-999;
            left:0;
            transition:left .3s .1s cubic-bezier(0.4,1.6,1,1);
        } 
</style>