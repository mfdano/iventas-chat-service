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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const get_messages_dto_1 = require("../dto/get_messages.dto");
const chat_dto_1 = require("../dto/chat.dto");
const user_dto_1 = require("../dto/user.dto");
const message_service_1 = require("./message.service");
const user_service_1 = require("./user.service");
let ChatService = class ChatService {
    constructor(chatModel, messageService, userService) {
        this.chatModel = chatModel;
        this.messageService = messageService;
        this.userService = userService;
    }
    async findByUserId(query) {
        var e_1, _a;
        const chat = await this.chatModel
            .findOne({ userIds: query.userId })
            .exec();
        const messages = await this.messageService.findByChatId(new get_messages_dto_1.GetMessagesDTO(chat.id, query.lastDate, query.limit));
        const users = [];
        try {
            for (var _b = __asyncValues(chat.userIds.map(async (id) => await this.userService.findOneById(id))), _c; _c = await _b.next(), !_c.done;) {
                const _user = _c.value;
                users.push(_user);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return new chat_dto_1.ChatDTO(chat.id, messages, users.map((user) => new user_dto_1.UserDTO(user.id, user.name, user.phoneNumber, user.imageProfileSRC, user.age, user.email, user.priority, user.problemDescription, user.promoDescription, user.CURP, user.notes)));
    }
};
ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Chat')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        message_service_1.MessageService,
        user_service_1.UserService])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map