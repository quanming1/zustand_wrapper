/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import type { StoreWithSubscription } from "@/libs/observerStore";
import { useMemo, useRef, useState, useLayoutEffect } from "react";

type RecordFunction = () => () => string[];

export function useStores<T extends object>(store: StoreWithSubscription<T>, name?: string): StoreWithSubscription<T> {
  const accessedFieldsRef = useRef<Set<string>>(new Set());
  const accessedProperties = useRef<Set<string>>(new Set());
  const recording = useRef<boolean>(false);

  const startRecord: RecordFunction = () => {
    recording.current = true;
    return () => {
      const visited = Array.from(accessedProperties.current);
      accessedProperties.current.clear();
      recording.current = false;
      return visited;
    };
  };

  const endRef = useRef<() => string[]>(startRecord());
  const [, __update__] = useState({});
  const forceUpdate = () => __update__({});

  const proxiedStore = useMemo(() => {
    const proxy = new Proxy(store, {
      get(target, prop, receiver) {
        const result = Reflect.get(target, prop, receiver);

        if (typeof result === "function") {
          return result.bind(proxy);
        }

        if (typeof prop === "string" && recording.current && typeof result !== "function") {
          accessedProperties.current.add(prop);
        }

        return result;
      },
    });

    return proxy as StoreWithSubscription<T>;
  }, []);

  useLayoutEffect(() => {
    const unsubscribe = store.$subscript((key) => {
      const accessedFields = endRef.current();
      const mergedFields = new Set([...accessedFieldsRef.current, ...(accessedFields || [])]);
      if (mergedFields.has(key as string)) {
        accessedFieldsRef.current = mergedFields;
        forceUpdate();
      }

      endRef.current = startRecord();
    });

    return unsubscribe;
  }, []);

  return proxiedStore;
}
