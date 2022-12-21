import React, { PropsWithChildren, PropsWithRef } from 'react'
import { SerializedStyles } from '@emotion/utils'
import * as CSS from 'csstype'

import { accordionParts } from './components/Accordion/Accordion.js'
import { autocompleteParts } from './components/Autocomplete/Autocomplete.js'
import { avatarParts } from './components/Avatar/Avatar.js'
import { buttonParts } from './components/Button/Button.js'
import { buttonGroupParts } from './components/ButtonGroup/ButtonGroup.js'
import { caretParts } from './components/Caret/Caret.js'
import { checkboxParts } from './components/Checkbox/Checkbox.js'
import { dropdownButtonParts } from './components/DropdownButton/DropdownButton.js'
import { flexParts } from './components/Flex/Flex.js'
import { iconParts } from './components/Icon/Icon.js'
import { iconButtonParts } from './components/IconButton/IconButton.js'
import { inputParts } from './components/Input/Input.js'
import { menuParts } from './components/Menu/Menu.js'
import { menuItemParts } from './components/MenuItem/MenuItem.js'
import { modalParts } from './components/Modal/Modal.js'
import { progressBarParts } from './components/ProgressBar/ProgressBar.js'
import { radioParts } from './components/Radio/Radio.js'
import { radioGroupParts } from './components/RadioGroup/RadioGroup.js'
import { selectParts } from './components/Select/Select.js'
import { skeletonParts } from './components/Skeleton/Skeleton.js'
import { sliderParts } from './components/Slider/Slider.js'
import { spinnerParts } from './components/Spinner/Spinner.js'
import { switchParts } from './components/Switch/Switch.js'
import { tooltipParts } from './components/Tooltip/Tooltip.js'
import { treeViewParts } from './components/TreeView/TreeView.js'

export const noParts: readonly string[] = [] as const

/*
  EMOTION TYPES
*/

type ArrayInterpolation<Props> = Array<Interpolation<Props>>

interface FunctionInterpolation<Props> {
  (props: Props): Interpolation<Props>
}

interface ComponentSelector {
  __emotion_styles: any
}

type Keyframes = {
  name: string
  styles: string
  anim: number
  toString: () => string
} & string

type Interpolation<Props> =
  | InterpolationPrimitive
  | ArrayInterpolation<Props>
  | FunctionInterpolation<Props>

type CSSProperties = CSS.PropertiesFallback<number | string>

type CSSPseudos = { [K in CSS.Pseudos]?: CSSObject }

type ArrayCSSInterpolation = Array<CSSInterpolation>

type InterpolationPrimitive =
  | null
  | undefined
  | boolean
  | number
  | string
  | ComponentSelector
  | Keyframes
  | SerializedStyles
  | CSSObject

type CSSInterpolation = InterpolationPrimitive | ArrayCSSInterpolation

// This is the custom type that requires all of this
type CSSObject = CSSProperties & CSSPseudos

/*
  COMPONENTS
*/

type AnyProps = Record<string, any>

export type CssProps = CSSObject

type BaseElementProps<Tag> = PropsWithChildren<
  PropsWithRef<
    Tag extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[Tag] : never
  >
>

type CommonElementProps<Tag> = Omit<BaseElementProps<Tag>, keyof CssProps> & CssProps

export type ElementProps<Tag> = CommonElementProps<Tag> | AnyProps

type PartProps<T extends string> = Partial<Record<`${T}Props`, CssProps>>

type BaseComponentProps<Base, Tag, Part extends string> = Base & Omit<CommonElementProps<Tag>, keyof Base> & PartProps<Part>

export type ComponentProps<Base, Tag, Part extends string> = BaseComponentProps<Base, Tag, Part> | AnyProps

/*
  THEME
*/

export type Mode = 'light' | 'dark' | string // Allow custom modes

type ColorKey = string

export type ColorValue = string | ColorKey | {
  [modeKey in Mode]: string | ColorKey
}

export type ColorsType = Record<ColorKey, ColorValue | Record<string, ColorValue>>

type StylesArrayFunction = (props: object, theme: HonorableTheme) => CSSObject | AnyProps | false | null | undefined | 0

export type StylesArray = (CSSObject | AnyProps | StylesArrayFunction)[]

export type ComponentThemePart<Part extends string> = Partial<Record<Part, StylesArray>> & {
  Root?: StylesArray
}

