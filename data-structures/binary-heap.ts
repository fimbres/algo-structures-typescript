class MaxBinaryHeap {
  values: number[];

  constructor() {
    this.values = [];
  }

  insert(value: number) {
    this.values.push(value);

    let index = this.values.length - 1;
    let parentIndex = Math.floor((index - 1) / 2);

    while(this.values[parentIndex] < this.values[index]) {
      [this.values[parentIndex], this.values[index]] = [this.values[index], this.values[parentIndex]];

      index = parentIndex;
      parentIndex = Math.floor((index - 1) / 2);
    }

    return this;
  }

  extractMax() {
    if(this.values.length === 0) return null;
    if(this.values.length === 1) return this.values.pop();

    [this.values[0], this.values[this.values.length - 1]] = [this.values[this.values.length - 1], this.values[0]];

    let oldNode = this.values.pop();
    let parentIndex = 0;
    let parent = this.values[parentIndex];
    
    while(true) {
      let leftIndex = 2 * parentIndex + 1;
      let rightIndex = 2 * parentIndex + 2;
      let left: number, right: number;
      let swap: number | null = null;

      if(leftIndex < this.values.length) {
        left = this.values[leftIndex];

        if(left > parent) {
          swap = leftIndex;
        }
      }

      if(rightIndex < this.values.length) {
        right = this.values[rightIndex];

        if(swap === null && right > parent ||
          // @ts-ignore
          swap !== null && right > left) {
            swap = rightIndex;
        }
      }

      if(swap === null) break;

      [this.values[swap], this.values[parentIndex]] = [this.values[parentIndex], this.values[swap]];
      parentIndex = swap;
      parent = this.values[parentIndex];
    }

    return oldNode;
  }

  print() {
    console.log("Binary Heap: ", this.values.join(", "));
  }
}

let heap = new MaxBinaryHeap().insert(41).insert(39).insert(33).insert(18).insert(27).insert(12).insert(55);
heap.print();
heap.extractMax();
heap.print();
