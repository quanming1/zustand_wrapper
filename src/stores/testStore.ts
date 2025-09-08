import { observerStore, StoreWithSubscription } from "@/libs/observerStore";

class TestStore {
  propertyA: number = 0;
  propertyB: string = "初始值";
  count: number = 0;
  message: string = "Hello";
  isVisible: boolean = true;
  items: string[] = ["item1", "item2", "item3"];
  userInfo = {
    name: "用户",
    email: "user@example.com",
  };

  updatePropertyA() {
    this.propertyA += 1;
  }

  updatePropertyB() {
    this.propertyB = `更新时间: ${new Date().toLocaleTimeString()}`;
  }

  increment() {
    this.count += 1;
  }

  decrement() {
    this.count -= 1;
  }

  updateMessage(newMessage: string) {
    this.message = newMessage;
  }

  toggleVisible() {
    this.isVisible = !this.isVisible;
  }

  addItem(item: string) {
    this.items.push(item);
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  updateUserName(name: string) {
    this.userInfo.name = name;
  }

  updateUserEmail(email: string) {
    this.userInfo.email = email;
  }

  resetAll() {
    this.propertyA = 0;
    this.propertyB = "初始值";
    this.count = 0;
    this.message = "Hello";
    this.isVisible = true;
    this.items = ["item1", "item2", "item3"];
    this.userInfo = {
      name: "用户",
      email: "user@example.com",
    };
  }
}

export const testStore = observerStore(new TestStore()) as StoreWithSubscription<TestStore>;
