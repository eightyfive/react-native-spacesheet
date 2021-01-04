import { StyleSheet } from 'react-native';
import createProxyPolyfill from 'proxy-polyfill/src/proxy';
import createDialStyle from 'react-native-col/dial';

import { createCache, reDial, reFlex, reSpace } from './utils';

const Proxy = createProxyPolyfill();

const o = Object;

export default class SpaceSheet {
  constructor(sizes, aliases) {
    this.aliases = aliases;
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
        const indexes = index.split('');

        const unalias = this.aliases[alias];

        if (indexes.length === 1) {
          cache[prop] = {
            [unalias]: this.sizes[indexes[0]],
          };
        }

        if (indexes.length === 2) {
          cache[prop] = {
            [`${unalias}Vertical`]: this.sizes[indexes[0]],
            [`${unalias}Horizontal`]: this.sizes[indexes[1]],
          };
        }

        if (indexes.length === 3) {
          cache[prop] = {
            [`${unalias}Top`]: this.sizes[indexes[0]],
            [`${unalias}Horizontal`]: this.sizes[indexes[1]],
            [`${unalias}Bottom`]: this.sizes[indexes[2]],
          };
        }

        if (indexes.length === 4) {
          cache[prop] = {
            [`${unalias}Top`]: this.sizes[indexes[0]],
            [`${unalias}Right`]: this.sizes[indexes[1]],
            [`${unalias}Bottom`]: this.sizes[indexes[2]],
            [`${unalias}Left`]: this.sizes[indexes[3]],
          };
        }
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

const defaultAliases = {
  m: 'margin',
  mt: 'marginTop',
  mr: 'marginRight',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mv: 'marginVertical',
  mh: 'marginHorizontal',
  p: 'padding',
  pt: 'paddingTop',
  pr: 'paddingRight',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  pv: 'paddingVertical',
  ph: 'paddingHorizontal',
};

SpaceSheet.create = function createSpaceSheet(sizes, aliases = defaultAliases) {
  return new SpaceSheet(sizes, aliases);
};
