export function double(index, spacing, range) {
  return index ? spacing * Math.pow(2, index - 1) : 0;
}
