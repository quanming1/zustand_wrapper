import { create, StoreApi, UseBoundStore } from "zustand";

export interface FieldSubscribeStore<T> {
  originalStore: UseBoundStore<StoreApi<T>>;
  subscribe: (field: keyof T, callback: (newValue: unknown, prevValue: unknown) => void) => () => void;
}

export function createFieldStore<T>(
  storeCreator: (set: (partial: T | Partial<T> | ((state: T) => T | Partial<T>)) => void, get: () => T) => T
): FieldSubscribeStore<T> {
  const originalStore = create<T>(storeCreator);
  const fieldSubscribers = new Map<keyof T, Set<(newValue: unknown, prevValue: unknown) => void>>();
  let prevState = originalStore.getState();

  originalStore.subscribe((state) => {
    fieldSubscribers.forEach((callbacks, field) => {
      const newValue = state[field];
      const prevValue = prevState[field];

      if (newValue !== prevValue) {
        callbacks.forEach((callback) => {
          callback(newValue, prevValue);
        });
      }
    });

    prevState = state;
  });

  const subscribe = (field: keyof T, callback: (newValue: unknown, prevValue: unknown) => void) => {
    if (!fieldSubscribers.has(field)) {
      fieldSubscribers.set(field, new Set());
    }

    const subscribers = fieldSubscribers.get(field)!;
    subscribers.add(callback);

    return () => {
      subscribers.delete(callback);

      if (subscribers.size === 0) {
        fieldSubscribers.delete(field);
      }
    };
  };

  return {
    originalStore,
    subscribe,
  };
}
