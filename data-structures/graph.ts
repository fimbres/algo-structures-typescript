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

let graph = new Graph().addVertex("Tokyo").addVertex("Osaka").addEdge("Tokyo", "Osaka").removeVertex("Tokyo");
graph.print();
