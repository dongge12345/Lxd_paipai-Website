import {getArticle} from '@/api'
const state = {
    articleMsg:{}
    // articleMsg:{
    //     author:'lxd_paipai',
    //     releaseTime:'2023年4月23日',
    //     title:'图片瀑布流函数何时执行问题',
    //     tabs:[
    //         'html',
    //         'img',
    //         '资源请求'
    //     ],
    //     chapters:[
    //         '一、问题产生',
    //         '二、初次分析问题',
    //         '三、错误走向',
    //         '四、发现原因过程',
    //         '五、img.complete属性的使用',
    //         '六、最终实现效果'
    //     ],
    //     content:[
    //         [
    //             {
    //                 type:"text",
    //                 value:"瀑布流图片墙是使用js代码实现的，一开始本地编写测试页面效果都没有问题--初次加载和后续窗口resize图片重排，虽然此时控制台偶尔会弹出图片墙div容器无法获取children。但当我把项目打包后部署到服务器上后，发现老是出现切换不同的照片墙时，照片更新后布局就错乱了。"
    //             }

    //         ],
    //         [
    //             {
    //                 type:"text",
    //                 value:"此时对比本地正常，我想到可能是图片下载耗时导致布局函数执行的是时间点不对。"
    //             }

    //         ],
    //         [
    //             {
    //                 type:"text",
    //                 value:"一开始想到的解决办法是通过组件的updated和watch照片地址lst变量，但使用多次执行布局函数后问题没有得到解决。"
    //             },
    //         ],
    //         [
    //             {
    //                 type:"text",
    //                 value:"后经控制台打印后，发现执行布局函数时，有些图片dom获取不到对应的offsetHeight(意外为0)且img的offsetWidth不一致(布局函数本该将其设置成一致)。此时灵光一闪，问题的根源是图片加载完成的时间点确定不了，如果我们布局前遍历img容器中所有的新图片是否加载完成，再决定是否执行或许问题就能得到解决。"
    //             },
    //         ],
    //         [
    //             {
    //                 type:"text",
    //                 value:"浏览器查阅后，发现imgDom元素有个.complete属性，用来判定图片资源是否加载完成。"
    //             },{
    //                 type:"img",
    //                 value:"images/dailyStudy/crucialCode.png",
    //                 width:"50%"
    //             }
    //         ],
    //         [
    //             {
    //                 type:'text',
    //                 value:"因此我的做法是，当路由组件中发生update后，在updated函数中执行布局函数，规则如下：1.遍历所有图片dom的complete，如果存在complete为false时，setTimeout 0.1s后再次调用，长此往复知道图片下载完成后排布。问题得到了相对合理的解决。"
    //             }
    //         ],
    //         [
    //             {
    //                 type:'text',
    //                 value:"额外收获是在vue开发环境中,原生js有时获取不到的Dom信息可以通过$refs方式获取，在布局照片墙使用$refs获取dom信息可能有助于解决文章的问题。"
    //             }
    //         ]
            
    //     ]
    // }

}

const mutations = {
    GETARTICLE(state,data){
        state.articleMsg = data
    }
}

const actions = {
    async getArticle(context,data){
        let result = getArticle(data.yearMonth,data.articleNum)
        result.then(msg=>{
            if(msg.status === 200){
                context.commit('GETARTICLE',msg.data)
            }else{
                alert('数据获取失败',msg.message)
            }
        },err=>{
            alert('数据获取失败')
        })
    }
}

const getters = {

}

export default{
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}