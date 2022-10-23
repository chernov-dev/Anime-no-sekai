import { useState, useCallback } from "react";

function persistItem(key: string, value: string) {
  typeof window !== "undefined" &&
    localStorage.setItem(key, JSON.stringify(value));
  return value;
}

export default function usePersistState(key: string, initialValue?: string) {
  const [state, setState] = useState(
    () =>
      (typeof window !== "undefined" && JSON.parse(localStorage.getItem(key))) ||
      persistItem(key, initialValue)
  );
  const setStateAndPersist = useCallback(
    (newState: string) => {
      setState(newState);
      return persistItem(key, newState);
    },
    [key, setState]
  );
  return [state, setStateAndPersist];
}
