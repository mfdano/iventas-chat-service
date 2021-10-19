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
import { MessageDTO } from './dto/message.dto'

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private messageService: MessageService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('on_receive_message')
  async handleIncomingMessage(@MessageBody() data: MessageDTO,  @ConnectedSocket() client: Socket): Promise<void> {
    console.log(JSON.stringify(data, null, 2));
    await this.messageService.save(data);
    this.server.emit('on_send_message', data);
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