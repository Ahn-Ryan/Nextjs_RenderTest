import baseStyled, { DefaultTheme, ThemedStyledInterface } from 'styled-components';
import { flexSet, fontSet, backgroundSet } from './mixin';

export const minMedia = (width: number) => `
  @media (min-width:${width}px)
  `;
export const maxMedia = (width: number) => `
  @media (max-width:${width}px)
  `;

export const mixMedia = (smallWidth: number, largeWidth: number) => `
  @media (min-width:${smallWidth}px) and (max-width:${largeWidth}px)
`;

const medias = {
  mobile: maxMedia(819),
  pad: mixMedia(820, 1439),
  desktop: minMedia(1440),
};

export const colors = {
  white: 'white',
  black: 'black',
  theme_44: '#444d69',
  theme_73: '#739cf7',
  theme_7d: '#7da1f8',
  theme_7e: '#7ea4f9',
  font_7d: '#7da1f8',
  font_8b: '#8b9ab6',
  gray_60: '#606060',
  gray_eb: '#ebebeb',
  back_f9: '#f9fbfd',
  back_fa: '#fafafa',
  back_de: '#dee2ea',
  active_73: '#739cf7',
  active_6f: '#6fbb95',
  deactive_de: '#dee2ea',
};

const myTheme: DefaultTheme = {
  medias,
  colors,
  flexSet,
  fontSet,
  minMedia,
  maxMedia,
  backgroundSet,
};

export type Theme = typeof myTheme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;

export default myTheme;
