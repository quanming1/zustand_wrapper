import { ReactNode } from "react";
import { Modal as AntdModal, ModalProps as AntdModalProps } from "antd";
import styled from "@emotion/styled";
import { Button } from "antd";

interface ModalProps extends Omit<AntdModalProps, "children"> {
  children: ReactNode;
  okText?: string;
  cancelText?: string;
}

export const Modal = ({ children, footer, okText, cancelText, ...restProps }: ModalProps) => {
  const defaultFooter = [
    <div key="default-footer" style={{ display: "flex", justifyContent: "flex-end" }}>
      <Button className="!font-[600]" type="text" onClick={restProps.onCancel}>
        {cancelText || "取消"}
      </Button>
      <Button className="ml-[16px] !font-[500]" type="primary" onClick={restProps.onOk}>
        {okText || "确定"}
      </Button>
    </div>,
  ];

  const modalWidth = typeof restProps.width === "object" ? 400 : restProps.width || 400;
  const modalHeight = restProps.height || 228;

  return (
    <StyledModal
      centered
      footer={footer || defaultFooter}
      {...restProps}
      width={modalWidth}
      height={modalHeight}
      className={`custom-modal ${restProps.className || ""}`}
    >
      {children}
    </StyledModal>
  );
};

const StyledModal = styled(AntdModal)<{ height?: number | string; width?: number | string }>`
  height: fit-content;

  .ant-modal-content {
    border-radius: 4px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    background: #fff;
    padding: 0;
    padding-top: 0;
    display: flex;
    flex-direction: column;
    padding-bottom: 16px;
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;

    .ant-modal-close {
      top: 28px;
      right: 16px;
      transform: translateY(-52%);

      .ant-modal-close-x {
        width: auto;
        height: auto;
        line-height: 1;
        font-size: 18px;
        color: #666;

        &:hover {
          color: #333;
        }
      }
    }

    .ant-modal-header {
      border-bottom: none;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      height: 56px;

      .ant-modal-title {
        font-weight: 600;
        font-size: 16px;
        color: #000;
      }
    }

    .ant-modal-body {
      flex: 1;
      padding: 0;
      padding: 0 16px;
      overflow-y: auto;
    }

    .ant-modal-footer {
      padding: 0;
      margin: 0;
      padding: 0 16px;
      margin-top: 16px;

      &:empty {
        margin: 0 !important;
      }
    }
  }
`;
