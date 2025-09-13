import { observerStore } from "./observerStore";

interface CustomerModalConfig {
  title: string;
  greeting?: string;
  content: string;
  qrCodeSrc?: string;
  onCancel?: () => void;
}

interface CustomerModalState {
  visible: boolean;
  config: CustomerModalConfig;
}

class CustomerModalManager {
  private store = observerStore<CustomerModalState>({
    visible: false,
    config: { title: "", content: "" },
  });

  show = (config: CustomerModalConfig) => {
    this.store.visible = true;
    this.store.config = config;
  };

  hide = () => {
    this.store.visible = false;
    this.store.config = { title: "", content: "" };
  };

  subscribe = (callback: (key: string | symbol, oldValue: unknown, newValue: unknown) => void) => {
    return this.store.$subscript(callback);
  };

  getState = () => {
    return {
      visible: this.store.visible,
      config: this.store.config,
    };
  };
}

export const customerModalManager = new CustomerModalManager();

export const triggerAddCustomerModal = (params: { title: string; greeting?: string; content: string; qrCodeSrc?: string }) => {
  customerModalManager.show({
    title: params.title,
    greeting: params.greeting,
    content: params.content,
    qrCodeSrc: params.qrCodeSrc,
    onCancel: () => {
      customerModalManager.hide();
    },
  });
};

export const hideCustomerModal = () => {
  customerModalManager.hide();
};
