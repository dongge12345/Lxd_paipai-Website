
this.$refs['dailyStudy'].addEventListener('scroll',function(){
    console.log('触发')
    let winT = this.scrollTop
    // 这里最终使用的为window的clientHeight作为窗口的高度，而不用offsetHeight作为高度，是由于clientHeight是可视窗口高度(不包括被滚动条覆盖的高度)，而offsetHeight为浏览器窗口高度，因此包括了滚动条。我们实际的div中并不包括该滚动条。
    let winOffsetHeight = document.documentElement.offsetHeight
    let winClientH = document.documentElement.clientHeight
    let contentH = contentDom.offsetHeight
    console.log('winT',winT,winOffsetHeight,winClientH,contentH)
    if(asideH < contentH){
        let upOrDown = winT - lastScrollTop > 0 ? false : true
        lastScrollTop = winT
        // 如果为往下滚
        if(!upOrDown){
            console.log('down')
            if(asideH > winClientH){
                if(winT < asideH + containerT + 20 - winClientH){
                }else if(winT + winClientH <= contentH + contentT){
                    asideDom.style.marginTop = winT - containerT -20 - (asideH - winClientH) + "px"
                }
            }else{
                if(asideT < winT && winT + winClientH < contentH + contentT){
                    asideDom.style.marginTop = winT - containerT - 20 + "px"
                }else if(winT + winClientH > contentH + contentT){
                    asideDom.style.marginTop = contentH -  document.documentElement.clientHeight + "px"
                }
            }
            
        }else{
            console.log('up')
            if(asideH > winClientH){
                if(contentH + contentT < winT){
                }else if(winT > containerT + 20 + asideH - winClientH){
                    asideDom.style.marginTop = winT - containerT -20 - (asideH - winClientH) + "px"
                }else{
                    asideDom.style.marginTop = "0px"
                }
            }else{
                if(asideT < winT && winT + winClientH < contentH + contentT){
                    asideDom.style.marginTop = winT - containerT - 20 + "px"
                }else if(winT < containerT){
                    asideDom.style.marginTop = "0px"
                }
            }
        }
    }
})



let navH
this.$bus.$on('navResponseH',function(value){
    console.log('')
    navH = value
})
this.$bus.$emit('askNavH')
console.log('触发',navH)





