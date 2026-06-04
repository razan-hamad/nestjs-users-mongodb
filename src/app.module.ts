import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/user/user.module';
import { MongooseModule } from '@nestjs/mongoose'; 
import { ConfigModule } from '@nestjs/config';
import { ChatGateway } from './chat/chat.gateway';
import { AiService } from './ai/ai.service';
import { AiModule } from './ai/ai.module';
import { ChatModule } from './chat/chat.module';
import { ConversationsModule } from './conversations/conversations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
  }),

  MongooseModule.forRoot(
    process.env.MONGO_URI!,
  ),
  UsersModule,
  AiModule,
  ChatModule,
  ConversationsModule
],  
  controllers: [AppController],
  providers: [AppService, ChatGateway, AiService],
})

export class AppModule {}
