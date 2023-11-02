import requests from '@/api/request.js'

export const loginAPI=(email,password)=>{
    return requests({
        url:'/login',
        method:'POST',
        params:{
            email,password
        }
    })
}

export const registerAPI=(data)=>{
    return requests({
        url:'/register',
        method:'POST',
        data
    })
}

