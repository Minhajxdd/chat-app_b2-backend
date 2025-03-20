import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ConversationType } from 'src/chat/Types/database-schmea.models';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Conversation extends Document {
  @Prop({ type: String, enum: ConversationType, required: true })
  type: ConversationType;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
