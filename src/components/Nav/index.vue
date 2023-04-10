<template>
  <div class="nav" ref="nav">
    <Rotating class="rotating" ref="rotating"/>
    <SameAsLoading  @click.native="openOrCloseLight" /> 
    <ActiveNavBox class="activeNavBox" ref="activeNavBox" />
    <MusicRelax class="musicRelax" title="♪(´▽｀)" @click.native="musicPlay" ref="musicRelax"/>
    <ProfilePicture class="profilePicture" ref="profilePicture"/>
  </div>
</template>

<script>
    import MusicRelax from '@/components/Nav/MusicRelax'
    import Rotating from '@/components/Nav/Rotating'
    import SameAsLoading from '@/components/Nav/SameAsLoading'
    import ActiveNavBox from "@/components/Nav/ActiveNavBox"
    import ProfilePicture from "@/components/ProfilePicture"
    export default {
        name:"Nav",
        components:{
            Rotating,
            SameAsLoading,
            ActiveNavBox,
            MusicRelax,
            ProfilePicture
        },
        methods:{
            musicPlay(){
                window.open("https://music.163.com/#/user/home?id=617260256")
            },
            openOrCloseLight(){
                this.$bus.$emit("openOrClose")
            },
            showAfterResize(){
                // 1200 1074 940 
                if(this.$refs['nav'].clientWidth < 940){
                    this.$refs['rotating'].$el.hidden = true
                    this.$refs['musicRelax'].$el.hidden = true
                    this.$refs['profilePicture'].$el.hidden = true
                }else if(this.$refs['nav'].clientWidth < 1074){
                    this.$refs['rotating'].$el.hidden = false
                    this.$refs['musicRelax'].$el.hidden = true
                    this.$refs['profilePicture'].$el.hidden = true
                }else if(this.$refs['nav'].clientWidth < 1200){
                    this.$refs['rotating'].$el.hidden = false
                    this.$refs['musicRelax'].$el.hidden = false
                    this.$refs['profilePicture'].$el.hidden = true
                }else{
                    this.$refs['rotating'].$el.hidden = false
                    this.$refs['musicRelax'].$el.hidden = false
                    this.$refs['profilePicture'].$el.hidden = false
                }
            }
        },
        mounted(){
            this.showAfterResize()
            window.addEventListener('resize',()=>{
                this.showAfterResize()
            })
        }
    }
</script>

<style scoped lang="css">
    .nav{
        position: relative;
        width: 100vw;
        height: 50px;
        background-color: rgba(74, 173, 162, 0.256);
        box-shadow: 2px 2px 4px white;
        border: 1px solid #000;
    }
    .rotating{
        position: absolute;
        right:-40px;
        top:-50px;
        transform:scale(0.4);
        z-index:100;
    }
    .orderOC{
        position: absolute;
        right:500px;
        bottom:0;
        transform:translateY(50%)
    }
    .activeNavBox{
        position: absolute;
        left:50%;
        top:-5px;
        transform:translateX(-50%) scale(0.5);
    }
    .musicRelax{
        position: absolute;
        right:50px;
        top:-20px;
        transform: scale(.2);
        cursor:pointer;
    }
    
    .profilePicture{
        position: absolute;
        right: 200px;
        top:-35px;
        --w:40px
    }
</style>