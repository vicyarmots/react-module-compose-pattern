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
