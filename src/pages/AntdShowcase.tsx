"use client";

import React from "react";
import { Typography, Layout, Space } from "antd";
import ButtonDemo from "./antd-demos/ButtonDemo";
import ModalDemo from "./antd-demos/ModalDemo";
import IconDemo from "./antd-demos/IconDemo";

const { Title } = Typography;
const { Header, Content } = Layout;

export default function AntdShowcase() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          background: "#fff",
          padding: "0 24px",
          borderBottom: "1px solid #f0f0f0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={2} style={{ margin: "16px 0", color: "#1890ff" }}>
          Antd 组件展示器
        </Title>
      </Header>

      <Content style={{ padding: "24px", background: "#f5f5f5" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Space direction="vertical" style={{ width: "100%" }} size="large">
            <ButtonDemo />
            <ModalDemo />
          </Space>
        </div>
      </Content>
    </Layout>
  );
}
