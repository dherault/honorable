import { mergeTheme } from 'honorable'
import defaultTheme from 'honorable-theme-default'
import mpRecipe from 'honorable-recipe-mp'

export default mergeTheme(defaultTheme, {
  name: 'Honorable',
  colors: {
    secondary: '#FFC547',
  },
  global: [
    ({ container }) => container && {
      width: '66.666%',
      margin: '0 auto',
    },
    // TODO: an actual design system
    ({ text }) => text === 'small' && {
      fontSize: '0.875rem',
    },
    ({ text }) => text === 'normal' && {
      fontSize: '1rem',
    },
    ({ text }) => text === 'large' && {
      fontSize: '1.5rem',
      'fontSize-mobile': '1.25rem',
    },
    ({ text }) => text === 'xlarge' && {
      fontSize: '2rem',
      'fontSize-mobile': '1.5rem',
    },
    mpRecipe(),
  ],
  A: {
    Root: [
      ({ nav }) => nav && {
        fontSize: '1.1666rem',
        marginBottom: -4,
      },
    ],
  },
  Button: {
    Root: [
      ({ size }) => size === 'large' && {
        fontSize: '1.25rem',
        padding: '0.75rem 1.5rem',
      },
    ],
  },
  H1: {
    Root: [
      {
        fontSize: '5rem',
        'fontSize-mobile': '3rem',
      },
    ],
  },
  H2: {
    Root: [
      {
        fontSize: '2rem',
        'fontSize-mobile': '1.5rem',
      },
    ],
  },
  H3: {
    Root: [
      {
        fontSize: '1.5rem',
        'fontSize-mobile': '1.25rem',
      },
    ],
  },
  IconButton: {
    Root: [
      ({ variant }) => variant === 'ghost' && {
        elevation: 0,
        background: 'transparent',
        '&:hover': {
          backgroundColor: 'background',
        },
        '&:active': {
          color: 'white',
          backgroundColor: 'primary',
        },
      },
    ],
  },
  Section: {
    Root: [
      ({ container }) => container && {
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: 'calc(100% * 3 / 4)',
        'maxWidth-mobile': 'unset',
      },
    ],
  },
  Switch: {
    Control: [
      {
        backgroundColor: 'primary',
      },
    ],
    CheckedBackground: [
      {
        paddingLeft: 4,
      },
    ],
    UncheckedBackground: [
      {
        paddingRight: 4,
      },
    ],
  },
})
