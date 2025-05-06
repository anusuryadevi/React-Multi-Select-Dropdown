import { useEffect, useRef } from "react";

/**
 * similar to `useEffect` but gets triggered only when value changes
 * @param fn executable function on dependency updates
 * @param inputs dependency array
 */
export function useDidMountEffect(fn:any, inputs:any) {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) return fn();
    else didMountRef.current = true;
  }, inputs);
}
