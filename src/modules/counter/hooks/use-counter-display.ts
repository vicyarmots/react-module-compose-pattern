import { useSyncExternalStore } from "react";
import { useCounterStoreContext } from "../model/counter";

export const useCounterDisplay = () => {
  const { getState, subscribe } = useCounterStoreContext();
  const value = useSyncExternalStore(subscribe, () => getState().counter);
  return value;
};
