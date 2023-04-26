<template>
  <div class="nav" ref="nav">
    <Rotating class="rotating" ref="rotating"/>
    <SameAsLoading  @click.native="openOrCloseLight" /> 
    <ActiveNavBox class="activeNavBox" ref="activeNavBox" />
  </div>
</template>

<script>
    import Rotating from '@/components/Nav/Rotating'
    import SameAsLoading from '@/components/Nav/SameAsLoading'
    import ActiveNavBox from "@/components/Nav/ActiveNavBox"
    export default {
        name:"Nav",
        components:{
            Rotating,
            SameAsLoading,
            ActiveNavBox,
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
                }else{
                    this.$refs['rotating'].$el.hidden = false
                }
            },
        },
        mounted(){
            this.$bus.$on('askNavH',(value)=>{
                this.$bus.$emit('navResponseH',this.$refs['nav'].offsetHeight)
            })
            this.showAfterResize()
            window.addEventListener('resize',()=>{
                this.showAfterResize()
            })
        },
        watch:{
            $route:{
                handler(newValue){
                    this.$nextTick(()=>{
                        if(newValue.name === 'center'){
                            document.querySelector('.rotating').style.display = "block"
                        }else{
                            document.querySelector('.rotating').style.display = "none"
                        }
                    })

                },
                immediate:true
            }
        }
    }
</script>

<style scoped lang="css">
    .nav{
        position: relative;
        width: 100vw;
        height: 44px;
        background-color: #1E1E1E;
        /* box-shadow: 2px 2px 4px white; */
        /* border-bottom: 1px solid #000; */
    }
    .rotating{
        position: absolute;
        right:-40px;
        top:-50px;
        transform:scale(0.4);
        z-index:100000;
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
        top:-8px;
        transform:translateX(-50%) scale(0.5);
    }

</style>