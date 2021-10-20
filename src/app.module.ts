import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';

import { MessageService } from './service/message.service';
import { UserService } from './service/user.service';
import { AuthService } from './service/auth.service';
import { LocalStrategy } from './auth/local.strategy';
import { JwtStrategy } from './auth/jwt.strategy';

import { UserSchema } from './model/user.model';
import { ChatSchema } from './model/chat.model';
import { MessageSchema } from './model/message.model';

import { UserController } from './controller/user.controller';
import { MessageController } from './controller/message.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI')
      }),
      inject: [ConfigService]
    }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Chat', schema: ChatSchema },
      { name: 'Message', schema: MessageSchema },
    ]),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService]
    }),
  ],
  controllers: [AppController, UserController, MessageController],
  providers: [AppService, AppGateway, MessageService, UserService, AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AppModule {}
