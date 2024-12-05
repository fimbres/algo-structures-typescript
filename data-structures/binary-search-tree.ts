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

  BFS() { // Visit every node in each leavel before moving down to the next level
    if(!this.root) return null;

    const queue: TNode[] = [];
    const visited: number[] = [];

    queue.unshift(this.root!);

    while(!!queue.length) {
      let nodeOut = queue.pop();

      visited.push(nodeOut?.value!);

      if(!!nodeOut?.left) {
        queue.unshift(nodeOut?.left);
      }

      if(!!nodeOut?.right) {
        queue.unshift(nodeOut?.right);
      }
    }

    return visited;
  }

  preOrderDFS() { // Visit every node from the left untill reaching the bottom, then going to the right.
    if(!this.root) return null;

    let visited: number[] = [];
    let current = this.root;

    function helper(node: TNode) {
      visited.push(node.value);

      if(node.left) {
        helper(node.left);
      }

      if(node.right) {
        helper(node.right);
      }
    }

    helper(current);

    return visited;
  }

  postOrderDFS() { // traverse every node to the left, then to the right, and then visit the current node.
    if(!this.root) return null;

    let visited: number[] = [];
    let current = this.root;

    function helper(node: TNode) {
      if(node.left) {
        helper(node.left);
      }

      if(node.right) {
        helper(node.right);
      }

      visited.push(node.value);
    }

    helper(current);

    return visited;
  }

  inOrderDFS() { // traverse all the nodes in the left, visit the current node, and then traverse all the way down from the right.
    if(!this.root) return null;

    let visited: number[] = [];
    let current = this.root;

    function helper(node: TNode) {
      if(!!node.left) {
        helper(node.left);
      }

      visited.push(node.value);

      if(!!node.right) {
        helper(node.right);
      }
    }

    helper(current);

    return visited;
  }
}

let bst = new BinarySearchTree().insert(10).insert(6).insert(15).insert(3).insert(8).insert(20);
console.log(bst.BFS()); // [ 10, 6, 15, 3, 8, 20 ]
console.log(bst.preOrderDFS()); // [ 10, 6, 3, 8, 15, 20 ]
console.log(bst.postOrderDFS()); // [ 3, 8, 6, 20, 15, 10 ]
console.log(bst.inOrderDFS()); // [ 3, 6, 8, 10, 15, 20 ] 
