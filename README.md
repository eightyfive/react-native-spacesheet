# `react-native-spacesheet`

Quick & consistent margin / padding. Spacesheeeeeeeeeeet…!

<img src="spaceship.jpg" />

## [DEPRECATED]

Use [`react-native-themesheet`](https://github.com/eightyfive/react-native-themesheet) + [`react-native-col`](https://github.com/eightyfive/react-native-col) instead.

## Installation

```
yarn add react-native-spacesheet
```

## Usage

Create your space sheet given a set of sizes:

```js
// src/space.js
import SpaceSheet from 'react-native-spacesheet';

const space = new SpaceSheet.create([0, 5, 10, 20, 40]);

export const s = space.styles;
export const ss = space.sheets;

export default space;
```

Optionally create a `Box` [view](https://reactnative.dev/docs/view) that accepts spacing shorthands as properties:

```js
// src/box.js
import { makeView } from 'react-native-spacesheet';

import space from './space';

export default makeView(space);


// Usage:
<Box p={3} />
<Box pv="4" />
<Box m="4 2 1 1" />
```

Or use the styles and/or sheets directly in your components:

```js
// src/components/foo.js
import { s, ss } from '../space';

// plain styles (`s.p1`)
const styles = StyleSheet.create({
  ...s.p1,
  flex: 1,
});

// And/or sheets (`ss.mb3`)
const Foo = () => <View style={[ss.mb3, styles.container]} />;
// { marginBottom: 20, padding: 5, flex: 1 }
```

## Auto-generated styles

`space.styles` and `space.sheets` are Proxies that create a style according to a given _alias_.

```js
space.styles.mb0; // { marginBottom: 0 }
```

- `sheets.*` returns style sheets
- `styles.*` returns plain style objects

### Style alias

An alias is made of 3 parts:

- A "spacing": either margin or padding
- A "side": either top, right, bottom, left, vertical or horizontal
- A "size" _index_: `[0-9]`

The "spacing" and "side" parts are aliased like so:

```js
const [, spacing, side, size] = /(m|p)|(t|r|b|l||v|h)?(\d+)/.exec('mb0');

spacing; // "m"
side; // "b"
size; // "0"
```

You can pass your own aliases to the `create` method:

```js
const space = SpaceSheet.create([0, 5, 10, 20, 40], myAliases);
```

But here are the default ones:

```js
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
```

## Size "indexes"

Margin and padding sizes are inspired by [Bootstrap v4 spacing utility system](https://getbootstrap.com/docs/4.0/utilities/spacing/).

Meaning that you don't use the actual size for your styles, but its index instead:

```js
const space = SpaceSheet.create([0, 5, 10, 20, 40]);
//                    indexes = [0, 1,  2,  3,  4]

space.styles.mb1; // { marginBottom: 5 }
space.sheets.pt3; // { paddingTop: 20 }
```

This helps you to keep spacing consistent throughout your project.

## API

### `create(sizes, aliases = defaultAliases)`

Using the default aliases:

```js
const space = SpaceSheet.create([0, 5, 10, 15, 20]);

space.sizes; // [0, 5, 10, 15, 20]
//              [0, 1,  2,  3,  4]
```

Or specifying yours:

```js
const space = SpaceSheet.create([0, 5, 10, 15, 20], {
  Mar: 'margin',
  MarT: 'marginTop',
  MarR: 'marginRight',
  MarB: 'marginBottom',
  MarL: 'marginLeft',
  MarY: 'marginVertical',
  MarX: 'marginHorizontal',
  Pad: 'padding',
  PadT: 'paddingTop',
  PadR: 'paddingRight',
  PadB: 'paddingBottom',
  PadL: 'paddingLeft',
  PadY: 'paddingVertical',
  PadX: 'paddingHorizontal',
});
```

It will work with the following aliases:

```
MarT, MarR, MarB, ..., PadT, ..., PadY, PadX.
```

### `sheets` (Proxy)

Creates (and cache) aliased style sheets on-the-fly.

```js
const ss = space.sheets;

<View style={ss.mb0} />;
```

### `styles` (Proxy)

Creates (and cache) aliased plain styles on-the-fly.

```js
const s = space.styles;

const styles = StyleSheet.create({
  container: {
    ...s.p3,
    flex: 3,
    flexDirection: 'column-reverse',
    // ...
  },
});

<View style={styles.container} />;
```

## Col / Row – "dial"

You can also specify quick flexbox styles thanks to the magic "dial" property:

```js
space.sheets.row5;
space.styles.col8;
// ...
```

`(row|col)` gives the main axis direction, while the following `[1-9]` number specifies the "dial number" to align / justify the children against.

See more information about the "dial number" syntax in the [react-native-col](https://github.com/eightyfive/react-native-col) project documentation.

## Flex

The `f([0-9])` property assigns quick flex grow values:

```js
space.sheets.f1; // { flex: 1 }
space.styles.f2; // { flex: 2 }
// Etc...
```

## Credits

- [Aleut CSS](http://aleutcss.github.io/documentation/utilities-spacing/) for the initial idea
- [`react-native-row`](https://github.com/hyrwork/react-native-row/pull/13) for getting me started
- [Bootstrap v4](https://getbootstrap.com/docs/4.0/utilities/spacing/) for the "Size index" idea
