import React, { PropsWithChildren, PropsWithRef, ReactNode } from 'react'
import { SerializedStyles } from '@emotion/utils'
import * as CSS from 'csstype'

import { accordionParts } from './components/Accordion/Accordion'
import { autocompleteParts } from './components/Autocomplete/Autocomplete'
import { avatarParts } from './components/Avatar/Avatar'
import { boxParts } from './components/Box/Box'
import { buttonParts } from './components/Button/Button'
import { buttonGroupParts } from './components/ButtonGroup/ButtonGroup'
import { cardParts } from './components/Card/Card'
import { caretParts } from './components/Caret/Caret'
import { checkboxParts } from './components/Checkbox/Checkbox'
import { dropdownButtonParts } from './components/DropdownButton/DropdownButton'
import { flexParts } from './components/Flex/Flex'
import { iconParts } from './components/Icon/Icon'
import { iconButtonParts } from './components/IconButton/IconButton'
import { inputParts } from './components/Input/Input'
import { menuParts } from './components/Menu/Menu'
import { menuItemParts } from './components/MenuItem/MenuItem'
import { modalParts } from './components/Modal/Modal'
import { progressBarParts } from './components/ProgressBar/ProgressBar'
import { radioParts } from './components/Radio/Radio'
import { radioGroupParts } from './components/RadioGroup/RadioGroup'
import { selectParts } from './components/Select/Select'
import { skeletonParts } from './components/Skeleton/Skeleton'
import { sliderParts } from './components/Slider/Slider'
import { spinnerParts } from './components/Spinner/Spinner'
import { switchParts } from './components/Switch/Switch'
import { textParts } from './components/Text/Text'
import { tooltipParts } from './components/Tooltip/Tooltip'
import { treeViewParts } from './components/TreeView/TreeView'

export const noParts: readonly string[] = [] as const

/*
  EMOTION TYPES
*/

export type ArrayInterpolation<Props> = Array<Interpolation<Props>>

export interface FunctionInterpolation<Props> {
  (props: Props): Interpolation<Props>
}

export interface ComponentSelector {
  __emotion_styles: any
}

export type Keyframes = {
  name: string
  styles: string
  anim: number
  toString: () => string
} & string

export type Interpolation<Props> =
  | InterpolationPrimitive
  | ArrayInterpolation<Props>
  | FunctionInterpolation<Props>

export type CSSProperties = CSS.PropertiesFallback<number | string>

// export type CSSPropertiesWithMultiValues = {
//   [K in keyof CSSProperties]:
//     | CSSProperties[K]
//     | Array<Extract<CSSProperties[K], string>>
// }

export type CSSPseudos = { [K in CSS.Pseudos]?: CSSObject }

export type ArrayCSSInterpolation = Array<CSSInterpolation>

export type InterpolationPrimitive =
  | null
  | undefined
  | boolean
  | number
  | string
  | ComponentSelector
  | Keyframes
  | SerializedStyles
  | CSSObject

export type CSSInterpolation = InterpolationPrimitive | ArrayCSSInterpolation

export interface CSSOthersObject {
  [propertiesName: string]: CSSInterpolation
}

// This is the custom type that requires all of this
export type CSSObject = CSSProperties & CSSPseudos

/*
  REACT TYPES
*/

/*
  COMPONENTS
*/

// type AnyProps<T> = {
//   [P in keyof T as T[P] extends never ? any : P]?: T[P] extends never ? any : T[P]
// }

type NotFunction<T> = T extends Function ? never : T;

export type StylesProps = CSSObject

export type BaseElementProps<Tag> = PropsWithChildren<
  PropsWithRef<
    Tag extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[Tag] : never
  >
>

export type CommonElementProps<Tag> = Omit<BaseElementProps<Tag>, keyof StylesProps> & StylesProps

export type ElementProps<Tag> = CommonElementProps<Tag> | Record<string, any>

export type PartProps<T extends string> = Partial<Record<`${T}Props`, StylesProps>>

export type BaseComponentProps<Base, Tag, Part extends string> = Base & Omit<CommonElementProps<Tag>, keyof Base> & PartProps<Part>

export type ComponentProps<Base, Tag, Part extends string> = BaseComponentProps<Base, Tag, Part> | Record<string, any>

/*
  THEME
*/

export type Mode = 'light' | 'dark' | string

export type ColorKey = string

export type ColorValue = string | ColorKey | {
  [modeKey in Mode]: string | ColorKey
}

export type StylesArrayFunction = (props: object, theme: HonorableTheme) => CSSObject | false | null | undefined | 0

export type StylesArray = (CSSObject | StylesArrayFunction)[]

export type ThemePartProps = {
  [partName: string]: StylesArray | ThemePartProps
}

