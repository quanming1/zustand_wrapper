interface ZustandStore<T> {
  getState(): T;
  setState(partial: Partial<T> | ((state: T) => Partial<T>)): void;
  subscribe(listener: (state: T) => void): () => void;
}

export function createNonInvasiveProxy<T extends object>(store: ZustandStore<T>, handler?: ProxyHandler<T>): T {
  const emptyProxy = {} as T;

  const fullHandler: ProxyHandler<T> = {
    get(proxyTarget, prop, receiver) {
      const currentState = store.getState();
      if (handler?.get) {
        return handler.get(currentState, prop, receiver);
      }

      const value = Reflect.get(currentState, prop);

      if (typeof value === "function") {
        return value.bind(currentState);
      }

      return value;
    },

    set(proxyTarget, prop, value, receiver) {
      if (handler?.set) {
        return handler.set(store.getState(), prop, value, receiver);
      }

      store.setState((state) => ({ ...state, [prop]: value } as Partial<T>));
      return true;
    },

    deleteProperty(proxyTarget, prop) {
      if (handler?.deleteProperty) {
        return handler.deleteProperty(store.getState(), prop);
      }

      store.setState((state) => {
        const newState = { ...state };
        delete newState[prop as keyof T];
        return newState;
      });
      return true;
    },

    has(proxyTarget, prop) {
      const currentState = store.getState();
      if (handler?.has) {
        return handler.has(currentState, prop);
      }

      return Reflect.has(currentState, prop);
    },

    ownKeys(proxyTarget) {
      const currentState = store.getState();
      if (handler?.ownKeys) {
        return handler.ownKeys(currentState);
      }

      return Reflect.ownKeys(currentState);
    },

    getOwnPropertyDescriptor(proxyTarget, prop) {
      const currentState = store.getState();
      if (handler?.getOwnPropertyDescriptor) {
        return handler.getOwnPropertyDescriptor(currentState, prop);
      }

      return Reflect.getOwnPropertyDescriptor(currentState, prop);
    },

    defineProperty(proxyTarget, prop, descriptor) {
      if (handler?.defineProperty) {
        return handler.defineProperty(store.getState(), prop, descriptor);
      }

      if (descriptor.value !== undefined) {
        store.setState((state) => ({ ...state, [prop]: descriptor.value } as Partial<T>));
      }
      return true;
    },

    preventExtensions(proxyTarget) {
      if (handler?.preventExtensions) {
        return handler.preventExtensions(store.getState());
      }

      return Reflect.preventExtensions(store.getState());
    },

    isExtensible(proxyTarget) {
      const currentState = store.getState();
      if (handler?.isExtensible) {
        return handler.isExtensible(currentState);
      }

      return Reflect.isExtensible(currentState);
    },

    getPrototypeOf(proxyTarget) {
      const currentState = store.getState();
      if (handler?.getPrototypeOf) {
        return handler.getPrototypeOf(currentState);
      }

      return Reflect.getPrototypeOf(currentState);
    },

    setPrototypeOf(proxyTarget, prototype) {
      if (handler?.setPrototypeOf) {
        return handler.setPrototypeOf(store.getState(), prototype);
      }

      return Reflect.setPrototypeOf(store.getState(), prototype);
    },
  };

  return new Proxy(emptyProxy, fullHandler);
}
