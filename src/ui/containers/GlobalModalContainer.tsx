"use client";
import { useEffect, useState } from "react";
import { Modal } from "@/ui/modal/custom";
import { globalModalManager, hideGlobalModal, GlobalModalConfig } from "@/libs/globalModal";

interface ModalState {
  visible: boolean;
  config: GlobalModalConfig;
}

export const GlobalModalContainer = () => {
  const [modalState, setModalState] = useState<ModalState | null>(null);

  useEffect(() => {
    const unsubscribe = globalModalManager.subscribe(setModalState);
    return unsubscribe;
  }, []);

  const handleCancel = () => {
    modalState?.config?.onCancel?.();
    hideGlobalModal();
  };

  const handleOk = () => {
    modalState?.config?.onOk?.();
    hideGlobalModal();
  };

  if (!modalState) return <></>;

  const config = modalState.config;

  return (
    <Modal
      title={config.title}
      open={modalState.visible}
      onCancel={handleCancel}
      onOk={handleOk}
      width={config.width}
      height={config.height}
      footer={config.footer}
      closable={config.closable !== false}
      maskClosable={config.maskClosable !== false}
      className={config.className}
      okText={config.okText}
      cancelText={config.cancelText}
    >
      {typeof config.content === "string" ? <div className="flex h-full w-full items-center justify-center">{config.content}</div> : config.content}
    </Modal>
  );
};
