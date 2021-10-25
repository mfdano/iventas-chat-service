"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSchema = void 0;
const mongoose_1 = require("mongoose");
exports.MessageSchema = new mongoose_1.Schema({
    chatId: String,
    senderId: String,
    content: String,
    sentDate: Number,
});
//# sourceMappingURL=message.model.js.map