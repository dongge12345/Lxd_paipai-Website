<template>
    <div class="dailyStudy" ref="dailyStudy">
        <!-- 主体页面布局：仿CSDN页面布局 -->
        <div class="container" ref="container">
            <div class="aside" ref="aside">
                <div class="monthArticles">
                    <h4>近期文章</h4>
                    <ul>
                        <li v-for="item in recentArticles.slice(-6)">{{item}}</li>
                    </ul>
                </div>
                <div class="oneMonthArticles">
                    <h4>2022年11月撰写文章</h4>
                    <ul>
                        <li v-for="articleTitle,index in oneMonthArticles" @click="selectArticle" :key="index" :value="index+1" >{{articleTitle}}</li>
                    </ul>
                </div>
                <div class="articleChapter">
                    <h4>文章目录</h4>
                    <span class="articleTitle">{{articleMsg.title}}</span>
                    <ul>
                        <li v-for="chapter,index in articleMsg.chapters" ref="chapterAside" :value="index">{{chapter}}</li>
                    </ul>
                    <br><br>
                </div>
            </div>
            <div class="content" ref="content">
                <h4 class="title">{{articleMsg.title}}</h4>
                <!-- 作者、发布时间以及文章标签 -->
                <div class="articleIntroduction">
                    <span style="color:#777">{{articleMsg.author}}</span>
                    <img src="@/assets/images/dailyStudy/clock.png" style="width: 13px;margin-left:20px;transform:translateY(2px)" alt=""><span>已于{{articleMsg.releaseTime}}修改</span>
                    <br>
                    <!-- 标签--scale的计算。 -->
                    <div style="scale:0.5;transform:translateX(calc(100% / 0.5 * (1 - 0.5)  / 2 * -1))">
                        <span style="padding:0px 2px;float:left;margin-top:2px;">标签:</span>
                        <ul style="margin-left:2px;">
                            <li v-for="tab in articleMsg.tabs" style="display: inline-block;transform:translateY(-3px);padding:2px 6px;border: 2px solid #aaa;color:rgb(45, 161, 207);margin-left:20px;background-color: #fff;">{{tab}}</li>
                        </ul>
                    </div>
                </div>
                <!-- 章节 -->
                <div class="chapter">
                    <h6>文章目录</h6>
                    <ul class="chapterUl" ref="chapterUl">
                        <li v-for="chapter,index in articleMsg.chapters" :key="index" ref="chapterContent" :value="index">{{chapter}}</li>
                    </ul>
                </div>
                <!-- 文章主体 -->
                <div class="articleBody">
                    <section v-for="section,index in articleMsg.content" :key="index" class="section" ref="section">
                        <div v-for="part,partIndex in section" :key="partIndex" class="part">
                            <img :src="require('@/assets/' + part.value)" alt="" v-if="part.type === 'img'" :style="`width:${part.width}`" style="margin-bottom:5px" @load="imgLoaded" />
                            <p v-if="part.type === 'text'" style="margin-bottom:5px">{{part.value}}</p>
                        </div>
                    </section>
                </div>
            </div>
            <div class="advertisement">广告位</div>
        </div>

        <!-- 是否听歌 -->
        <span class="relax" @click="inquireIfTired">学累了吗？</span>
        <MusicRelax class="musicRelax" title="♪(´▽｀)" @click.native="musicPlay" ref="musicRelax"/>
        <!-- <audio src="@/assets/audio/beautifulEyes/01.ape"></audio> -->
    </div>
</template>

