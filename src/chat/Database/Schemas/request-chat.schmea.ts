import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  ConversationType,
  MessageType,
} from 'src/chat/Types/database-schmea.models';

@Schema({ timestamps: { createdAt: 'createdAt' } })
export class RequestChat extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  requestedBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  requestedTo: Types.ObjectId;

  @Prop({ type: String, enum: ConversationType, required: true })
  type: ConversationType;

  @Prop({ type: Types.ObjectId, ref: 'conversations' })
  conversation?: Types.ObjectId;
}

export const RequestChatSchema = SchemaFactory.createForClass(RequestChat);
