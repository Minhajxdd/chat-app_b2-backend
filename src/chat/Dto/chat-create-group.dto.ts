import { IsNotEmpty, IsString } from 'class-validator';

export class ChatCreateGroupDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
