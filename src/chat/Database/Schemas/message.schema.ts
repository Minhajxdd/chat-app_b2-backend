import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MessageDocument = Message & Document;

export enum MessageType {
  TEXT = 'text',
  FILE = 'file',
}

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Message extends Document{
  @Prop({ type: Types.ObjectId, ref: 'Conversation', required: true })
  conversation: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  sender: Types.ObjectId;

  @Prop({ type: String, enum: MessageType, default: MessageType.TEXT })
  messageType: MessageType;

  @Prop()
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'File', default: null })
  file?: Types.ObjectId;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
