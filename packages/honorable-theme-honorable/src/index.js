import { mergeTheme } from 'honorable'
import defaultTheme from 'honorable-theme-default'

const mobile = 600

export default mergeTheme(defaultTheme, {
  name: 'Honorable',
  breakpoints: {
    mobile,
  },
  colors: {
    secondary: '#FFC547',
  },
  global: [
    ({ text }) => text === 'small' && {
      fontSize: '0.875rem',
    },
    ({ text }) => text === 'normal' && {
      fontSize: '1rem',
    },
    ({ text }) => text === 'large' && {
      fontSize: '1.5rem',
      [`@media (max-width: ${mobile}px)`]: {
        fontSize: '1.25rem',
      },
    },
    ({ text }) => text === 'xlarge' && {
      fontSize: '2rem',
      [`@media (max-width: ${mobile}px)`]: {
        fontSize: '1.5rem',
      },
    },
  ],
  Button: {
    defaultProps: [
      ({ size }) => size === 'large' && {
        fontSize: '1.25rem',
        padding: '0.75rem 1.5rem',
      },
    ],
  },
  H1: {
    defaultProps: [
      {
        fontSize: '5rem',
        [`@media (max-width: ${mobile}px)`]: {
          fontSize: '3rem',
        },
      },
    ],
  },
  H2: {
    defaultProps: [
      {
        fontSize: '2rem',
        [`@media (max-width: ${mobile}px)`]: {
          fontSize: '1.5rem',
        },
      },
    ],
  },
  Section: {
    defaultProps: [
      ({ container }) => container && {
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: 'calc(100% * 3 / 4)',
        [`@media (max-width: ${mobile}px)`]: {
          maxWidth: 'unset',
        },
      },
    ],
  },
  IconButton: {
    defaultProps: [
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
})
