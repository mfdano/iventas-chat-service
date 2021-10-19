import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';

import { MessageService } from './service/message.service';

import { UserSchema } from './model/user.model';
import { ChatSchema } from './model/chat.model';
import { MessageSchema } from './model/message.model';


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
    ])
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway, MessageService],
})
export class AppModule {}
