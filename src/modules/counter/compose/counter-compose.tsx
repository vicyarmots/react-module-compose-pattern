import type { PropsWithChildren } from "react";
import { createCompound } from "../../../shared/lib/create-compound/create-compound";
import { CounterContext, counterStore } from "../model/counter";
import { CounterControls } from "../ui/counter-controls";
import { CounterDisplay } from "../ui/counter-display";

export const CounterProvider = createCompound(
  ({ children }: PropsWithChildren) => (
    <CounterContext.Provider value={counterStore}>
      {children}
    </CounterContext.Provider>
  ),
  () => ({
    Display: () => <CounterDisplay />,
    Actions: () => <CounterControls />,
  })
);