export type ComponentPartProps<Part extends string> = Record<Part, StylesArray> & { Root?: StylesArray }

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
  ButtonBase?: ComponentPartProps<typeof noParts[number]>
  InputBase?: ComponentPartProps<typeof noParts[number]>
  MenuBase?: ComponentPartProps<typeof noParts[number]>
  SelectBase?: ComponentPartProps<typeof noParts[number]>
  A?: ComponentPartProps<typeof noParts[number]>
  Abbr?: ComponentPartProps<typeof noParts[number]>
  Address?: ComponentPartProps<typeof noParts[number]>
  Area?: ComponentPartProps<typeof noParts[number]>
  Article?: ComponentPartProps<typeof noParts[number]>
  Aside?: ComponentPartProps<typeof noParts[number]>
  Audio?: ComponentPartProps<typeof noParts[number]>
  B?: ComponentPartProps<typeof noParts[number]>
  Base?: ComponentPartProps<typeof noParts[number]>
  Bdi?: ComponentPartProps<typeof noParts[number]>
  Bdo?: ComponentPartProps<typeof noParts[number]>
  Blockquote?: ComponentPartProps<typeof noParts[number]>
  Body?: ComponentPartProps<typeof noParts[number]>
  Br?: ComponentPartProps<typeof noParts[number]>
  Canvas?: ComponentPartProps<typeof noParts[number]>
  Caption?: ComponentPartProps<typeof noParts[number]>
  Cite?: ComponentPartProps<typeof noParts[number]>
  Code?: ComponentPartProps<typeof noParts[number]>
  Col?: ComponentPartProps<typeof noParts[number]>
  Colgroup?: ComponentPartProps<typeof noParts[number]>
  Data?: ComponentPartProps<typeof noParts[number]>
  Datalist?: ComponentPartProps<typeof noParts[number]>
  Dd?: ComponentPartProps<typeof noParts[number]>
  Del?: ComponentPartProps<typeof noParts[number]>
  Details?: ComponentPartProps<typeof noParts[number]>
  Dfn?: ComponentPartProps<typeof noParts[number]>
  Dialog?: ComponentPartProps<typeof noParts[number]>
  Div?: ComponentPartProps<typeof noParts[number]>
  Dl?: ComponentPartProps<typeof noParts[number]>
  Dt?: ComponentPartProps<typeof noParts[number]>
  Em?: ComponentPartProps<typeof noParts[number]>
  Embed?: ComponentPartProps<typeof noParts[number]>
  Fieldset?: ComponentPartProps<typeof noParts[number]>
  Figcaption?: ComponentPartProps<typeof noParts[number]>
  Figure?: ComponentPartProps<typeof noParts[number]>
  Footer?: ComponentPartProps<typeof noParts[number]>
  Form?: ComponentPartProps<typeof noParts[number]>
  H1?: ComponentPartProps<typeof noParts[number]>
  H2?: ComponentPartProps<typeof noParts[number]>
  H3?: ComponentPartProps<typeof noParts[number]>
  H4?: ComponentPartProps<typeof noParts[number]>
  H5?: ComponentPartProps<typeof noParts[number]>
  H6?: ComponentPartProps<typeof noParts[number]>
  Head?: ComponentPartProps<typeof noParts[number]>
  Header?: ComponentPartProps<typeof noParts[number]>
  Hr?: ComponentPartProps<typeof noParts[number]>
  // Html?: ComponentPartProps2<typeof noParts[number]>
  I?: ComponentPartProps<typeof noParts[number]>
  Iframe?: ComponentPartProps<typeof noParts[number]>
  Img?: ComponentPartProps<typeof noParts[number]>
  Ins?: ComponentPartProps<typeof noParts[number]>
  Kbd?: ComponentPartProps<typeof noParts[number]>
  Label?: ComponentPartProps<typeof noParts[number]>
  Legend?: ComponentPartProps<typeof noParts[number]>
  Li?: ComponentPartProps<typeof noParts[number]>
  Link?: ComponentPartProps<typeof noParts[number]>
  Main?: ComponentPartProps<typeof noParts[number]>
  Map?: ComponentPartProps<typeof noParts[number]>
  Mark?: ComponentPartProps<typeof noParts[number]>
  Meta?: ComponentPartProps<typeof noParts[number]>
  Meter?: ComponentPartProps<typeof noParts[number]>
  Nav?: ComponentPartProps<typeof noParts[number]>
  Noscript?: ComponentPartProps<typeof noParts[number]>
  // Object?: ComponentPartProps2<typeof noParts[number]>
  Ol?: ComponentPartProps<typeof noParts[number]>
  Optgroup?: ComponentPartProps<typeof noParts[number]>
  Option?: ComponentPartProps<typeof noParts[number]>
  Output?: ComponentPartProps<typeof noParts[number]>
  P?: ComponentPartProps<typeof noParts[number]>
  Param?: ComponentPartProps<typeof noParts[number]>
  Picture?: ComponentPartProps<typeof noParts[number]>
  Portal?: ComponentPartProps<typeof noParts[number]>
  Pre?: ComponentPartProps<typeof noParts[number]>
  Progress?: ComponentPartProps<typeof noParts[number]>
  Q?: ComponentPartProps<typeof noParts[number]>
  Rp?: ComponentPartProps<typeof noParts[number]>
  Rt?: ComponentPartProps<typeof noParts[number]>
  Ruby?: ComponentPartProps<typeof noParts[number]>
  S?: ComponentPartProps<typeof noParts[number]>
  Samp?: ComponentPartProps<typeof noParts[number]>
  Script?: ComponentPartProps<typeof noParts[number]>
  Section?: ComponentPartProps<typeof noParts[number]>
  Slot?: ComponentPartProps<typeof noParts[number]>
  Small?: ComponentPartProps<typeof noParts[number]>
  Source?: ComponentPartProps<typeof noParts[number]>
  Span?: ComponentPartProps<typeof noParts[number]>
  Strong?: ComponentPartProps<typeof noParts[number]>
  Style?: ComponentPartProps<typeof noParts[number]>
  Sub?: ComponentPartProps<typeof noParts[number]>
  Summary?: ComponentPartProps<typeof noParts[number]>
  Sup?: ComponentPartProps<typeof noParts[number]>
  Svg?: ComponentPartProps<typeof noParts[number]>
  Table?: ComponentPartProps<typeof noParts[number]>
  Tbody?: ComponentPartProps<typeof noParts[number]>
  Td?: ComponentPartProps<typeof noParts[number]>
  Template?: ComponentPartProps<typeof noParts[number]>
  Textarea?: ComponentPartProps<typeof noParts[number]>
  Tfoot?: ComponentPartProps<typeof noParts[number]>
  Th?: ComponentPartProps<typeof noParts[number]>
  Thead?: ComponentPartProps<typeof noParts[number]>
  Time?: ComponentPartProps<typeof noParts[number]>
  Title?: ComponentPartProps<typeof noParts[number]>
  Tr?: ComponentPartProps<typeof noParts[number]>
  Track?: ComponentPartProps<typeof noParts[number]>
  U?: ComponentPartProps<typeof noParts[number]>
  Ul?: ComponentPartProps<typeof noParts[number]>
  Var?: ComponentPartProps<typeof noParts[number]>
  Video?: ComponentPartProps<typeof noParts[number]>
  Wbr?: ComponentPartProps<typeof noParts[number]>
  // Components
  Accordion?: ComponentPartProps<typeof accordionParts[number]>
  Autocomplete?: ComponentPartProps<typeof autocompleteParts[number]>
  Avatar?: ComponentPartProps<typeof avatarParts[number]>
  Box?: ComponentPartProps<typeof boxParts[number]>
  Button?: ComponentPartProps<typeof buttonParts[number]>
  ButtonGroup?: ComponentPartProps<typeof buttonGroupParts[number]>
  Card?: ComponentPartProps<typeof cardParts[number]>
  Caret?: ComponentPartProps<typeof caretParts[number]>
  Checkbox?: ComponentPartProps<typeof checkboxParts[number]>
  // DatePicker?: ComponentPartProps<typeof datePickerParts[number]>
  // DatePickerDay?: ComponentPartProps<typeof datePickerDayParts[number]>
  // DatePickerYears?: ComponentPartProps<typeof datePickerYearsParts[number]>
  // DatePickerYear?: ComponentPartProps<typeof datePickerYearParts[number]>
  DropdownButton?: ComponentPartProps<typeof dropdownButtonParts[number]>
  Flex?: ComponentPartProps<typeof flexParts[number]>
  Icon?: ComponentPartProps<typeof iconParts[number]>
  IconButton?: ComponentPartProps<typeof iconButtonParts[number]>
  Input?: ComponentPartProps<typeof inputParts[number]>
  Menu?: ComponentPartProps<typeof menuParts[number]>
  MenuItem?: ComponentPartProps<typeof menuItemParts[number]>
  Modal?: ComponentPartProps<typeof modalParts[number]>
  ProgressBar?: ComponentPartProps<typeof progressBarParts[number]>
  Radio?: ComponentPartProps<typeof radioParts[number]>
  RadioGroup?: ComponentPartProps<typeof radioGroupParts[number]>
  Select?: ComponentPartProps<typeof selectParts[number]>
  Skeleton?: ComponentPartProps<typeof skeletonParts[number]>
  Slider?: ComponentPartProps<typeof sliderParts[number]>
  Spinner?: ComponentPartProps<typeof spinnerParts[number]>
  Switch?: ComponentPartProps<typeof switchParts[number]>
  Text?: ComponentPartProps<typeof textParts[number]>
  Tooltip?: ComponentPartProps<typeof tooltipParts[number]>
  TreeView?: ComponentPartProps<typeof treeViewParts[number]>
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
