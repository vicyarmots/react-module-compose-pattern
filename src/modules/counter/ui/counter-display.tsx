import { useCounterDisplay } from "../hooks/use-counter-display";

export const CounterDisplay = () => {
  console.log("RENDER_DISPLAY");

  const counter = useCounterDisplay();
  return <h1>Count: {counter}</h1>;
};
