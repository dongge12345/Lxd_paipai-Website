<template>
    <div class="dailyStudy">
        <!-- 是否听歌 -->
        <span class="relax" @click="inquireIfTired">学累了吗？</span>
        <MusicRelax class="musicRelax" title="♪(´▽｀)" @click.native="musicPlay" ref="musicRelax"/>                                    
    </div>
</template>

<script>
    import MusicRelax from '@/components/Nav/MusicRelax'
    export default {
        name:'Daily',
        data(){
            return{
                musicTimer:undefined
            }
        },
        components:{
            MusicRelax
        },
        methods:{
            inquireIfTired(){
                if(confirm('是否听首歌呢？')){
                    if(this.musicTimer){
                        clearInterval(this.musicTimer)
                        this.musicTimer = undefined
                    }
                    document.querySelector('.musicRelax').style.display = "block"
                    let lst = []
                    this.musicTimer = setInterval(()=>{
                        let map = {
                            0:"听歌中",
                            1:"听歌中.",
                            2:"听歌中..",
                            3:"听歌中..."
                        }
                        // console.log('map.hasOwnProperty(lst.length)',map.hasOwnProperty(lst.length))
                        if(map.hasOwnProperty(lst.length)){
                            document.querySelector('.relax').innerHTML = map[lst.length]
                            if(lst.length < 3){
                                lst.push('.')
                            }else{
                                lst = []
                            }
                        }
                    },1000)
                }
            }
        },
        beforeDestroy(){
            if(this.musicTimer){
                clearInterval(this.musicTimer)
            }
        }
    }
</script>

<style scoped lang="css">
    .dailyStudy{
        height: 100%;
        background-color: #fff;
    }
    .musicRelax{
        display: none;
        position: absolute;
        right:30px;
        transform:scale(0.2);
        cursor:pointer;
    }
    .relax{
        position: absolute;
        display: block;
        width: 100px;
        right:0px;
        top:70px;
    }
</style>