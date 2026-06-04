import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { AiModule } from '../ai/ai.module';
import { ConversationsModule } from '../conversations/conversations.module';

@Module({
  imports: [
  AiModule,
  ConversationsModule
],
  providers: [ChatGateway],
})
export class ChatModule {}