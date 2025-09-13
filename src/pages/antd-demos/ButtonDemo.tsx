"use client";

import React from "react";
import { Button, Space, Typography, Card, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import InfoBox from "@/ui/base/InfoBox";

const { Title } = Typography;

export default function ButtonDemo() {
  return (
    <div>
      <Card title="按钮 Button" style={{ marginBottom: "24px" }}>
        <InfoBox
          type="info"
          content={`
          变化：
          1. 默认圆角为4px
          2. 按钮默认大小为14px
          3. type=text 更新了背景色和文本
          4. padding-left 和 padding-right 更新为 16px
        `}
          style={{ marginBottom: "24px" }}
        />

        <Row gutter={[16, 24]}>
          <Col span={12}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Title level={5}>基础按钮</Title>
              <Space wrap>
                <Button type="primary">主要按钮</Button>
                <Button>默认按钮</Button>
                <Button type="dashed">虚线按钮</Button>
                <Button type="text">文本按钮</Button>
                <Button type="link">链接按钮</Button>
                <Button danger>危险按钮</Button>
              </Space>
            </Space>
          </Col>

          <Col span={12}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Title level={5}>状态按钮</Title>
              <Space wrap>
                <Button loading>加载中</Button>
                <Button disabled>禁用按钮</Button>
                <Button ghost>幽灵按钮</Button>
              </Space>
            </Space>
          </Col>

          <Col span={12}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Title level={5}>形状和尺寸</Title>
              <Space wrap>
                <Button size="large">大按钮</Button>
                <Button size="middle">中按钮</Button>
                <Button size="small">小按钮</Button>
              </Space>
              <Space wrap style={{ marginTop: "8px" }}>
                <Button shape="circle" icon={<UserOutlined />} size="large" />
                <Button shape="circle" icon={<UserOutlined />} />
                <Button shape="circle" icon={<UserOutlined />} size="small" />
              </Space>
            </Space>
          </Col>

          <Col span={12}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Title level={5}>圆角按钮</Title>
              <Space wrap>
                <Button type="primary" shape="round">
                  主要圆角
                </Button>
                <Button shape="round">默认圆角</Button>
                <Button type="dashed" shape="round">
                  虚线圆角
                </Button>
                <Button danger shape="round">
                  危险圆角
                </Button>
              </Space>
              <Space wrap style={{ marginTop: "8px" }}>
                <Button type="primary" shape="round" size="small">
                  小圆角
                </Button>
                <Button shape="round" size="small">
                  小默认
                </Button>
              </Space>

              <Button shape={"round"} style={{ height: 28 }} type="primary">
                圆角，但是高度28px（自定义高度）
              </Button>
            </Space>
          </Col>

          <Space direction="vertical" style={{ width: "100%" }}>
            <Title level={5}>自定义</Title>
            <div style={{ display: "flex", gap: "8px" }}>
              <Button shape={"round"} style={{ height: 28, fontWeight: "bold" }} type="primary">
                执行新任务
              </Button>
              <Button shape={"round"} style={{ height: 28, fontWeight: "bold" }}>
                新任务模板
              </Button>
            </div>
          </Space>
        </Row>
      </Card>
    </div>
  );
}
