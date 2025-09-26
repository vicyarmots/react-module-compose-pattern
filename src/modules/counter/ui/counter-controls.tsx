import { useCounterActions } from "../hooks/use-counter-actions";

export const CounterControls = () => {
  console.log("RENDER_CONTROLS");

  const { increment, decrement, reset } = useCounterActions();

  return (
    <>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </>
  );
};
