import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { IPasswordUtils } from '../Interface/Utils/password-utils.interface';

@Injectable()
export class PasswordUtils implements IPasswordUtils {
  hashPassword(password: string) {
    console.log(password, '   this is password');
    return bcrypt.hash(password, 10);
  }

  verifyPassword(pword1: string, pword2: string) {
    return bcrypt.compare(pword1, pword2);
  }
}
