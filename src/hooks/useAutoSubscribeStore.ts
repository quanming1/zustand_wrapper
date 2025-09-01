"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { createNonInvasiveProxy } from "@/libs/createNonInvasiveProxy";
import { stores } from "@/stores";
import type { StoresType } from "@/stores";
import type { UseBoundStore, StoreApi } from "zustand";

type StoreStates = {
  [K in keyof StoresType]: StoresType[K] extends UseBoundStore<StoreApi<infer T>> ? T : never;
};

export function useStore(): StoreStates {
  const [, forceUpdate] = useState({});
  const storeSubscribedFields = useRef(new Map<string, Set<string>>());

  const triggerUpdate = useCallback(() => {
    forceUpdate({});
  }, []);

  const proxyStores = useMemo(() => {
    const proxies = {} as StoreStates;

    (Object.keys(stores) as Array<keyof typeof stores>).forEach((storeName) => {
      const store = stores[storeName];
      (proxies as Record<string, unknown>)[storeName as string] = createNonInvasiveProxy(store, {
        get: (target, prop, receiver) => {
          if (typeof prop === "string" || typeof prop === "symbol") {
            const field = prop as string;
            const store = stores[storeName as keyof typeof stores];
            const currentState = store.getState();
            const value = currentState[field];

            // 记录访问的非函数字段到订阅列表
            if (typeof value !== "function") {
              if (!storeSubscribedFields.current.has(storeName)) {
                storeSubscribedFields.current.set(storeName, new Set());
              }
              storeSubscribedFields.current.get(storeName)!.add(field);
            }

            if (typeof value === "function") {
              return (value as (...args: unknown[]) => unknown).bind(currentState);
            }

            return value;
          }

          return Reflect.get(target, prop, receiver);
        },
      });
    });

    return proxies;
  }, []);

  (Object.keys(stores) as Array<keyof typeof stores>).forEach((storeName) => {
    storeSubscribedFields.current.get(storeName as string)?.clear();
  });

  useEffect(() => {
    const unsubscribes: (() => void)[] = [];

    (Object.keys(stores) as Array<keyof typeof stores>).forEach((storeName) => {
      const store = stores[storeName];

      const unsubscribe = store.subscribe((state: Record<string, unknown>, prevState: Record<string, unknown>) => {
        const subscribedFields = storeSubscribedFields.current.get(storeName as string);
        const hasFieldChanged = subscribedFields && prevState && Array.from(subscribedFields).some((field) => state[field] !== prevState[field]);
        if (hasFieldChanged) {
          triggerUpdate();
        }
      });

      unsubscribes.push(unsubscribe);
    });

    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe());
    };
  }, []);

  return proxyStores;
}
