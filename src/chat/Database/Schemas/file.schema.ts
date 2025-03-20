import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';
import { FileTypeEnum } from 'src/chat/Types/database-schmea.models';

export type FileDocument = File & Document;

@Schema({ timestamps: { createdAt: 'uploadedAt' } })
export class File extends Document {
  @Prop({ required: true })
  fileUrl: string;

  @Prop()
  fileName: string;

  @Prop({ type: String, enum: Object.values(FileTypeEnum), required: true })
  type: FileTypeEnum;

  @Prop()
  text?: string;

  @Prop({ type: Types.ObjectId, ref: 'Message', required: true })
  messageId: Types.ObjectId;
}

export const FileSchema = SchemaFactory.createForClass(File);
