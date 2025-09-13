import { Modal } from "antd";
import Image from "next/image";
import styled from "@emotion/styled";
import code from "./code.png";

interface ContactUsProps {
  title: string;
  open: boolean;
  greeting?: string;
  content: string;
  qrCodeSrc?: string;
  onCancel?: () => void;
}

export function ContactUs({ title, open, greeting = "尊敬的客户：", content, qrCodeSrc = code.src, onCancel }: ContactUsProps) {
  return (
    <StyledModal footer={null} width={400} height={464} open={open} title={title} onCancel={onCancel}>
      <ContactUsContent>
        {greeting} <br />
        {content}
      </ContactUsContent>
      <ContactUsQrcode src={qrCodeSrc} alt="联系我们二维码" width={200} height={200} />
    </StyledModal>
  );
}

const StyledModal = styled(Modal)`
  height: fit-content;

  .ant-modal-content {
    border-radius: 4px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    background: #fff;
    padding: 0;
    padding-top: 0;
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 464px;

    .ant-modal-close {
      top: 34px;
      right: 16px;
      transform: translateY(-52%);

      .ant-modal-close-x {
        width: auto;
        height: auto;
        line-height: 1;
        font-size: 18px;
        color: #eeeeee;

        &:hover {
          color: #fff;
        }
      }
    }

    .ant-modal-header {
      border-bottom: none;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      height: 72px;
      background-color: var(--dm-color-primary);
      border-radius: 4px 4px 0 0;

      .ant-modal-title {
        font-weight: 600;
        font-size: 16px;
        color: #fff;
      }
    }

    .ant-modal-body {
      flex: 1;
      padding: 0;
      padding: 0 32px;
      padding-top: 24px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
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

const ContactUsContent = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #000000bf;
`;

const ContactUsQrcode = styled(Image)`
  width: 240px;
  height: 240px;
  object-fit: contain;
  margin-top: 24px;
`;
