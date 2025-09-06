import { createContextQuery } from "@context-query/react";

type ThemeAtoms = {
  theme: {
    mode: 'light' | 'dark';
    primaryColor: string;
    fontSize: 'small' | 'medium' | 'large';
  };
};

export const {
  ContextQueryProvider: ThemeQueryProvider,
  useContextAtom: useThemeAtom,
  useContextAtomValue: useThemeAtomValue,
  useContextSetAtom: useThemeSetAtom,
} = createContextQuery<ThemeAtoms>();