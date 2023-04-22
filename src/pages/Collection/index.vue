<template>
    <div class="collection">
        <div class="aside">
            <div class="asideFooter">
                <div class="waterDrop"></div>
            </div>
        </div>
        <div class="collectionCenter" ref="center">
            <div class="centerNav" ref="nav">
                <button id="openBtn" class="navBtn">openCamera</button>
                <button id="closeBtn" class="navBtn">closeCamera</button>
                <span style="margin-left:20px;color:white">||</span>
                <button id="photoBtn" class="navBtn">photoCamera</button>
                <button id="ifDownloadAfterBtn" class="navBtn" :title="ifDownloadAfterPhoto ? '点击后拍照但不下载' : '点击后拍照同时下载'">{{ifDownloadAfterPhoto ? 'photoButNotDownload' : 'photoAndDownload'}}</button>
                <span style="margin-left:20px;color:white">||</span>
                <button id="startBtn" class="navBtn">startRecode</button>
                <button id="stopBtn" class="navBtn">stopRecode</button>
                <button id="ifDownloadAfterRecodeBtn" class="navBtn" :title="ifDownloadAfterRecode ? '点击后录像但不下载' : '点击后录像同时下载'">{{ifDownloadAfterRecode ? 'RecodeButNotDownload' : 'RecodeAndDownload'}}</button>
            </div>
            <div class="pictureShow">
            </div>
            <video autoplay muted class="video" v-show="videoShow"></video>
            
        </div>
    </div>
</template>

<script>
    export default {
        name:'Collection',
        data(){
            return{
                ifDownloadAfterPhoto:false,
                ifDownloadAfterRecode:false,
                videoShow:false,
            }
        },
        mounted(){
            window.onresize = () =>{
                this.$refs['nav'].style.width = this.$refs['center'].offsetWidth - 1 + "px"
            }
            this.$refs['nav'].style.width = this.$refs['center'].offsetWidth - 1 + "px"
            document.querySelector('.collection').addEventListener('scroll',()=>{
                // console.log(document.querySelector('.collectionCenter').getBoundingClientRect().top)
                this.$refs['nav'].style.top = document.querySelector('.collectionCenter').getBoundingClientRect().top + "px"
            })

            // 获取各个btn并绑定各自的开启\关闭\录像\拍照\下载等点击事件
            let [openBtn,closeBtn,photoBtn,ifDownloadAfterPhotoBtn,startBtn,stopBtn,ifDownloadAfterRecodeBtn] = document.querySelectorAll('.navBtn')
            // console.log(openBtn,closeBtn,photoBtn,ifDownloadAfterPhotoBtn,startBtn,stopBtn,ifDownloadAfterRecodeBtn)
            let pictureShow = document.querySelector('.pictureShow')
            let video = document.querySelector('.video')
            let stream = null
            let recorder = null
            let videoData = []
            let picCanvasStypeObj = {
                marginLeft:"18px",
                marginTop:"10px",
                marginBottom:"10px",
                width: "160px",
                height: "120px",
                backgroundColor:" white"
            }
            ifDownloadAfterPhotoBtn.addEventListener('click',()=>{
                this.ifDownloadAfterPhoto = !this.ifDownloadAfterPhoto
            })
            ifDownloadAfterRecodeBtn.addEventListener('click',()=>{
                this.ifDownloadAfterRecode = !this.ifDownloadAfterRecode
            })
            openBtn.addEventListener('click',()=>{
                this.videoShow = true
                navigator.mediaDevices.getUserMedia({video:true}).then(stream_=>{
                    stream = stream_
                    video.srcObject = stream_
                })
            })
            closeBtn.addEventListener('click',()=>{
                stream.getVideoTracks().forEach(track=>{
                    track.stop()
                })
                stream = null
                this.videoShow = false
            })
            photoBtn.addEventListener('click',()=>{
                if(stream){
                    let canvas = document.createElement('canvas')
                    for(let attrName in picCanvasStypeObj){
                        canvas.style[attrName] = picCanvasStypeObj[attrName]
                    }
                    canvas.getContext('2d').drawImage(video,0,0,canvas.width,canvas.height)
                    pictureShow.appendChild(canvas)

                    console.log('this.ifDownloadAfterPhoto',this.ifDownloadAfterPhoto)
                    if(this.ifDownloadAfterPhoto){
                        let a = document.createElement('a')
                        a.href = canvas.toDataURL('image/png')
                        let date = new Date()
                        let picName = [date.getFullYear(),date.getMonth(),date.getDate(),date.getHours(),date.getMinutes(),date.getSeconds()].join('-') + ' photo'
                        a.download = picName
                        a.click() 
                    }
                }else{
                    alert('摄像头未开启')
                }
            })
            startBtn.addEventListener('click',()=>{
                // 收集音视频信息
                recorder = new MediaRecorder(stream)
                // 当开启录制后监听到音视频数据就收集
                recorder.ondataavaliable = function(e){
                    videoData.push(e.data)
                }
                // 当终止录制时将收集的数组数据转为blob对象，
                recorder.onstop = ()=>{
                    // 数组数据转为blob对象
                    let blob = new Blob(videoData,{type:recorder.mimeType})
                    // 为blob生成一个url地址并存入下载的a标签中
                    let a = document.createElement('a')
                    a.href = URL.createObjectURL(blob)
                    let date = new Date()
                    let videoName = [date.getMonth(),date.getDate(),date.getHours(),date.getMinutes(),date.getSeconds()].join('-') + ' video'
                    a.download = videoName
                    console.log('this.ifDownloadAfterRecode',this.ifDownloadAfterRecode)
                    if(this.ifDownloadAfterRecode){
                        a.click()
                    }else{
                        alert('由于你设置了不下载，录制视频丢失')
                    }
                    // 下载完释放连接和a标签
                    URL.revokeObjectURL(a.href)
                    a.remove()
                }
                recorder.start()
            })
            stopBtn.addEventListener('click',()=>{
                if(!this.ifDownloadAfterRecode){
                    let res = confirm('你设置了不下载，确定继续停止录制吗？')
                    if(!res){
                        return -1
                    }
                }
                recorder.stop()
                videoData = []
            })
        }
    }
