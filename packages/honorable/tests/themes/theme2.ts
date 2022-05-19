const blue = {
  950: '#00041A',
  900: '#000933',
  850: '#000B4D',
  800: '#000E66',
  700: '#001299',
  600: '#0011CC',
  500: '#151DF9',
  400: '#293EFF',
  300: '#5C77FF',
  200: '#8FB4FF',
  100: '#C2D8FF',
  50: '#F0F5FF',
}

export default {
  name: 'Test',
  mode: 'light',
  breakpoints: {
    mobile: 600,
    tablet: 900,
    desktop: 1200,
  },
  aliases: {
    w: 'width',
    bg: 'backgroundColor',
  },
  colors: {
    blue,
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
      dark: 'rgba(96, 96, 96, 0.5)',
    },
    success: '#64db5c',
    error: '#ff4d4d',
    warning: '#ff7900',
    skeleton: {
      light: '#00000015',
      dark: 'lighten(background-light, 15)',
    },
  },
}
