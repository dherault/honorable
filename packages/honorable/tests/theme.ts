import { HonorableTheme } from '../src/types'

export default {
  name: 'Tests',
  mode: 'light',
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
} as HonorableTheme
