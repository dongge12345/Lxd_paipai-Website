import Vuex from 'vuex'
import Vue from 'vue'
import games from './games'
import photoAlbum from './photoAlbum'
Vue.use(Vuex)
const state = {
    indexName:"storeIndex"
}
const mutations = {}
const actions = {}
const getters = {}

const store = new Vuex.Store({
    namespaced:true,
    modules:{
        games,
        photoAlbum
    },
    state,
    mutations,
    actions,
    getters
})

export default store