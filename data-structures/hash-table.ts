interface HashValue {
  key: string;
  value: string;
}

class HashTable {
  keyMap: HashValue[][];

  constructor(size: number = 53) {
    this.keyMap = new Array(size);
  }

  _hash(key: string) {
    let total = 0;
    const PRIME_KEY = 31;

    for(let i = 0; i < Math.min(key.length, 53); i++) {
      let value = key.charCodeAt(i) - 96;

      total = (total + PRIME_KEY + value) % this.keyMap.length;
    }

    return total;
  }

  set(key: string, value: string) {
    let hashedKey = this._hash(key);
    let hashValue = {
      key,
      value,
    } as HashValue;

    if(!!this.keyMap[hashedKey]){
      this.keyMap[hashedKey].push(hashValue);
    }
    else {
      this.keyMap[hashedKey] = [hashValue];
    }

    return this;
  }

  get(key: string) {
    let hashedKey = this._hash(key);
    let value = this.keyMap[hashedKey];

    if(!!value) {
      for(let val of value) {
        if(val.key === key) {
          return val.value;
        }
      }
    }
    
    return undefined;
  }

  keys = () => this.keyMap.flat().map(v => v.key)

  values = () => this.keyMap.flat().map(v => v.value);

  print() {
    for(let hashBlock of this.keyMap) {
      if(!!hashBlock) {
        console.log("[");

        for(let hashValue of hashBlock) {
          console.log("[ ", hashValue.key, ": ", hashValue.value, " ],");
        }

        console.log("]");
      }
      else {
        console.log("[ ]");
      }
    }
  }
}

let hashTable = new HashTable().set("this_key", "value").set("other_key", "other_value").set("last_key", "last_value");
hashTable.print();
console.log(hashTable.get("last_key"));
console.log(hashTable.keys());
console.log(hashTable.values());
