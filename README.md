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
import { ss } from '../space';

const Foo = () => <View style={ss.mb3} />;
// { marginBottom: 20 }
```

## Size "indexes"

Margin and padding sizes are inspired by [Bootstrap v4 spacing utility system](https://getbootstrap.com/docs/4.0/utilities/spacing/).

Meaning that you don't pass the actual size value to your styles, but its index instead:

```js
const space = SpaceSheet.create([0, 5, 10, 20, 40]);
//                    indexes = [0, 1,  2,  3,  4]

space.styles.mb1; // marginBottom: 5

space.sheets.pt4; // paddingTop: 40

space.getStyle({
  mt: 3, // marginTop: 20
  ph: 1, // paddingHorizontal: 5
});
```

This helps you keep a consistent spacing strategy in your React Native project.

## Custom aliases

See API `options`.

## Spacing strategies

You can also define your set of sizes with "strategies":

```js
// SpaceSheet.create(amount, range, strategyName);
const space = SpaceSheet.create(5, 6, 'double');
// sizes = [0, 5, 10, 20, 40, 80]
//         [0, 1,  2,  3,  4,  5]
```

### Available strategies

- `5, 4, 'double'`: `[0, 5, 10, 20]`
- `2, 6, 'linear'`: `[0, 2, 4, 6, 8, 10]`

### Custom strategy

You can also pass a `function` instead of a strategy name as the last argument:

```js
const space = SpaceSheet.create(
  4,
  4,
  (index, amount, range) => index * amount + 3,
);

// sizes = [0, 7, 11, 15]
//         [0, 1,  2,  3]
```

## API

### `create(sizes, options = {})`

```js
const space = SpaceSheet.create([0, 5, 10, 15, 20]);
```

### `create(amount, range, strategy, options = {})`

```js
const space = SpaceSheet.create(5, 5, 'linear');
```

### `options` (Custom aliases)

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

The aliases will be:

```json
{
  "MarT": "marginTop",
  "MarR": "marginRight",
  "PadT": "paddingTop",
  "PadV": "paddingVertical"
}
```

### `getStyle`

```js
space.getStyle({
  mt: 2, // <— Will be replaced by marginTop: <size at index `2`>
  flex: 3,
});

space.getStyle({
  marginTop: 2, // <— Will NOT be replaced
  flex: 3,
});
```

### `sheets` (Proxy)

Style sheet is created (and cached) on-demand.

```js
<View style={space.sheets.mb0} />
```

### `styles` (Proxy)

Plain style is created (and cached) on-demand.

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

`(row|col)` gives the main axis direction, while the following `[1-9]` number specifies the [dial number](https://github.com/eightyfive/react-native-col) to align/justify the children against.

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
