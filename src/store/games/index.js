const state = {
    gamesShow:false
}
const mutations = {
    CHANGEGAMESSHOW(state){
        state.gamesShow = !state.gamesShow
    }
}

const actions = {
    changeGamesShow(context){
        context.commit('CHANGEGAMESSHOW')
    }
}
const getters = {

}

export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}