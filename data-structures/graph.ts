class Graph {
  adjacentList: {
    [key: string | number]: (string | number)[];
  };

  constructor() {
    this.adjacentList = {};
  }

  addVertex = (vertex: number | string) => {
    if(!!this.adjacentList[vertex]) return this;

    this.adjacentList[vertex] = [];

    return this;
  }

  addEdge(firstVertex: number | string, secondVertex: number | string) {
    if(this.adjacentList[firstVertex].includes(secondVertex)) return this;

    this.adjacentList[firstVertex].push(secondVertex);

    if(this.adjacentList[secondVertex].includes(firstVertex)) return this;

    this.adjacentList[secondVertex].push(firstVertex);

    return this;
  }

  removeEdge(firstVertex: string | number, secondVertex: string | number) {
    this.adjacentList[firstVertex] = this.adjacentList[firstVertex].filter(a => a !== secondVertex);

    this.adjacentList[secondVertex] = this.adjacentList[secondVertex].filter(a => a !== firstVertex);

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
        if(!visited[v]) {
          helper(v);
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
        if(!visited[e]) {
          visited[e] = true;
          stack.push(e);
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
        if(!visited[e]) {
          visited[e] = true;
          queue.push(e);
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

let graph = new Graph().addVertex("A").addVertex("B").addVertex("C").addVertex("D").addVertex("E").addVertex("F").addEdge("A", "B").addEdge("B", "D").addEdge("D", "F").addEdge("D", "E").addEdge("F", "E").addEdge("E", "C").addEdge("C", "A");
graph.print();
console.log(graph.dfsRecursive("A"));
console.log(graph.dfsIterative("A"));
console.log(graph.bfs("A"));
