import { getYearPicture } from "@/api"
const state = {
    picturesUrl:[]
}

const mutations = {
    GETPICTURES(state,data){
        state.picturesUrl = data
    }
}

const actions = {
    async getPictures(context,data){
        let result = await getYearPicture(data)
        context.commit('GETPICTURES',result.data)
    }
}

export default {
    namespaced:true,
    state,
    mutations,
    actions
}