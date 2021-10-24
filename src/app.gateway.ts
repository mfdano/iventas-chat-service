import {
  MessageBody,
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { MessageService } from './service/message.service'
import { IncomingMessageDTO } from './dto/incoming_message.dto'

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    credentials: true
  }
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private messageService: MessageService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('on_client_message')
  async handleIncomingMessage(@MessageBody() message: IncomingMessageDTO,  @ConnectedSocket() client: Socket) {
    //console.log('on_client_message');
    //console.log(JSON.stringify(message, null, 2));
    await this.messageService.saveMessage(message);
    this.server.emit('on_server_message', message);
  }

  afterInit(server: Server) {
    console.log('Web socket has been initialized');
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

}