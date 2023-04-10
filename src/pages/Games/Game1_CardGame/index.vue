<template>
  <div style="height:100%;">
    <h3>卡片排序：按照指定顺序排列卡片</h3>
    <p class="question">题目：颜色顺序为<span ref="question"></span></p>
    <div class="area" ref="area">
        <div class="cardContainer" ref="cardContainer" v-for="(color,index) in colorsMix" :key="index" @dragover="$event.preventDefault()" @drop="drop($event)" :id="index">
            <div class="card" :style="{'background-color':'#'+color}" draggable="true" :id="color" @dragstart="$event.dataTransfer.setData('text',$event.target.id +' '+index)"></div>
        </div>
        <div class="tmpContainer" @dragover="$event.preventDefault()" @drop="drop($event)">
            <span>暂存区</span>
        </div>
        <p style="float:left;width:100%;padding-left:20px" @click="answerShow = !answerShow">显示答案:</p>
        <div class="answer" v-show="answerShow">
            <ul>
                <li v-for="(color,index) in colors" :key="index" :style="{'backgroundColor':'#'+color}"></li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'Game1_CardGame',
    data(){
        return{
            colors:[],
            colorsMix:[],
            answerShow:false
        }
    },
    mounted(){
        this.renewColors()
        this.$refs.question.innerHTML = this.colors.map(item=>"#"+item)
        this.productCards()
        window.addEventListener('resize',this.productCards)
    },
    methods:{
        renewColors(){
            let count = Math.floor(Math.random() * 3 + 4)
            let colorsLst = []
            for(let i = 0;i < count;i++){
                let colorNum = Math.floor(Math.random() * 4095)
                let colorStr = colorNum.toString(16)
                if(colorsLst.indexOf(colorStr) !== -1){
                    i--
                }else{
                    let colorStrLength = colorStr.length
                    colorsLst.push(Array(3-colorStrLength).fill("0").join("")+colorStr)
                }
            }
            this.colors = colorsLst
        },
        productCards(){
            // console.log('this',this,this.$el.offsetWidth,this.$refs['cardContainer'])
            let colors = JSON.parse(JSON.stringify(this.colors))
            let w1 = this.$el.offsetWidth / (colors.length + 1)
            let colorW = w1 * 0.65
            let crackW = w1 * 0.25
            // console.log('colors',colorW,crackW,)
            this.colorsMix.splice(0)
            while(colors.length){
                let length = colors.length
                let randomIndex = Math.floor(Math.random() * length)
                this.colorsMix.push(colors.splice(randomIndex,1)[0])
            }
            this.$nextTick(()=>{
                let containers = [...this.$refs['cardContainer']]
                // console.log(container.offsetWidth,':',colorW,container,getComputedStyle(container).getPropertyValue('--w'))
                for(let item of containers){
                    item.style.setProperty('--w',colorW)
                    item.style.setProperty('--crackW',crackW)
                }
                let tmpContainer = document.getElementsByClassName('tmpContainer')[0]
                tmpContainer.style.setProperty('--w',colorW)
                tmpContainer.style.setProperty('--crackW',crackW*2)
                
            })
        },
        drop(e){
            let id = e.dataTransfer.getData('text').split(" ")[0]
            console.log('drop id',id,e.target)
            if(e.target.nodeName === "SPAN"){
                e.target.parentNode.appendChild(document.getElementById(id))
            }else{
            e.target.appendChild(document.getElementById(id))
            }
        }
    }
}
</script>

<style scoped lang="css">
    h3{
        text-align: center;
        background:linear-gradient(90deg,rgb(103, 10, 103) 30%,rgb(244, 142, 10) 60%,#fff);
        color:transparent;
        background-clip:text;
    }
    .question{
        padding-left:20px;
    }
    .area{
        background-color: #aaaaaa40;
        width: 100%;
        height: 70%;
    }
    .cardContainer{
        --w:65;
        --crackW:25;
        width: calc(var(--w) * 1px);
        height: calc(var(--w) * 1.5px);
        margin-left:calc(var(--crackW) * 1px);
        float:left;
    }
    .card{
        background-color: rgba(255, 255, 255);
        width: 100%;
        height: 100%;
        opacity:.5
    }
    .tmpContainer{
        --w:65;
        --crackW:25;
        width: calc(var(--w) * 1px);
        height: calc(var(--w) * 1.5px);
        border: 1px solid #000;
        float:left;
        margin-left:calc(var(--crackW) * 1px);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }
    .tmpContainer span{
        position: absolute;
    }
    .tmpContainer div{
        float: left;
    }
    .answer{
        width: 500px;
        height: 50px;
        float:left;
        margin-left:30px;
    }
    .answer ul{
        list-style:none;
        display: flex;
    }
    .answer ul li{
        width: 20px;
        height: 20px;
    }
</style>