import { useCallback, useRef } from "react";

const useReactiveRef = <T>(
  initialValue?: T,
  onChange?: (newValue?: T, oldValue?: T) => void
) => {
  const ref = useRef<T>(initialValue);

  const get = useCallback(() => {
    return ref.current;
  }, [ref]);

  const set = useCallback(
    (value: T) => {
      const oldValue = ref.current;
      ref.current = value;
      onChange?.(value, oldValue);
    },
    [ref]
  );

  return { get, set };
};

export default useReactiveRef;
