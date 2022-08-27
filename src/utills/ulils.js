export const transormToObject = (arr, value) => {
  return arr.reduce((obj, key) => {
    obj[key] = value;
    return obj;
  }, {});
};
