export function ArrayToConsolidatedString(items: Array < any >, maxLenght: number, stringAccessor: (any) => string){
  let result = "";

  if (!items) return null;

  if (items.length > 0) result += stringAccessor(items[0]);
  else return result;

  for (let i = 1; i < items.length && i < maxLenght; i++) {
    result += ', ' + stringAccessor(items[i]);
  }

  if (items.length > maxLenght) result += ', +' + (items.length - maxLenght);

  return result;
}

export function ExtractFileName(path: string): string {
  let index = path.lastIndexOf('/');
  let result = path.slice(index + 1, path.length);
  return result;
}
