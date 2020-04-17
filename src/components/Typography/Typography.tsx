import styled, { css } from "styled-components";
import { rem } from "polished";

export type FontWeightTypes = "normal" | "semibold" | "bold" | "extrabold";
export type FontSizes = "smallest" | "small" | "normal" | "large" | "x2" | "x3" | "larger" | "largest";
export type Colors = "white" | "gray" | "black" | "darkGray" | "opacityGray" | "red";
export type AlignmentTypes = "inherit" | "left" | "center" | "right" | "justify";

const fontWeightMap: Record<FontWeightTypes, number> = {
  normal: 400,
  semibold: 500,
  bold: 600,
  extrabold: 700
};

const fontSizeMap: Record<FontSizes, number> = {
  smallest: 12,
  small: 14,
  normal: 16,
  large: 18,
  x2: 20,
  x3: 22,
  larger: 24,
  largest: 34
};

const colorMap: Record<Colors, string> = {
  white: "#fafafa",
  gray: "#f6f6f6",
  darkGray: "#949494",
  opacityGray: "rgba(148, 148, 148, 0.1)",
  black: "#171717",
  red: "#B00020"
};

export const getFontSize = (type: FontSizes) => {
  return rem(fontSizeMap[type]);
};
export const getFontWeight = (type: FontWeightTypes) => {
  return fontWeightMap[type];
};
export const getColors = (type: Colors) => {
  return colorMap[type];
};

export interface ITypographyProps {
  fontWeight?: FontWeightTypes;
  fontSize?: FontSizes;
  color?: Colors;
  align?: AlignmentTypes;
  fullWidth?: boolean;
}

const fullWidth = css`
  display: inline-block;
  width: 100%;
`;

const Typography = styled.span<ITypographyProps>`
  padding: 0;
  margin: 0;

  color: ${props => (props.color ? getColors(props.color) : getColors("black"))};
  font-size: ${props => (props.fontSize ? getFontSize(props.fontSize) : getFontSize("normal"))};
  font-weight: ${props => (props.fontWeight ? getFontWeight(props.fontWeight) : getFontWeight("normal"))};
  text-align: ${props => (props.align ? props.align : "initial")};
  ${props => props.fullWidth && fullWidth}
`;

export default Typography;
