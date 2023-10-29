import http from '@/utils/http.js'

export const loginAPI=(data)=>{
    return http({
        url:'/login',
        method:'POST',
        data
    })
}

export const registerAPI=(data)=>{
    return http({
        url:'/register',
        method:'POST',
        data
    })
}

