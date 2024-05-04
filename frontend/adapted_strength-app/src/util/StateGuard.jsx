import { useState, useEffect } from "react";

/**
 * @param {boolean} state
 * @param {ReactNode} children
 *  @returns {ReactNode}
 * @description  A component that renders its children only if the state is true.
 */
export default function StateGuard({ state, children, alternate = null }) {
  const [isResolved, setIsResolved] = useState(false);

  useEffect(() => {
    const checkState = async () => {
      const result = state();
      if (result instanceof Promise) {
        console.log("Result: ", result);
        let value = await result;
        console.log("Value: ", value);
        setIsResolved(value);
      } else {
        setIsResolved(result);
      }
    };
    checkState();
  }, [state]);

  return <>{isResolved ? children : alternate}</>;
}
