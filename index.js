import { View } from 'react-native';

import SpaceSheet from './SpaceSheet';
import { propsToStyles } from './utils';

export function makeView(space) {
  return ({ style, ...rest }) => {
    const [props, styles] = propsToStyles(rest, space);

    return <View {...props} style={[...styles, style]} />;
  };
}

export default SpaceSheet;
