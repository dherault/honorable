export default {
  name: 'Test',
  mode: 'light',
  breakpoints: {
    mobile: 0,
    tablet: 600,
    desktop: 1000,
  },
  aliases: {
    w: 'width',
    bg: 'backgroundColor',
  },
  colors: {
    primary: '#0000ff',
    secondary: '#ff0000',
    aliasPrimary: 'primary',
    aliasAliasPrimary: 'aliasPrimary',
    modedColor: {
      light: '#ffffff',
      dark: '#000000',
    },
    aliasModedColor: {
      light: 'primary',
      dark: 'secondary',
    },
  },
}
