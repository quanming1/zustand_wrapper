"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createNonInvasiveProxy } from "@/libs/createNonInvasiveProxy";
import type { UseBoundStore, StoreApi } from "zustand";

const UNINITIALIZED = Symbol("uninitialized");

export function useAutoSubscribeStore<T extends Record<string, unknown>>(store: UseBoundStore<StoreApi<T>>): T {
  const [, forceUpdate] = useState({});
  const currentAccessedFieldsRef = useRef<Set<keyof T>>(new Set());
  const subscribedFieldsRef = useRef<Set<keyof T>>(new Set());
  const prevStateRef = useRef<T | typeof UNINITIALIZED>(UNINITIALIZED);

  const triggerUpdate = useCallback(() => {
    forceUpdate({});
  }, []);

  currentAccessedFieldsRef.current.clear();

  useEffect(() => {
    prevStateRef.current = store.getState();
    subscribedFieldsRef.current = new Set(currentAccessedFieldsRef.current);

    const unsubscribe = store.subscribe((state) => {
      const prevState = prevStateRef.current;
      if (prevState === UNINITIALIZED) {
        prevStateRef.current = state;
        return;
      }

      let shouldUpdate = false;
      subscribedFieldsRef.current.forEach((field) => {
        if (state[field] !== (prevState as T)[field]) {
          shouldUpdate = true;
        }
      });

      if (shouldUpdate) {
        triggerUpdate();
      }

      prevStateRef.current = state;
    });

    return unsubscribe;
  }, [store, triggerUpdate]);

  const proxyStore = createNonInvasiveProxy({} as T, {
    get: (target, prop, receiver) => {
      if (typeof prop === "string" || typeof prop === "symbol") {
        const field = prop as keyof T;

        // 从store获取最新的值
        const currentState = store.getState();
        const value = currentState[field];

        if (typeof value !== "function") {
          currentAccessedFieldsRef.current.add(field);
        }

        if (typeof value === "function") {
          return (value as (...args: unknown[]) => unknown).bind(currentState);
        }

        return value;
      }

      return Reflect.get(target, prop, receiver);
    },
  });

  return proxyStore;
}
