import { IMediaSelectHTMLElement } from "./../components/MediaSelect/MediaSelect";
import _ from "lodash";

interface IFormEntry {
  [x: string]: FormDataEntryValue | boolean | number | File[] | Date | (string | File)[];
  [x: number]: FormDataEntryValue;
}

const filterFileEntries = (input: IMediaSelectHTMLElement | HTMLInputElement) => {
  if (!input.files) return [];

  if ("media" in input) {
    return input.media ? input.media : [];
  }

  const files = Array.from(input.files);
  const included = input.dataset.included ? _.split(input.dataset.included, ",") : [];
  const defaultImages = input.dataset.default ? _.split(input.dataset.default, ",") : [];
  const filtered = files.filter(file => included?.includes(file.name));

  return [...defaultImages, ...filtered];
};

const serializeFormData = <T extends {}>(form: HTMLFormElement): Partial<T> => {
  const formData = new FormData(form);
  const entries = Array.from(formData.entries());
  const formElements = Array.from(form.elements) as HTMLInputElement[];

  const fileInput = _.find(formElements, ["type", "file"]);
  const numberInputs = _.filter(formElements, ["type", "number"]);
  const checkboxInputs = _.filter(formElements, ["type", "checkbox"]);
  const dateInputs = _.filter(formElements, ["type", "date"]);

  let seralizedData = Object.fromEntries(entries) as IFormEntry;

  // parse file input
  if (fileInput && fileInput.name && fileInput.files) {
    seralizedData = _.omit(seralizedData, fileInput.name);
    seralizedData[fileInput.name] = filterFileEntries(fileInput);
  }

  // parse number inputs
  if (numberInputs) {
    numberInputs.forEach(input => {
      const name = input.name;
      if (name?.length) {
        seralizedData[name] = parseFloat(seralizedData[name] as string) || 0;
      }
    });
  }

  // parse checkbox inputs
  if (checkboxInputs) {
    checkboxInputs.forEach(input => {
      const name = input.name;
      if (name?.length) {
        seralizedData[name] = input.checked;
      }
    });
  }

  // parse date inputs
  if (dateInputs) {
    dateInputs.forEach(input => {
      const name = input.name;
      if (name?.length && input.valueAsDate) {
        seralizedData[name] = input.valueAsDate;
      }
    });
  }

  return (seralizedData as unknown) as Partial<T>;
};

/**
 * Deep diff between two objects - i.e. an object with the new value of new & changed fields.
 * Removed fields will be set as undefined on the result.
 * Only plain objects will be deeply compared (@see _.isPlainObject)
 *
 * Inspired by: https://gist.github.com/Yimiprod/7ee176597fef230d1451#gistcomment-2565071
 * This fork: https://gist.github.com/TeNNoX/5125ab5770ba287012316dd62231b764/
 *
 * @param  {Object} base   Object to compare with (if falsy we return object)
 * @param  {Object} object Object compared
 * @return {Object}        Return a new object who represent the changed & new values
 */
const deepDiffObj = (base: any, object: any) => {
  if (!object) throw new Error(`The object compared should be an object: ${object}`);
  if (!base) return object;
  const result = _.transform(object, (result: any, value: any, key: any) => {
    if (!_.has(base, key)) result[key] = value; // fix edge case: not defined to explicitly defined as undefined
    if (!_.isEqual(value, base[key])) {
      result[key] = _.isPlainObject(value) && _.isPlainObject(base[key]) ? deepDiffObj(base[key], value) : value;
    }
  });
  // map removed fields to undefined
  _.forOwn(base, (value, key) => {
    if (!_.has(object, key)) result[key] = undefined;
  });
  return result;
};

export { serializeFormData, deepDiffObj };
