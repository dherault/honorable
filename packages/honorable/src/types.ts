/* eslint-disable no-unused-vars */
import '@emotion/react'
import React, { PropsWithChildren, Ref } from 'react'

import tags from './data/tags'
import { styleProperties } from './data/styleProperties'
import { mpProperties } from './data/mpProperties'

export type ElementProps<Tag> =
  Tag extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[Tag]
  : never

export type AnyProps = {
  [key: string]: any
}

export type RefProps = {
  ref?: Ref<any>
}

export type StyleProperties = typeof styleProperties[number]
export type StyleProps = {
  [styleKey in StyleProperties]?: any
}

export type MpProperties = typeof mpProperties[number]
export type MpProps = {
  [mpKey in MpProperties]?: number | 'auto'
}

export type XflexProps = {
  xflex?: string
}

export type ExtendProps = {
  extend?: object
}

export type HonorableRefProps = {
  honorableRef: Ref<any>
}

export type ThemeProps = {
  theme: HonorableTheme
}

export type HonorableProps<P> = PropsWithChildren<StyleProps & MpProps & XflexProps & ExtendProps & P & AnyProps>

export type InnerHonorableProps<P> = HonorableProps<P> & HonorableRefProps

export type StyledHonorableProps = {
  ref: Ref<any>
  theme: HonorableTheme
  honorable: StyleProps
}

export type Mode = 'light' | 'dark' | string

export type FontStyle = {
  family: string
  size: number | string
}

export type ColorValue = string
export type ColorStyle = string | ColorValue | {
  [modeKey in Mode]: string | ColorValue
}

export type CustomProps = Map<(props: object, theme: HonorableTheme) => boolean, StyleProps>

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

export interface HonorableThemeBase {
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
  utils?: {
    resolveColor: (color: string | StyleProps) => string | StyleProps
  }
}

export type HonorableTheme = HonorableThemeBase & {
  [componentNameKey in ComponentNames]?: ComponentProps
}

export type ThemeProviderProps = PropsWithChildren<ThemeProps>

// Redecalare forwardRef
// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forward_and_create_ref/
declare module 'react' {
  function forwardRef<T, P = unknown>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): React.ComponentType<P & React.RefAttributes<T>>
}

declare module '@emotion/react' {
  // @ts-ignore
  export type Theme = HonorableThemeBase
}
