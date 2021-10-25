import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import 'dotenv/config';
import { Server, Socket } from 'socket.io';
import { MessageService } from './service/message.service';
import { IncomingMessageDTO } from './dto/incoming_message.dto';
export declare class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private messageService;
    constructor(messageService: MessageService);
    server: Server;
    handleIncomingMessage(message: IncomingMessageDTO, client: Socket): Promise<void>;
    afterInit(server: Server): void;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket, ...args: any[]): void;
}
