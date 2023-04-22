// 手写路由跳转时的loading
export function showOrRemoveLoading(loading,ifShow){
    // let loading = document.createElement('div')
    loading.classList.add('loading')
    let loadingStyleObj = {
        position: "absolute",
        top:"50%",
        left:"50%",
        width: "30px",
        height:"30px",
        border: "2px dotted",
        borderColor: "red black",
        borderRadius: "50%",
        animation:"loadingAct 2s infinite linear",
        zIndex:10000000
    }
    
    for(let attrName in loadingStyleObj){
        // console.log(attrName,loadingStyleObj[attrName])
        loading.style[attrName] = loadingStyleObj[attrName]
    }
    loading.animate([{transform:'translate(-50%,-50%) rotate(0deg) '},{transform:' translate(-50%,-50%) rotate(360deg) '}],{iterations:Infinity,duration:1000})
    
    document.body.appendChild(loading)
    
    if(ifShow){
        loading.style.display = "block"
    }else{
        setTimeout(()=>{
            loading.style.display = 'none'
        },100)
    }

}