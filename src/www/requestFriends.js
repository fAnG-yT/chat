import {instance} from './request'



export function friendsAgree(friend){
    return instance({
        url:'users/friendsAgree',
        data:friend
    })
}

export function newFriends(friend){
    return instance({
        url:'users/newFriends',
        data:friend
    })
}

export function searchFriends(friend){
    return instance({
        url:'users/searchFriends',
        data:friend
    })
}

export function messageList(id){
    return instance({
        url:'users/messageList',
        data:id
    })
}
