class PriorityNode {
  value: string;
  priority: number;

  constructor(value: string, priority: number) {
    this.value = value;
    this.priority = priority;
  }
}

class PriorityQueue {
  values: PriorityNode[];

  constructor(){
    this.values = [];
  }

  enqueue(value: string, priority: number) {
    const newNode = new PriorityNode(value, priority);

    this.values.push(newNode);

    let index = this.values.length - 1;
    let parentIndex = Math.floor((index - 1) / 2);

    while(this.values[index]?.priority < this.values[parentIndex]?.priority) {
      [this.values[index], this.values[parentIndex]] = [this.values[parentIndex], this.values[index]];

      index = parentIndex;
      parentIndex = Math.floor((index - 1) / 2);
    }

    return this;
  }

  dequeue() {
    if(this.values.length <= 1) return this.values.pop()?.value || undefined;

    [this.values[0], this.values[this.values.length - 1]] = [this.values[this.values.length - 1], this.values[0]];

    let oldNode = this.values.pop();
    let parentIndex = 0;
    let leftIndex: number, rightIndex: number;

    while(true) {
      let parent = this.values[parentIndex];
      let left: PriorityNode, right: PriorityNode;
      let swap: number | null = null;
      leftIndex = parentIndex * 2 + 1;
      rightIndex = parentIndex * 2 + 2;

      if(leftIndex < this.values.length) {
        left = this.values[leftIndex];

        if(left.priority < parent.priority) {
          swap = leftIndex;
        }
      }

      if(rightIndex < this.values.length) {
        right = this.values[rightIndex];

        if((swap === null && right.priority < parent.priority) || 
          (swap !== null && right.priority < left!.priority)) {
          swap = rightIndex;
        }
      }

      if(swap === null) break;

      [this.values[parentIndex], this.values[swap]] = [this.values[swap], this.values[parentIndex]];
      parentIndex = swap;
    }

    return oldNode?.value;
  }

  print() {
    console.log("Priority Queue: ", this.values.map(d => d.value).join(", "));
  }
}

let priorityQueue = new PriorityQueue().enqueue("Luis", 5).enqueue("Isaac", 3).enqueue("José", 3).enqueue("Miguel", 1).enqueue("Josefa", 4).enqueue("August", 2);
priorityQueue.dequeue();
priorityQueue.print();
