export interface IPasswordUtils {
  hashPassword(password: string);
  verifyPassword(pword1: string, pword2: string);
}
