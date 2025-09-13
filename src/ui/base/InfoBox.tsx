"use client";

import React from "react";

interface InfoBoxProps {
  type?: "info" | "success" | "warning" | "tip";
  content: string | React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const typeConfig = {
  info: {
    backgroundColor: "#f6ffed",
    textColor: "#389e0d",
  },
  success: {
    backgroundColor: "#f6ffed",
    textColor: "#389e0d",
  },
  warning: {
    backgroundColor: "#fff7e6",
    textColor: "#d46b08",
  },
  tip: {
    backgroundColor: "#e6f7ff",
    textColor: "#096dd9",
  },
};

export default function InfoBox({ type = "info", content, style, className }: InfoBoxProps) {
  const config = typeConfig[type];

  return (
    <div
      className={className}
      style={{
        backgroundColor: config.backgroundColor,
        color: config.textColor,
        padding: "4px 8px",
        borderRadius: "3px",
        fontSize: "13px",
        lineHeight: "1.4",
        wordBreak: "break-word",
        whiteSpace: "pre-wrap",
        ...style,
      }}
    >
      {content}
    </div>
  );
}
