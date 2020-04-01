import { StyleSheet } from 'react-native';
import createProxyPolyfill from 'proxy-polyfill/src/proxy';

import {
  createCache,
  createDialStyle,
  createSpaceStyle,
  reDial,
  reSpace,
} from './utils';

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
    if (!cache[prop]) {
      if (reDial.test(prop)) {
        cache[prop] = createDialStyle(prop);
      }

      if (reSpace.test(prop)) {
        cache[prop] = this.createSpaceStyle(prop);
      }
    }

    if (!cache[prop]) {
      throw new Error(`Invalid space property: ${prop}`);
    }

    return cache[prop];
  };

  createSpaceStyle = (prop) => {
    const [, alias, hand] = reSpace.exec(prop);

    const property = this.aliases[alias];

    if (!property) {
      throw new Error(`Invalid space alias: ${prop}`);
    }

    const sizes = hand.split('').map((index) => {
      const size = this.sizes[parseInt(index, 10)];

      if (!size) {
        throw new Error(`Invalid space size index: ${prop}`);
      }

      return size;
    });

    const isPartial = property !== 'margin' && property !== 'padding';

    if (isPartial && sizes.length > 1) {
      throw new Error(`Invalid space alias size: ${prop}`);
    }

    return createSpaceStyle(property, sizes);
  };

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
