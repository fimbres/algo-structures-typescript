class LNode {
  value: number;
  next: LNode | null;
  prev: LNode | null;

  constructor(value: number) {
    this.next = null;
    this.prev = null;
    this.value = value
  }
}

class DoubleLinkList {
  head: LNode | null;
  tail: LNode | null;
  length: number;

  constructor(){
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(value: number) {
    const newNode = new LNode(value);

    if(!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } 
    else {
      this.tail!.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }

    this.length++;

    return this;
  }

  pop() {
    if(!this.head) return undefined;

    let tail = this.tail;

    if(this.length === 1) {
      this.head = null;
      this.tail = null;
    }
    else {
      this.tail = tail!.prev;
      this.tail!.next = null;
    }

    this.length--;

    return tail?.value;
  }

  shift() {
    if(this.length === 0) return undefined;

    let head = this.head;

    if(this.length === 1) {
      this.head = null;
      this.tail = null;
    }
    else {
      this.head = head!.next;
      this.head!.prev = null;
      head!.next = null;
    }

    this.length--;

    return head?.value;
  }

  unshift(value: number) {
    let newNode = new LNode(value);

    if(this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    }
    else {
      this.head!.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;

    return this;
  }

  get(index: number) {
    if(index < 0 || index >= this.length) return null;

    if(index <= Math.floor(this.length / 2)) {
      let currentNode = this.head;
      let i = 0;

      while(!!currentNode) {
        if(i === index) {
          return currentNode;
        }

        currentNode = currentNode.next;
        i++;
      }
    } else {
      let currentNode = this.tail;
      let i = this.length - 1;

      while(!!currentNode) {
        if(i === index) {
          return currentNode;
        }

        currentNode = currentNode.prev;
        i--;
      }
    }
  }

  set(value: number, index: number) {
    let target = this.get(index);

    if(!target) return false;

    target.value = value;
    return true;
  }

  insert(value: number, index: number) {
    if(index < 0 || index > this.length) return false;

    if(index === 0) {
      this.unshift(value);
    }
    else if(index === this.length) {
      this.push(value);
    }
    else {
      let newNode = new LNode(value);
      let prevNode = this.get(index - 1);

      newNode.next = prevNode!.next;
      newNode.prev = prevNode!;
      prevNode!.next = newNode;
      prevNode!.next.prev = newNode;

      this.length++;
    }

    return true;
  }

  remove(index: number) {
    if(index < 0 || index >= this.length) return undefined;

    if(index === 0) {
      return this.shift();
    }
    else if(index === this.length - 1) {
      return this.pop();
    }
    else {
      let target = this.get(index);
      target!.prev!.next = target!.next;
      target!.next!.prev = target!.prev;
      target!.next = null;
      target!.prev = null;

      this.length--;

      return target?.value;
    }
  }

  print() {
    let data: number[] = [];
    let currentNode = this.head;

    while(!!currentNode) {
      data.push(currentNode.value);

      currentNode = currentNode.next;
    }

    console.log("List: ", data.join(", "));
  }
}

let list = new DoubleLinkList().push(1).push(2).push(3).push(4).push(5);
list.print();
