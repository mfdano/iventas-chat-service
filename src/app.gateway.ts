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

import 'dotenv/config';

import { Server, Socket } from 'socket.io';
import { MessageService } from './service/message.service'
import { IncomingMessageDTO } from './dto/incoming_message.dto'
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@WebSocketGateway({
  cors: {
    origin: process.env.ORIGIN,
    credentials: true
  }
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private messageService: MessageService) {}

  @WebSocketServer()
  server: Server;

  //@UseGuards(JwtAuthGuard)
  @SubscribeMessage('on_client_message')
  async handleIncomingMessage(@MessageBody() message: IncomingMessageDTO,  @ConnectedSocket() client: Socket) {
    console.log(JSON.stringify(message, null, 2))
    const clientMessage = await this.messageService.saveMessage(message);
    this.server.emit('on_server_message', clientMessage);
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