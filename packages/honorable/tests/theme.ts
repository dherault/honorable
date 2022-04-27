import { HonorableTheme } from '../src/types'

export const theme: HonorableTheme = {
  name: 'Test',
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
}
