export function double(index, amount, range) {
  return index ? amount * Math.pow(2, index - 1) : 0;
}

export function linear(index, amount) {
  return amount * index;
}

export function multiply(index, amount, range) {
  return amount * index * range;
}
