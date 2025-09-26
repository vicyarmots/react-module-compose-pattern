import { createContext, useContext } from "react";
import { createStore } from "../../../shared/lib/store-instance/store-instance";

const initialCounterState = {
  counter: 0,
};

export const counterStore = createStore("counter-store", initialCounterState);
export const CounterContext = createContext(counterStore);
export const useCounterStoreContext = () => useContext(CounterContext);
