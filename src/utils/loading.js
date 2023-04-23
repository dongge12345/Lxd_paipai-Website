// 参数介绍：container为容器，whichOne为选择loading效果，scale为将默认大小修改为多少
export default function loading(container,whichOne,scale){
    let map = {
        1:()=>{
            let ul = document.createElement('ul')
            let ulStyle = {
                display:'flex',
                position: "absolute",
                left:"50%",
                top:"30px",
                transform: `translateX(-50%) scale(${scale})`,
                listStyle:"none",
            }

            for(let i in ulStyle){
                ul.style[i] = ulStyle[i]
            }
            let liStyle = {
                color:"white",
                display: "inline-block",
                // animation:loadingMove 1s calc(var(--i)/10*1s - 4s) infinite linear,
                fontWeight:"700",
                marginLeft:"2px",
            }
            let liContentLst = [
                "L",
                "O",
                "A",
                "D",
                "I",
                "N",
                "G",
                "",
                ".",
                "",
                ".",
                "",
                "."
            ]
            for(let i = 0;i < 13;i++){
                if([7,9,11].indexOf(i)===-1){
                    let li = document.createElement('li')
                    li.innerText = liContentLst[i]
                    li.style.setProperty('--i',i+1)
                    for(let index in liStyle){
                        li.style[index] = liStyle[index]
                    }
                    li.animate([{transform:"translateY(-50%)"},{transform:"translateY(50%)"},{transform:"translateY(-50%)"}],{iterations:Infinity,duration:2000,delay:(i+1)/14*1000 - 2000})
                    
                    ul.appendChild(li)
                }
            }
            container.appendChild(ul)
            return "whichOne"+whichOne
        },
        2:()=>{
            return "whichOne"+whichOne
        }
    }
    if(map.hasOwnProperty(whichOne)){
        return map[whichOne]()
    }
}
