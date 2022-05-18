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
