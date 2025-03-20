import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { RequestActions } from '../Types/dto.models';

export class RequestActionsDto {
  @IsNotEmpty()
  @IsEnum(RequestActions, { message: 'must be a valid action' })
  action: RequestActions;

  @IsNotEmpty()
  @IsString()
  requestId: string;
}
