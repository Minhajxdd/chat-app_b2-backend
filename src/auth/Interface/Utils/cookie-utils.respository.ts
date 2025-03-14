import { Response } from 'express';

export interface ICookieUtils {
  setCookie(
    res: Response,
    cookies: { name: string; value: string; options?: Record<string, any> }[],
  ): void;

  clearCookies(res: Response, cookieNames: string[]): void;
}
