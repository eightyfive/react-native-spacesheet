export function dialCol(dial) {
  return getStyle('column', dial);
}

export function dialRow(dial) {
  return getStyle('row', dial);
}

function getStyle(dir, dial) {
  if (dial < 1 || dial > 9) {
    throw new TypeError('`dial` prop must be between 1 and 9');
  }

  // Main-axis
  const justifyContent = dir === 'row' ? dialX(dial) : dialY(dial);

  // Cross-axis
  const alignItems = dir === 'row' ? dialY(dial) : dialX(dial);

  return {
    justifyContent,
    alignItems,
  };
}

function dialX(dial) {
  if (dial % 3 === 0) return 'flex-end';

  if (dial % 3 === 2) return 'center';

  return 'flex-start';
}

function dialY(dial) {
  if (dial > 6) return 'flex-end';

  if (dial > 3) return 'center';

  return 'flex-start';
}