import { StyleSheet } from 'react-native';
import createProxyPolyfill from 'proxy-polyfill/src/proxy';

import { createCache, createDialStyle, reDial, reSpace } from './utils';

const Proxy = createProxyPolyfill();
const { keys: _keys } = Object;

export default class SpaceSheet {
  constructor(sizes, aliases) {
    this.sizes = sizes;
    this.aliases = aliases;

    this.styles = new Proxy(createCache(sizes.length, _keys(aliases)), {
      get: this.createStyle,
    });

    this.sheets = new Proxy(createCache(sizes.length, _keys(aliases)), {
      get: this.createSheet,
    });
  }

  createStyle = (cache, prop) => {
    if (cache[prop] === false) {
      if (reDial.test(prop)) {
        cache[prop] = createDialStyle(prop);
      } else if (reSpace.test(prop)) {
        const [, alias, size] = reSpace.exec(prop);

        const unalias = this.aliases[alias];
        const value = this.sizes[parseInt(size, 10)];

        cache[prop] = {
          [unalias]: value,
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
