import React, { forwardRef } from "react";
import { Tooltip, TooltipProps } from "antd";
import styled from "@emotion/styled";
import classNames from "classnames";

interface IconWrapperProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  size?: number;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  color?: string;
  hoverColor?: string;
  offsetY?: number;
  scale?: number;
  wrapperStyle?: React.CSSProperties;
  tooltipProps?: TooltipProps;
  spin?: boolean;
}

export const IconWrapper = forwardRef<HTMLDivElement, IconWrapperProps>(
  ({ icon: Icon, size = 16, className, onClick, color, hoverColor, offsetY, scale, wrapperStyle, tooltipProps, spin = false }, ref) => {
    const iconElement = (
      <IconWrapperStyled
        ref={ref}
        className={classNames("inline-flex items-center justify-center", onClick && "cursor-pointer", className)}
        size={size}
        color={color}
        hoverColor={hoverColor}
        offsetY={offsetY}
        scale={scale}
        spin={spin}
        onClick={onClick}
        style={wrapperStyle}
      >
        <Icon />
      </IconWrapperStyled>
    );

    if (tooltipProps) {
      return <Tooltip {...tooltipProps}>{iconElement}</Tooltip>;
    }

    return iconElement;
  }
);

IconWrapper.displayName = "IconWrapper";

const IconWrapperStyled = styled.div<{
  size: number;
  color?: string;
  hoverColor?: string;
  offsetY?: number;
  scale?: number;
  spin?: boolean;
}>`
  ${({ offsetY, scale }) => {
    const transforms = [];
    if (offsetY) transforms.push(`translateY(${offsetY}px)`);
    if (scale) transforms.push(`scale(${scale})`);
    return transforms.length > 0 ? `transform: ${transforms.join(" ")};` : "";
  }}
  ${({ spin }) =>
    spin &&
    `
    animation: spin 1s linear infinite;
  `}

  svg {
    font-size: ${({ size }) => size}px;
    ${({ color }) => (color ? `color: ${color} !important;` : "")}
    ${({ color }) => (color ? `fill: ${color} !important;` : "")}
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;

    ${({ hoverColor }) =>
      hoverColor &&
      `
    &:hover {
      color: ${hoverColor} !important;
      fill: ${hoverColor} !important;
    }
  `}
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
