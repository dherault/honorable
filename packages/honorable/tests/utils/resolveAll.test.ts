import resolveAll from '../../src/utils/resolveAll'

import { theme } from '../theme'

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
          'w-mobile': 64,
          'bg-tablet-up': 'secondary',
          webkitOpacity: 0.5,
        },
      }, theme)
    ).toStrictEqual(
      {
        width: 128,
        backgroundColor: '#0000ff',
        '&:hover': {
          '@media (min-width: 0px and max-width: 600px)': {
            width: 64,
          },
          '@media (min-width: 600px)': {
            backgroundColor: '#ff0000',
          },
          WebkitOpacity: 0.5,
        },
      }
    )
  })
})
