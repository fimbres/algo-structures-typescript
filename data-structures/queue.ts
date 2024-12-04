class QNode {
  value: number;
  next: QNode | null;

  constructor(value: number) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  first: QNode | null;
  last: QNode | null;
  size: number;

  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  enqueue(value: number) {
    let newNode = new QNode(value);

    if(this.size === 0) {
      this.first = newNode;
      this.last = newNode;
    }
    else {
      this.last!.next = newNode;
      this.last = newNode;
    }

    this.size++;

    return this;
  }

  dequeue() {
    if(this.size === 0) return null;

    let temp = this.first;

    if(this.size === 1) {
      this.first = null;
      this.last = null;
    }
    else {
      this.first = temp!.next;
    }

    this.size--;

    return temp?.value;
  }

  print() {
    let data: number[] = [];
    let currentNode = this.first;

    while(!!currentNode) {
      data.push(currentNode.value);

      currentNode = currentNode.next;
    }

    console.log("Queue: ", data.join(", "));
  }
}

let queue = new Queue().enqueue(1).enqueue(2).enqueue(3).enqueue(4).enqueue(5);
queue.dequeue();
queue.print();
