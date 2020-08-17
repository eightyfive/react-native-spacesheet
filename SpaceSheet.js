import { StyleSheet } from 'react-native';
import createProxyPolyfill from 'proxy-polyfill/src/proxy';
import createDialStyle from 'react-native-col/dial';

import { createCache, reDial, reFlex, reSpace } from './utils';

const Proxy = createProxyPolyfill();
const o = Object;

export default class SpaceSheet {
  constructor(sizes, aliases) {
    this.aliases = aliases;
    this.defaultSize = Math.round(sizes.length / 2);
    this.sizes = sizes;

    this.styles = new Proxy(createCache(sizes.length, o.keys(aliases)), {
      get: this.createStyle,
    });

    this.sheets = new Proxy(createCache(sizes.length, o.keys(aliases)), {
      get: this.createSheet,
    });
  }

  createStyle = (cache, prop) => {
    if (cache[prop] === false) {
      if (reFlex.test(prop)) {
        const [, grow] = reFlex.exec(prop);

        cache[prop] = { flex: +grow };
      } else if (reDial.test(prop)) {
        const [, dir, dial] = reDial.exec(prop);

        cache[prop] = createDialStyle(dir === 'col' ? 'column' : 'row', dial);
      } else if (reSpace.test(prop)) {
        const [, alias, index] = reSpace.exec(prop);

        const unalias = this.aliases[alias];
        const size = this.sizes[index];

        cache[prop] = {
          [unalias]: size,
        };
      }
    }

    return cache[prop];
  };

  createSheet = (cache, prop) => {
    let sheet = cache[prop];

    if (!sheet) {
      sheet = cache[prop] = StyleSheet.create({
        [prop]: this.styles[prop],
      });
    }

    return sheet[prop];
  };
}
