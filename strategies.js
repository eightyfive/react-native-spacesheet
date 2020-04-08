export function double(index, amount) {
  return index ? amount * Math.pow(2, index - 1) : 0;
}

export function linear(index, amount) {
  return amount * index;
}
