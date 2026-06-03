import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnModuleInit {

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
sentSingleMessage(
  @MessageBody() data: any,
) {

  console.log('Target:', data.targetClientID);

  const socket =
    this.server.sockets.sockets.get(
      data.targetClientID,
    );

  console.log(socket?.id);

  socket?.emit(
    'privateMessage',
    data.message,
  );
}
}