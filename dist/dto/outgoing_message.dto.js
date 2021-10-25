"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutgoingMessageDTO = void 0;
class OutgoingMessageDTO {
    constructor(id, chatId, senderId, content, sentDate, isFirst) {
        this.id = id;
        this.chatId = chatId;
        this.senderId = senderId;
        this.content = content;
        this.sentDate = sentDate;
        this.isFirst = isFirst;
    }
}
exports.OutgoingMessageDTO = OutgoingMessageDTO;
//# sourceMappingURL=outgoing_message.dto.js.map