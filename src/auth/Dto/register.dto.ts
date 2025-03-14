import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*[0-9@$!%*?&])[A-Za-z0-9@$!%*?&]*$/, {
    message:
      'Password Should Be 6 Characters & Should Contain One Number or Symbol',
  })
  password: string;
}
