import socketio from 'socket.io-client'

const socket = socketio.connect('http://192.168.0.113:3000');

socket.on('connect',()=>{
    console.log('连接上啦')
})

socket.on('reconnect',()=>{
    console.log("chonliangchenggon")
})

// socket.on('error',(e)=>{
//     console.log(e)
// })

socket.on('reconnection',()=>{
    console.log('waiting')
})

socket.on('connect_fail',()=>{
    console.log('ljieshibai')
})

socket.on('disconnect',()=>{
    console.log("disconnect")
})

export {socket}