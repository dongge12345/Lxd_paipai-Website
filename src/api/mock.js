import axios from 'axios'
let mockAxios = axios.create({
    baseURL:'/mock',
    timeout:2000
})  

mockAxios.interceptors.request.use(config=>{
    return config
},err=>{
    return new Error(err)
})

mockAxios.interceptors.response.use(res=>{
    return res
},err=>{
    return new Error(err)
})

export default mockAxios