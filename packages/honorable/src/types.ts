import '@emotion/react'
import React, { PropsWithChildren, PropsWithRef, Ref } from 'react'

import mpProperties from './data/mpProperties'
import stylesProperties from './data/stylesProperties'
import propToPseudoSelectors from './data/propToPseudoSelectors'

// TODO v1 use CSSProperties from react

/*
  COMPONENTS
*/

export type ElementProps<Tag> = PropsWithChildren<
  PropsWithRef<
    Tag extends keyof JSX.IntrinsicElements
    ? JSX.IntrinsicElements[Tag]
    : never
  >
>

export type AnyProps = {
  [key: string]: any
}

export type CssProps = {
  css?: any
}

export type PseudoSelectorProps = {
  [key in keyof typeof propToPseudoSelectors]?: object
}

export type MpProperties = typeof mpProperties[number]
export type MpProps = {
  [mpKey in MpProperties]?: number | string | 'auto'
}

export type StylesProperties = typeof stylesProperties[number]
export type StylesProps = AnyProps & CssProps & PseudoSelectorProps & MpProps & {
  [stylesKey in StylesProperties]?: any
}

export type StyledTagHonorableProps = {
  honorable: StylesProps
}

/*
  THEME
*/

export type Mode = 'light' | 'dark' | string

export type ColorKey = string
export type ColorValue = string | ColorKey | {
  [modeKey in Mode]: string | ColorKey
}

export type StylesArrayFunction = (props: object, theme: HonorableTheme) => StylesProps
export type StylesArray = (StylesProps | StylesArrayFunction)[]

export type PartProps = {
  [partName: string]: StylesArray | PartProps
}
export type ComponentProps = PartProps & {
  DefaultProps?: StylesArray
  Root?: StylesArray
}

export type HonorableTheme = {
  name?: string
  mode?: Mode
  breakpoints?: {
    [breakpointName: string]: number
  }
  colors?: {
    [colorName: ColorKey]: ColorValue
  }
  aliases?: {
    [alias: string]: string
  }
  stylesheet?: {
    [selector: string]: StylesArray
  }
  global?: StylesArray
  utils?: {
    resolveColorString: (color: string) => string
    resolveColorObject: (color: object) => object
  }
  cache?: Record<string, object>
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
  Card?: ComponentProps
  Caret?: ComponentProps
  Checkbox?: ComponentProps
  DatePicker?: ComponentProps
  DatePickerDay?: ComponentProps
  DatePickerYears?: ComponentProps
  DatePickerYear?: ComponentProps
  DropdownButton?: ComponentProps
  Flex?: ComponentProps
  Icon?: ComponentProps
  IconButton?: ComponentProps
  Input?: ComponentProps
  Menu?: ComponentProps
  MenuItem?: ComponentProps
  Modal?: ComponentProps
  ProgressBar?: ComponentProps
  Radio?: ComponentProps
  RadioGroup?: ComponentProps
  Select?: ComponentProps
  Skeleton?: ComponentProps
  Slider?: ComponentProps
  Spinner?: ComponentProps
  Switch?: ComponentProps
  Text?: ComponentProps
  Tooltip?: ComponentProps
}

export type TargetWithValue<T> = T & {
  target: {
    value: any
  }
  currentTarget: {
    value: any
  }
}

export type TargetWithChecked<T> = T & {
  target: {
    checked: boolean
  }
  currentTarget: {
    checked: boolean
  }
}

// Redecalare forwardRef
// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forward_and_create_ref/
declare module 'react' {
  function forwardRef<T, P = unknown>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): React.ComponentType<P & React.RefAttributes<T>>
}

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends HonorableTheme {}
}