</script>

<style scoped lang="css">
    .collection{
        width: 100%;
        height: 100%;
        overflow-x:hidden;
        --mL:300px;
        padding-left:var(--mL);
        background-color: #fff;
    }
    .aside{
        width: calc(var(--mL));
        height:96%;
        margin:1% 0;
        background-color: #fff;
        float:left;
        margin-left:calc(var(--mL) * -1 + 5px);
        box-shadow:2px 2px 2px black;
        border:2px groove black;
        position: relative;
    }
    .collectionCenter{
        position: relative;
        margin-left:1%;
        margin-top:5px;
        width: 99%;
        height: 100%;
        background:linear-gradient(black,white);
        overflow-x: hidden;
        border: 1px solid #000;
        background-repeat: no-repeat;
        background-size: cover;
    }
    .pictureShow{
        margin-top:70px;
        width: 100%;
        /* height: 100px; */
        background:repeating-linear-gradient(black 40px,white 80px,black 120px);
        display: flex;
        flex-wrap: wrap;
        justify-content:flex-start;
    }
    .pictureShow .picCanvas{
    }
    .video{
        position: fixed;
        --w:320px;
        width:var(--w);
        height:240px;
        /* left:calc(50% - var(--w) / 2); */
        left:0px;
        top:125px;
        background-color: black;
    }
    .bgiScrollLetter{
        position: absolute;
        width:100%;
        height:10000%;
        top:0px;
        background-color: pink;
        z-index:-1
    }
    .collectionCanvas{
        display: none;
    }

    .collectionCenter::-webkit-scrollbar{
        display:none;
    }
    .collectionCenter h1{
        text-align: center;
    }
    .centerNav{
        position: fixed;
        width: 100%;
        height: 70px;
        background-image: radial-gradient(transparent 1px,rgba(255, 255, 255, 0.521) 1px);
        background-size: 4px 4px;
        backdrop-filter:saturate(50%) blur(4px);
        overflow: hidden;
    }

    .centerNav button{
        margin-left:20px;
        margin-top:20px;
    }
    .asideFooter{
        position: absolute;
        width: 100%;
        height: 150px;
        background:linear-gradient(transparent 0, rgb(139, 245, 139) 30%,green 100%);
        bottom:0px;
    }
    .waterDrop{
        position: absolute;
        bottom:10%;
        right:20%;
        --size:50px;
        width:var(--size);
        height:var(--size);
        background-color: rgba(255, 255, 255, 0.102);
        box-shadow: inset -3px -3px 3px rgba(0, 0, 0, 0.584),
        inset 1px 2px 2px white,
        -2px -2px 2px rgba(0, 0, 0, 0.541);
        animation:waterMove 1s infinite linear;
    }
    .waterDrop::before{
        content:'';
        /* right:15px;
        bottom:10px; */
        position: absolute;
        width: 2px;
        height: 2px;
        background-color: #fff;
        animation:waterMove2 10s infinite linear;
    }
    .waterDrop::after{
        content:'';
        right:10px;
        bottom:15px;
        position: absolute;
        width:4px;
        height:4px;
        background-color: #fff;
        animation:waterMove3 10s infinite linear;
    }
    @keyframes waterMove{
        0%{
            border-radius: 50% 48% 43%;
        }
        25%{
            border-radius: 48% 50% 48%;
        }
        50%{
            border-radius: 43% 48% 50%;
        }
        75%{
            border-radius: 48% 43% 48%;
        }
        100%{
            border-radius: 50% 48% 43%;
        }
    }
    @keyframes waterMove2{
        0%{
            right:15px;
            bottom:10px;
            border-radius: 50% 48% 43%;
        }
        25%{
            right:16px;
            bottom:10px;
            border-radius: 48% 50% 48%;
        }
        50%{
            right:17px;
            bottom:9px;
            border-radius: 43% 48% 50%;
        }
        75%{
            right:16px;
            bottom:9px;
            border-radius: 48% 43% 48%;
        }
        100%{
            right:15px;
            bottom:10px;
            border-radius: 50% 48% 43%;
        }
    }
    @keyframes waterMove3{
        0%{
            right:10px;
            bottom:15px;
            border-radius: 50% 48% 43%;
        }
        25%{
            right:9.5px;
            bottom:15px;
            border-radius: 48% 50% 48%;
        }
        50%{
            right:9px;
            bottom:14.5px;
            border-radius: 43% 48% 50%;
        }
        75%{
            right:9px;
            bottom:15px;
            border-radius: 48% 43% 48%;
        }
        100%{
            right:10px;
            bottom:15px;
            border-radius: 50% 48% 43%;
        }
    }
</style>