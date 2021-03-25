import { useState, useCallback } from "react";

export default function useToggle(initialValue = false) {
  const [Value, setValue] = useState(initialValue);
  const handler = useCallback(() => {
    setValue((prev) => !prev);
  }, []);
  return [Value, handler, setValue];
}
