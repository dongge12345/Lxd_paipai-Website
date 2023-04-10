import VueRouter from 'vue-router'
import Vue from 'vue'
import CenterBD from '@/pages/CenterBD'
import Games from '@/pages/Games'
import Game1_CardGame from '@/pages/Games/Game1_CardGame'
import Others from '@/pages/Games/Others'
import PhotoAlbum from '@/pages/PhotoAlbum'
import Diary from '@/pages/Diary'
Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        name:'center',
        components:{
            center:CenterBD
        }
    },
    {
        path:'/games',
        // name:'games',
        components:{
            center:Games
        },
        children:[
            {
                path:'/',
                name:'games',
                redirect:{name:'cardGame'}
            },
            {
                path:'cardGame',
                name:"cardGame",
                components:{
                    playArea:Game1_CardGame
                }
            },
            {
                path:'others',
                name:'otherGames',
                components:{
                    playArea:Others
                }
            },
        ]
    },
    {
        path:'/photoAlbum',
        name:'photoAlbum',
        components:{
            center:PhotoAlbum
        }
    },
    {
        path:'/diary',
        name:'diary',
        components:{
            center:Diary
        }
    }
]

const router = new VueRouter({
    routes
})

export default router