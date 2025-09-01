import { testStore } from "./testStore";
import type { TestState } from "./testStore";

export const stores = {
  testStore,
} as const;

export type StoresType = {
  testStore: typeof testStore;
};

export type { TestState };
