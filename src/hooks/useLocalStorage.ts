import { useCallback, useEffect } from "react";
/**
 * A hook that store , get and delete LocalStorage
 * @param key
 * @param value
 */
export default function useLocalStorage<T>(key: string, value?: T) {
  // const stringifiedValue = JSON.stringify(value);
  // useEffect(() => {
  //   function setLocal() {
  //     // if (!value) return;
  //   }
  //   setLocal();
  //   return () => {
  //     setLocal();
  //   };
  // }, [stringifiedValue, key]);
  const setLocal = useCallback(
    function (value: unknown) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [key]
  );
  const getLocal = useCallback((): T | null => {
    const value = localStorage.getItem(key);
    // console.log(value ? JSON.parse(value) : null);
    return value ? JSON.parse(value) : null;
  }, [key]);
  const deleteLocal = useCallback(() => {
    localStorage.removeItem(key);
  }, [key]);
  return { getLocal, deleteLocal, setLocal };
}
