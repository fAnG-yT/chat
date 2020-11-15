import axios from 'axios'

const instance = axios.create({
    baseURL:'http://192.168.0.113:3000/',
    timeout:5000,
    method:'post',
    params:{}
})

export {instance}

export function getFriendsList(data){
    return instance({
        // method:'post',
        url:'users/FriendsList',
        data:data
    })
}

export function deleteF(data){
    return instance({
        // method:'post',
        url:'users/DeleteFriend',
        data:data
    })
}

export function login(data){
    return instance({
        // method:"post",
        url:'users/',
        data:data
    })
}
export function getHistoryList(data){
    return instance({
        // method:"post",
        url:'users/HistoryList',
        data:data
    })
}

