"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
require("dotenv/config");
const socket_io_1 = require("socket.io");
const message_service_1 = require("./service/message.service");
const incoming_message_dto_1 = require("./dto/incoming_message.dto");
let AppGateway = class AppGateway {
    constructor(messageService) {
        this.messageService = messageService;
    }
    async handleIncomingMessage(message, client) {
        console.log(JSON.stringify(message, null, 2));
        const clientMessage = await this.messageService.saveMessage(message);
        this.server.emit('on_server_message', clientMessage);
    }
    afterInit(server) {
        console.log('Web socket has been initialized');
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
    }
    handleConnection(client, ...args) {
        console.log(`Client connected: ${client.id}`);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AppGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('on_client_message'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [incoming_message_dto_1.IncomingMessageDTO, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "handleIncomingMessage", null);
AppGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: process.env.ORIGIN,
            credentials: true
        }
    }),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], AppGateway);
exports.AppGateway = AppGateway;
//# sourceMappingURL=app.gateway.js.map