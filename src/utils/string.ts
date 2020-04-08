import _ from "lodash";
import moment from "moment";

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

export const categoryNames = ["category", "subCategory", "specificCategory", "itemCategory"] as const;
export type CategoryNames = typeof categoryNames[number];

export const parseCategoryString = (category: string): Record<CategoryNames, string> => {
  const categories = _.drop(category.split(","));
  return _.zipObject(categoryNames, categories) as Record<CategoryNames, string>;
};

export const dateReviver = function(key: any, value: any) {
  if (typeof value === "string") {
    if (moment(value, moment.ISO_8601).isValid()) {
      return new Date(value);
    }
  }
  return value;
};
