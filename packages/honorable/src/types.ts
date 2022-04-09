import { InferProps } from 'prop-types'

import { stylePropTypes } from './utils/styleProperties'

export type HonorableStyleProps = {
  honorable: object;
}

export type StyleProps = InferProps<typeof stylePropTypes>
export type StylePropsValue = string | number

export type AnyProps = {
  [key: string]: any;
}

export type Mode = 'light' | 'dark' | string

export type FontStyle = {
  fontFamily: string;
  fontSize: number | string;
}

export type ColorValue = string
;export type ColorStyle = string | ColorValue | {
  [mode in Mode]: string | ColorValue;
}

export type CustomProps = {
  [key: string]: Map<any, StyleProps>;
}

export type ComponentName = string // TODO

export interface HonorableThemeComponenents {
  [key: ComponentName]: {
    defaultProps: StyleProps,
    customProps: CustomProps,
  }
}

export type HonorableTheme = HonorableThemeComponenents & {
  mode: Mode,
  font: FontStyle,
  colors: {
    [key: ColorValue]: ColorStyle;
  },
}
