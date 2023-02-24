import 'styled-components';
import { minMedia, maxMedia } from './theme';
import { backgroundSet, flexSet, fontSet } from './mixin';
import { colors } from './colors';

declare module 'styled-components' {
  export interface DefaultTheme {
    medias: {
      mobile: any;
      pad: any;
      desktop: any;
    };
    colors: {
      white: string;
      black: string;
      theme_44: string;
      theme_73: string;
      theme_7d: string;
      theme_7e: string;
      font_7d: string;
      font_8b: string;
      gray_60: string;
      gray_eb: string;
      back_f9: string;
      back_fa: string;
      back_de: string;
      active_73: string;
      active_6f: string;
      deactive_de: string;
    };
    flexSet: typeof flexSet;
    fontSet: typeof fontSet;
    minMedia: typeof minMedia;
    maxMedia: typeof maxMedia;
    backgroundSet: typeof backgroundSet;
  }
}