<script>
    import MusicRelax from '@/components/Nav/MusicRelax'
    import {mapState} from 'vuex'
    export default {
        name:'Daily',
        data(){
            return{
                musicTimer:undefined,
                recentArticles:[
                    '2022年9月',
                    '2022年10月',
                    '2022年11月',
                    '2022年12月',
                    '2023年1月',
                    '2023年2月',
                    '2023年3月',
                    '2023年4月',
                ],
                articleTest:{},
                lastchapterUIDom:undefined,
                oneMonthArticles:[
                    '图片瀑布流函数何时执行问题',
                    '圣杯布局的三种方式',
                    '按钮组件的封装',
                    '登陆注册业务的前后端代码',
                    'elementUI的使用'
                ],
            }
        },
        computed:{
            ...mapState('dailyStudy',['articleMsg'])
        },
        watch:{
            articleMsg(newValue){
                // 不是同一篇文章时修改高度、重新绑定点击事件和鼠标滚动事件
                this.lastchapterUIDom = document.querySelector('.chapterUl')
                this.$refs['chapterUl'].style.height = "auto"
                this.$nextTick(()=>{
                    let chapterUl = document.querySelector('.chapterUl')
                    // 有个问题，多次调用高度会越来越小,这里给chapterUI设置自定义属性，修改过高度后就将ifChangeH修改为true，后面再遇到就不修改了，当然在每次更改文章的时候需要将其重新设置为null
                    // if(this.$refs['chapterUl'].getAttribute('ifChangeH') === null){
                    this.$refs['chapterUl'].style.height = this.$refs['chapterUl'].offsetHeight * 0.7 + "px"
                    this.imgLoaded()
                    // 重新执行点击scroll事件
                    this.bindingScrollToEvent()
                    // 监听鼠标的滚动事件
                    this.bindingWindowScroll()
                })

            }
        },
        components:{
            MusicRelax
        },
        methods:{
            selectArticle(e){
                if(e.target.value !== this.articleMsg.id){
                    this.$store.dispatch('dailyStudy/getArticle',{yearMonth:'202304',articleNum:e.target.value})
                }
            },
            inquireIfTired(e){
                if(e.target.innerHTML === "学累了吗？"){
                    if(confirm('是否听首歌呢？')){
                        if(this.musicTimer){
                            clearInterval(this.musicTimer)
                            this.musicTimer = undefined
                        }
                        document.querySelector('.musicRelax').style.display = "block"
                        let lst = []
                        document.querySelector('.relax').innerHTML = "听歌中"
                        this.musicTimer = setInterval(()=>{
                            let map = {
                                0:"听歌中",
                                1:"听歌中.",
                                2:"听歌中..",
                                3:"听歌中..."
                            }
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
                }else{
                    if(confirm('是否关闭听歌')){
                        clearInterval(this.musicTimer)
                        this.musicTimer = undefined
                        this.$refs['musicRelax'].$el.style.display = "none"
                        document.querySelector('.relax').innerHTML = "学累了吗？"
                    }
                }
            },
            scrollToSection(e){
                let sectionDoms = this.$refs['section']
                let index = e.target.getAttribute('value')
                this.$refs['dailyStudy'].scrollTop = sectionDoms[index].offsetTop
            },
            bindingScrollToEvent(){
                // 获取段落dom和目录dom，绑定点击事件实现自动定位。
                let chaptersAsideDoms = this.$refs['chapterAside']
                let chaptersContentDoms = this.$refs['chapterContent']
                for(let chapterIndex in chaptersContentDoms){
                    chaptersContentDoms[chapterIndex].removeEventListener('click',this.scrollToSection)
                    chaptersContentDoms[chapterIndex].addEventListener('click',this.scrollToSection)

                }
                for(let chapterIndex in chaptersAsideDoms){
                    chaptersAsideDoms[chapterIndex].removeEventListener('click',this.scrollToSection)
                    chaptersAsideDoms[chapterIndex].addEventListener('click',this.scrollToSection)

                }
            },
            bindingWindowScroll(){
                let lastScrollTop = 0
                let vc = this
                this.$refs['dailyStudy'].addEventListener('scroll',()=>{
                    let navH
                    vc.$bus.$on('navResponseH',function(value){
                        navH = value
                    })
                    vc.$bus.$emit('askNavH')
                    let asideDom = this.$refs['aside']
                    let contentDom = this.$refs['content']
                    let containerDom = this.$refs['container']
                    let contentT = contentDom.offsetTop
                    let asideH = asideDom.offsetHeight
                    let asideT = asideDom.offsetTop
                    let containerT = containerDom.offsetTop
                    let dailyStudyScrollT = this.$refs['dailyStudy'].scrollTop
                    // 这里最终使用的为window的clientHeight作为窗口的高度，而不用offsetHeight作为高度，是由于clientHeight是可视窗口高度(不包括被滚动条覆盖的高度)，而offsetHeight为浏览器窗口高度，因此包括了滚动条。我们实际的div中并不包括该滚动条。
                    let winOffsetHeight = document.documentElement.offsetHeight
                    let winClientH = document.documentElement.clientHeight
                    let contentH = contentDom.offsetHeight
                    if(asideH < contentH){
                        let upOrDown = dailyStudyScrollT - lastScrollTop > 0 ? false : true
                        lastScrollTop = dailyStudyScrollT
                        // 如果为往下滚
                        if(!upOrDown){
                            if(asideH > winClientH - navH){
                                if(dailyStudyScrollT < asideH + containerT + 20 - winClientH){
                                }else if(dailyStudyScrollT + winClientH <= contentH + contentT){
                                    asideDom.style.marginTop = dailyStudyScrollT - containerT -20 - (asideH - winClientH) + "px"
                                }
                            }else{
                                if(dailyStudyScrollT > 20 && dailyStudyScrollT < 20 + contentH - (winClientH - navH)){
                                    asideDom.style.marginTop = dailyStudyScrollT - 20  + "px"
                                }else if( dailyStudyScrollT > 20 + contentH - (winClientH - 20)){
                                    asideDom.style.marginTop = contentH - (winClientH - navH)  + "px"
                                }
                            }
                            
                        }else{
                            if(asideH > winClientH - navH){
                                if(contentH + contentT < dailyStudyScrollT){
                                }else if(dailyStudyScrollT > containerT + 20 + asideH - winClientH){
                                    asideDom.style.marginTop = dailyStudyScrollT - containerT -20 - (asideH - winClientH) + "px"
                                }else{
                                    asideDom.style.marginTop = "0px"
                                }
                            }else{
                                if(dailyStudyScrollT > 20){
                                    asideDom.style.marginTop = dailyStudyScrollT - 20  + "px"
                                }else{
                                    asideDom.style.marginTop = "0"
                                }
                            }
                        }
                    }
                })

            },
            imgLoaded(){
                // 由于这里的圣杯布局后高度塌陷，只能通过js手动计算修改，由于图片未加载完成时获取的content高度不对，因此貌似只能监听所有的图片load属性后进行计算。
                let content = this.$refs['content']
                let container = this.$refs['container']
                container.style.height = content.offsetHeight + 20 + "px"
            }
        },
        created(){
            this.$store.dispatch('dailyStudy/getArticle',{yearMonth:'202304',articleNum:1})
        },
        mounted(){
            window.addEventListener('resize',()=>{
                this.imgLoaded()
            })
        },
        beforeUPdate(){

        },
        updated(){
            this.$refs['dailyStudy'].scrollTop = 0
        },
        beforeDestroy(){
            if(this.musicTimer){
                clearInterval(this.musicTimer)
            }
        }
    }
</script>

<style scoped lang="css">
    *{
        margin:0;
        padding:0;
    }
    .dailyStudy{
        overflow-x:hidden;
        scroll-behavior: smooth;
    }
    .container{
        width: 100%;
        height: 100vh;
        background-color: #f5f6f7;
        padding:20px 350px 0 400px;
        /* overflow-x:hidden; */
    }

    .aside{
        float:left;
        width: 300px;
        margin-left:-310px;
        /* transition:all 0.05s linear; */
    }
    .monthArticles{
        background-color: #fff;
        height: 160px;
    }
    .monthArticles h4{
        height: 30px;
        line-height: 30px;
        padding-left:20px;
        background-color: #c28842;
    }
    .monthArticles ul{
        display: grid;
        grid-template-columns:auto auto;
        grid-gap:10px;
        margin-left:40px;
        margin-top:20px;
    }
    .monthArticles ul li:hover{
        cursor:pointer;
        color:#c0c0c0;

    }
    .oneMonthArticles{
        margin-top:20px;
        background-color: #fff;
    }
    .oneMonthArticles h4{
        height: 30px;
        line-height: 30px;
        padding-left:20px;
        background-color: #c28842;
    }
    .oneMonthArticles ul{
        font-size:14px;
        line-height: 34px;
    }
    .oneMonthArticles ul li{
        padding-left:40px;
    }
    .oneMonthArticles ul li:hover{
        background-color: #c0c0c0;
        cursor:pointer;
    }
    .oneMonthArticles ul li:active{
        color:white
    }
    .articleChapter{
        background-color: #fff;
        margin-top:20px;
    }
    .articleChapter h4{
        height: 30px;
        line-height: 30px;
        padding-left:20px;
        background-color: #c28842;
    }
    .articleChapter .articleTitle{
        display: block;
        margin-left:30px;
        margin-top:10px;
        color:rgb(192, 26, 54);
        font-weight:700;
        font-size: .9em;
    }
    
    .articleChapter ul{
        margin:5px 60px;
    }
    .articleChapter ul li{
        font-size: 0.7em;
        color:rgb(207, 51, 77);
        padding:5px 0;
    }
    .articleChapter ul li:hover{
        color:rgb(140, 0, 23);
        cursor:pointer;
        background-color: #eddcdc;
    }
    .content{
        float: left;
        margin-left:10px;
        width: 100%;
        min-width: 600px;
        /* min-height: 100%; */
        background-color: #fff;
        padding:0 20px 0px 20px;
    }
    .content h4.title{
        display: block;
        height: 30px;
        line-height: 30px;
        font-family:'PingFang SC','Microsoft YaHei','SimHei','Arial','SimSun';
    }
    .content .articleIntroduction{
        height: 40px;
        width: calc(100% - 20px);
        background-color: #ebebeb;
        font-size: 0.8em;
        color:#aaa;
        border-radius: 1px;
        padding:3px 10px;
    }
    .content .chapter{
        margin-top:10px;
    }
    .content .chapter ul{
        margin-left:20px;
        color:skyblue;
        /* transform后文本内容仍在左上角的方法1：通过计算得出 */
        /* transform:scale(0.6) translate(calc(100% / 0.6 * (1 - 0.6) / -2),calc(100% / 0.6 * (1 - 0.6) / -2)); */
        /* transform后文本内容仍然在左上角的办法2：使用transform-origin:left top实现 */
        transform:scale(0.7);
        transform-origin:left top;
        font-family: sans-serif;
    }
    .content .chapter ul li{
        margin:4px 0;
    }
    .content .chapter ul li:hover{
        cursor:pointer;
        color:rgb(125, 16, 16);
    }

    .content .articleBody{
        margin-top:20px;
        font-size: 12px;
        text-indent:2em;
        line-height: 25px;
        font-family: -apple-system,SF UI Text,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif,SimHei,SimSun;
    }

    .content .articleBody .section .part img{
        width:100%
    }

    .advertisement{
        width: 320px;
        height: 50vh;
        background-color: #fff;
        float:left;
        margin-left:20px;
        margin-right:-340px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 900;
        font-size: 20px;
        animation:advertising 2s infinite linear;
    }
    @keyframes advertising {
        0%{
            font-size: 40px;
        }
        100%{
            font-size: 25px;
        }
        
    }
    .footer{
        height: 3px;
        background-color: red;
    }

    .musicRelax{
        display: none;
        position: absolute;
        right:110px;
        top:80px;
        transform-origin: right top;
        transform:scale(0.1);
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