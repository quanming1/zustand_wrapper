import type { ThemeConfig } from "antd";
export const DM_COLOR = "#7171EE"; // DeepMiner 主色

export const lightTheme: ThemeConfig = {
  token: {
    colorPrimary: DM_COLOR,
    colorInfo: DM_COLOR,
    colorSuccess: DM_COLOR,
  },
  components: {
    Button: {
      borderRadius: 4,
      borderRadiusLG: 4,
      borderRadiusSM: 4,
      borderRadiusXS: 4,
      fontSize: 14,
      fontSizeLG: 14,
      fontSizeXL: 14,
      fontSizeSM: 12,
      paddingContentHorizontal: 26,
    },
    Modal: {},
  },
};

export const darkTheme: ThemeConfig = {
  ...lightTheme,
  token: {
    ...lightTheme.token,
    colorPrimary: DM_COLOR,
  },
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const;

export type ThemeType = keyof typeof themes;
