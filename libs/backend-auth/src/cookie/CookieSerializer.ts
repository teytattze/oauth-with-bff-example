import { CookieSerializeOptions } from './CookieSerializeOptions';

export interface CookieSerializer {
  serialize: (
    name: string,
    value: string,
    options: CookieSerializeOptions,
  ) => string;
}
