import { Ref } from 'react'
import { InferProps } from 'prop-types'

import tags from './data/tags'
import { stylePropTypes } from './data/styleProperties'

export type RefProps ={
  ref?: Ref<any>
  honorableRef?: Ref<any>
}

export type StyleProps = InferProps<typeof stylePropTypes>
export type StylePropsValue = string | number

export type HonorableStyleProps = {
  ref?: Ref<any>
  honorable?: StyleProps
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

export type CustomProps = Map<(props: object, theme: Theme) => boolean, StyleProps>

export type ComponentNames = typeof tags[number]

export type ComponentProps = {
  defaultProps?: StyleProps
  customProps?: CustomProps
  partDefaultProps?: {
    [key: string]: StyleProps
  }
  partCustomProps?: {
    [key: string]: CustomProps
  }
}

export type ThemeComponents = {
  [componentName in ComponentNames]: ComponentProps
}

export type Theme = ThemeComponents & {
  name?: string
  mode?: Mode
  colors?: {
    [key: ColorValue]: ColorStyle
  }
  aliases?: {
    [key: string]: string
  }
  html?: StyleProps
  global?: ComponentProps
}

export type ExtendedTheme = Theme & {
  utils: {
    resolveColor: (color: string | StyleProps) => string
  }
}
