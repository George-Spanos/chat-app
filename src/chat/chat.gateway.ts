import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server: Server;
    users: number = 0;

    async handleConnection() {
        console.log('a user connected');

        // A client has connected
        this.users++;

        // Notify connected clients of current users
        this.server.emit('users', this.users);

    }

    async handleDisconnect() {
        console.log('a user disconnected');

        // A client has disconnected
        this.users--;

        // Notify connected clients of current users
        this.server.emit('users', this.users);

    }

    @SubscribeMessage('chat')
    async onChat(@ConnectedSocket() socket: Socket, @MessageBody() message: string) {
        console.log('received message:', message)
        console.log('client id: ', socket.id)
        socket.broadcast.emit('chat', message);
    }

}