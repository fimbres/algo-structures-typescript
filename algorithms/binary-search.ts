function binarySearch (numbers: number[], target: number) {
  let start = 0;
  let end = numbers.length - 1;
  let pivot = Math.floor((start + end) / 2);

  while(start < end) {
    if(numbers[pivot] === target) {
      return pivot;
    }
    else if(numbers[pivot] > target) {
      end = pivot - 1;
    }
    else {
      start = pivot + 1;
    }

    pivot = Math.floor((start + end) / 2);
  }

  return -1;
}

const numbers = [170, 970, 802, -2, 24, 45, 75, 66];

console.log(binarySearch(numbers, -454));
