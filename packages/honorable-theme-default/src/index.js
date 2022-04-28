import createElevation from './createElevation'

export default {
  name: 'Default',
  mode: 'light',
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
    border: {
      light: '#ddd',
      dark: '#444',
    },
    shadow: {
      light: 'rgba(0, 0, 0, 0.2)',
      dark: 'rgba(64, 64, 64, 0.2)',
    },
    success: '#64db5c',
    error: '#ff4d4d',
    warning: '#ff7900',
  },
  html: {
    fontSize: 16,
    color: 'text',
    backgroundColor: 'background',
    webkitFontSmoothing: 'antialiased',
    mozOsxFontSmoothing: 'grayscale',
    textRendering: 'optimizeLegibility',
  },
  global: {
    defaultProps: {
      boxSizing: 'border-box',
    },
    customProps: new Map([
      ...createElevation().map((styles, i) => [
        assignToString(
          (z => ({ elevation }) => elevation === z)(i),
          `({ elevation }) => elevation === ${i}`
        ),
        styles,
      ]),
    ]),
  },
  A: {
    defaultProps: {
      display: 'inline-block',
      color: 'primary',
      textDecoration: 'none',
      cursor: 'pointer',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
  Accordion: {
    defaultProps: {
      elevation: 1,
      backgroundColor: 'background',
      borderBottom: '1px solid border',
      overflow: 'hidden',
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
    partProps: {
      Title: {
        defaultProps: {
          padding: '1rem',
        },
      },
      Children: {
        defaultProps: {
          transition: 'height 200ms ease',
        },
      },
      ChildrenInner: {
        defaultProps: {
          padding: '0rem 1rem 1rem 1rem',
        },
      },
      ExpandIcon: {
        defaultProps: {
          transition: 'transform 200ms ease',
        },
        customProps: new Map([
          [
            ({ expanded }) => expanded,
            {
              transform: 'rotate(180deg)',
            },
          ],
        ]),
      },
    },
  },
  Button: {
    defaultProps: {
      color: 'white',
      backgroundColor: 'primary',
      padding: '0.5rem 1rem',
      border: '1px solid primary',
      borderRadius: 4,
      userSelect: 'none',
      textDecoration: 'none',
      transition: 'color 150ms ease, background-color 150ms ease',
      flexShrink: 0,
      ':hover': {
        backgroundColor: 'darken(primary, 10)',
        borderColor: 'darken(primary, 10)',
      },
      ':active': {
        backgroundColor: 'darken(primary, 20)',
        borderColor: 'darken(primary, 20)',
      },
      '&:disabled': {
        backgroundColor: 'lightgrey',
        borderColor: 'lightgrey',
        cursor: 'not-allowed',
        ':hover': {
          backgroundColor: 'lightgrey',
        },
      },
    },
    customProps: new Map([
      [
        assignToString(
          ({ size }) => size === 'small',
          "({ size }) => size === 'small'"
        ),
        {
          fontSize: '0.85rem',
          padding: '0.35rem 0.75rem 0.25rem 0.75rem',
        },
      ],
      [
        assignToString(
          ({ size }) => size === 'large',
          "({ size }) => size === 'large'"
        ),
        {
          fontSize: '1.35rem',
          padding: '0.85rem 1.25rem',
        },
      ],
    ]),
    partProps: {
      StartIcon: {
        defaultProps: {
          marginLeft: 'calc(-0.5rem + 2px)',
          marginRight: '0.5rem',
        },
      },
      EndIcon: {
        defaultProps: {
          marginLeft: '0.5rem',
          marginRight: 'calc(-0.5rem + 2px)',
        },
      },
    },
  },
  ButtonBase: {
    defaultProps: {
      cursor: 'pointer',
    },
  },
  ButtonGroup: {
    defaultProps: {
      border: '1px solid primary',
      borderRadius: 4,
      '& > button': {
        border: 'none',
        borderRadius: 0,
        borderLeft: '1px solid darken(primary)',
        '&:first-of-type': {
          borderLeft: 'none',
        },
      },
    },
  },
  Checkbox: {
    defaultProps: {
      width: 24,
      height: 24,
      color: 'white',
      backgroundColor: 'transparent',
      border: '1px solid border',
      borderRadius: 2,
      cursor: 'pointer',
      userSelect: 'none',
    },
    customProps: new Map([
      [
        ({ disabled }) => disabled,
        {
          cursor: 'not-allowed',
          backgroundColor: 'border',
        },
      ],
      [
        ({ checked }) => checked,
        ({ disabled }) => ({
          backgroundColor: 'primary',
          borderColor: disabled ? 'border' : 'primary',
        }),
      ],
    ]),
  },
  DropdownButton: {
    partProps: {
      menu: {
        defaultProps: {
          color: 'text',
        },
      },
    },
  },
  H1: {
    defaultProps: {
      margin: 0,
    },
  },
  H2: {
    defaultProps: {
      margin: 0,
    },
  },
  H3: {
    defaultProps: {
      margin: 0,
    },
  },
  H4: {
    defaultProps: {
      margin: 0,
    },
  },
  H5: {
    defaultProps: {
      margin: 0,
    },
  },
  H6: {
    defaultProps: {
      margin: 0,
    },
  },
  Hr: {
    defaultProps: {
      borderWidth: '0px',
      borderTop: '1px solid border',
    },
  },
  IconButton: {
    defaultProps: {
      padding: '0.5rem',
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
  },
  Input: {
    defaultProps: {
      backgroundColor: 'background',
      border: '1px solid border',
      borderRadius: 4,
      overflow: 'hidden',
      '& > textarea': {
        padding: '0.5rem 0',
        resize: 'none',
        outline: 'none',
        border: 'none',
      },
    },
    customProps: new Map([
      [
        ({ active }) => active,
        {
          border: '1px solid primary',
        },
      ],
      [
        ({ disabled }) => disabled,
        {
          backgroundColor: 'background-light',
          cursor: 'not-allowed',
          '& > textarea': {
            backgroundColor: 'background-light',
            cursor: 'not-allowed',
          },
        },
      ],
    ]),
    partProps: {
      InputBase: {
        customProps: new Map([
          [
            ({ disabled }) => disabled,
            {
              cursor: 'not-allowed',
              backgroundColor: 'background-light',
            },
          ],
        ]),
      },
      StartIcon: {
        defaultProps: {
          marginTop: '0.5rem',
          marginRight: '0.5rem',
          color: 'text',
        },
      },
      EndIcon: {
        defaultProps: {
          marginTop: '0.5rem',
          marginLeft: '0.5rem',
          color: 'text',
        },
      },
    },
  },
  InputBase: {
    defaultProps: {
      padding: '0.5rem 0',
      color: 'text',
      border: 'none',
      '&:focus': {
        outline: 'none',
      },
      '&[type="checkbox"]': {
        appearance: 'none',
        margin: 0,
        padding: 0,
        backgroundColor: 'background',
        border: '1px solid border',
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '1rem',
        height: '1rem',
        '&::before': {
          content: '""',
          width: '0.75rem',
          height: '0.75rem',
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
  },
  Label: {
    defaultProps: {
      display: 'block',
      marginBottom: '0.25rem',
    },
  },
  Menu: {
    defaultProps: {
      padding: '0.5rem 0',
      elevation: 1,
      backgroundColor: 'background',
      borderRadius: 4,
      outline: 'none',
    },
    customProps: new Map([
      [
        ({ isSubMenu }) => isSubMenu,
        {
          marginTop: '-0.5rem',
        },
      ],
    ]),
  },
  MenuItem: {
    defaultProps: {
      outline: 'none',
    },
    partProps: {
      Inner: {
        defaultProps: {
          padding: '0.5rem 1rem',
        },
        customProps: new Map([
          [
            ({ active }) => active,
            {
              backgroundColor: 'background-light',
            },
          ],
        ]),
      },
    },
  },
  Modal: {
    defaultProps: {
      padding: '2rem',
      borderRadius: 4,
    },
  },
  P: {
    defaultProps: {
      margin: 0,
    },
  },
  Pre: {
    defaultProps: {
      display: 'inline-block',
      margin: 0,
      padding: '4px 8px',
      borderRadius: 4,
      backgroundColor: 'background-light',
    },
  },
  ProgressBar: {
    partProps: {
      Inner: {
        defaultProps: {
          borderRadius: 4,
          backgroundColor: 'primary',
          transition: 'width 150ms ease',
        },
      },
    },
  },
  Select: {
    defaultProps: {
      border: '1px solid border',
      '&:hover': {
        border: '1px solid primary',
      },
    },
  },
  Switch: {
    defaultProps: {
      transition: 'background-color 150ms ease',
      '&:hover': {
        boxShadow: '0 0 0 2px border',
      },
    },
    customProps: new Map([
      [
        ({ checked }) => checked,
        {
          backgroundColor: 'primary',
        },
      ],
    ]),
  },
  Table: {
    defaultProps: {
      width: '100%',
      backgroundColor: 'background',
      border: '1px solid border',
      borderRadius: 4,
      borderCollapse: 'collapse',
    },
  },
  Td: {
    defaultProps: {
      padding: '1rem',
    },
  },
  Th: {
    defaultProps: {
      padding: '1rem',
    },
  },
  Tr: {
    defaultProps: {
      textAlign: 'left',
      borderTop: '1px solid border',
      '&:first-of-type': {
        border: 'none',
      },
    },
  },
}

// Utility for the desgner to display the correct variation fn in production
function assignToString(fn, string) {
  fn.toString = () => string

  return fn
}
