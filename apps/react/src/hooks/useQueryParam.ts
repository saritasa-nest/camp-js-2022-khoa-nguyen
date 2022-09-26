import { useSearchParams } from 'react-router-dom';

interface QueryMethods<T> {

  /** Get search param by key. */
  readonly get: (key: keyof T) => string | null;

  /** Set search param by key. */
  readonly set: (key: keyof T, value: string) => void;

  /** Remove search param by key. */
  readonly delete: (key: keyof T) => void;
}

interface QueryMethodsWithKey {

  /** Get search param. */
  readonly get: () => string | null;

  /** Set search param. */
  readonly set: (value: string) => void;

  /** Delete search param. */
  readonly delete: () => void;
}

interface UseQueryParamReturnedProps<T> {

  /** Object of current search params on URl. */
  readonly currentQueryParams: T;

  /** Query method related to search params. */
  readonly queryMethods: QueryMethods<T>;

  /** Current query params as string. */
  readonly queryParams: string;

  /** Query method related to search params with key. */
  readonly getQueryMethodWithKey: (key: keyof T) => QueryMethodsWithKey;
}

/** This hooks provides methods related to search params features. */
export const useQueryParam = <T = never>(): UseQueryParamReturnedProps<T> => {
  const [searchParams, setSearchParams] = useSearchParams();
  const getAllQueryParams = (): T => {
    let params = {};
    searchParams.forEach((value, key) => {
      params = { ...params, [key]: value };
    });
    return params as T;
  };
  const queryMethods = {
    get(key: keyof T) {
      return searchParams.get(key as string);
    },
    set(key: keyof T, value: string) {
      if (value === '' || value == null) {
        searchParams.delete(key as string);
      } else {
        searchParams.set(key as string, value);
      }
      setSearchParams(searchParams);
    },
    delete(key: keyof T) {
      searchParams.delete(key as string);
      setSearchParams(searchParams);
    },
  };

  const getQueryMethodWithKey = (key: keyof T) => ({
    set(value: string) {
      queryMethods.set(key, value);
    },
    delete() {
      queryMethods.delete(key);
    },
    get() {
      return queryMethods.get(key);
    },
  });

  return {
    currentQueryParams: getAllQueryParams(),
    queryMethods,
    queryParams: searchParams.toString(),
    getQueryMethodWithKey,
  };
};
