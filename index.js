import { StyleSheet } from 'react-native';
import { dialRow, dialCol } from 'react-native-col/dial';
import _mapKeys from 'lodash.mapkeys';
import _get from 'lodash.get';
//
import defaultStrategy from './strategy';

const spaces = Object.values(defaultStrategy.aliases);

const isSpace = new RegExp(`^(${spaces.join('|')})$`);
const isSpaceArray = /^(margin|padding)$/;
const isDial = /^(row|col)([1-9])$/;
const splitProp = /^([a-zA-Z]+)(\d+)$/;

export default class SpaceSheet {
  sizes = [];
  strategy = {};

  _style = null;
  _sheet = null;

  constructor(strategy = defaultStrategy) {
    this.strategy = strategy;
  }

  get style() {
    if (!this._style) {
      this._style = new Proxy({}, { get: this._getStyle });
    }

    return this._style;
  }

  get sheet() {
    if (!this._sheet) {
      this._sheet = new Proxy({}, { get: this._getSheet });
    }

    return this._sheet;
  }

  setSizes(sizes) {
    this.sizes = sizes;
  }

  setSpacing(amount, range = 5) {
    this.sizes = [];

    for (let index = 1; index <= range; index++) {
      this.sizes.push(this.strategy.nextSize(amount, index, range));
    }

    this.sizes.unshift(0);
  }

  getStyle({ ...style }) {
    Object.keys(style)
      .filter(name => isSpace.test(name))
      .forEach(name => {
        const val = style[name];

        if (Array.isArray(val)) {
          Object.assign(style, this._getArrayStyle(val, name));

          delete style[name];
        } else {
          style[name] = this._getSize(val);
        }
      });

    return style;
  }

  _getStyle = (cache, prop) => {
    let style = cache[prop];

    if (style) return style;

    let result;

    result = isDial.exec(prop);

    // Is dial?
    if (result) {
      const [, dialType, dial] = result;

      if (dialType === 'col') {
        return dialCol(dial);
      }

      return dialRow(dial);
    }

    result = splitProp.exec(prop);

    if (!result) return; // undefined

    const [, alias, size] = result;

    const unalias = this.strategy.aliases[alias];
    const isAlias = typeof unalias !== 'undefined';
    const isSize = size.length === 1;
    const isSizes =
      size.length > 1 && size.length <= 4 && isSpaceArray.test(unalias);

    if (isAlias && (isSize || isSizes)) {
      style = cache[prop] = this._getAliasStyle(alias, size);

      return style;
    }

    // return undefined;
  };

  _getSheet = (cache, prop) => {
    let sheet = cache[prop];

    if (!sheet) {
      const style = this.style[prop];

      if (!style) return; // undefined

      sheet = cache[prop] = StyleSheet.create({ [prop]: style });
    }

    return sheet[prop];
  };

  _getAliasStyle(alias, size) {
    const unalias = this.strategy.aliases[alias];

    return this.getStyle({
      [unalias]: size.length > 1 ? size.split('') : Number(size),
    });
  }

  _getArrayStyle(arr, type) {
    const sizes = arr.map(val => this._getSize(val));

    let sides = {};

    switch (sizes.length) {
      case 2:
        sides = {
          Vertical: sizes[0],
          Horizontal: sizes[1],
        };
        break;

      case 3:
        sides = {
          Top: sizes[0],
          Horizontal: sizes[1],
          Bottom: sizes[2],
        };
        break;

      case 4:
        sides = {
          Top: sizes[0],
          Right: sizes[1],
          Bottom: sizes[2],
          Left: sizes[3],
        };
        break;

      default:
        break;
    }

    return _mapKeys(sides, (size, side) => `${type}${side}`);
  }

  _getSize(val) {
    return _get(this.sizes, val, val);
  }
}
