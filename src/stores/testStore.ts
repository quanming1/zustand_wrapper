import { create } from "zustand";

interface TestState extends Record<string, unknown> {
  propertyA: number;
  propertyB: string;
  updatePropertyA: () => void;
  updatePropertyB: () => void;
  resetAll: () => void;
}

export const testStore = create<TestState>((set) => ({
  propertyA: 0,
  propertyB: "初始值",

  updatePropertyA: () => {
    set((state) => ({
      propertyA: state.propertyA + 1,
    }));
  },

  updatePropertyB: () => {
    set((state) => ({
      propertyB: `更新了 ${Date.now()}`,
    }));
  },

  resetAll: () => {
    set({
      propertyA: 0,
      propertyB: "初始值",
    });
  },
}));

export type { TestState };
