class SNode {
  value: number;
  next: SNode | null;

  constructor(value: number) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  first: SNode | null;
  last: SNode | null;
  size: number;

  constructor() {
    this.size = 0;
    this.first = null;
    this.last = null;
  }

  push(value: number) {
    let newNode = new SNode(value);

    if(this.size === 0) {
      this.first = newNode;
      this.last = newNode;
    }
    else {
      let temp = this.first;
      this.first = newNode;
      newNode.next = temp;
    }

    this.size++;

    return this;
  }

  pop() {
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

    console.log("Stack: ", data.join(", "));
  }
}

let stack = new Stack().push(1).push(2).push(3).push(4).push(5);
stack.pop();
stack.print();
