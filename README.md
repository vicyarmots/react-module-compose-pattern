```
# CounterWidget – Modular React Component with Compound Provider Pattern

This project demonstrates a **modular, reusable, and scalable React component pattern** using **Compound Providers** and a **custom lightweight store**. It's ideal for self-contained features that need their own state management but don’t require a global state library.

---

## Table of Contents

- [Overview](#overview)
- [Architecture Diagram](#architecture-diagram)
- [Usage](#usage)
- [Advantages](#advantages)
- [Trade-offs](#trade-offs)
- [When to Use](#when-to-use)
- [Conclusion](#conclusion)
- [Demo Screenshot](#demo-screenshot)
- [Example: Counter Store Implementation](#example-counter-store-implementation)
- [Example: Compound Provider](#example-compound-provider)
- [Example: Counter Widget](#example-counter-widget)

---

## Overview

`CounterWidget` consists of:

- **CounterProvider** – main provider exposing the store and compound sub-components.
- **CounterDisplay** – displays the current counter value.
- **CounterControls** – buttons to increment, decrement, and reset the counter.

It uses a **custom store** with `getState`, `setState`, and `subscribe`, combined with React’s `useSyncExternalStore` for fine-grained reactivity.

---

## Architecture Diagram

```text
          ┌───────────────────┐
          │  CounterProvider  │
          │(Compound Provider)│
          └────────┬──────────┘
                   │
   ┌───────────────┴───────────────┐
   │                               │
┌─────────────┐              ┌──────────────┐
│ Display     │              │ Actions      │
│ CounterDisplay│            │ CounterControls│
└─────────────┘              └──────────────┘
       │                             │
       └─────────┐     ┌────────────┘
                 ▼     ▼
          ┌───────────────────┐
          │   counterStore     │
          │ getState/setState  │
          │ subscribe          │
          └───────────────────┘
```

- **CounterProvider** wraps the widget and exposes Display and Actions.
- **Sub-components** subscribe to the store selectively using useSyncExternalStore.
- Only components that access a slice of state re-render when it changes.

---

## **Usage**

```
import { CounterWidget } from "./modules/counter/widget/counter-widget";

function App() {
  return <CounterWidget />;
}
```

**Inside CounterWidget:**

```
<CounterProvider>
  <CounterProvider.Display />
  <CounterProvider.Actions />
</CounterProvider>
```

**CounterControls Example:**

```
<CounterProvider.Actions />
// Renders:
// [ + ] [ - ] [ Reset ]
```

**CounterDisplay Example:**

```
<CounterProvider.Display />
// Renders: "Count: 0"
```

---

## **Advantages**

- ✅ **Modular & reusable:** Each widget (Display, Actions) is decoupled but shares the same store.
- ✅ **Minimal boilerplate:** No prop drilling.
- ✅ **Fine-grained re-renders:** Only components that use the state slice update.
- ✅ **Persistent state:** Simple integration with localStorage.
- ✅ **Intuitive API:** CounterProvider.Display feels like a self-contained module.

---

## **Trade-offs**

- ⚠️ **Custom store limitations:** No middleware, devtools, or batching.
- ⚠️ **TypeScript complexity:** Requires careful typing for generic components.
- ⚠️ **Scaling issues:** For hundreds of stores, a global state manager might be more maintainable.
- ⚠️ **Testing overhead:** Mocking store and context is required for isolated tests.
- ⚠️ **Combining stores:** Spreading multiple stores can lead to overwrites or stale data if not managed carefully.

---

## **When to Use**

- Ideal for **feature-level state management**.
- Great for **modular UI libraries** where each widget needs its own isolated state.
- Perfect when you want **fine-grained reactivity** without introducing a full global state solution.
- Not ideal for **complex global state** or applications that require sophisticated async middleware.

---

## **Conclusion**

The **Compound Provider + Custom Store** pattern provides a lightweight, modular approach for managing state in React components:

- Isolated, self-contained modules
- Intuitive API with sub-components (Display / Actions)
- Fine-grained control over re-renders

Think of it as **“Zustand-lite for modules”**: simple, composable, and performant.

---

## **Demo Screenshot**

```
Count: 0

[ + ] [ - ] [ Reset ]
```

Each button updates only the necessary components, demonstrating **fine-grained updates** with minimal re-renders.

---

## **Example: Counter Store Implementation**

```
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

  return { getState, setState, subscribe };
};
```

---

## **Example: Compound Provider**

```
import type { ComponentType, FC, PropsWithChildren } from "react";

export const createCompound = <
  Props extends object,
  T extends Record<string, ComponentType<any>>
>(
  base: FC<PropsWithChildren<Props>>,
  components: (props: PropsWithChildren<Props>) => T
): FC<PropsWithChildren<Props>> & T => {
  const parts = components({} as PropsWithChildren<Props>);
  return Object.assign(base, parts);
};
```

---

## **Example: Counter Widget**

```
import { CounterProvider } from "../compose/counter-compose";

export const CounterWidget = () => (
  <CounterProvider>
    <CounterProvider.Display />
    <CounterProvider.Actions />
  </CounterProvider>
);
```
