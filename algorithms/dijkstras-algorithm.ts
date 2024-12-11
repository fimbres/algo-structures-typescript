class PriorityNode {
  value: string | number;
  priority: number;

  constructor(value: string | number, priority: number) {
    this.value = value;
    this.priority = priority;
  }
}

class PriorityQueue {
  values: PriorityNode[];

  constructor(){
    this.values = [];
  }

  enqueue(value: string | number, priority: number) {
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

class WeightedGraph {
  adjacentList: {
    [key: string | number]: { 
      vertex: string | number,
      weight: number 
    }[];
  };

  constructor() {
    this.adjacentList = {};
  }

  addVertex = (vertex: number | string) => {
    if(!!this.adjacentList[vertex]) return this;

    this.adjacentList[vertex] = [];

    return this;
  }

  addEdge(firstVertex: number | string, secondVertex: number | string, weight: number) {
    if(this.adjacentList[firstVertex].map(v => v.vertex).includes(secondVertex)) return this;

    this.adjacentList[firstVertex].push({ vertex: secondVertex, weight });

    if(this.adjacentList[secondVertex].map(v => v.vertex).includes(firstVertex)) return this;

    this.adjacentList[secondVertex].push({ vertex: firstVertex, weight });

    return this;
  }

  removeEdge(firstVertex: string | number, secondVertex: string | number) {
    this.adjacentList[firstVertex] = this.adjacentList[firstVertex].filter(a => a.vertex !== secondVertex);

    this.adjacentList[secondVertex] = this.adjacentList[secondVertex].filter(a => a.vertex !== firstVertex);

    return this;
  }

  removeVertex(vertex: string | number) {
    if(!this.adjacentList[vertex]) return this;

    for(let key in this.adjacentList) {
      this.removeEdge(vertex, key);
    }

    delete this.adjacentList[vertex];

    return this;
  }

  dfsRecursive(firstVertex: string | number) {
    let visited: { [key: string | number]: boolean; } = {};
    let result: (string | number)[] = [];
    let adjacentList = this.adjacentList;

    function helper(vertex: string | number | undefined) {
      if(!vertex) return;

      visited[vertex] = true;
      result.push(vertex);

      for(let v of adjacentList[vertex]) {
        if(!visited[v.vertex]) {
          helper(v.vertex);
        }
      }
    }

    helper(firstVertex);

    return result;
  }

  dfsIterative(vertex: string | number) {
    let stack: (string | number)[] = [vertex];
    let result: (string | number)[] = [];
    let visited: { [key: string | number]: boolean; } = {};

    visited[vertex] = true;

    while(stack.length > 0) {
      const v = stack.pop()!;
      result.push(v);

      this.adjacentList[v].forEach(e => {
        if(!visited[e.vertex]) {
          visited[e.vertex] = true;
          stack.push(e.vertex);
        }
      });
    }

    return result;
  }

  bfs(vertex: string | number) {
    let queue = [vertex];
    let visited: { [key: string | number]: boolean; } = {};
    let result: (string | number)[] = [];

    visited[vertex] = true;

    while(queue.length) {
      const v = queue.shift()!;
      result.push(v);

      this.adjacentList[v].forEach(e => {
        if(!visited[e.vertex]) {
          visited[e.vertex] = true;
          queue.push(e.vertex);
        }
      });
    }

    return result;
  }

  print() {
    for(let key in this.adjacentList) {
      if(this.adjacentList[key].length === 0) {
        console.log(key, ": [ ]");
      }
      else {
        console.log(key, ": [ ", this.adjacentList[key].join(", "), " ]");
      }
    }
  }
}


let graph = new WeightedGraph()
  .addVertex("A")
  .addVertex("B")
  .addVertex("C")
  .addVertex("D")
  .addVertex("E")
  .addVertex("F")
  .addEdge("A", "B", 4)
  .addEdge("B", "E", 3)
  .addEdge("A", "C", 2)
  .addEdge("C", "D", 2)
  .addEdge("E", "F", 1)
  .addEdge("E", "D", 3)
  .addEdge("D", "F", 1)
  .addEdge("C", "F", 4);

function initDistances(graph: WeightedGraph, start: string | number) {
  const vertexNames = Object.keys(graph.adjacentList);
  let obj = {};

  for (let key of vertexNames) {
    obj[key] = key === start ? 0 : Infinity;
  }

  return obj;
}

function initVertexList(graph: WeightedGraph, start: string | number) {
  const vertexNames = Object.keys(graph.adjacentList);
  let vertexList = new PriorityQueue();

  for (let key of vertexNames) {
    vertexList = vertexList.enqueue(key, key === start ? 0 : Infinity);
  }

  return vertexList
}

function initPrevious(graph: WeightedGraph) {
  const vertexNames = Object.keys(graph.adjacentList);
  let previous = {};

  vertexNames.forEach(v => previous[v] = null);

  return previous;
}

function dijkstrasTraversal(start: string | number, end: string | number, graph: WeightedGraph) {
  let distances = initDistances(graph, start);
  let vertexList = initVertexList(graph, start);
  let previous = initPrevious(graph);
  let path: (string | number)[] = [];

  while(vertexList.values.length) {
    const currentNode = vertexList.dequeue()!;

    if(currentNode === end) {
      let pathNode = currentNode;
      
      while(!!previous[pathNode]) {
        path.push(pathNode);
        pathNode = previous[pathNode];
      }

      return path.concat(start).reverse();
    }

    if(currentNode || distances[currentNode] !== Infinity) {
      graph.adjacentList[currentNode].forEach(neighbor => {
        let distance = distances[currentNode] + neighbor.weight;

        if(distance < distances[neighbor.vertex]) {
          distances[neighbor.vertex] = distance;
          previous[neighbor.vertex] = currentNode;
          vertexList.enqueue(neighbor.vertex, distance);
        }
      });
    }
  }
}

console.log(dijkstrasTraversal("A", "E", graph));
