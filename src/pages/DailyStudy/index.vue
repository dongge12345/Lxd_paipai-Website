<template>
    <div class="dailyStudy">
        <!-- 是否听歌 -->
        <span class="relax" @click="inquireIfTired">学累了吗？</span>
        <MusicRelax class="musicRelax" title="♪(´▽｀)" @click.native="musicPlay" ref="musicRelax"/>
        <!-- 主体页面布局：仿CSDN页面布局 -->
        <div class="aside">
            <div class="monthArticles">
                <h4>近期文章</h4>
                <ul>
                    <li v-for="item in recentArticles.slice(-6)">{{item}}</li>
                </ul>
            </div>
            <div class="articleChapter">
                <h4>目录</h4>
                <span class="articleTitle">{{articleTitleAndChapter.title}}</span>
                <ul>
                    <li v-for="chapter,index in articleTitleAndChapter.chapters">{{chapter}}</li>
                </ul>
                <br><br>
            </div>
        </div>
        <div class="content">
            <h4 class="title">{{articleTitleAndChapter.title}}</h4>
            <!-- 作者、发布时间以及文章标签 -->
            <div class="articleIntroduction">
                <span style="color:#777">{{articleRelate.author}}</span>
                <img src="@/assets/images/dailyStudy/clock.png" style="width: 13px;margin-left:20px;transform:translateY(2px)" alt=""><span>已于{{articleRelate.releaseTime}}修改</span>
                <br>
                <!-- 标签--scale的计算。 -->
                <div style="scale:0.5;transform:translateX(calc(100% / 0.5 * (1 - 0.5)  / 2 * -1))">
                    <span style="padding:0px 2px;float:left;margin-top:2px;">标签:</span>
                    <ul style="margin-left:2px;">
                        <li v-for="tab in articleRelate.tabs" style="display: inline-block;transform:translateY(-3px);padding:2px 6px;border: 2px solid #aaa;color:rgb(45, 161, 207);margin-left:20px;">{{tab}}</li>
                    </ul>
                </div>
            </div>
            <!-- 章节 -->
            <div class="chapter">
                <h6>文章目录</h6>
                <ul>
                    <li v-for="chapter in articleTitleAndChapter.chapters">{{chapter}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import MusicRelax from '@/components/Nav/MusicRelax'
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
                articleTitleAndChapter:{
                    title:'图片瀑布流函数何时执行问题',
                    chapters:[
                        '一、问题产生',
                        '二、初次分析问题',
                        '三、错误走向',
                        '四、发现原因过程',
                        '五、img.complete属性的使用',
                        '六、最终实现效果'
                    ]
                },
                articleRelate:{
                    author:'lxd_paipai',
                    releaseTime:'2023年4月23日',
                    tabs:[
                        'html',
                        'img',
                        '资源请求'
                    ],
                    content:[
                        [
                            {
                                type:"text",
                                value:"瀑布流图片墙是使用js代码实现的，一开始本地编写测试页面效果都没有问题--初次加载和后续窗口resize图片重排，虽然此时控制台偶尔会弹出图片墙div容器无法获取children。但当我把项目打包后部署到服务器上后，发现老是出现切换不同的照片墙时，照片更新后布局就错乱了。"
                            },{
                                type:"text",
                                value:"此时对比本地正常，我想到可能是图片下载耗时导致布局函数执行的是时间点不对。"
                            },{
                                type:"text",
                                value:"一开始想到的解决办法是通过组件的updated和watch照片地址lst变量，但使用多次执行布局函数后问题没有得到解决。"
                            },{
                                type:"text",
                                value:"后经控制台打印后，发现执行布局函数时，有些图片dom获取不到对应的offsetHeight(意外为0)且img的offsetWidth不一致(布局函数本该将其设置成一致)。此时灵光一闪，问题的根源是图片加载完成的时间点确定不了，如果我们布局前遍历img容器中所有的新图片是否加载完成，再决定是否执行或许问题就能得到解决。"
                            },{
                                type:"text",
                                value:"浏览器查阅后，发现imgDom元素有个.complete属性，用来判定图片资源是否加载完成。因此我的做法是，当路由组件中发生update后，在updated函数中执行布局函数，规则如下：1.遍历所有图片dom的complete，如果存在complete为false时，setTimeout 0.1s后再次调用，长此往复知道图片下载完成后排布。问题得到了相对合理的解决。"
                            }
                        ]
                    ]
                }
            
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
        --leftW:250px;
        background-color: #f5f6f7;
        float:left;
        padding-left:calc(var(--leftW) + 50px);
        padding-top:20px;
    }
    .aside{
        float:left;
        width: var(--leftW);
        height: 100%;
        margin-left:calc(var(--leftW) * -1);
        background-color: #fff;
    }
    .monthArticles{
        height: 160px;
    }
    .monthArticles h4{
        height: 30px;
        line-height: 30px;
        padding-left:30px;
        background-color: #c28842;
    }
    .monthArticles ul{
        display: grid;
        grid-template-columns:auto auto;
        grid-gap:10px;
        margin-left:20px;
        margin-top:20px;
    }
    .monthArticles ul li:hover{
        cursor:pointer;
        color:#c0c0c0;

    }
    .articleChapter{
        margin-top:20px;
    }
    .articleChapter h4{
        height: 30px;
        line-height: 30px;
        padding-left:30px;
        background-color: #c28842;
    }
    .articleChapter .articleTitle{
        display: block;
        margin-left:30px;
        margin-top:10px;
        color:rgb(180, 31, 56);
        font-weight:400;
        font-size: 0.8em;
    }
    
    .articleChapter ul{
        margin:5px 40px;
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
        margin-left:10px;
        width: calc(100% - 200px);
        min-width:500px;
        height: 100%;
        background-color: #fff;
    }
    .content h4.title{
        display: block;
        height: 30px;
        line-height: 30px;
        padding-left:10px;
        font-family:'PingFang SC','Microsoft YaHei','SimHei','Arial','SimSun';
    }
    .content .articleIntroduction{
        height: 40px;
        width: calc(100% - 20px);
        background-color: #ebebeb;
        margin-left:10px;
        font-size: 0.8em;
        color:#aaa;
        border-radius: 1px;
        padding:3px 10px;
    }
    .content .chapter{
        margin:10px 20px;
    }
    .content .chapter ul{
        margin-left:20px;
        color:skyblue;
        scale:0.6;
        transform:translate(calc(100% / 0.6 * (1 - 0.6) / -2),calc(100% / 0.6 * (1 - 0.6) / -2));
        font-family: sans-serif;
    }
    .content .chapter ul li{
        margin:4px 0;
    }
    .content .chapter ul li:hover{
        cursor:pointer;
        color:rgb(125, 16, 16);
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