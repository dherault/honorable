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
  a: {
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
  button: {
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
        backgroundColor: 'primary',
        borderColor: 'primary',
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
      [
        assignToString(
          ({ variant }) => variant === 'outlined',
          "({ variant }) => variant === 'outlined'"
        ),
        {
          color: 'primary',
          backgroundColor: 'transparent',
          ':hover': {
            backgroundColor: 'transparencify(primary, 90)',
          },
          ':active': {
            backgroundColor: 'transparencify(primary, 75)',
          },
        },
      ],
    ]),
    partProps: {
      startIcon: {
        defaultProps: {
          marginLeft: 'calc(-0.5rem + 2px)',
          marginRight: '0.5rem',
        },
      },
      endIcon: {
        defaultProps: {
          marginLeft: '0.5rem',
          marginRight: 'calc(-0.5rem + 2px)',
        },
      },
    },
  },
  buttonBase: {
    defaultProps: {
      cursor: 'pointer',
    },
  },
  buttonGroup: {
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
  dropdownButton: {
    partProps: {
      menu: {
        defaultProps: {
          color: 'text',
        },
      },
    },
  },
  h1: {
    defaultProps: {
      margin: 0,
    },
  },
  h2: {
    defaultProps: {
      margin: 0,
    },
  },
  h3: {
    defaultProps: {
      margin: 0,
    },
  },
  h4: {
    defaultProps: {
      margin: 0,
    },
  },
  h5: {
    defaultProps: {
      margin: 0,
    },
  },
  h6: {
    defaultProps: {
      margin: 0,
    },
  },
  hr: {
    defaultProps: {
      borderWidth: '0px',
      borderTop: '1px solid border',
    },
  },
  iconButton: {
    defaultProps: {
      padding: '0.5rem',
      border: 'none',
      borderRadius: '50%',
      background: 'background',
      elevation: 1,
      transition: 'color 200ms ease, background-color 200ms ease',
      '&:hover': {
        backgroundColor: 'transparencify(primary, 85)',
      },
      '&:active': {
        backgroundColor: 'transparencify(primary, 65)',
      },
    },
  },
  input: {
    defaultProps: {
      padding: '0.5rem',
      color: 'text',
      backgroundColor: 'background',
      border: '1px solid border',
      borderRadius: 4,
      '&:focus': {
        outline: 'none',
        borderColor: 'primary',
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
    // TODO remove from default theme
    customProps: new Map([
      [
        assignToString(
          ({ variant }) => variant === 'underlined',
          "({ variant }) => variant === 'underlined'"
        ),
        {
          borderWidth: 0,
          borderRadius: 0,
          borderBottom: '1px solid border',
          backgroundColor: 'transparent',
          color: 'text',
        },
      ],
    ]),
  },
  label: {
    defaultProps: {
      display: 'block',
      marginBottom: '0.25rem',
    },
  },
  menu: {
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
  menuItem: {
    defaultProps: {
      outline: 'none',
    },
    partProps: {
      inner: {
        defaultProps: {
          padding: '0.5rem 1rem',
          borderRadius: 2,
          border: '1px solid white',
        },
        customProps: new Map([
          [
            ({ active }) => active,
            {
              backgroundColor: 'transparencify(primary, 85)',
              color: 'primary',
              border: '1px solid primary',
            },
          ],
        ]),
      },
    },
  },
  modal: {
    defaultProps: {
      padding: '2rem',
      borderRadius: 4,
    },
  },
  p: {
    defaultProps: {
      margin: 0,
    },
  },
  pre: {
    defaultProps: {
      display: 'inline-block',
      margin: 0,
      padding: '4px 8px',
      borderRadius: 4,
      backgroundColor: 'background-light',
    },
  },
  progressBar: {
    partProps: {
      inner: {
        defaultProps: {
          borderRadius: 4,
          backgroundColor: 'primary',
          transition: 'width 150ms ease',
        },
      },
    },
  },
  select: {
    defaultProps: {
      border: '1px solid border',
      '&:hover': {
        border: '1px solid primary',
      },
    },
  },
  switch: {
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
  table: {
    defaultProps: {
      width: '100%',
      backgroundColor: 'background',
      border: '1px solid border',
      borderRadius: 4,
      borderCollapse: 'collapse',
    },
  },
  td: {
    defaultProps: {
      padding: '1rem',
    },
  },
  th: {
    defaultProps: {
      padding: '1rem',
    },
  },
  tr: {
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
