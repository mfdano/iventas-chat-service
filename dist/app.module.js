"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const config_2 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const app_gateway_1 = require("./app.gateway");
const message_service_1 = require("./service/message.service");
const chat_service_1 = require("./service/chat.service");
const user_service_1 = require("./service/user.service");
const auth_service_1 = require("./service/auth.service");
const local_strategy_1 = require("./auth/local.strategy");
const jwt_strategy_1 = require("./auth/jwt.strategy");
const user_model_1 = require("./model/user.model");
const chat_model_1 = require("./model/chat.model");
const message_model_1 = require("./model/message.model");
const user_controller_1 = require("./controller/user.controller");
const message_controller_1 = require("./controller/message.controller");
const chat_controller_1 = require("./controller/chat.controller");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_2.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRootAsync({
                useFactory: (configService) => ({
                    uri: configService.get('MONGO_URI')
                }),
                inject: [config_1.ConfigService]
            }),
            mongoose_1.MongooseModule.forFeature([
                { name: 'User', schema: user_model_1.UserSchema },
                { name: 'Chat', schema: chat_model_1.ChatSchema },
                { name: 'Message', schema: message_model_1.MessageSchema },
            ]),
            jwt_1.JwtModule.registerAsync({
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET_KEY'),
                    signOptions: { expiresIn: configService.get('JWT_EXPIRATION_TIME') },
                }),
                inject: [config_1.ConfigService]
            }),
        ],
        controllers: [
            app_controller_1.AppController,
            user_controller_1.UserController,
            message_controller_1.MessageController,
            chat_controller_1.ChatController
        ],
        providers: [
            app_service_1.AppService,
            app_gateway_1.AppGateway,
            message_service_1.MessageService,
            user_service_1.UserService,
            auth_service_1.AuthService,
            chat_service_1.ChatService,
            local_strategy_1.LocalStrategy,
            jwt_strategy_1.JwtStrategy
        ],
        exports: [auth_service_1.AuthService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map