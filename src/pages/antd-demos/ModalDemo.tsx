"use client";

import React, { useState } from "react";
import { Button, Space, Typography, Card, Row, Col } from "antd";
import { Modal } from "@/ui/modal/custom";
import { globalModal } from "@/libs/globalModal";
import { ContactUs } from "@/ui/modal/ContactUs";
import { triggerAddCustomerModal } from "@/libs/customerModal";

const { Title } = Typography;

const GET_MORE_POINTS_CUSTOMER_CONFIG = {
  title: "联系客服充值",
};

export default function ModalDemo() {
  const [modalVisible, setModalVisible] = useState(false);
  const [contactUsVisible, setContactUsVisible] = useState(false);

  const handleLowPointsModal = () => {
    const lowPointsThreshold = 100;

    globalModal({
      key: "low-points",
      title: "提示",
      content: `您的团队已不足 ${lowPointsThreshold} 积分，请及时联系运营人员充值以确保正常使用`,
      okText: "充值",
      onOk: () => {
        triggerAddCustomerModal({
          title: GET_MORE_POINTS_CUSTOMER_CONFIG.title,
          content: "如果您想获得更多的席位、积分、试用期，或开通更多的agent，请扫码添加我们的客服，谢谢！",
        });
      },
    });
  };

  const handleCustomModal = () => {
    globalModal({
      key: "custom-test",
      title: "自定义测试",
      content: (
        <div>
          <p>这是一个自定义内容的弹窗</p>
          <p>支持 ReactNode 内容</p>
        </div>
      ),
      okText: "确认",
      cancelText: "取消",
      width: 400,
      onOk: () => {
        console.log("点击了确认");
      },
      onCancel: () => {
        console.log("点击了取消");
      },
    });
  };

  return (
    <>
      <Card title="模态框 Modal" style={{ marginBottom: "24px" }}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Title level={5}>基础模态框</Title>
              <Space wrap>
                <Button type="primary" onClick={() => setModalVisible(true)}>
                  打开模态框
                </Button>
                <Button onClick={() => setContactUsVisible(true)}>联系我们</Button>
              </Space>
            </Space>
          </Col>

          <Col span={24}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Title level={5}>全局模态框</Title>
              <Space wrap>
                <Button type="primary" onClick={handleLowPointsModal}>
                  积分不足提示
                </Button>
                <Button onClick={handleCustomModal}>自定义内容弹窗</Button>
                <Button
                  type="default"
                  onClick={() =>
                    triggerAddCustomerModal({
                      title: "客服咨询",
                      greeting: "亲爱的用户：",
                      content: "欢迎联系我们的客服团队，我们将竭诚为您服务！",
                    })
                  }
                >
                  触发客服弹窗
                </Button>
              </Space>
            </Space>
          </Col>
        </Row>

        <Modal height={228} width={400} title="模态框标题" open={modalVisible} onCancel={() => setModalVisible(false)}>
          <p>这是模态框的内容</p>
          <p>你可以在这里放置任何内容</p>
          <p>你可以在这里放置任何内容</p>
        </Modal>

        <ContactUs
          title="联系我们"
          open={contactUsVisible}
          content="如果您想获得更多的席位、积分、试用期，或开通更多的agent，请扫码添加我们的客服，谢谢！"
          onCancel={() => setContactUsVisible(false)}
        />
      </Card>
    </>
  );
}
