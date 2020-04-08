# react-native-spacesheet

Quick & consistent margin / padding. Spacesheeeeeeeeeeet…!

<img src="spaceship.jpg" />

## Installation

```
$ yarn add react-native-spacesheet
```

## Usage

```js
// src/space.js
import SpaceSheet from 'react-native-spacesheet';

const space = SpaceSheet.create([0, 5, 10, 20, 40]);

export const s = space.styles;
export const ss = space.sheets;

// src/components/foo.js
import { s, ss } from '../space';

const styles = StyleSheet.create({
  ...s.p1,
  flex: 1,
});

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
const [ , spacing, side, size] = /(m|p)|(t|r|b|l||v|h)?(\d)/.exec('mb0');

spacing; // "m"
side; // "b"
size; // "0"
```

Aliases are fully configurable (see [`create` API](#create-options---custom-aliases)) but here are the default ones:

```json
{
  "spacings": {
    "m": "margin",
    "p": "padding"
  },
  "sides": {
    "": "",
    "t": "Top",
    "r": "Right",
    "b": "Bottom",
    "l": "Left",
    "v": "Vertical",
    "h": "Horizontal"
  }
}
```

Which when combined, gives us:

```
mt, mr, mb, ..., pt, ..., pv, ph.
```

## Size "indexes"

Margin and padding sizes are inspired by [Bootstrap v4 spacing utility system](https://getbootstrap.com/docs/4.0/utilities/spacing/).

Meaning that you don't pass the actual size value to your styles, but its index instead:

```js
const space = SpaceSheet.create([0, 5, 10, 20, 40]);
//                    indexes = [0, 1,  2,  3,  4]

space.styles.mb1; // { marginBottom: 5 }
space.sheets.pt3; // { paddingTop: 20 }
```

This helps you keep spacing consistency throughout your project.

## Spacing strategies

You can also define your set of sizes with "strategies":

```js
// SpaceSheet.create(amount, length, strategy);
const space = SpaceSheet.create(5, 6, 'double');

space.sizes; // [0, 5, 10, 20, 40, 80]
//              [0, 1,  2,  3,  4,  5]
```

### Available strategies

#### Double

```js
const space = SpaceSheet.create(5, 4, 'double');

space.sizes; // [0, 5, 10, 20]
//              [0, 1,  2,  3]
```

#### Linear

```js
const space = SpaceSheet.create(2, 6, 'linear');

space.sizes; // [0, 2, 4, 6, 8, 10]
//              [0, 1, 2, 3, 4,  5]
```

### Custom strategy

You can also pass a `function` instead of a strategy name:

```js
const space = SpaceSheet.create(4, 4, (index, amount) => index * amount * 10);

space.sizes; // [0, 40, 80, 120]
//              [0,  1,  2,   3]
```

## API

### `create`

#### `create(sizes)`

```js
const space = SpaceSheet.create([0, 5, 10, 15, 20]);

space.sizes; // [0, 5, 10, 15, 20]
//              [0, 1,  2,  3,  4]
```

#### `create(amount, length, strategy)`

```js
const space = SpaceSheet.create(5, 5, 'linear');

space.sizes; // [0, 5, 10, 15, 20]
//              [0, 1,  2,  3,  4]
```

#### `create(..., options = {})` (Custom aliases)

```js
const space = SpaceSheet.create([0, 5, 10, 15, 20], {
  spacings: {
    Mar: 'margin',
    Pad: 'padding',
  },
  sides: {
    '': '',
    T: 'Top',
    R: 'Right',
    B: 'Bottom',
    L: 'Left',
    V: 'Vertical',
    H: 'Horizontal',
  },
});
```

Will work with the following aliases:

```
MarT, MarR, MarB, ..., PadT, ..., PadV, PadH.
```

### `sheets` (Proxy)

Creates (and cache) aliased style sheets on-the-fly.

```js
<View style={space.sheets.mb0} />
```

### `styles` (Proxy)

Creates (and cache) aliased plain styles on-the-fly.

```js
<View style={styles.container} />;

const styles = StyleSheet.create({
  container: {
    ...space.styles.p3,
    flex: 3,
    flexDirection: 'column-reverse',
    // ...
  },
});
```

## Col / Row – "dial"

You can also specify quick flexbox styles thanks to the magic "dial" property:

```js
space.sheets.row5;
space.styles.col8;
// ...
```

`(row|col)` gives the main axis direction, while the following `[1-9]` number specifies the [dial number](https://github.com/eightyfive/react-native-col) to align / justify the children against.

See more information about the "dial" shorthand syntax in the [react-native-col](https://github.com/eightyfive/react-native-col) project documentation.

## Flex

The `flex([1-9])` property assigns quick flex grow values:

```js
space.sheets.flex1; // { flex: 1 }
space.styles.flex2; // { flex: 2 }
// Etc...
```

## Credits

- [Aleut CSS](http://aleutcss.github.io/documentation/utilities-spacing/) for the initial idea
- [`react-native-row`](https://github.com/hyrwork/react-native-row/pull/13) for getting me started
- [Bootstrap v4](https://getbootstrap.com/docs/4.0/utilities/spacing/) for the "Size index" idea
