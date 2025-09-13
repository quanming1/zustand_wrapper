"use client";

import React from "react";
import { Button, Space, Typography, Card, Row, Col } from "antd";
import { IconWrapper } from "@/ui/base/icon-wrapper";
import AmazonIcon from "@/assets/icons/amazon.svg";
import ShopIcon from "@/assets/icons/shop.svg";

const { Title } = Typography;

export default function IconDemo() {
  return (
    <Card title="图标 Icon" style={{ marginBottom: "24px" }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Title level={5}>基础图标</Title>
            <Space wrap size="large">
              <div style={{ textAlign: "center" }}>
                <IconWrapper icon={AmazonIcon} size={32} />
                <div style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>Amazon</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <IconWrapper icon={ShopIcon} size={32} />
                <div style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>Shop</div>
              </div>
            </Space>
          </Space>
        </Col>

        <Col span={24}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Title level={5}>不同尺寸</Title>
            <Space wrap size="large">
              <div style={{ textAlign: "center" }}>
                <IconWrapper icon={AmazonIcon} size={16} />
                <div style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>16px</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <IconWrapper icon={AmazonIcon} size={24} />
                <div style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>24px</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <IconWrapper icon={AmazonIcon} size={32} />
                <div style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>32px</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <IconWrapper icon={AmazonIcon} size={48} />
                <div style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>48px</div>
              </div>
            </Space>
          </Space>
        </Col>

        <Col span={24}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Title level={5}>颜色变化</Title>
            <Space wrap size="large">
              <div style={{ textAlign: "center" }}>
                <IconWrapper icon={ShopIcon} size={32} color="#1890ff" />
                <div style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>蓝色</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <IconWrapper icon={ShopIcon} size={32} color="#52c41a" />
                <div style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>绿色</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <IconWrapper icon={ShopIcon} size={32} color="#fa541c" />
                <div style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>橙色</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <IconWrapper icon={ShopIcon} size={32} color="#f5222d" />
                <div style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>红色</div>
              </div>
            </Space>
          </Space>
        </Col>

        <Col span={24}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Title level={5}>交互效果</Title>
            <Space wrap size="large">
              <div style={{ textAlign: "center" }}>
                <IconWrapper icon={AmazonIcon} size={32} color="#666" hoverColor="#1890ff" onClick={() => alert("点击了亚马逊图标！")} />
                <div style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>悬停变色</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <IconWrapper icon={ShopIcon} size={32} spin={true} color="#1890ff" />
                <div style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>旋转动画</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <IconWrapper icon={AmazonIcon} size={32} scale={1.2} color="#52c41a" />
                <div style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>放大1.2倍</div>
              </div>
            </Space>
          </Space>
        </Col>

        <Col span={24}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Title level={5}>工具提示</Title>
            <Space wrap size="large">
              <div style={{ textAlign: "center" }}>
                <IconWrapper icon={AmazonIcon} size={32} color="#1890ff" tooltipProps={{ title: "这是亚马逊图标", placement: "top" }} />
                <div style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>带工具提示</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <IconWrapper icon={ShopIcon} size={32} color="#52c41a" tooltipProps={{ title: "购物图标", placement: "bottom" }} />
                <div style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>底部提示</div>
              </div>
            </Space>
          </Space>
        </Col>

        <Col span={24}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Title level={5}>按钮中的图标</Title>
            <Space wrap>
              <Button type="primary" icon={<IconWrapper icon={AmazonIcon} size={16} />}>
                Amazon服务
              </Button>
              <Button icon={<IconWrapper icon={ShopIcon} size={16} />}>商店</Button>
              <Button type="dashed" icon={<IconWrapper icon={AmazonIcon} size={16} color="#1890ff" />}>
                带颜色图标
              </Button>
            </Space>
          </Space>
        </Col>
      </Row>
    </Card>
  );
}
