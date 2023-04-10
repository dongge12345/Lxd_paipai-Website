<template>
  <div class="timeCard">
    <h2 class='timeCardTitle'>
        {{year}}年{{year === 2017 ? '那年盛夏' : ( year === 2018 ? '步入大二' : '来到大三这年')}}
    </h2>
    <div class="pictureWall" ref="pictureWall">
        <img v-for="picture of picturesUrl" :src="require('@/assets/' + picture.pictureUrl)" :key="picture.id" alt="">
    </div>
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
            this.renewWall()
            window.addEventListener('resize',()=>{
                this.renewWall()
            })
        },
        updated(){
            this.$nextTick(()=>{
                setTimeout(()=>{
                    this.renewWall()
                },50)
            })
        },
        methods:{
            renderPic(src){
                let img = require('@/assets/' + src)
                return img
            },
            renewWall(){
                let imgs = [...this.$refs['pictureWall'].children]
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
                        // console.log('picW',picW)
                        // // imgs[i].style.width = picW + "px"
                        
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
</style>