const countDigits = (number: number) => {
  if(number === 0) return 1;

  return Math.floor(Math.log10(Math.abs(number))) + 1;
}

const getMostDigits = (numbers: number[]) => {
  let maxDigits = 0;

  for(let value of numbers) {
    maxDigits = Math.max(maxDigits, countDigits(value));
  }

  return maxDigits;
}

const getDigit = (value: number, index: number) => {
  return Math.floor(Math.abs(value) / Math.pow(10, index)) % 10;
}

function radixSort(numbers: number[]) {
  const maxDigitCount = getMostDigits(numbers);
  let result: number[] = [];
  
  for(let i = 0; i < maxDigitCount; i++) {
    let digitBuckets: number[][] = Array.from({ length: 10 }, () => []);

    for(let j = 0; j < numbers.length; j++) {
      let digit = getDigit(numbers[j], i);

      digitBuckets[digit].push(numbers[j]);
    }
    
    result = ([] as number[]).concat(...digitBuckets);
  }

  return result;
}

const numbers = [170, 970, 802, -2, 24, 45, 75, 66, 802];

console.log("Before: ", numbers);
console.log("After: ", radixSort(numbers));
