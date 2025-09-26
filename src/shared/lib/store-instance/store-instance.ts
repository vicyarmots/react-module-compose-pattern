type Listener = () => void;

export const createStore = <T extends object>(key: string, initialValue: T) => {
  const stored = localStorage.getItem(key);
  let state: T = stored ? JSON.parse(stored) : initialValue;

  const listeners = new Set<Listener>();

  const setState = (value: Partial<T> | ((prev: T) => Partial<T>)) => {
    const partial = typeof value === "function" ? value(state) : value;
    state = { ...state, ...partial };

    localStorage.setItem(key, JSON.stringify(state));
    listeners.forEach((listener) => listener());
  };

  const getState = () => state;

  const subscribe = (listener: Listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return {
    getState,
    setState,
    subscribe,
  };
};
