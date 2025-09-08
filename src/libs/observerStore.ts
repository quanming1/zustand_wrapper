import createNonInvasiveProxy from "./createNonInvasiveProxy";
import { Subscription } from "./subscriptionManager";

type Callback = (key: string | symbol, oldValue: unknown, newValue: unknown) => void;
export type StoreWithSubscription<T> = T & {
  $subscript: (callback: Callback) => () => void;
};

export function observerStore<T extends object>(store: T): StoreWithSubscription<T> {
  const subscription = new Subscription();

  const proxy = createNonInvasiveProxy(store, {
    get(target, prop, receiver) {
      if (prop === "$subscript") {
        return subscription.subscribe;
      }

      return Reflect.get(target, prop, receiver);
    },

    set(target, prop, value, receiver) {
      const oldValue = Reflect.get(target, prop, receiver);
      const result = Reflect.set(target, prop, value, receiver);

      if (result) {
        subscription.notify(prop, oldValue, value);
      }

      return result;
    },
  });

  return proxy as StoreWithSubscription<T>;
}
