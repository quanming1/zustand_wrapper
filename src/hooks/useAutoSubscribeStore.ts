"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createNonInvasiveProxy } from "@/libs/createNonInvasiveProxy";
import type { FieldSubscribeStore } from "@/libs/zustand-wrapper";

export function useAutoSubscribeStore<T extends Record<string, unknown>>(store: FieldSubscribeStore<T>): T {
  const [, forceUpdate] = useState({});
  const subscriptionsRef = useRef<Map<keyof T, () => void>>(new Map());
  const accessedFieldsRef = useRef<Set<keyof T>>(new Set());

  const triggerUpdate = useCallback(() => {
    forceUpdate({});
  }, []);

  const cleanupSubscriptions = useCallback(() => {
    subscriptionsRef.current.forEach((unsubscribe) => {
      unsubscribe();
    });
    subscriptionsRef.current.clear();
  }, []);

  const subscribeToField = useCallback(
    (field: keyof T) => {
      if (subscriptionsRef.current.has(field)) {
        return;
      }

      const unsubscribe = store.subscribe(field, (newValue, prevValue) => {
        triggerUpdate();
      });

      subscriptionsRef.current.set(field, unsubscribe);
    },
    [store, triggerUpdate]
  );

  const storeState = store.originalStore.getState();

  const proxyStore = createNonInvasiveProxy(storeState, {
    get: (target, prop, receiver) => {
      if (typeof prop === "string" || typeof prop === "symbol") {
        const field = prop as keyof T;

        const value = Reflect.get(target, prop);

        if (typeof value !== "function") {
          accessedFieldsRef.current.add(field);
          subscribeToField(field);
        }

        if (typeof value === "function") {
          return value.bind(target);
        }

        return value;
      }

      return Reflect.get(target, prop, receiver);
    },
  });

  useEffect(() => {
    return () => {
      cleanupSubscriptions();
    };
  }, [cleanupSubscriptions]);

  useEffect(() => {
    accessedFieldsRef.current.clear();
  });

  return proxyStore;
}
