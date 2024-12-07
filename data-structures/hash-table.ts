class HashTable {
  keyMap: number[];

  constructor(size: number = 53) {
    this.keyMap = new Array(size);
  }

  _hash(key: string) {
    let total = 0;
    const PRIME_KEY = 31;

    for(let i = 0; i < Math.min(key.length, 53); i++) {
      let value = key.charCodeAt(i) - 96;

      total = (total + PRIME_KEY + value) & this.keyMap.length;
    }

    return total;
  }
}

let hashTable = new HashTable();
