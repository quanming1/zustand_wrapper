type Callback = (key: string | symbol, oldValue: unknown, newValue: unknown) => void;

export class Subscription {
  private subscribers = new Set<Callback>();

  notify = (key: string | symbol, oldValue: unknown, newValue: unknown) => {
    if (oldValue === newValue) return;

    this.subscribers.forEach((callback) => {
      try {
        callback(key, oldValue, newValue);
      } catch (error) {
        console.error("订阅回调执行错误:", error);
      }
    });
  };

  subscribe = (callback: Callback) => {
    this.subscribers.add(callback);
    return () => {
      this.subscribers.delete(callback);
    };
  };
}
