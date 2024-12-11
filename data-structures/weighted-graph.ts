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
