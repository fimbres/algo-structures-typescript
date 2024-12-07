function hash(value: string, index: number) {
  let total = 0;

  for(let letter of value) {
    let aux = letter.charCodeAt(0) - 96;

    total = (total + aux) % index;
  }

  return total;
}

console.log(hash("pink", 4));
