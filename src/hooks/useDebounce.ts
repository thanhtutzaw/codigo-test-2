import React, { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay = 500) {
  const [debounceValue, setDebounceValue] = useState<string | T>("");
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [delay, value]);

  return { debounceValue: debounceValue as T };
}
