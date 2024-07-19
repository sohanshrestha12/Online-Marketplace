import io, { Socket } from 'socket.io-client';
let socket:Socket;
export const connectSocket = (token:string)=>{
    if(!socket || !socket.connected){
        socket = io('http://localhost:5100',{
            query:{token}
        });
        socket.on('connect',()=>{
            console.log('Connected to socket server');
        });
        

        socket.on('disconnect',()=>{
            console.log('Disconnected from the socket server');
        });
    }
}

export const getSocket = () => socket;
