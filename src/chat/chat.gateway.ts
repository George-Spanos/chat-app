import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Message } from '../model/message.interface';
import { ActiveUser } from 'src/model/user.interface';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server: Server;
    users: ActiveUser[] = [];

    async handleConnection() {
        console.log('a user connected');
    }

    async handleDisconnect() {
        console.log('a user disconnected');
    }

    @SubscribeMessage('users')
    async onUser(@ConnectedSocket() socket: Socket, @MessageBody() userDto: ActiveUser) {
        this.users.push(userDto);
        socket.broadcast.emit('users', this.users);
    }
    @SubscribeMessage('chat')
    async onChat(@ConnectedSocket() socket: Socket, @MessageBody() message: Message) {
        console.log('received message:', message)
        console.log('client id: ', socket.id)
        socket.broadcast.emit('chat', message);
    }

}