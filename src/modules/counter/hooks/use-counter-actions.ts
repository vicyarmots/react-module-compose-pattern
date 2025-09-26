import { useCounterStoreContext } from "../model/counter";

export const useCounterActions = () => {
  const { setState } = useCounterStoreContext();

  return {
    increment: () =>
      setState((prev) => ({
        counter: prev.counter + 1,
      })),
    decrement: () =>
      setState((prev) => ({
        counter: prev.counter - 1,
      })),
    reset: () => setState({ counter: 0 }),
  };
};
