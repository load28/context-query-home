import { createContextQuery } from "@context-query/react";

type CounterAtoms = {
  counter: {
    value: number;
    name: string;
  };
};

export const {
  ContextQueryProvider: CounterQueryProvider,
  useContextAtom: useCounterAtom,
  useContextAtomValue: useCounterAtomValue,
  useContextSetAtom: useCounterSetAtom,
} = createContextQuery<CounterAtoms>();