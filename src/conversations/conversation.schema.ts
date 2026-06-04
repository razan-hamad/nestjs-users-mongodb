import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Conversation {

  @Prop({ required: true })
  question?: string;

  @Prop({ required: true })
  answer?: string;
}

export const ConversationSchema =
  SchemaFactory.createForClass(
    Conversation,
  );