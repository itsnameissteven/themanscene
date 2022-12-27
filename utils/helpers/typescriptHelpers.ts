import { ChangeEvent } from 'react';

interface IArgs<T, K extends keyof T = keyof T> {
  data: T[];
  sortKey: K;
  sort?: 'desc' | 'asc';
}

export const sortData = <T>({ data, sortKey, sort = 'desc' }: IArgs<T>) => {
  if (sort === 'desc') {
    return data.sort((a, b) => {
      if (typeof a[sortKey] === 'string' && typeof b[sortKey] === 'string') {
        const A = a[sortKey] as T[keyof T] | string as string;
        const B = b[sortKey] as T[keyof T] | string as string;
        return B.toLowerCase() > A.toLowerCase() ? 1 : -1;
      }
      return b[sortKey] > a[sortKey] ? 1 : -1;
    });
  }
  return data.sort((a, b) => {
    if (typeof a[sortKey] === 'string' && typeof b[sortKey] === 'string') {
      const A = a[sortKey] as T[keyof T] | string as string;
      const B = b[sortKey] as T[keyof T] | string as string;
      return A.toLowerCase().localeCompare(B.toLowerCase());
    }
    return a[sortKey] > b[sortKey] ? 1 : -1;
  });
};

// export const sortNestedOjb = <T>({
//   data,
//   sortKey,
//   sort = 'desc',
// }: ISortObj<T>) => {
//   const cleanedObj = Object.entries(data);
//   if (sort === 'desc') {
//     return cleanedObj.sort((a, b) => {
//       if (typeof a[1][sortKey] === 'string' && typeof b[sortKey] === 'string') {
//         const A = a[sortKey] as T[keyof T] | string as string;
//         const B = b[sortKey] as T[keyof T] | string as string;
//         return B.toLowerCase() > A.toLowerCase() ? 1 : -1;
//       }
//       return b[sortKey] > a[sortKey] ? 1 : -1;
//     });
//   }
// };

export const getKeyValue = <T, K extends keyof T>(obj: T, key: K): T[K] =>
  obj[key];

export const objMap = <Type, T2 = Type>(
  obj: { [key: string]: Type },
  callback: (val: Type, key: string) => T2
): { [key: string]: T2 } => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, val]) => [key, callback(val, key)])
  );
};

export const objToArray = <Type, T2 = Type>(
  obj: { [key: string]: Type },
  callback: (val: Type, key: string) => T2
) => {
  return Object.entries(obj).map(([key, val]) => callback(val, key));
};
export const isChangeEvent = <T>(e: unknown): e is ChangeEvent<T> => {
  return (e as ChangeEvent).type === 'change';
};
