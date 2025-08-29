import { createFieldStore } from "@/libs/zustand-wrapper";

interface TestState extends Record<string, unknown> {
  propertyA: number;
  propertyB: string;
  updatePropertyA: () => void;
  updatePropertyB: () => void;
  resetAll: () => void;
}

export const testStore = createFieldStore<TestState>((set) => ({
  propertyA: 0,
  propertyB: "初始值",
  updatePropertyA: () => {
    set((state: TestState) => ({
      propertyA: state.propertyA + 1,
    }));
  },

  updatePropertyB: () => {
    set((state: TestState) => ({
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
