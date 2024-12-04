class TNode {
  value: number;
  left: TNode | null;
  right: TNode | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  root: TNode | null;

  constructor() {
    this.root = null;
  }

  insert(value: number) {
    let newNode = new TNode(value);

    if(!this.root) {
      this.root = newNode;
    }
    else {
      let currentNode = this.root;

      while(!!currentNode) {
        if(newNode.value >= currentNode.value) {
          if(!!currentNode.right) {
            currentNode = currentNode.right;
          }
          else {
            currentNode.right = newNode;
            break;
          }
        }
        else {
          if(!!currentNode.left) {
            currentNode = currentNode.left;
          }
          else {
            currentNode.left = newNode;
            break;
          }
        }
      }
    }

    return this;
  }

  find(value: number) {
    if(!this.root) return false;

    else {
      let current = this.root;

      while(!!current) {
        if(current.value === value) {
          return true;
        }
        else if(value >= current.value) {
          if(!!current.right) {
            current = current.right;
          }
          else {
            return false;
          }
        }
        else {
          if(!!current.left) {
            current = current.left;
          }
          else {
            return false;
          }
        }
      }
    }
  }
}

let bst = new BinarySearchTree().insert(10).insert(5).insert(13).insert(2).insert(7).insert(11).insert(16);
console.log(bst.find(16));
console.log(bst.root?.value, bst.root?.left?.value, bst.root?.right?.value)
