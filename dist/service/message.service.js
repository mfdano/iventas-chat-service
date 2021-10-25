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
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const outgoing_message_dto_1 = require("../dto/outgoing_message.dto");
let MessageService = class MessageService {
    constructor(messageModel) {
        this.messageModel = messageModel;
    }
    async saveMessage(msg) {
        let message = new this.messageModel(msg);
        message = await message.save();
        return this.toDTO(message, false);
    }
    async findByChatId(query) {
        const outgoingMessages = [];
        const messages = await this.messageModel
            .find({ chatId: query.chatId, sentDate: { $lt: Number(query.lastDate) } })
            .sort({ sentDate: -1 })
            .limit(Number(query.limit) + 1)
            .exec();
        for (let idx = 0; idx < messages.length - 1; idx++) {
            outgoingMessages.push(this.toDTO(messages[idx], messages[idx].senderId !== messages[idx + 1].senderId));
        }
        if (messages.length === 1) {
            outgoingMessages.push(this.toDTO(messages[0], true));
        }
        else if (outgoingMessages.length < query.limit && outgoingMessages.length > 0) {
            outgoingMessages.push(this.toDTO(messages[messages.length - 1], true));
            outgoingMessages[outgoingMessages.length - 1].isFirst = true;
        }
        return outgoingMessages;
    }
    toDTO(message, isFirst) {
        return new outgoing_message_dto_1.OutgoingMessageDTO(message.id, message.chatId, message.senderId, message.content, message.sentDate, isFirst);
    }
};
MessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Message')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map