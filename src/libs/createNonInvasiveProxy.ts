export function createNonInvasiveProxy<T extends object>(target: T, handler: ProxyHandler<T>): T {
  const emptyProxy = {} as T;

  const fullHandler: ProxyHandler<T> = {
    get(proxyTarget, prop, receiver) {
      if (handler.get) {
        return handler.get(target, prop, receiver);
      }

      const value = Reflect.get(target, prop);

      if (typeof value === "function") {
        return value.bind(target);
      }

      return value;
    },

    set(proxyTarget, prop, value, receiver) {
      if (handler.set) {
        return handler.set(target, prop, value, receiver);
      }

      return Reflect.set(target, prop, value);
    },

    deleteProperty(proxyTarget, prop) {
      if (handler.deleteProperty) {
        return handler.deleteProperty(target, prop);
      }

      return Reflect.deleteProperty(target, prop);
    },

    has(proxyTarget, prop) {
      if (handler.has) {
        return handler.has(target, prop);
      }

      return Reflect.has(target, prop);
    },

    ownKeys(proxyTarget) {
      if (handler.ownKeys) {
        return handler.ownKeys(target);
      }

      return Reflect.ownKeys(target);
    },

    getOwnPropertyDescriptor(proxyTarget, prop) {
      if (handler.getOwnPropertyDescriptor) {
        return handler.getOwnPropertyDescriptor(target, prop);
      }

      return Reflect.getOwnPropertyDescriptor(target, prop);
    },

    defineProperty(proxyTarget, prop, descriptor) {
      if (handler.defineProperty) {
        return handler.defineProperty(target, prop, descriptor);
      }

      return Reflect.defineProperty(target, prop, descriptor);
    },

    preventExtensions(proxyTarget) {
      if (handler.preventExtensions) {
        return handler.preventExtensions(target);
      }

      return Reflect.preventExtensions(target);
    },

    isExtensible(proxyTarget) {
      if (handler.isExtensible) {
        return handler.isExtensible(target);
      }

      return Reflect.isExtensible(target);
    },

    getPrototypeOf(proxyTarget) {
      if (handler.getPrototypeOf) {
        return handler.getPrototypeOf(target);
      }

      return Reflect.getPrototypeOf(target);
    },

    setPrototypeOf(proxyTarget, prototype) {
      if (handler.setPrototypeOf) {
        return handler.setPrototypeOf(target, prototype);
      }

      return Reflect.setPrototypeOf(target, prototype);
    },
  };

  return new Proxy(emptyProxy, fullHandler);
}
