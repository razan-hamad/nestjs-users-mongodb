import { Injectable } from '@nestjs/common';
import { Conversation } from './conversation.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ConversationsService {

    constructor(
  @InjectModel(Conversation.name) private conversationModel:Model<Conversation>) {}

  async create(question: string,answer: string) {

  const conversation =new this.conversationModel({question,answer});

  return await conversation.save();
}
}
