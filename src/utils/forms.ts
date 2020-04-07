import _ from "lodash";

interface IFormEntry {
  [x: string]: FormDataEntryValue | boolean | number | File[];
  [x: number]: FormDataEntryValue;
}

const filterFileEntries = (input: HTMLInputElement) => {
  if (!input.files) return [];

  const files = Array.from(input.files);
  const included = input.dataset.included?.split(",");
  if (included) {
    return files.filter(file => included.includes(file.name));
  }
  return files;
};

const serializeFormData = <T extends {}>(form: HTMLFormElement): Partial<T> => {
  const formData = new FormData(form);
  const entries = Array.from(formData.entries());
  const formElements = Array.from(form.elements) as HTMLInputElement[];

  const fileInput = _.find(formElements, ["type", "file"]);
  const numberInputs = _.filter(formElements, ["type", "number"]);
  const checkboxInputs = _.filter(formElements, ["type", "checkbox"]);

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

  return (seralizedData as unknown) as Partial<T>;
};

export { serializeFormData };