export type HonorableTheme = {
  name?: string
  mode?: Mode
  breakpoints?: Record<string, number>
  colors?: ColorsType
  stylesheet?: Record<string, StylesArray>
  global?: StylesArray
  utils?: {
    resolveColorString: (color: string) => string
    resolveColorObject: (color: object) => object
  }
  // A cache for color resolution
  cache?: Record<string, Record<string, string>>
  // extended Tags
  ButtonBase?: ComponentThemePart<typeof noParts[number]>
  InputBase?: ComponentThemePart<typeof noParts[number]>
  MenuBase?: ComponentThemePart<typeof noParts[number]>
  SelectBase?: ComponentThemePart<typeof noParts[number]>
  // Tags
  A?: ComponentThemePart<typeof noParts[number]>
  Abbr?: ComponentThemePart<typeof noParts[number]>
  Address?: ComponentThemePart<typeof noParts[number]>
  Area?: ComponentThemePart<typeof noParts[number]>
  Article?: ComponentThemePart<typeof noParts[number]>
  Aside?: ComponentThemePart<typeof noParts[number]>
  Audio?: ComponentThemePart<typeof noParts[number]>
  B?: ComponentThemePart<typeof noParts[number]>
  Base?: ComponentThemePart<typeof noParts[number]>
  Bdi?: ComponentThemePart<typeof noParts[number]>
  Bdo?: ComponentThemePart<typeof noParts[number]>
  Blockquote?: ComponentThemePart<typeof noParts[number]>
  Body?: ComponentThemePart<typeof noParts[number]>
  Br?: ComponentThemePart<typeof noParts[number]>
  Canvas?: ComponentThemePart<typeof noParts[number]>
  Caption?: ComponentThemePart<typeof noParts[number]>
  Cite?: ComponentThemePart<typeof noParts[number]>
  Code?: ComponentThemePart<typeof noParts[number]>
  Col?: ComponentThemePart<typeof noParts[number]>
  Colgroup?: ComponentThemePart<typeof noParts[number]>
  Data?: ComponentThemePart<typeof noParts[number]>
  Datalist?: ComponentThemePart<typeof noParts[number]>
  Dd?: ComponentThemePart<typeof noParts[number]>
  Del?: ComponentThemePart<typeof noParts[number]>
  Details?: ComponentThemePart<typeof noParts[number]>
  Dfn?: ComponentThemePart<typeof noParts[number]>
  Dialog?: ComponentThemePart<typeof noParts[number]>
  Div?: ComponentThemePart<typeof noParts[number]>
  Dl?: ComponentThemePart<typeof noParts[number]>
  Dt?: ComponentThemePart<typeof noParts[number]>
  Em?: ComponentThemePart<typeof noParts[number]>
  Embed?: ComponentThemePart<typeof noParts[number]>
  Fieldset?: ComponentThemePart<typeof noParts[number]>
  Figcaption?: ComponentThemePart<typeof noParts[number]>
  Figure?: ComponentThemePart<typeof noParts[number]>
  Footer?: ComponentThemePart<typeof noParts[number]>
  Form?: ComponentThemePart<typeof noParts[number]>
  H1?: ComponentThemePart<typeof noParts[number]>
  H2?: ComponentThemePart<typeof noParts[number]>
  H3?: ComponentThemePart<typeof noParts[number]>
  H4?: ComponentThemePart<typeof noParts[number]>
  H5?: ComponentThemePart<typeof noParts[number]>
  H6?: ComponentThemePart<typeof noParts[number]>
  Head?: ComponentThemePart<typeof noParts[number]>
  Header?: ComponentThemePart<typeof noParts[number]>
  Hr?: ComponentThemePart<typeof noParts[number]>
  I?: ComponentThemePart<typeof noParts[number]>
  Iframe?: ComponentThemePart<typeof noParts[number]>
  Img?: ComponentThemePart<typeof noParts[number]>
  Ins?: ComponentThemePart<typeof noParts[number]>
  Kbd?: ComponentThemePart<typeof noParts[number]>
  Label?: ComponentThemePart<typeof noParts[number]>
  Legend?: ComponentThemePart<typeof noParts[number]>
  Li?: ComponentThemePart<typeof noParts[number]>
  Link?: ComponentThemePart<typeof noParts[number]>
  Main?: ComponentThemePart<typeof noParts[number]>
  Map?: ComponentThemePart<typeof noParts[number]>
  Mark?: ComponentThemePart<typeof noParts[number]>
  Meta?: ComponentThemePart<typeof noParts[number]>
  Meter?: ComponentThemePart<typeof noParts[number]>
  Nav?: ComponentThemePart<typeof noParts[number]>
  Noscript?: ComponentThemePart<typeof noParts[number]>
  Ol?: ComponentThemePart<typeof noParts[number]>
  Optgroup?: ComponentThemePart<typeof noParts[number]>
  Option?: ComponentThemePart<typeof noParts[number]>
  Output?: ComponentThemePart<typeof noParts[number]>
  P?: ComponentThemePart<typeof noParts[number]>
  Param?: ComponentThemePart<typeof noParts[number]>
  Picture?: ComponentThemePart<typeof noParts[number]>
  Pre?: ComponentThemePart<typeof noParts[number]>
  Progress?: ComponentThemePart<typeof noParts[number]>
  Q?: ComponentThemePart<typeof noParts[number]>
  Rp?: ComponentThemePart<typeof noParts[number]>
  Rt?: ComponentThemePart<typeof noParts[number]>
  Ruby?: ComponentThemePart<typeof noParts[number]>
  S?: ComponentThemePart<typeof noParts[number]>
  Samp?: ComponentThemePart<typeof noParts[number]>
  Script?: ComponentThemePart<typeof noParts[number]>
  Section?: ComponentThemePart<typeof noParts[number]>
  Slot?: ComponentThemePart<typeof noParts[number]>
  Small?: ComponentThemePart<typeof noParts[number]>
  Source?: ComponentThemePart<typeof noParts[number]>
  Span?: ComponentThemePart<typeof noParts[number]>
  Strong?: ComponentThemePart<typeof noParts[number]>
  Style?: ComponentThemePart<typeof noParts[number]>
  Sub?: ComponentThemePart<typeof noParts[number]>
  Summary?: ComponentThemePart<typeof noParts[number]>
  Sup?: ComponentThemePart<typeof noParts[number]>
  Svg?: ComponentThemePart<typeof noParts[number]>
  Table?: ComponentThemePart<typeof noParts[number]>
  Tbody?: ComponentThemePart<typeof noParts[number]>
  Td?: ComponentThemePart<typeof noParts[number]>
  Template?: ComponentThemePart<typeof noParts[number]>
  Textarea?: ComponentThemePart<typeof noParts[number]>
  Tfoot?: ComponentThemePart<typeof noParts[number]>
  Th?: ComponentThemePart<typeof noParts[number]>
  Thead?: ComponentThemePart<typeof noParts[number]>
  Time?: ComponentThemePart<typeof noParts[number]>
  Title?: ComponentThemePart<typeof noParts[number]>
  Tr?: ComponentThemePart<typeof noParts[number]>
  Track?: ComponentThemePart<typeof noParts[number]>
  U?: ComponentThemePart<typeof noParts[number]>
  Ul?: ComponentThemePart<typeof noParts[number]>
  Var?: ComponentThemePart<typeof noParts[number]>
  Video?: ComponentThemePart<typeof noParts[number]>
  Wbr?: ComponentThemePart<typeof noParts[number]>
  Animate?: ComponentThemePart<typeof noParts[number]>
  AnimateMotion?: ComponentThemePart<typeof noParts[number]>
  AnimateTransform?: ComponentThemePart<typeof noParts[number]>
  Circle?: ComponentThemePart<typeof noParts[number]>
  ClipPath?: ComponentThemePart<typeof noParts[number]>
  Defs?: ComponentThemePart<typeof noParts[number]>
  Desc?: ComponentThemePart<typeof noParts[number]>
  Ellipse?: ComponentThemePart<typeof noParts[number]>
  FeBlend?: ComponentThemePart<typeof noParts[number]>
  FeColorMatrix?: ComponentThemePart<typeof noParts[number]>
  FeComponentTransfer?: ComponentThemePart<typeof noParts[number]>
  FeComposite?: ComponentThemePart<typeof noParts[number]>
  FeConvolveMatrix?: ComponentThemePart<typeof noParts[number]>
  FeDiffuseLighting?: ComponentThemePart<typeof noParts[number]>
  FeDisplacementMap?: ComponentThemePart<typeof noParts[number]>
  FeDistantLight?: ComponentThemePart<typeof noParts[number]>
  FeDropShadow?: ComponentThemePart<typeof noParts[number]>
  FeFlood?: ComponentThemePart<typeof noParts[number]>
  FeFuncA?: ComponentThemePart<typeof noParts[number]>
  FeFuncB?: ComponentThemePart<typeof noParts[number]>
  FeFuncG?: ComponentThemePart<typeof noParts[number]>
  FeFuncR?: ComponentThemePart<typeof noParts[number]>
  FeGaussianBlur?: ComponentThemePart<typeof noParts[number]>
  FeImage?: ComponentThemePart<typeof noParts[number]>
  FeMerge?: ComponentThemePart<typeof noParts[number]>
  FeMergeNode?: ComponentThemePart<typeof noParts[number]>
  FeMorphology?: ComponentThemePart<typeof noParts[number]>
  FeOffset?: ComponentThemePart<typeof noParts[number]>
  FePointLight?: ComponentThemePart<typeof noParts[number]>
  FeSpecularLighting?: ComponentThemePart<typeof noParts[number]>
  FeSpotLight?: ComponentThemePart<typeof noParts[number]>
  FeTile?: ComponentThemePart<typeof noParts[number]>
  FeTurbulence?: ComponentThemePart<typeof noParts[number]>
  Filter?: ComponentThemePart<typeof noParts[number]>
  ForeignObject?: ComponentThemePart<typeof noParts[number]>
  G?: ComponentThemePart<typeof noParts[number]>
  Image?: ComponentThemePart<typeof noParts[number]>
  Line?: ComponentThemePart<typeof noParts[number]>
  LinearGradient?: ComponentThemePart<typeof noParts[number]>
  Marker?: ComponentThemePart<typeof noParts[number]>
  Mask?: ComponentThemePart<typeof noParts[number]>
  Metadata?: ComponentThemePart<typeof noParts[number]>
  Mpath?: ComponentThemePart<typeof noParts[number]>
  Path?: ComponentThemePart<typeof noParts[number]>
  Pattern?: ComponentThemePart<typeof noParts[number]>
  Polygon?: ComponentThemePart<typeof noParts[number]>
  Polyline?: ComponentThemePart<typeof noParts[number]>
  RadialGradient?: ComponentThemePart<typeof noParts[number]>
  Rect?: ComponentThemePart<typeof noParts[number]>
  Stop?: ComponentThemePart<typeof noParts[number]>
  SvgSwitch?: ComponentThemePart<typeof noParts[number]>
  Symbol?: ComponentThemePart<typeof noParts[number]>
  Text?: ComponentThemePart<typeof noParts[number]>
  TextPath?: ComponentThemePart<typeof noParts[number]>
  Tspan?: ComponentThemePart<typeof noParts[number]>
  Use?: ComponentThemePart<typeof noParts[number]>
  View?: ComponentThemePart<typeof noParts[number]>
  // Components
  Accordion?: ComponentThemePart<typeof accordionParts[number]>
  Autocomplete?: ComponentThemePart<typeof autocompleteParts[number]>
  Avatar?: ComponentThemePart<typeof avatarParts[number]>
  Button?: ComponentThemePart<typeof buttonParts[number]>
  ButtonGroup?: ComponentThemePart<typeof buttonGroupParts[number]>
  Caret?: ComponentThemePart<typeof caretParts[number]>
  Checkbox?: ComponentThemePart<typeof checkboxParts[number]>
  DropdownButton?: ComponentThemePart<typeof dropdownButtonParts[number]>
  Flex?: ComponentThemePart<typeof flexParts[number]>
  Icon?: ComponentThemePart<typeof iconParts[number]>
  IconButton?: ComponentThemePart<typeof iconButtonParts[number]>
  Input?: ComponentThemePart<typeof inputParts[number]>
  Menu?: ComponentThemePart<typeof menuParts[number]>
  MenuItem?: ComponentThemePart<typeof menuItemParts[number]>
  Modal?: ComponentThemePart<typeof modalParts[number]>
  ProgressBar?: ComponentThemePart<typeof progressBarParts[number]>
  Radio?: ComponentThemePart<typeof radioParts[number]>
  RadioGroup?: ComponentThemePart<typeof radioGroupParts[number]>
  Select?: ComponentThemePart<typeof selectParts[number]>
  Skeleton?: ComponentThemePart<typeof skeletonParts[number]>
  Slider?: ComponentThemePart<typeof sliderParts[number]>
  Spinner?: ComponentThemePart<typeof spinnerParts[number]>
  Switch?: ComponentThemePart<typeof switchParts[number]>
  Tooltip?: ComponentThemePart<typeof tooltipParts[number]>
  TreeView?: ComponentThemePart<typeof treeViewParts[number]>
}

export type ComponentNames = keyof Omit<
  HonorableTheme,
  'name'
  | 'mode'
  | 'breakpoints'
  | 'colors'
  | 'stylesheet'
  | 'global'
  | 'utils'
  | 'cache'
>

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
