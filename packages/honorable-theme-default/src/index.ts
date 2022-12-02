import { keyframes } from '@emotion/react'
import { HonorableTheme } from 'honorable'

import createElevation from './createElevation'

const spinner = keyframes`
  to { transform: rotate(360deg); }
`

const withLabelPosition = ({ labelPosition }: any) => ({
  marginLeft: labelPosition === 'right' || !labelPosition ? 8 : 0,
  marginRight: labelPosition === 'left' ? 8 : 0,
  marginTop: labelPosition === 'bottom' ? 8 : 0,
  marginBottom: labelPosition === 'top' ? 8 : 0,
})

const theme: HonorableTheme = {
  name: 'Default',
  mode: 'light' as const,
  breakpoints: {
    mobile: 600,
    tablet: 900,
    desktop: 1200,
  },
  colors: {
    primary: '#3e73dd',
    background: {
      light: 'white',
      dark: '#1c1f2b',
    },
    'background-light': {
      light: '#f5f7f9',
      dark: '#22293b',
    },
    text: {
      light: '#3b454e',
      dark: 'white',
    },
    'text-light': {
      light: 'lighten(text, 15)',
      dark: 'darken(text, 15)',
    },
    'text-xlight': {
      light: 'lighten(text, 30)',
      dark: 'darken(text, 30)',
    },
    border: {
      light: '#ddd',
      dark: '#444',
    },
    hover: {
      light: 'lighten(border, 5)',
      dark: 'darken(border, 5)',
    },
    shadow: {
      light: 'rgba(0, 0, 0, 0.2)',
      dark: 'rgba(12, 12, 12, 0.5)',
    },
    success: '#64db5c',
    error: '#ff4d4d',
    warning: '#ff7900',
    skeleton: {
      light: '#00000015',
      dark: 'lighten(background-light, 15)',
    },
  },
  stylesheet: {
    html: [
      {
        fontSize: 16,
        color: 'text',
        backgroundColor: 'background',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'optimizeLegibility',
        boxSizing: 'border-box',
      },
    ],
    '*, *:before, *:after': [
      {
        boxSizing: 'inherit',
      },
    ],
  },
  global: [
    ...createElevation().map((styles, i) => (z => (({ elevation }: any) => elevation === z && styles))(i)),
  ],
  A: {
    Root: [
      {
        display: 'inline-block',
        color: 'primary',
        textDecoration: 'none',
        cursor: 'pointer',
        ':hover': {
          textDecoration: 'underline',
        },
      },
    ],
  },
  Accordion: {
    Root: [
      {
        elevation: 1,
        backgroundColor: 'background',
        borderBottom: '1px solid border',
        userSelect: 'none',
        '&:first-of-type': {
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
        },
        '&:last-of-type': {
          borderBottom: 'none',
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4,
        },
      },
    ],
    Title: [
      {
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 16,
        paddingRight: 16,
      },
    ],
    ChildrenWrapper: [
      ({ expanded, isExpanding }: any) => (!expanded || isExpanding) && {
        overflow: 'hidden',
      },
    ],
    Children: [
      {
        paddingTop: 0,
        paddingBottom: 16,
        paddingLeft: 16,
        paddingRight: 16,
      },
    ],
    ExpandIcon: [
      {
        marginLeft: 16,
        transition: 'transform 200ms ease',
      },
      ({ expanded }: any) => expanded && {
        transform: 'rotate(180deg)',
      },
    ],
  },
  Autocomplete: {
    NoOption: [
      {
        userSelect: 'none',
        color: 'text-light',
      },
    ],
  },
  Avatar: {
    Root: [
      {
        color: 'white',
        fontWeight: 'bold',
        borderRadius: '50%',
      },
      ({ name, src }: any) => !(name || src) && {
        backgroundColor: 'primary',
      },
    ],
  },
  Button: {
    Root: [
      {
        minHeight: 38,
        color: 'white',
        backgroundColor: 'primary',
        border: 'none',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 4,
        userSelect: 'none',
        textDecoration: 'none',
        transition: 'color 150ms ease, background-color 150ms ease, border 150ms ease',
        flexShrink: 0,
        ':hover': {
          backgroundColor: 'darken(primary, 10)',
        },
        ':active': {
          backgroundColor: 'darken(primary, 20)',
        },
        ':disabled': {
          backgroundColor: 'lightgrey',
          cursor: 'not-allowed',
          ':hover': {
            backgroundColor: 'lightgrey',
          },
        },
      },
    ],
    Children: [
      {
        minWidth: 0, // To allow ellipsis
      },
    ],
    StartIcon: [
      {
        marginLeft: -6,
        marginRight: 8,
      },
    ],
    EndIcon: [
      {
        marginLeft: 8,
        marginRight: -6,
      },
    ],
    Spinner: [
      {
        color: 'white',
      },
    ],
  },
  ButtonBase: {
    Root: [
      {
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
      },
    ],
  },
  ButtonGroup: {
    Root: [
      {
        border: '1px solid primary',
        borderRadius: 4,
        '& > button': {
          border: 'none',
          borderRadius: 0,
        },
      },
      ({ direction }: any) => direction === 'row' && {
        '& > button': {
          borderLeft: '1px solid darken(primary)',
          '&:first-of-type': {
            borderLeft: 'none',
          },
        },
      },
      ({ direction }: any) => direction === 'column' && {
        '& > button': {
          borderTop: '1px solid darken(primary)',
          '&:first-of-type': {
            borderTop: 'none',
          },
        },
      },
    ],
  },
  Card: {
    Root: [
      (_props: any, theme: any) => ({
        elevation: 1,
        backgroundColor: theme.mode === 'light' ? 'background' : 'background-light',
      }),
    ],
  },
  Checkbox: {
    Root: [
      {
        ':hover > span': {
          border: '1px solid primary',
        },
      },
      ({ disabled }: any) => disabled && {
        cursor: 'not-allowed',
        '&:hover > span': {
          border: '1px solid border',
        },
      },
    ],
    Control: [
      {
        width: 20,
        height: 20,
        color: 'white',
        backgroundColor: 'transparent',
        border: '1px solid border',
        borderRadius: 2,
      },
      ({ checked }: any) => checked && {
        backgroundColor: 'primary',
        border: '1px solid primary',
      },
      ({ disabled }: any) => disabled && {
        backgroundColor: 'border',
        border: '1px solid border',
        '&:hover': {
          border: '1px solid border',
        },
      },
    ],
    Children: [
      withLabelPosition,
    ],
  },
  H1: {
    Root: [
      {
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
      },
    ],
  },
  H2: {
    Root: [
      {
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
      },
    ],
  },
  H3: {
    Root: [
      {
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
      },
    ],
  },
  H4: {
    Root: [
      {
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
      },
    ],
  },
  H5: {
    Root: [
      {
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
      },
    ],
  },
  H6: {
    Root: [
      {
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
      },
    ],
  },
  Hr: {
    Root: [
      {
        borderWidth: 0,
        borderTop: '1px solid border',
      },
    ],
  },
  IconButton: {
    Root: [
      {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 8,
        paddingRight: 8,
        border: 'none',
        borderRadius: '50%',
        background: 'background',
        elevation: 1,
        transition: 'color 200ms ease, background-color 200ms ease',
        '&:hover': {
          backgroundColor: 'transparency(primary, 85)',
        },
        '&:active': {
          backgroundColor: 'transparency(primary, 65)',
        },
      },
    ],
  },
  Input: {
    Root: [
      {
        width: 256,
        minHeight: 38,
        paddingLeft: 8,
        paddingRight: 8,
        color: 'inherit',
        border: '1px solid border',
        borderRadius: 4,
      },
      ({ focused }: any) => focused && {
        border: '1px solid primary',
      },
      ({ disabled }: any) => disabled && {
        backgroundColor: 'background-light',
        cursor: 'not-allowed',
      },
    ],
    InputBase: [
      ({ disabled }: any) => disabled && {
        cursor: 'not-allowed',
        backgroundColor: 'background-light',
      },
    ],
    StartIcon: [
      {
        paddingRight: 8,
      },
    ],
    EndIcon: [
      {
        paddingLeft: 8,
      },
    ],
    TextArea: [
      {
        color: 'inherit',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 0,
        paddingRight: 0,
        resize: 'none',
        outline: 'none',
        border: 'none',
        backgroundColor: 'transparent',
      },
    ],
  },
  InputBase: {
    Root: [
      {
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        lineHeight: '32px',
        color: 'text',
        backgroundColor: 'transparent',
        border: 'none',
        '&:focus': {
          outline: 'none',
        },
        '&[type="checkbox"]': {
          appearance: 'none',
          marginTop: 0,
          marginBottom: 0,
          marginLeft: 0,
          marginRight: 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
          backgroundColor: 'background',
          border: '1px solid border',
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 16,
          height: 16,
          '&::before': {
            content: '""',
            width: 12,
            height: 12,
            transform: 'scale(0)',
            boxShadow: 'inset 1em 1em primary',
            transformUrigin: 'bottom left',
            clipPath: 'polygon(28% 38%, 41% 53%, 75% 24%, 86% 38%, 40% 78%, 15% 50%)',
          },
          '&:checked::before': {
            transform: 'scale(1.35)',
          },
          '&:checked, &:hover': {
            borderColor: 'primary',
          },
        },
      },
    ],
  },
  Label: {
    Root: [
      {
        display: 'block',
        marginBottom: 4,
      },
    ],
  },
  Menu: {
    Root: [
      {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 0,
        paddingRight: 0,
        elevation: 1,
        backgroundColor: 'background',
        borderRadius: 4,
        outline: 'none',
      },
      ({ isSubMenu }: any) => isSubMenu && {
        marginTop: -8,
      },
    ],
  },
  MenuItem: {
    Root: [
      {
        outline: 'none',
      },
    ],
    Children: [
      {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
      },
      ({ active }: any) => active && {
        backgroundColor: 'background-light',
      },
      ({ disabled }: any) => disabled && {
        backgroundColor: 'none',
        text: 'text-light',
      },
    ],
  },
  Modal: {
    Root: [
      {
        paddingTop: 32,
        paddingBottom: 32,
        paddingLeft: 32,
        paddingRight: 32,
        borderRadius: 4,
      },
    ],
  },
  P: {
    Root: [
      {
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
      },
    ],
  },
  Pre: {
    Root: [
      {
        display: 'inline-block',
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 4,
        backgroundColor: 'background-light',
      },
    ],
  },
  ProgressBar: {
    Bar: [
      {
        borderRadius: 4,
        backgroundColor: 'primary',
        transition: 'width 150ms ease',
      },
    ],
  },
  Radio: {
    Root: [
      {
        outline: 'none',
        '&:hover > span': {
          color: 'primary',
        },
      },
      ({ disabled }: any) => disabled && {
        cursor: 'not-allowed',
        '&:hover > span': {
          color: 'border',
        },
      },
    ],
    Control: [
      {
        width: 20,
        height: 20,
        color: 'border',
        borderRadius: '50%',
        userSelect: 'none',
      },
      ({ checked }: any) => checked && {
        color: 'primary',
      },
    ],
    Children: [
      withLabelPosition,
      ({ disabled }: any) => disabled && {
        color: 'border',
      },
    ],
  },
  RadioGroup: {
    Radio: [
      ({ row }: any) => row && {
        marginRight: 8,
        '&:last-of-type': {
          marginRight: 0,
        },
      },
      ({ row }: any) => !row && {
        marginBottom: 8,
        '&:last-of-type': {
          marginBottom: 0,
        },
      },
    ],
  },
  Select: {
    Root: [
      {
        width: 256,
        height: 38,
        display: 'inline-block',
        borderRadius: 4,
        border: '1px solid border',
        '&:hover': {
          border: '1px solid primary',
        },
      },
    ],
    Selected: [
      {
        paddingTop: 2,
        paddingBottom: 4,
        paddingLeft: 8,
        paddingRight: 0,
        cursor: 'pointer',
        userSelect: 'none',
      },
    ],
  },
  Slider: {
    Root: [
      ({ disabled }: any) => disabled && {
        cursor: 'not-allowed',
      },
    ],
    Track: [
      {
        backgroundColor: 'darken(background-light, 15)',
        borderRadius: 4,
      },
    ],
    Knob: [
      {
        backgroundColor: 'primary',
      },
    ],
    Mark: [
      {
        color: 'text-light',
      },
    ],
  },
  Skeleton: {
    Root: [
      {
        overflow: 'hidden',
      },
      ({ variant }: any) => variant === 'line' && {
        borderRadius: 4,
        height: '1.666ex',
      },
      ({ variant }: any) => variant === 'circular' && {
        borderRadius: '50%',
      },
    ],
    Inner: [
      {
        backgroundColor: 'skeleton',
      },
    ],
  },
  Spinner: {
    Root: [
      ({ size = 24, color = 'primary' }: any) => ({
        width: size,
        height: size,
        position: 'relative',
        display: 'inline-block',
        '&:before': {
          content: "''",
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: (size - 4),
          height: (size - 4),
          marginTop: -(size - 2) / 2,
          marginLeft: -(size - 2) / 2,
          borderRadius: '50%',
          borderTop: `2px solid ${color}`,
          borderRight: '2px solid transparent',
          animation: `${spinner} 666ms linear infinite`,
        },
      }),
    ],
  },
  Switch: {
    Control: [
      {
        backgroundColor: 'background-light',
        transition: 'background-color 150ms ease',
        '&:hover': {
          boxShadow: '0 0 0 2px border',
        },
      },
      ({ checked }: any) => checked && {
        backgroundColor: 'primary',
      },
    ],
    Children: [
      withLabelPosition,
    ],
  },
  Table: {
    Root: [
      {
        width: '100%',
        backgroundColor: 'background',
        border: '1px solid border',
        borderRadius: 4,
        borderCollapse: 'collapse',
      },
    ],
  },
  Td: {
    Root: [
      {
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 16,
        paddingRight: 16,
      },
    ],
  },
  Th: {
    Root: [
      {
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 16,
        paddingRight: 16,
      },
    ],
  },
  Tr: {
    Root: [
      {
        textAlign: 'left',
        borderTop: '1px solid border',
        '&:first-of-type': {
          border: 'none',
        },
      },
    ],
  },
  Tooltip: {
    Root: [
      {
        fontSize: 12,
        fontWeight: 500,
        borderRadius: 2,
        backgroundColor: 'lighten(black, 33)',
      },
    ],
    Label: [
      {
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 4,
        paddingRight: 4,
        whiteSpace: 'nowrap',
      },
    ],
    Arrow: [
      {
        backgroundColor: 'lighten(black, 33)',
      },
    ],
  },
}

export default theme
