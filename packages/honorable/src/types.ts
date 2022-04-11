import { ReactNode } from 'react'
import { InferProps } from 'prop-types'

import tags from './data/tags'
import { stylePropTypes } from './utils/styleProperties'

export type AnyProps = {
  [key: string]: any
}

export type StyleProps = InferProps<typeof stylePropTypes> & AnyProps
export type StylePropsValue = string | number

export type HonorableStyleProps = {
  honorable: StyleProps
}

export type ExtendProps = {
  extend: StyleProps
}

export type Mode = 'light' | 'dark' | string

export type FontStyle = {
  family: string
  size: number | string
}

export type ColorValue = string
export type ColorStyle = string | ColorValue | {
  [mode in Mode]: string | ColorValue
}

export type CustomProps = Map<(props: AnyProps, theme: Theme) => boolean, StyleProps>

export type ComponentNames = typeof tags[number]

export type ComponentProps = {
  defaultProps: StyleProps
  customProps: CustomProps
}

export type ThemeComponents = {
  [componentName in ComponentNames]: ComponentProps
}

export type Theme = ThemeComponents & {
  mode?: Mode
  font?: FontStyle
  colors?: {
    [key: ColorValue]: ColorStyle
  }
  global?: ComponentProps
}

export type ExtendedTheme = Theme & {
  utils: {
    resolveColor: (color: string | StyleProps) => string
  }
}

export type ThemeProviderProps = {
  theme: Theme
  children: ReactNode
}

export type IconProps = AnyProps & {
  children?: ReactNode
  className?: string
}
