import resolveAll from '../../src/resolvers/resolveAll'

import theme from '../themes/theme1'

describe('resolveAll', () => {

  test('Resolves to identity when no breakpoints nor alias nor webkit property nor color is involved', () => {
    expect(resolveAll({ width: 128 }, {})).toStrictEqual({ width: 128 })
    expect(resolveAll({ width: 128 }, theme)).toStrictEqual({ width: 128 })
    expect(resolveAll({ 'width-foo': 128 }, theme)).toStrictEqual({ 'width-foo': 128 })
  })

  test('Resolves complex objects', () => {
    expect(
      resolveAll({
        w: 128,
        bg: 'primary',
        '&:hover': {
          'w-mobile-down': 64,
          'bg-tablet': 'secondary',
          webkitOpacity: 0.5,
        },
        '& > div': {
          ml: 2,
          pt: '2rem',
        },
      }, theme)
    ).toStrictEqual(
      {
        width: 128,
        backgroundColor: '#0000ff',
        '&:hover': {
          '@media (max-width: 599px)': {
            width: 64,
          },
          '@media (min-width: 900px) and (max-width: 1199px)': {
            backgroundColor: '#ff0000',
          },
          WebkitOpacity: 0.5,
        },
        '& > div': {
          marginLeft: 32,
          paddingTop: '2rem',
        },
      }
    )
  })
})
