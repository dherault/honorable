import '@emotion/react'
import React, { Dispatch, PropsWithRef, Ref, SetStateAction } from 'react'

import stylesProperties from './data/stylesProperties'
import mpProperties from './data/mpProperties'

// TODO v1 use CSSProperties from react

export type HonorableOverridenProps = {
  honorableOverridenProps?: object
  honorableSetOverridenProps?: Dispatch<SetStateAction<object>>
}

export type ElementProps<Tag> = HonorableOverridenProps & PropsWithRef<
  Tag extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[Tag]
  : never
>

export type AnyProps = {
  [key: string]: any
}

export type ThemeProps = {
  theme: HonorableTheme
}

export type CssProps = {
  css?: any
}

export type StylesProperties = typeof stylesProperties[number]
  | `${typeof stylesProperties[number]}-mobile`
  | `${typeof stylesProperties[number]}-tablet`
  | `${typeof stylesProperties[number]}-desktop`

export type StylesProps = CssProps & {
  [stylesKey in StylesProperties]?: any
}

export type MpProperties = typeof mpProperties[number]
  | `${typeof mpProperties[number]}-mobile`
  | `${typeof mpProperties[number]}-tablet`
  | `${typeof mpProperties[number]}-desktop`

export type MpProps = {
  [mpKey in MpProperties]?: number | string | 'auto'
}

export type XflexProps = {
  xflex?: string
  'xflex-mobile'?: string
  'xflex-tablet'?: string
  'xflex-desktop'?: string
}

export type ExtendProps = {
  extend?: object
}

export type HonorableProps<P> = P & StylesProps & MpProps & XflexProps & ExtendProps & AnyProps

export type StyledHonorableProps = HonorableOverridenProps & {
  ref: Ref<any>
  theme: HonorableTheme
  honorable: StylesProps
}

export type Mode = 'light' | 'dark' | string

export type ColorKey = string
export type ColorValue = string | ColorKey | {
  [modeKey in Mode]: string | ColorKey
}

export type DefaultPropsFunction = (props: object, theme: HonorableTheme) => StylesProps
export type DefaultProps = Array<StylesProps | DefaultPropsFunction>

export type ComponentProps = {
  defaultProps?: DefaultProps
  partProps?: {
    [key: string]: DefaultProps
  }
}

export type HonorableTheme = {
  name?: string
  mode?: Mode
  breakpoints?: {
    mobile?: number
    tablet?: number
    desktop?: number
  }
  colors?: {
    [key: ColorKey]: ColorValue
  }
  aliases?: {
    [key: string]: string
  }
  html?: DefaultProps
  global?: DefaultProps
  utils?: {
    resolveColor: (color: string | StylesProps) => string | StylesProps
  }
  // Tags
  ButtonBase?: ComponentProps
  InputBase?: ComponentProps
  MenuBase?: ComponentProps
  SelectBase?: ComponentProps
  A?: ComponentProps
  Abbr?: ComponentProps
  Address?: ComponentProps
  Area?: ComponentProps
  Article?: ComponentProps
  Aside?: ComponentProps
  Audio?: ComponentProps
  B?: ComponentProps
  Base?: ComponentProps
  Bdi?: ComponentProps
  Bdo?: ComponentProps
  Blockquote?: ComponentProps
  Body?: ComponentProps
  Br?: ComponentProps
  Canvas?: ComponentProps
  Caption?: ComponentProps
  Cite?: ComponentProps
  Code?: ComponentProps
  Col?: ComponentProps
  Colgroup?: ComponentProps
  Data?: ComponentProps
  Datalist?: ComponentProps
  Dd?: ComponentProps
  Del?: ComponentProps
  Details?: ComponentProps
  Dfn?: ComponentProps
  Dialog?: ComponentProps
  Div?: ComponentProps
  Dl?: ComponentProps
  Dt?: ComponentProps
  Em?: ComponentProps
  Embed?: ComponentProps
  Fieldset?: ComponentProps
  Figcaption?: ComponentProps
  Figure?: ComponentProps
  Footer?: ComponentProps
  Form?: ComponentProps
  H1?: ComponentProps
  H2?: ComponentProps
  H3?: ComponentProps
  H4?: ComponentProps
  H5?: ComponentProps
  H6?: ComponentProps
  Head?: ComponentProps
  Header?: ComponentProps
  Hr?: ComponentProps
  // Html?: ComponentProps
  I?: ComponentProps
  Iframe?: ComponentProps
  Img?: ComponentProps
  Ins?: ComponentProps
  Kbd?: ComponentProps
  Label?: ComponentProps
  Legend?: ComponentProps
  Li?: ComponentProps
  Link?: ComponentProps
  Main?: ComponentProps
  Map?: ComponentProps
  Mark?: ComponentProps
  Meta?: ComponentProps
  Meter?: ComponentProps
  Nav?: ComponentProps
  Noscript?: ComponentProps
  // Object?: ComponentProps
  Ol?: ComponentProps
  Optgroup?: ComponentProps
  Option?: ComponentProps
  Output?: ComponentProps
  P?: ComponentProps
  Param?: ComponentProps
  Picture?: ComponentProps
  Portal?: ComponentProps
  Pre?: ComponentProps
  Progress?: ComponentProps
  Q?: ComponentProps
  Rp?: ComponentProps
  Rt?: ComponentProps
  Ruby?: ComponentProps
  S?: ComponentProps
  Samp?: ComponentProps
  Script?: ComponentProps
  Section?: ComponentProps
  Slot?: ComponentProps
  Small?: ComponentProps
  Source?: ComponentProps
  Span?: ComponentProps
  Strong?: ComponentProps
  Style?: ComponentProps
  Sub?: ComponentProps
  Summary?: ComponentProps
  Sup?: ComponentProps
  Svg?: ComponentProps
  Table?: ComponentProps
  Tbody?: ComponentProps
  Td?: ComponentProps
  Template?: ComponentProps
  Textarea?: ComponentProps
  Tfoot?: ComponentProps
  Th?: ComponentProps
  Thead?: ComponentProps
  Time?: ComponentProps
  Title?: ComponentProps
  Tr?: ComponentProps
  Track?: ComponentProps
  U?: ComponentProps
  Ul?: ComponentProps
  Var?: ComponentProps
  Video?: ComponentProps
  Wbr?: ComponentProps
  // Components
  Accordion?: ComponentProps
  Autocomplete?: ComponentProps
  Avatar?: ComponentProps
  Box?: ComponentProps
  Button?: ComponentProps
  ButtonGroup?: ComponentProps
  Caret?: ComponentProps
  Checkbox?: ComponentProps
  DropdownButton?: ComponentProps
  Icon?: ComponentProps
  IconButton?: ComponentProps
  Input?: ComponentProps
  Menu?: ComponentProps
  MenuItem?: ComponentProps
  Modal?: ComponentProps
  ProgressBar?: ComponentProps
  Select?: ComponentProps
  Spinner?: ComponentProps
  Switch?: ComponentProps
  Text?: ComponentProps
}

// Redecalare forwardRef
// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forward_and_create_ref/
declare module 'react' {
  function forwardRef<T, P = unknown>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): React.ComponentType<P & React.RefAttributes<T>>
}

declare module '@emotion/react' {
  // @ts-ignore
  export type Theme = HonorableTheme
}
