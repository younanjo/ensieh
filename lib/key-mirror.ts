import { reduce } from 'ramda';

export default (keys: any) =>
  reduce(
    (result: any, key: string) => {
      if (key) {
        result[key] = key;
      }
      return result;
    },
    {},
    keys
  );
