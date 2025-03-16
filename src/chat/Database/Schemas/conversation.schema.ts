import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConversationDocument = Conversation & Document;

export enum ConversationType {
  SINGLE = 'single',
  GROUP = 'group',
}

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Conversation extends Document {
  @Prop({ type: String, enum: ConversationType, required: true })
  type: ConversationType;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
