import React from 'react';

export default function makeSpaceView(space, BaseView) {
  return function SpaceView({ style, ...props }) {
    const [styles, rest] = space.extract(props);

    if (style) {
      styles.push(style);
    }

    return <BaseView {...rest} style={styles} />;
  };
}
