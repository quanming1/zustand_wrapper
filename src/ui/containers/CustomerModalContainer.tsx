"use client";
import { useEffect, useState } from "react";
import { ContactUs } from "@/ui/modal/ContactUs";
import { customerModalManager, hideCustomerModal } from "@/libs/customerModal";

interface CustomerModalState {
  visible: boolean;
  config: {
    title: string;
    greeting?: string;
    content: string;
    qrCodeSrc?: string;
  };
}

export const CustomerModalContainer = () => {
  const [modalState, setModalState] = useState<CustomerModalState | null>(null);

  useEffect(() => {
    const unsubscribe = customerModalManager.subscribe(() => {
      setModalState(customerModalManager.getState());
    });
    return unsubscribe;
  }, []);

  const handleCancel = () => {
    hideCustomerModal();
  };

  if (!modalState) return <></>;

  return (
    <ContactUs
      title={modalState.config.title}
      open={modalState.visible}
      greeting={modalState.config.greeting}
      content={modalState.config.content}
      qrCodeSrc={modalState.config.qrCodeSrc}
      onCancel={handleCancel}
    />
  );
};
