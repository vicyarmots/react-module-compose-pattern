import { CounterProvider } from "../compose/counter-compose";

export const CounterWidget = () => (
  <CounterProvider>
    <CounterProvider.Display />
    <CounterProvider.Actions />
  </CounterProvider>
);
