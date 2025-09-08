/* eslint-disable @typescript-eslint/no-explicit-any */

function createNonInvasiveProxy<T extends Record<string, any>>(target: T, handler?: ProxyHandler<T>): T {
  const fullHandler: ProxyHandler<T> = {
    get(_, prop, receiver) {
      return handler?.get ? handler.get(target, prop, receiver) : Reflect.get(target, prop, receiver);
    },

    set(_, prop, value, receiver) {
      if (handler?.set) {
        return handler.set(target, prop, value, receiver);
      }
      return Reflect.set(target, prop, value, receiver);
    },

    deleteProperty(_, prop) {
      if (handler?.deleteProperty) {
        return handler.deleteProperty(target, prop);
      }
      return Reflect.deleteProperty(target, prop);
    },

    has(_, prop) {
      if (handler?.has) {
        return handler.has(target, prop);
      }
      return Reflect.has(target, prop);
    },

    ownKeys(_) {
      if (handler?.ownKeys) {
        return handler.ownKeys(target);
      }
      return Reflect.ownKeys(target);
    },

    getOwnPropertyDescriptor(_, prop) {
      if (handler?.getOwnPropertyDescriptor) {
        return handler.getOwnPropertyDescriptor(target, prop);
      }
      return Reflect.getOwnPropertyDescriptor(target, prop);
    },

    defineProperty(_, prop, descriptor) {
      if (handler?.defineProperty) {
        return handler.defineProperty(target, prop, descriptor);
      }
      return Reflect.defineProperty(target, prop, descriptor);
    },

    preventExtensions(_) {
      if (handler?.preventExtensions) {
        return handler.preventExtensions(target);
      }
      return Reflect.preventExtensions(target);
    },

    isExtensible(_) {
      if (handler?.isExtensible) {
        return handler.isExtensible(target);
      }
      return Reflect.isExtensible(target);
    },

    getPrototypeOf(_) {
      if (handler?.getPrototypeOf) {
        return handler.getPrototypeOf(target);
      }
      return Reflect.getPrototypeOf(target);
    },

    setPrototypeOf(_, prototype) {
      if (handler?.setPrototypeOf) {
        return handler.setPrototypeOf(target, prototype);
      }
      return Reflect.setPrototypeOf(target, prototype);
    },
  };

  const proxy = new Proxy({} as T, fullHandler);
  return proxy;
}

export default createNonInvasiveProxy;
