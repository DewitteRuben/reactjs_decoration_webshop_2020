import _ from "lodash";

const map: { [key: string]: string } = {
  and: "&",
  ",": "",
  "-": " "
};

export function parseStoreItemKey(s: string) {
  if (!s) return "";
  const tempString = _.capitalize(s);
  return Object.keys(map).reduce((acc: string, item: string) => tempString.split(item).join(map[item]));
}

export function replaceAtIndex(s: string, i: number, replacement: string) {
  return s.slice(0, i) + replacement + s.slice(i);
}
