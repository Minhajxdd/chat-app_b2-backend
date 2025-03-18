import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class ChatGroup extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Conversation', required: true })
  conversation: Types.ObjectId;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: [Types.ObjectId], required: true })
  admins: Types.ObjectId[];

}

export const ChatGroupSchema = SchemaFactory.createForClass(ChatGroup);
