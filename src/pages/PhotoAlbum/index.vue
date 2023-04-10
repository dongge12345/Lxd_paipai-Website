<template>
    <div class="photoAlbum">
        <!-- <video src="@/assets/video/photoAlbumBgi2.mp4" class="bgi" autoplay loop @click="bgiClick"></video> -->
        <div class="content">
            <h1>派派的相册</h1>
            <transition name="timeCard">
                <TimeCard v-show="toY" :year="toY"/>
            </transition>
            <p class="linkP"><b @click="toYearFn(2017)">2017年</b>夏天初入校园，对啥都好奇，什么都想尝试，篮球队、社团、恋爱，结果到头来好像啥也没做好。<b @click="toYearFn(2018)">2018年</b>，家教、勤工俭学、熬夜游戏，学业完成并不好，选择减少，但追根究底还是时间观念问题导致事事焦虑事事马虎。<b @click="toYearFn(2019)">2019年</b>赶上疫情，在家上网课，继续游戏继续荒废。<input type="date" ref="date" class="date" @change="dateChange"></p>
            <h3 class="dateShow">date to {{selectTime}}</h3>
            <!-- time card -->
        </div>
    </div>
</template>

<script>
    import TimeCard from '@/components/TimeCard'
    export default {
        name:'PhotoAlbum',
        components:{
            TimeCard
        },
        data(){
            return {
                selectTime:'待选',
                toY:undefined
            }
        },
        methods:{
            bgiClick(){
                console.log('永不触发的函数')
            },
            dateChange(){
                this.selectTime = this.$refs['date'].value.replace(/(.*)-(.*)-(.*)/,'$1年$2月$3日')
            },
            toYearFn(value){
                this.toY =   this.toY === value ? undefined : value
            },
        },
        mounted(){
            let date = new Date()
            let today = [date.getFullYear(),date.getMonth().length === 2 ? date.getMonth() : "0"+date.getMonth(),date.getDate().length === 2 ? date.getDate() : "0"+date.getDate()].join("-")
            this.$refs['date'].value = today
            this.dateChange()
        }
    }
</script>

<style scoped lang="css">
    .timeCard-enter,.timeCard-leave-to{
        top:-100%;
    }
    .timeCard-enter-active,.timeCard-leave-active{
        transition:top 1s;
    }
    .photoAlbum{
        width: 100%;
        height: 100%;
        /* background-color: pink; */
        position: relative;
        overflow:hidden;
        background-image:url(@/assets/images/photoAlbum/bgi3.jpg);
        background-repeat: no-repeat;
        background-size:100%;
        background-position: 0 40%;
    }
    .photoAlbum .content h1{
        padding:10px 0;
        position: absolute;
        text-align:center;
        left:30px;
        top:50%;
        transform:translateY(-100%);
        width: 40px;
        /* color:rgba(153, 43, 243, 0.345); */
        color:transparent;
        background: linear-gradient(60deg, rgba(101, 96, 3, 0.74) 30px, rgb(9, 119, 4) 60px,rgb(1, 111, 135));
        background-clip: text;
        box-shadow:inset 3px 3px 6px rgb(255, 254, 254),
        5px 5px 5px black,
        -2px -2px 4px rgb(178, 178, 178);
    }
    .linkP{
        position: absolute;
        width: 300px;
        border: 1px solid #00000058;
        padding:10px;
        backdrop-filter: blur(5px);
        bottom:100px;
        right:100px;
        border-radius: 10%;
    }

    .linkP b{
        cursor:pointer;
    }

    .date{
        background:cornflowerblue;
        border: none;
        width: 16px;
        float:right;
        border-radius: 50%;
        text-align: center;
    }
    .date:focus{
        border: none;
        outline:none
    }
    .dateShow{
        color:rgb(194, 194, 194);
        position: absolute;
        bottom:50px;
        right:80px;
    }
    .bgi{
        position: absolute;
        width: 100%;
        left:50%;
        top:50%;
        transform:translate(-50%,-40%);
    }
    .content{
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 192, 203, 0);
    }
</style>