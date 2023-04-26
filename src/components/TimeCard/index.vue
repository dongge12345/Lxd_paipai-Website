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
                this.$refs['pictureWall'].style.opacity = 0
                document.querySelector('.loading').style.display = "block"
                this.renewWall()
            }
        },
        mounted(){
            // 这里其实可以不用的，主要是开发时修改完代码保存既不触发watch又不触发update导致图片墙布局错乱，看着烦。
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
                    // 此时可能图片墙divDom未挂载，为空
                    let timer = setTimeout(()=>{
                        this.renewWall()
                        clearTimeout(timer)
                    },100)
                    return
                }
                
                for(let i in imgs){
                    // 判断图片是否加载完成的关键代码
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
                    // 进入TimeCard后离开再重进，由于离开时没有销毁，此时照片墙div存在，会进入到最后的图片布局代码。此处判断，如果照片墙divDom元素的子元素数量为0，直接结束布局函数。
                    if(picW === 0){
                        return
                    }
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