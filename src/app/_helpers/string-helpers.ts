export function ArrayToConsolidatedString(items: Array<string>, maxLenght: number){
    let result = "";

    if(items.length > 0) result += items[0];
    else return result;

    for (let i = 1; i < items.length && i < maxLenght; i++) {
      result += ', ' + items[i];
    }

    if(items.length > maxLenght) result += ', +' + (items.length - maxLenght); 
    
    return result;
  }