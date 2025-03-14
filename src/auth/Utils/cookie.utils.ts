import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import configuration from 'src/config/configuration';
import { ICookieUtils } from '../Interface/Utils/cookie-utils.respository';

@Injectable()
export class CookieUtils implements ICookieUtils {
  setCookie(
    res: Response,
    cookies: { name: string; value: string; options?: Record<string, any> }[],
  ): void {
    const isProduction =
      configuration().node_environment.node_env === 'production';
    const domain = configuration().domain.domain_name;

    const cookieHeaders = cookies.map(({ name, value, options }) => {
      let option = `${name}=${value};`;

      if (name === 'refresh_token') {
        option += 'HttpOnly; ';
      }

      if (options?.maxAge) {
        option += `Max-Age=${options.maxAge};`;
      }

      option += `Path=/;`;

      option += `SameSite=${isProduction ? 'None' : 'Lax'};`;

      if (isProduction) {
        option += 'Secure;';
      }

      if (domain) {
        // option += `Domain=${domain};`;
      }

      return option;
    });

    res.setHeader('Set-Cookie', cookieHeaders);
  }

  clearCookies(res: Response, cookieNames: string[]): void {
    const isProduction =
      configuration().node_environment.node_env === 'production';
    const domain = configuration().domain.domain_name;

    const cookieHeaders = cookieNames.map((name) => {
      let option = `${name}=; Path=/; Max-Age=0;`;

      option += `SameSite=${isProduction ? 'None' : 'Lax'};`;

      if (isProduction) {
        option += 'Secure;';
      }

      if (domain) {
        // option += `Domain=${domain};`;
      }

      return option;
    });

    res.setHeader('Set-Cookie', cookieHeaders);
  }
}
