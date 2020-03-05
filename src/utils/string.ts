const map: { [key: string]: string } = {
  "and": "&",
  ",": "",
  "-": " "
};

export function parseStoreItemKey(s: string) {
  if (!s) return "";
  let tempString = capitalize(s);
  return Object.keys(map).reduce((acc: string, item: string) => tempString.split(item).join(map[item]));
}

export function replaceAtIndex(s: string, i: number, replacement: string) {
  return s.slice(0, i) + replacement + s.slice(i);
}

export function capitalize(s: string) {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}
