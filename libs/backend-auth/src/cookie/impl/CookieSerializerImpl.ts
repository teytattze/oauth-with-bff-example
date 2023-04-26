import * as cookie from 'cookie';

import { CookieSerializeOptions } from '../CookieSerializeOptions';
import { CookieSerializer } from '../CookieSerializer';

export class CookieSerializerImpl implements CookieSerializer {
  serialize(name: string, value: string, options: CookieSerializeOptions) {
    return cookie.serialize(name, value, options);
  }
}
