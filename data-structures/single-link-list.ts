class LNode {
  value: number;
  next: LNode | null;

  constructor(value: number) {
    this.value = value;
    this.next = null;
  }
};

class LinkedList {
  head: LNode | null;
  tail: LNode | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(value: number) {
    let node = new LNode(value);

    if(!this.head) {
      this.head = node;
      this.tail = this.head;
    }
    else {
      this.tail!.next = node;
      this.tail = node;
    }

    this.length++;

    return this;
  }

  pop() {
    if(this.length === 0) return undefined;

    let previousNode: LNode | null = null;
    let currentNode = this.head;

    while(!!currentNode?.next) {
      previousNode = currentNode;
      currentNode = currentNode.next;
    }

    this.tail = previousNode;
    this.tail!.next = null;
    this.length--;

    return currentNode?.value;
  }

  shift() {
    if(this.length === 0) return undefined;

    let currentNode = this.head;
    this.head = currentNode?.next!;
    this.length--;

    return currentNode?.value;
  }

  unshift(value: number) {
    let newNode = new LNode(value);

    if(!this.head) {
      this.tail = newNode;
    }
    else {
      newNode.next = this.head;
    }
    
    this.head = newNode;
    this.length++;

    return this;
  }

  get(index: number) {
    if(index > this.length || index < 0) return null;
    
    let currentNode = this.head;
    let counter = 0;

    while(!!currentNode?.next) {
      if(index === counter){
        break;
      }

      currentNode = currentNode.next;
      counter++;
    }

    return currentNode;
  }

  set(value: number, index: number) {
    let currentNode = this.get(index);

    if(!currentNode) return false;

    currentNode.value = value;

    return true;
  }

  insert(value: number, index: number) {
    if(index < 0 || index > this.length) return false;

    if(index === this.length){
      this.push(value);
    }
    else if(index === 0) {
      this.unshift(value);
    }
    else {
      let previousNode = this.get(index - 1);
      let newNode = new LNode(value);
      
      newNode.next = previousNode!.next;
      previousNode!.next = newNode;
    }

    this.length++;
    
    return true;
  }

  remove(index: number) {
    if(index >= this.length || index < 0) return undefined;

    if(index === this.length - 1){
      return this.pop();
    }
    else if(index === 0){ 
      return this.shift();
    }
    else {
      let previousNode = this.get(index - 1);

      previousNode!.next = previousNode!.next!.next;
      this.length--;

      return previousNode?.value;
    }
  }

  reverse() {
    let node = this.head;
    [this.head, this.tail] = [this.tail, this.head];
    this.tail = node;

    let next: LNode | null = null;
    let prev: LNode | null = null;
    let i = 0;

    while(i < this.length){
      next = node!.next;
      node!.next = prev;
      prev = node;
      node = next;

      i++;
    }

    return this;
  }

  print() {
    if(this.length === 0) return;

    let currentNode = this.head;
    let allValues: number[] = [];

    while(!!currentNode) {
      allValues.push(currentNode.value);

      currentNode = currentNode.next;
    }

    console.log("List: ", allValues.join(', '));
  }
};

let list = new LinkedList().push(1).push(2).push(3).push(4).push(5);
list.print();
list = list.reverse();
list.print();
