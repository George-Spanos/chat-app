import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Message } from '../model/message.interface';
import { ActiveUser } from 'src/model/user.interface';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server: Server;
    users: { name: string, imageURL: string, socketId: string }[] = [];

    async handleConnection() {
        console.log('a user connected');
    }

    async handleDisconnect(@ConnectedSocket() socket: Socket) {
        console.log('a user disconnected');

        this.users = this.users.filter(user => user.socketId !== socket.id);
        this.server.emit('users', this.users);
    }

    @SubscribeMessage('users')
    async onUser(@ConnectedSocket() socket: Socket, @MessageBody() userDto: ActiveUser) {
        this.users.push({ name: userDto.name, imageURL: userDto.imageURL, socketId: socket.id });
        this.server.emit('users', this.users);
    }
    @SubscribeMessage('chat')
    async onChat(@ConnectedSocket() socket: Socket, @MessageBody() message: Message) {
        console.log('received message:', message)
        console.log('client id: ', socket.id)
        socket.broadcast.emit('chat', message);
    }

}