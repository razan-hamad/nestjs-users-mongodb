import { NotFoundException, OnModuleInit } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { AiService } from '../ai/ai.service';
import { ConversationsService } from '../conversations/conversations.service';

@WebSocketGateway()
export class ChatGateway implements OnModuleInit {

constructor(
  private readonly aiService: AiService,
  private readonly conversationsService:
    ConversationsService,
) {}
@SubscribeMessage('askAI')
async askAI(
  @ConnectedSocket() client: Socket,
  @MessageBody() message: string,
) {

  const response =await this.aiService.ask(message);
  if(!response){
   throw new NotFoundException(
         'No response from AI',
       );
  }
  await this.conversationsService.create(message,response);
  client.emit(
    'aiResponse',
    response,
  );
}

  @WebSocketServer()
  server!: Server;

  onModuleInit() {
    this.server.on('connection', (client) => {
      console.log(
        `Client connected: ${client.id}`,
      );
    });
  }

  // Handle incoming messages from clients
  @SubscribeMessage('message')
  handleMessage(
    client: any,
    payload: any,
  ) {
    console.log(payload);

    return payload;
  }

  // Handle broadcasting messages to all clients
  @SubscribeMessage('newSentMessage')
  newSentMessage(
    @MessageBody() message: string,
  ) {
    this.server.emit(
      'newSentMessage',
      message,
    );
  }

  // Handle private messages
@SubscribeMessage('sentSingleMessage')
sentSingleMessage(@MessageBody() data: any) {

  const socket =this.server.sockets.sockets.get(data.targetClientID);

  socket?.emit(
    'privateMessage',
    data.message,
  );
}
}