"use client";

import React from "react";
import { ConfigProvider, App } from "antd";
import { themes } from "./theme-config";
import zhCN from "antd/locale/zh_CN";
import "./antd-btn.scss";

interface AntdThemeProviderProps {
  children: React.ReactNode;
}

export const AntdThemeProvider: React.FC<AntdThemeProviderProps> = ({ children }) => {
  return (
    <ConfigProvider theme={themes.light} locale={zhCN} componentSize="large">
      <App>{children}</App>
    </ConfigProvider>
  );
};
