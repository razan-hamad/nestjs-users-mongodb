import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'users' })
export class User {
  @Prop({
    required: true,
    unique: true,
    type: String,
  })
  username!: string;

  @Prop({
    required: true,
    unique: true,
    type: String,
  })
  email!: string;

  @Prop({
    required: true,
    type: String,
  })
  password!: string;

  @Prop({
    default: Date.now,
    type: Date,
  })
  createdAt!: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);