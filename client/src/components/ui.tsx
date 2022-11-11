import styled, { DefaultThemeColorKey } from "styled-components";

type StyleText = {
  color?: DefaultThemeColorKey;
  pointer?: boolean;
};

export const Text = {
  TitleText: styled.span<StyleText>`
    font-weight: 700;
    font-size: 30px;
    cursor: ${({ pointer }) => (pointer ? "pointer" : "auto")};
    color: ${({ color, theme }) =>
      color ? theme.color[color] : theme.color.black};
    height: fit-content;
  `,
  ListText: styled.span<StyleText>`
    font-weight: 500;
    font-size: 24px;
    cursor: ${({ pointer }) => (pointer ? "pointer" : "auto")};
    color: ${({ color, theme }) =>
      color ? theme.color[color] : theme.color.black};
    height: fit-content;
  `,
  ContentText: styled.span<StyleText>`
    font-weight: 300;
    font-size: 18px;
    cursor: ${({ pointer }) => (pointer ? "pointer" : "auto")};
    color: ${({ color, theme }) =>
      color ? theme.color[color] : theme.color.black};
    height: fit-content;
  `,
};
