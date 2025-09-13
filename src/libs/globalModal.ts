import { ReactNode } from "react";

export interface GlobalModalConfig {
  key: string;
  title?: string;
  content?: ReactNode | string;
  okText?: string;
  cancelText?: string;
  onOk?: () => void;
  onCancel?: () => void;
  width?: number;
  height?: number;
  footer?: ReactNode;
  closable?: boolean;
  maskClosable?: boolean;
  className?: string;
}

interface ModalState {
  visible: boolean;
  config: GlobalModalConfig;
}

type ModalListener = (state: ModalState) => void;

class GlobalModalManager {
  private listeners: Set<ModalListener> = new Set();
  private state: ModalState | null = null;

  subscribe = (listener: ModalListener) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  private notify = () => {
    if (this.state) {
      const currentState = this.state;
      this.listeners.forEach((listener) => listener(currentState));
    }
  };

  show = (config: GlobalModalConfig) => {
    this.state = {
      visible: true,
      config,
    };
    this.notify();
  };

  hide = () => {
    if (this.state) {
      this.state = {
        visible: false,
        config: this.state.config,
      };
      this.notify();
    }
  };

  getState = () => this.state;
}

const globalModalManager = new GlobalModalManager();

export const globalModal = (config: GlobalModalConfig) => {
  globalModalManager.show(config);
};

export const hideGlobalModal = () => {
  globalModalManager.hide();
};

export { globalModalManager };
