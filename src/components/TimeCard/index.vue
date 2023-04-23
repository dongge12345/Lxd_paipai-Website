<template>
  <div class="timeCard">
    <h2 class='timeCardTitle'>
        {{year}}年{{year === 2017 ? '那年盛夏' : ( year === 2018 ? '步入大二' : '来到大三这年')}}
    </h2>
    <div class="pictureWall" ref="pictureWall">
        <img v-for="picture of picturesUrl" :src="require('@/assets/' + picture.pictureUrl)" :key="picture.id" alt="">
    </div>
    <ul class="loading">
        <li style="--i:1">L</li>
        <li style="--i:2">O</li>
        <li style="--i:3">A</li>
        <li style="--i:4">D</li>
        <li style="--i:5">I</li>
        <li style="--i:6">N</li>
        <li style="--i:7">G</li>
        <li style="--i:9">.</li>
        <li style="--i:11">.</li>
        <li style="--i:13">.</li>
    </ul>
  </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name:"TimeCard",
        data(){
            return {
            }
        },
        computed:{
            ...mapState('photoAlbum',['picturesUrl'])
        },
        props:['year'],
        watch:{
            year(value){
                this.$store.dispatch('photoAlbum/getPictures',value)
            },
            
        },
        mounted(){
            this.$refs['pictureWall'].style.opacity = 0
            document.querySelector('.loading').style.display = "block"
            this.renewWall()
            window.addEventListener('resize',()=>{
                this.renewWall()
            })
        },
        updated(){
            document.querySelector('.loading').style.display = "block"
            this.$refs['pictureWall'].style.opacity = 0
            this.renewWall()
        },
        methods:{
            renderPic(src){
                let img = require('@/assets/' + src)
                return img
            },
            renewWall(){
                let imgs
                try{
                    imgs = [...this.$refs['pictureWall'].children]
                }catch(err){
                    let timer = setTimeout(()=>{
                        this.renewWall()
                        clearTimeout(timer)
                    },100)
                    return
                }
                for(let i in imgs){
                    if(!imgs[i].complete){
                        let timer = setTimeout(()=>{
                            this.renewWall()
                            clearTimeout(timer)
                        },100)
                        return
                    }
                }


                let wall = this.$refs['pictureWall']
                if(imgs.length){
                    let wallW = wall.offsetWidth
                    let picW  = 21
                    imgs[0].style.width = picW + "%"
                    picW = imgs[0].offsetWidth
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
                this.$refs['pictureWall'].style.opacity = 1
                document.querySelector('.loading').style.display = "none"

                    
            }

        },
    }
</script>

<style scoped lang="css">
    .timeCard{
        width:70%;
        /* height: 80%; */
        backdrop-filter: blur(2px);
        position: absolute;
        top:20px;
        left:50%;
        transform:translateX(-50%);
    }
    .timeCardTitle{
        text-align:center;
        font-family:cursive;
        margin-top:10px;
    }
    .pictureWall{
        position: relative;
    }
    .pictureWall img{
        position: absolute;
        width: 100px;
        border-radius: 10px;
    }
    ul.loading{
        position: absolute;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
        list-style:none;
    }
    ul.loading li{
        color:white;
        display: inline-block;
        animation:loadingMove 1s calc(var(--i)/10*1s - 4s) infinite linear;
        font-weight:700;
        margin-left:2px;
    }
    @keyframes loadingMove{
        0%{
            transform:translateY(-20%)
        }
        50%{
            transform:translateY(20%)
        }
        100%{
            transform:translateY(-20%)
        }
    }
</style>