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
    border: {
      light: '#ddd',
      dark: '#444',
    },
  },
  Accordion: {
    Children: [
      {
        w: 128,
      },
    ],
  },
  Checkbox: {
    Children: [
      ({ checked }: any) => ({
        color: checked ? 'primary' : 'secondary',
      }),
    ],
  },
}
