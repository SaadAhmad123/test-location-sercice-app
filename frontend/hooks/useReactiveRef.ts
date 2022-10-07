import { useCallback, useRef } from "react";

const useReactiveRef = <T>(
  initialValue?: T,
  onChange?: (newValue?: T, oldValue?: T) => void
) => {
  const ref = useRef<T>(initialValue);
  const onChangeCallback =
    useRef<(newValue?: T, oldValue?: T) => void | undefined>(onChange);

  const get = useCallback(() => {
    return ref.current;
  }, [ref]);

  const set = useCallback(
    (value: T) => {
      const oldValue = ref.current;
      ref.current = value;
      onChangeCallback.current?.(value, oldValue);
    },
    [ref]
  );

  const setOnChange = useCallback(
    (cb: (newValue?: T, oldValue?: T) => void) => {
      onChangeCallback.current = cb;
    },
    []
  );

  return { get, set, onChange: setOnChange };
};

export default useReactiveRef;
