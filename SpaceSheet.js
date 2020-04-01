import { StyleSheet } from 'react-native';
import createProxyPolyfill from 'proxy-polyfill/src/proxy';

import { createCache, createDialStyle, reDial, reSpace } from './utils';

const Proxy = createProxyPolyfill();

export default class SpaceSheet {
  constructor(sizes, aliases) {
    this.sizes = sizes;
    this.aliases = aliases;

    this.styles = new Proxy(createCache(sizes.length, Object.keys(aliases)), {
      get: this.createStyle,
    });

    this.styleSheets = new Proxy(
      createCache(sizes.length, Object.keys(aliases)),
      {
        get: this.createStyleSheet,
      },
    );
  }

  createStyle = (cache, prop) => {
    if (cache[prop] === false) {
      if (reDial.test(prop)) {
        cache[prop] = createDialStyle(prop);
      } else if (reSpace.test(prop)) {
        cache[prop] = this.createSpaceStyle(prop);
      }
    }

    return cache[prop];
  };

  createSpaceStyle(prop) {
    const [, alias, size] = reSpace.exec(prop);

    const property = this.aliases[alias];

    return {
      [property]: this.sizes[parseInt(size, 10)],
    };
  }

  createStyleSheet = (cache, prop) => {
    let styleSheet = cache[prop];

    if (!styleSheet) {
      styleSheet = cache[prop] = StyleSheet.create({
        [prop]: this.styles[prop],
      });
    }

    return styleSheet[prop];
  };
}
