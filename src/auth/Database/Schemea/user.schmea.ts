import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ default: false })
  isAdmin?: boolean;

  @Prop({ default: false })
  isBlocked?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
