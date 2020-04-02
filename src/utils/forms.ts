const serializeFormData = <T>(formData: FormData): T => {
  const entries = Array.from(formData.entries());
  entries
    .filter(arr => arr.indexOf("on") > -1)
    .forEach(arr => {
      const filteredArr = arr as [string, string | boolean];
      filteredArr[1] = true;
    });
  return (Object.fromEntries(entries) as unknown) as T;
};

export { serializeFormData };
