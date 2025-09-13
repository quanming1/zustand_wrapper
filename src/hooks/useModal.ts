import { Modal } from "antd";
import { HookAPI } from "antd/es/modal/useModal";

export const useModal = (): { modal: HookAPI; contextHolder: React.ReactElement } => {
  const [modal, contextHolder] = Modal.useModal();

  return {
    modal,
    contextHolder,
  };
};
