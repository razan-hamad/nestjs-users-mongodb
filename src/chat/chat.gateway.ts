import { OnModuleInit } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { AiService } from '../ai/ai.service';

@WebSocketGateway()
export class ChatGateway implements OnModuleInit {

constructor(
  private readonly aiService: AiService,
) {}

@SubscribeMessage('askAI')
async askAI(
  @ConnectedSocket() client: Socket,
  @MessageBody() message: string,
) {
  console.log(
    'ASK AI FROM:',
    client.id,
  );

  const response =
    await this.aiService.ask(message);

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

  @SubscribeMessage('message')
  handleMessage(
    client: any,
    payload: any,
  ) {
    console.log(payload);

    return payload;
  }

  @SubscribeMessage('newSentMessage')
  newSentMessage(
    @MessageBody() message: string,
  ) {
    this.server.emit(
      'newSentMessage',
      message,
    );
  }

@SubscribeMessage('sentSingleMessage')
sentSingleMessage(@MessageBody() data: any) {

  const socket =this.server.sockets.sockets.get(data.targetClientID);

  socket?.emit(
    'privateMessage',
    data.message,
  );
}
}