import '@emotion/react'
import React, { PropsWithChildren, PropsWithRef, Ref } from 'react'

import * as tags from './components/tags'
import { Button } from './components/Button'
import { ButtonGroup } from './components/ButtonGroup'
import { Caret } from './components/Caret'
import { Checkbox } from './components/Checkbox'
import { DropdownButton } from './components/DropdownButton'
import { Icon } from './components/Icon'
import { IconButton } from './components/IconButton'
import { Menu } from './components/Menu'
import { MenuItem } from './components/MenuItem'
import { Modal } from './components/Modal'
import { ProgressBar } from './components/ProgressBar'
import { Select } from './components/Select'
import { Switch } from './components/Switch'

import stylesProperties from './data/stylesProperties'
import mpProperties from './data/mpProperties'

const components: Record<string, any> = {
  ...tags,
  Button,
  ButtonGroup,
  Caret,
  Checkbox,
  DropdownButton,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  ProgressBar,
  Select,
  Switch,
} as const

export type ElementProps<Tag> = PropsWithRef<PropsWithChildren<
  Tag extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[Tag]
  : never
>>

export type AnyProps = {
  [key: string]: any
}
export type CssProps = {
  css?: any
}

export type ThemeProps = {
  theme: HonorableTheme
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

export type StyledHonorableProps = {
  ref: Ref<any>
  theme: HonorableTheme
  honorable: StylesProps
}

export type Mode = 'light' | 'dark' | string

export type ColorKey = string
export type ColorValue = string | ColorKey | {
  [modeKey in Mode]: string | ColorKey
}

export type CustomProps = Map<(props: object, theme: HonorableTheme) => boolean, StylesProps | ((props: object, theme: HonorableTheme) => StylesProps)>

export type ComponentNames = keyof typeof components

export type ComponentProps = {
  defaultProps?: StylesProps
  customProps?: CustomProps
  partProps?: {
    [key: string]: {
      defaultProps?: StylesProps
      customProps?: CustomProps
    }
  }
}

export type HonorableThemeBase = {
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
  html?: StylesProps
  global?: ComponentProps
  utils?: {
    resolveColor: (color: string | StylesProps) => string | StylesProps
  }
}

export type HonorableTheme = HonorableThemeBase & {
  [componentNameKey in ComponentNames]?: ComponentProps
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
  export type Theme = HonorableThemeBase
}
